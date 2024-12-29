import React, { useState } from "react";
import { editProduct } from "../../state/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { ProductState } from "../../state/types/product";

interface InventoryEditModelProps {
  productId: number;
  onClose: () => void;
}

const InventoryEditModel: React.FC<InventoryEditModelProps> = ({
  productId,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const products: ProductState = useAppSelector((state) => state.products);
  const product = products[productId as keyof ProductState];
  const [formData, setFormData] = useState({
    category: product?.category || "",
    price: product?.price || 0,
    quantity: product?.quantity || 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(editProduct({ id: productId, ...formData }));
    onClose();
  };

  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full">
        <h2 className="text-3xl mb-2">Edit Product</h2>
        <span className="text-lg mb-2 inline-block">{product?.name}</span>
        <form className="grid md:grid-cols-2 gap-3" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-gray-700 font-bold mb-2 block">
              Category
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700 font-bold mb-2 block">Price</label>
            <input
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700 font-bold mb-2 block">
              Quantity
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700 font-bold mb-2 block">Value</label>
            <input
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="number"
              name="quantity"
              disabled={true}
              value={formData.quantity * formData.price}
            />
          </div>
          <div className="flex justify-end gap-3 col-span-2">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
              type="submit"
            >
              Save
            </button>
            <button
              className="px-4 py-2 bg-gray-500 hover:bg-gray-700 rounded-lg"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryEditModel;
