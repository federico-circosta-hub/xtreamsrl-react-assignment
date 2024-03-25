import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { changeCategory } from "../features/category/categorySlice";
import type { RootState } from "../app/store.ts";

const drawerWidth = 180;

const categories = [
  "Fruit",
  "Vegetables",
  "Dairy",
  "Bakery",
  "Meat",
  "Seafood",
  "Snacks",
  "Beverages",
];

export const Categories = () => {
  const dispatch = useDispatch();
  const category = useSelector((state: RootState) => state.category.value);

  const handleChangeCategory = (e: any) => {
    const category = e.target.textContent;
    category === "All categories"
      ? dispatch(changeCategory(""))
      : dispatch(changeCategory(category));
  };

  return (
    <Box minWidth={drawerWidth} sx={{ borderRight: "1px solid grey" }}>
      <List>
        <ListItem
          disablePadding
          style={{ background: category === "" ? "lightblue" : "" }}
        >
          <ListItemButton onClick={handleChangeCategory}>
            <ListItemText primary={"All categories"} />
          </ListItemButton>
        </ListItem>
        <Divider />
        {categories.map((text) => (
          <ListItem
            key={text}
            disablePadding
            style={{ background: category === text ? "lightblue" : "" }}
          >
            <ListItemButton onClick={handleChangeCategory}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
