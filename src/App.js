import React from "react";
import Cart from "./components/Pages/Cart"
import LoginPage from "./components/Pages/LoginPage"
import SignupPage from "./components/Pages/SignupPage"
import ProductsPage from "./components/Pages/ProductsPage"
import CheckoutPage from "./components/checkout/CheckoutPage"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SuccessPage from "./components/checkout/SuccessPage";
import CanceledPage from "./components/checkout/CanceledPage";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact>
            <ProductsPage/>
          </Route>
          <Route path="/login" exact>
            <LoginPage/>
          </Route>
          <Route path="/signup" exact>
            <SignupPage/>
          </Route>
          <Route path="/cart" exact>
            <Cart/>
          </Route>
          <Route path="/checkout" exact>
            <CheckoutPage/>
          </Route>
          <Route path="/success" exact>
            <SuccessPage/>
          </Route>
          <Route path="/canceled" exact>
            <CanceledPage/>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
