import { useState, useEffect } from "react";
import BarcodeScanner from "react-qr-barcode-scanner";

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
      <BarcodeScanner
        width={500}
        height={500}
        onUpdate={(err, result) => {
          if (result) setData(result.text);
          else setData("Not Found");
        }}
      />
      <p>{barcode}</p>
    </>
  );
}

export default App;
