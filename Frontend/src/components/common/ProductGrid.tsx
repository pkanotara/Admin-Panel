import React from "react";

type Product = {
  name: string;
  description: string;
};

type ProductGridProps = {
  products?: Product[];
};

const ProductGrid: React.FC<ProductGridProps> = ({ products = [] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {products.map((item, idx) => (
      <div key={idx} className="border p-4 rounded shadow">
        <h3 className="font-semibold">{item.name}</h3>
        <p>{item.description}</p>
      </div>
    ))}
  </div>
);

export default ProductGrid;
