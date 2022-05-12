import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import{
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom"

const App = () => {
  const user = false;
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/products/:category" element={<ProductList/>}/>
        <Route exact path="/product/:id" element={<Product/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/login" element={user ? <Navigate to = "/"/> : <Login/>} />
        <Route exact path="/cart" element={<Cart/>}/>
      </Routes>
    </Router>
  );
};

export default App;