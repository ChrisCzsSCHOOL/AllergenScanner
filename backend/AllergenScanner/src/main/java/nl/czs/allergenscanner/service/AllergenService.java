package nl.czs.allergenscanner.service;

import nl.czs.allergenscanner.domain.Product;
import org.springframework.stereotype.Service;

@Service
public class AllergenService {
    public Product getAllergensByBarcodeId(int barcodeId) {

        // In resources/mockResponse.json we can see the response from the API for peanut butter.
        // Now i want to map the response onto the Product object.
        // Allergens are located at { product.allergens } i might want to use allergens.hierarchy,
        // because this is also an array

        


        return new Product(barcodeId, "Test Product", new String[]{"Peanuts", "Milk"}, "Test Brand");
    }
}
