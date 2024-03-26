import { useCallback, useEffect, useState, useRef } from "react";
import { Grid, Snackbar, Alert } from "@mui/material";
import { useCartMutation, useGetProductsQuery } from "../api/apiSlice.ts";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store.ts";
import { Product } from "../app/types.ts";
import { checkCartFirst } from "../utils/functions.ts";
import { SingleProduct } from "../components/SingleProduct.tsx";

export const Products = () => {
  const LIMIT_ITEMS_PER_PAGE = 20;
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [itemToUpdate, setItemToUpdate] = useState<{
    id: number;
    quantity: number;
  }>();
  const throttledScroll = useRef<NodeJS.Timeout | null>(null);
  const query = useSelector((state: RootState) => state.searchBar.value);
  const cart = useSelector((state: RootState) => state.cart);
  const categoryParam = useSelector((state: RootState) => state.category.value);
  const { data } = useGetProductsQuery({
    limit: LIMIT_ITEMS_PER_PAGE,
    page,
    query,
    category: categoryParam,
  });
  const [mutateCart, { isLoading: isMutatingCart }] = useCartMutation();

  useEffect(() => {
    setProducts([]);
    setPage(0);
  }, [query, categoryParam]);

  useEffect(() => {
    if (data) {
      setProducts((prevState) => [
        ...prevState,
        ...checkCartFirst(data.products, cart),
      ]);
      setHasMore(data.hasMore);
    }
  }, [data]);

  const handleScroll = useCallback((e: any) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if ((scrollTop + clientHeight) / scrollHeight >= 0.8) {
      if (!throttledScroll.current) {
        throttledScroll.current = setTimeout(() => {
          setPage((prev) => prev + 1);
          throttledScroll.current = null;
        }, 750);
      }
    }
  }, []);

  return (
    <div
      style={{ width: "100%", height: "100vh", overflow: "scroll" }}
      onScroll={hasMore ? handleScroll : undefined}
    >
      <Grid container spacing={2} p={2}>
        {products.map((product: Product) => (
          <SingleProduct
            product={product}
            products={products}
            setProducts={setProducts}
            itemToUpdate={itemToUpdate}
            setItemToUpdate={setItemToUpdate}
            setOpenSnackbar={setOpenSnackbar}
            mutateCart={mutateCart}
            isMutatingCart={isMutatingCart}
          />
        ))}
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          Cart updated!
        </Alert>
      </Snackbar>
    </div>
  );
};
