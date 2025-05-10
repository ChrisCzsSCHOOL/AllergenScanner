package nl.czs.allergenscanner.domain;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class Product {

    int barcodeId;
    String name;
    String[] allergens;
}
