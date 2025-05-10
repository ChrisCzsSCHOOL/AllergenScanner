package nl.czs.allergenscanner.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class Product {
    long barcodeId;
    String name;
    String[] allergens;
    String brand;
}
