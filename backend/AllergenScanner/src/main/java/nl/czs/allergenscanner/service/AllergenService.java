package nl.czs.allergenscanner.service;

import nl.czs.allergenscanner.domain.Product;
import org.springframework.stereotype.Service;

@Service
public class AllergenService {
    public Product getAllergensByBarcodeId(int barcodeId) {
        return new Product(barcodeId, "Test Product", new String[]{"Peanuts", "Milk"});
    }
}
