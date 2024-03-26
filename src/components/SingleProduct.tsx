import { useRef } from "react";
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
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { HeavyComponent } from "./HeavyComponent.tsx";
import { useDispatch } from "react-redux";
import { Product } from "../app/types.ts";
import { changeCart } from "../features/cart/cartSlice.ts";

type SingleProductProps = {
  product: Product;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  itemToUpdate: { id: number; quantity: number } | undefined;
  setItemToUpdate: React.Dispatch<
    React.SetStateAction<{ id: number; quantity: number } | undefined>
  >;
  setOpenSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
  mutateCart: Function;
  isMutatingCart: boolean;
};

export const SingleProduct: React.FC<SingleProductProps> = ({
  product,
  products,
  setProducts,
  itemToUpdate,
  setItemToUpdate,
  setOpenSnackbar,
  mutateCart,
  isMutatingCart,
}) => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const dispatch = useDispatch();

  const handleProductQuantity = (
    id: any,
    quantity: number,
    increment = true
  ) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? {
              ...product,
              itemInCart: increment
                ? (product.itemInCart || 0) + 1
                : (product.itemInCart || 0) - 1,
            }
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
      .then((response: any) => {
        dispatch(changeCart(response.data));
        setOpenSnackbar(true);
      })
      .catch((err: any) => console.error(err));
    setItemToUpdate(undefined);
  }

  return (
    <Grid item xs={4}>
      {/* Do not remove this */}
      <HeavyComponent />
      <Card key={product.id} style={{ width: "100%" }}>
        <CardMedia component="img" height="150" image={product.imageUrl} />
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
              disabled={isMutatingCart || !product.itemInCart}
              aria-label="delete"
              size="small"
              onClick={() => {
                const newQuantity = (itemToUpdate?.quantity || 0) - 1;
                setItemToUpdate({
                  id: product.id,
                  quantity: newQuantity,
                });
                handleProductQuantity(product.id, newQuantity, false);
              }}
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
  );
};
