package nl.czs.allergenscanner.controller;

import com.mashape.unirest.http.exceptions.UnirestException;
import lombok.AllArgsConstructor;
import nl.czs.allergenscanner.domain.Product;
import nl.czs.allergenscanner.service.AllergenService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin()
@RestController
@RequestMapping("/api/allergens")
//@AllArgsConstructor
public class AllergenController {

    AllergenService service;

    public AllergenController(AllergenService service) {
        this.service = service;
    }

    @GetMapping("/{barcodeId}")
    public ResponseEntity<Product> getAllergensByBarcodeId(@PathVariable long barcodeId) throws UnirestException {
        return ResponseEntity.ok().body(service.getAllergensByBarcodeId(barcodeId));
    }
}
