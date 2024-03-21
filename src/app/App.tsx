import { Cart } from "./types.ts";
import { Products } from "../pages/Products.tsx";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import SearchAppBar from "../components/SearchAppBar.tsx";
import { Categories } from "../components/Categories.tsx";
import { useState } from "react";

function App() {
  const [cart, setCart] = useState<Cart>();

  function onCartChange(cart: Cart) {
    setCart(cart);
  }

  return (
    <Stack height="100vh" display="flex" flexDirection="column">
      <CssBaseline />
      <SearchAppBar
        quantity={cart?.totalItems || 0}
        price={cart?.totalPrice || 0}
      />
      <Stack flex={1} display="flex" flexDirection="row">
        <Categories />
        <Stack flex={1}>
          <Products onCartChange={onCartChange} />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default App;
