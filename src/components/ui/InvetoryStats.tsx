import React, { useMemo } from "react";
import { useAppSelector } from "../../state/hooks";
import { Product } from "../../state/types/product";

const InventoryStats: React.FC = () => {
  const products = useAppSelector((state) => state.products);
  const productList: Product[] = useMemo(
    () => Object.values(products),
    [products]
  );
  const filterList = productList.filter(
    (prod: Product) => prod?.disabled != true
  );
  const currency = filterList[0]?.currency;
  const totalProducts = filterList.length;
  const totalValue = filterList.reduce(
    (acc: number, product: Product) => acc + product.price * product.quantity,
    0
  );
  const outOfStock = filterList.filter(
    (product: Product) => product.quantity === 0
  ).length;
  const categories = [...new Set(filterList.map((product) => product.category))]
    .length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-8">
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-bold">Total Products</h2>
        <p className="text-2xl">{totalProducts}</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-bold">Total Value</h2>
        <p className="text-2xl">
          {currency}
          {totalValue.toFixed(2)}
        </p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-bold">Out of Stock</h2>
        <p className="text-2xl">{outOfStock}</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-bold">Categories</h2>
        <p className="text-2xl">{categories}</p>
      </div>
    </div>
  );
};

export default InventoryStats;
