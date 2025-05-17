package nl.czs.allergenscanner.service;

import com.mashape.unirest.http.JsonNode;
import nl.czs.allergenscanner.domain.Product;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AllergenServiceTest {

    private AllergenService sut;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        sut = new AllergenService();
    }

    @Test
    void mapToProduct_allInfo() throws Exception {
        // Arrange
        String jsonString = "{\"product\":{\"brands\":\"Test Brand\",\"product_name\":\"Test Product\",\"allergens_hierarchy\":[\"en:nuts\",\"en:gluten\"]}}";
        JSONObject jsonObject = new JSONObject(jsonString);

        JsonNode jsonNode = mock(JsonNode.class);
        when(jsonNode.getObject()).thenReturn(jsonObject);

        // Act
        Product product = sut.mapToProduct(jsonNode);

        // Assert
        assertNotNull(product);
        assertEquals("Test Brand", product.getBrand());
        assertEquals("Test Product", product.getName());
        assertArrayEquals(new String[]{"en:nuts", "en:gluten"}, product.getAllergens());
    }

    @Test
    void mapToProduct_emptyAllergens() throws Exception {
        // Arrange
        String jsonString = "{\"product\":{\"brands\":\"Test Brand\",\"product_name\":\"Test Product\",\"allergens_hierarchy\":[]}}";
        JSONObject jsonObject = new JSONObject(jsonString);

        JsonNode jsonNode = mock(JsonNode.class);
        when(jsonNode.getObject()).thenReturn(jsonObject);

        // Act
        Product product = sut.mapToProduct(jsonNode);

        // Assert
        assertNotNull(product);
        assertEquals("Test Brand", product.getBrand());
        assertEquals("Test Product", product.getName());
        assertArrayEquals(new String[0], product.getAllergens());
    }
}
