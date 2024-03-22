import { Products } from "../pages/Products.tsx";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import SearchAppBar from "../components/SearchAppBar.tsx";
import { Categories } from "../components/Categories.tsx";

function App() {
  return (
    <Stack height="100vh" display="flex" flexDirection="column">
      <CssBaseline />
      <SearchAppBar />
      <Stack flex={1} display="flex" flexDirection="row">
        <Categories />
        <Stack flex={1}>
          <Products />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default App;
