import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Components
import Home from "./pages/home/Home";
import Products from "./pages/products/Products";
import ProductDetails from "./pages/product-details/ProductDetails";
import Videos from "./pages/videos/Videos";
import TechHelp from "./pages/tech-help/TechHelp";
import Contact from "./pages/contact/Contact";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ResetPass from "./pages/auth/ResetPass";
import Root from "./layouts/Root";
import Auth from "./layouts/Auth";
import CartPage from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import WishList from "./pages/wishlist/WishList";

//context provider
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import {  CategoryProvider } from "./context/CategoryContext";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "products", Component: Products },
      { path: "single-product/:title", Component: ProductDetails },
      { path: "videos", Component: Videos },
      { path: "tech-help", Component: TechHelp },
      { path: "contact-us", Component: Contact },
      { path: "cart", Component: CartPage },
      { path: "cart/checkout", Component: Checkout },
      { path: "wish-list", Component: WishList },
    ],
  },
  {
    path: "/auth",
    Component: Auth,
    children: [
      { path: "signin", Component: SignIn },
      { path: "signup", Component: SignUp },
      { path: "forgot-password", Component: ResetPass },
    ],
  },
]);

function App() {
  return (
    <CategoryProvider>
    <CartProvider>
      <ProductProvider>
        <RouterProvider router={router} />
      </ProductProvider>
    </CartProvider>
    </CategoryProvider>
  );
}

export default App;
