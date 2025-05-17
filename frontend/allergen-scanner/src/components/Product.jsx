function Product({ data }) {

  return (
    <>
      

      <div className="mt-20 flex flex-col items-center justify-center">
        <h1 className="text-xl font-semibold mb-4">Product Information</h1>
        <table className="min-w-[300px] bg-white border border-gray-300 rounded-lg shadow-md">
          <tbody>
            <tr className="border-b">
              <td className="font-semibold py-2 px-4">Name:</td>
              <td className="py-2 px-4">{data.name}</td>
            </tr>
            <tr className="border-b">
              <td className="font-semibold py-2 px-4">Brand:</td>
              <td className="py-2 px-4">{data.brand}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* <p>{JSON.stringify(data)}</p> */}
      {/* Voor debuggen ^^ */}
    </>
  );
}

export default Product;
