import { useCallback, useEffect, useState, useRef } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { HeavyComponent } from "../components/HeavyComponent.tsx";
import { useCartMutation, useGetProductsQuery } from "../api/apiSlice.ts";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store.ts";
import { Cart, Product } from "../app/types.ts";

export const Products = ({
  onCartChange,
}: {
  onCartChange: (cart: Cart) => void;
}) => {
  const LIMIT_ITEMS_PER_PAGE = 20;
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [itemToUpdate, setItemToUpdate] = useState<{
    id: number;
    quantity: number;
  }>();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const throttledScroll = useRef<NodeJS.Timeout | null>(null);
  const query = useSelector((state: RootState) => state.searchBar.value);
  const { data, isLoading, isFetching } = useGetProductsQuery({
    limit: LIMIT_ITEMS_PER_PAGE,
    page,
    query: query,
  });
  const [mutateCart, { isLoading: isMutatingCart }] = useCartMutation();

  useEffect(() => {
    setProducts([]);
    setPage(0);
  }, [query]);

  useEffect(() => {
    if (data) {
      setProducts((prevState) => [...prevState, ...data.products]);
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

  const handleProductQuantity = (id: any, quantity: number) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, itemInCart: (product.itemInCart || 0) + 1 }
          : product
      )
    );
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      addToCart(id, quantity);
    }, 750);
  };

  async function addToCart(productId: number, quantity: number) {
    await mutateCart({
      cart: {
        productId,
        quantity,
      },
    })
      .then((response) => {
        if (response) {
          setOpenSnackbar(true);
        }
      })
      .catch((err) => console.error(err));
    setItemToUpdate(undefined);
  }

  return (
    <div
      style={{ width: "100%", height: "100vh", overflow: "scroll" }}
      onScroll={hasMore ? handleScroll : undefined}
    >
      <Grid container spacing={2} p={2}>
        {products.map((product) => (
          <Grid item xs={4}>
            {/* Do not remove this */}
            <HeavyComponent />
            <Card key={product.id} style={{ width: "100%" }}>
              <CardMedia
                component="img"
                height="150"
                image={product.imageUrl}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                </Typography>
              </CardContent>
              <CardActions>
                <Typography variant="h6" component="div">
                  ${product.price}
                </Typography>
                <Box flexGrow={1} />
                <Box
                  position="relative"
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                >
                  <Box
                    position="absolute"
                    left={0}
                    right={0}
                    top={0}
                    bottom={0}
                    textAlign="center"
                  >
                    {isMutatingCart && product.id === itemToUpdate?.id && (
                      <CircularProgress size={20} />
                    )}
                  </Box>
                  <IconButton
                    disabled={isMutatingCart}
                    aria-label="delete"
                    size="small"
                    onClick={() => addToCart(product.id, -1)}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>

                  <Typography variant="body1" component="div" mx={1}>
                    {product.itemInCart || 0}
                  </Typography>

                  <IconButton
                    disabled={isMutatingCart}
                    aria-label="add"
                    size="small"
                    onClick={() => {
                      const newQuantity = (itemToUpdate?.quantity || 0) + 1;
                      setItemToUpdate({
                        id: product.id,
                        quantity: newQuantity,
                      });
                      handleProductQuantity(product.id, newQuantity);
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1000}
        message="cart updated!"
        onClose={() => setOpenSnackbar(false)}
      />
    </div>
  );
};
