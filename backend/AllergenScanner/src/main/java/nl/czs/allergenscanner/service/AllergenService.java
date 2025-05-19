package nl.czs.allergenscanner.service;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import nl.czs.allergenscanner.domain.Product;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

@Service
public class AllergenService {

    long globalId;

    public Product getAllergensByBarcodeId(long barcodeId) throws UnirestException {

        Product product;
        String url = "https://world.openfoodfacts.org/api/v0/product/" + barcodeId + ".json";

        if (checkBarcode(barcodeId)) { // might not be needed, TODO
            globalId = barcodeId;

            // In resources/mockResponse.json we can see the response from the API for peanut butter.
            // Now i want to map the response onto the Product object.
            // Allergens are located at { product.allergens } i might want to use allergens.hierarchy,
            // because this is also an array
            HttpResponse<JsonNode> response = Unirest.get(url)
                    .header("accept", "application/json")
                    .asJson();

            product = mapToProduct(response.getBody());

        } else {
            throw new UnirestException("Barcode not found");
        }

        product = checkForNull(product);
        return product;

    }

    // TODO check if the barcode is valid, if not return false. API seems to already do a good job at this.
    // https://arc.net/l/quote/wwzfqncu
    // The solution: barcode normalization#
    // In Open Food Facts, we choose to fix the number of leading 0s in this way:
    // All barcodes with 7 digits or less (after leading 0s are removed) are padded with leading 0s so that they have 8 digits.
    // All barcodes with 9 to 12 digits are padded with leading 0s so that they have 13 digits.
    // The "code" field in the product database, database dumps and exports is normalized in this way.
    // Normalization of barcodes in the API#
    // The Open Food Facts API automatically normalize the barcode passed in the "code" field for both READ and WRITE requests.
    // So a request for the 12 digit barcode 034000470693 will return the product saved with "code" 0034000470693.
    private boolean checkBarcode(long barcodeId) {
        return true;
    }

    Product mapToProduct(JsonNode body) {
        String brand = body.getObject()
                .getJSONObject("product").getString("brands");
        String name = body.getObject()
                .getJSONObject("product").getString("product_name");
        String[] allergens = getAllergens(body.getObject().getJSONObject("product").getString("allergens_from_ingredients"));

        return new Product(globalId, name, allergens, brand);
    }


    Product checkForNull(Product product) throws UnirestException {
        if (product == null) {
            throw new UnirestException("Product not found");
        }
        return product;
    }

    String[] getAllergens(String allergens){

        if (allergens == null || allergens.isEmpty()) {
            return new String[0];
        }
        return allergens.split(", ");
    }


}
