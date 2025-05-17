import { useState, useEffect } from "react";
import BarcodeScanner from "react-qr-barcode-scanner";
import "./App.css";


function App() {
  const [data, setData] = useState("Not Found");
  const [barcode, setBarcode] = useState(null);

  useEffect(() => {
    if (data !== "Not Found") {
      setBarcode(data);
    }
  }, [data]);

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
        <div>
          <BarcodeScanner
            width={500}
            height={500}
            onUpdate={(err, result) => {
              if (result) setData(result.text);
              else setData("Not Found");
            }}
          />
          <p>{barcode}</p>
        </div>
      </div>
    </>
  );
}

export default App;
