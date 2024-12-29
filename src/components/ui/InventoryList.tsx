import React, { useMemo } from "react";
import {
  disableProduct,
  deleteProduct,
} from "../../state/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { Product } from "../../state/types/product";
import InventoryEditModel from "./InventoryEditModel";
import Edit from "../icons/Edit";
import View from "../icons/View";
import Delete from "../icons/Delete";
import ViewSlash from "../icons/ViewSlash";

const InventoryList: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products);
  const role = useAppSelector((state) => state.user.role);
  const productList: Product[] = useMemo(
    () => Object.values(products),
    [products]
  );
  const [editProduct, setEditProduct] = React.useState<number | null>(null);
  const handleEdit = (product: number) => {
    setEditProduct(product);
  };
  const handleDisable = (id: number) => {
    dispatch(disableProduct(id));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div className="w-full overflow-auto p-5 md:p-10 rounded-xl shadow-xl">
      <table className="w-full overflow-auto text-left ">
        <thead>
          <tr>
            <th className="px-3 py-2">
              <span className="px-3 py-2 bg-gray-300 rounded-xl text-sm  font-medium">
                Name
              </span>
            </th>
            <th className="px-3 py-2">
              <span className="px-3 py-2 bg-gray-300 rounded-xl text-sm  font-medium">
                Category
              </span>
            </th>
            <th className="px-3 py-2">
              <span className="px-3 py-2 bg-gray-300 rounded-xl text-sm  font-medium">
                Price
              </span>
            </th>
            <th className="px-3 py-2">
              <span className="px-3 py-2 bg-gray-300 rounded-xl text-sm  font-medium">
                Quantity
              </span>
            </th>
            <th className="px-3 py-2">
              <span className="px-3 py-2 bg-gray-300 rounded-xl text-sm  font-medium">
                Value
              </span>
            </th>
            <th className="px-3 py-2">
              <span className="px-3 py-2 bg-gray-300 rounded-xl text-sm  font-medium">
                Actions
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product) => (
            <tr
              className={`border-b border-b-slate-200 ${
                product?.disabled
                  ? "cursor-not-allowed text-gray-500 bg-gray-50 "
                  : ""
              }`}
              key={product.id}
            >
              <td className="px-4 py-3">{product.name}</td>
              <td className="px-4 py-3">{product.category}</td>
              <td className="px-4 py-3">{product.price}</td>
              <td className="px-4 py-3">{product.quantity}</td>
              <td className="px-4 py-3">{product.price * product.quantity}</td>
              <td className="px-4 py-3 flex gap-2">
                <button
                  disabled={product?.disabled || role === "user"}
                  onClick={() => handleEdit(product.id)}
                  className={
                    "text-green-700 disabled:cursor-not-allowed disabled:text-gray-500"
                  }
                >
                  <Edit />
                  <span className="sr-only">Edit</span>
                </button>
                <button
                  disabled={role === "user"}
                  onClick={() => handleDisable(product.id)}
                  className={
                    "text-purple-700 disabled:cursor-not-allowed disabled:text-gray-500"
                  }
                >
                  {product?.disabled ? <ViewSlash /> : <View />}
                  <span className="sr-only">
                    {product?.disabled ? "Enable" : "Disable"}
                  </span>
                </button>
                <button
                  disabled={role === "user"}
                  onClick={() => handleDelete(product.id)}
                  className={
                    "text-red-700 disabled:cursor-not-allowed disabled:text-gray-500"
                  }
                >
                  <Delete />
                  <span className="sr-only">Delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editProduct !== null ? (
        <InventoryEditModel
          productId={editProduct}
          onClose={() => setEditProduct(null)}
        />
      ) : null}
    </div>
  );
};

export default InventoryList;
