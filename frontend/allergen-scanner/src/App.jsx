import { useState, useEffect } from "react";
import BarcodeScanner from "react-qr-barcode-scanner";
import Product from "./components/Product";
import Allergens from "./components/Allergens";
import "./App.css";

function App() {
  const [data, setData] = useState("Not Found");
  const [barcode, setBarcode] = useState(null);
  const [needsScanning, setNeedsScanning] = useState(false);
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    if (data !== "Not Found") {
      setBarcode(data);
      setNeedsScanning(false);
      console.log("Barcode scanned:", data);
    }
  }, [data]);

  useEffect(() => {
    if (barcode) {
      fetch(`http://localhost:8080/api/allergens/${barcode}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("API response:", data);
          setProductData(data);
        })
        .catch((error) => {
          console.error("Error fetching barcode data:", error);
        });
    }
  }, [barcode]);

  return (
    <>
      {/* div voor de hele app */}
      <div className="flex flex-col items-center justify-center h-screen bg-blue-100">
        {/* div voor header */}
        <div>
          <h1 className="text-2xl font-semibold underline">
            Allergen scanner!
          </h1>
        </div>

        {/* div voor scanner */}
        {needsScanning && (
          <div>
            <BarcodeScanner
              width={500}
              height={500}
              onUpdate={(_, result) => {
                if (result) setData(result.text);
                else setData("Not Found");
              }}
            />
            <p>{data !== "Not Found" ? data : "Scanning..."}</p>
          </div>
        )}

        {!needsScanning && barcode && (
          <div className="my-4">
            <p>Scanned barcode: {barcode}</p>
          </div>
        )}

        {/* div voor button */}
        <div className="mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              if (!needsScanning) {
                // Reset data when starting a new scan
                setData("Not Found");
              }
              setNeedsScanning(!needsScanning);
            }}
          >
            {needsScanning ? "Stop Scanning" : "Scan Barcode"}
          </button>
        </div>

        {/* div voor allergenen */}
        {productData &&
          (productData.allergens && productData.allergens.length === 0 ? (
            <div className="my-4 text-lg font-bold text-green-600">
              Safe to eat!
            </div>
          ) : (
            <Allergens allergens={productData.allergens} />
            
          ))}

        {/* component voor resultaten */}
        {productData && <Product data={productData} />}
      </div>
    </>
  );
}

export default App;
