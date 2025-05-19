# ---- Build Stage ----
FROM eclipse-temurin:24-jdk AS build
WORKDIR /app
COPY . .
RUN ./mvnw clean package -DskipTests

# ---- Run Stage ----
FROM eclipse-temurin:24-jdk
WORKDIR /app
COPY --from=build /app/target/AllergenScanner-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]