import { SignIn } from "./pages/SignIn/SignIn";
import { AuthContext } from "./contexts/authContext";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { SignUp } from "./pages/SignUp/SignUp";
import Navbar from "./components/Navbar/Navbar";
import { HomeInput } from "./pages/HomeInput/HomeInput";
import { MyOrder } from "./pages/MyOrder/MyOrder";
import { Cart } from "./pages/Cart/Cart";
import { ProductContext } from "./contexts/productContext";
import { Error } from "./pages/Error/Error";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <Error />,
      children: [
        { index: true, element: <HomeInput /> },
        { path: "/myorder", element: <MyOrder /> },
        { path: "/cart", element: <Cart /> },
        { path: "/signin", element: <SignIn /> },
        { path: "/signup", element: <SignUp /> },
      ],
    },
  ]);
  return (
    <>
      <AuthContext>
        <ProductContext>
          <RouterProvider router={router}></RouterProvider>
        </ProductContext>
      </AuthContext>
    </>
  );
}

export default App;
