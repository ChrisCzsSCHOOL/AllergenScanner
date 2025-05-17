function Allergens({ allergens }) {
  
  const allergenString = allergens.toString();
  
  
    return (
    <div className="mt-20 flex flex-col items-center justify-center">
      <h2 className="text-xl font-semibold mb-4">Allergens</h2>
        <p>{allergenString}</p>
    </div>
  );
}

export default Allergens;