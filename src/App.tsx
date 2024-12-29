import { useEffect, useState } from "react";
import Loader from "./components/ui/Loader";
import { FETCH_PRODUCTS_URL } from "./constants";
import { Product, ProductResponse } from "./state/types/product";
import { useAppDispatch } from "./state/hooks";
import { addProducts } from "./state/features/products/productsSlice";
import Container from "./components/modules/Container";
import InventoryStats from "./components/ui/InvetoryStats";
import InventoryList from "./components/ui/InventoryList";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch(FETCH_PRODUCTS_URL);
      const data: ProductResponse[] = await response.json();
      const productStore: Product[] = [];
      data.forEach((item: ProductResponse, i) => {
        productStore.push({
          id: i,
          name: item.name,
          category: item.category,
          price: parseFloat(item.price.substring(1, item.price.length)),
          quantity: item.quantity,
          currency: item.price[0],
        });
      });
      dispatch(addProducts(productStore));
      setLoading(false);
    };
    getProducts();
  }, [dispatch]);
  return (
    <main>
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <div>
            <h1 className="text-4xl font-light">Inventory Stats</h1>
            <InventoryStats />
            <InventoryList />
          </div>
        )}
      </Container>
    </main>
  );
}

export default App;
