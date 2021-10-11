/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Usersignin from './customer/Usersignin';
import Usersignup from './customer/Usersignup';
import Home from './core/Home';
import Menu from './core/Menu';
import Footer from './core/Footer';
// import PrivateRoute from './auth/PrivateRoute';
// import RestaurantPrivateRoute from './auth/RestaurantPrivateRoute';
import Customerdashboard from './customer/Customerdashboard';
import Resturantdashboard from './restaurant/Restaurantdashboard';
import Adddishes from './restaurant/Adddishes';
import DishComponent from './dishes/DishComponent';
import RestaurantComponent from './restaurant/RestaurantComponent';
import Cart from './cart/Cart';
import Shipping from './shipping/Shipping';
import PlaceOrder from './shipping/PlaceOrder';
import CustomerLanding from './customer/customerLanding';
import Orders from './orders/Orders';
import ListOrders from './orders/ListOrders';
import Favorites from './favorites/Favorites';
import Editdish from './restaurant/Editdish';

const App = () => (
  <BrowserRouter>
    <Container fluid>
      <Menu />
      <main className="py-3">
        <Switch>
          <Route path="/" exact component={CustomerLanding} />
          <Route path="/customersignin" exact component={Usersignin} />
          <Route path="/customersignup" exact component={Usersignup} />
          <Route path="/customerdashboard" exact component={Customerdashboard} />
          <Route path="/restaurantdashboard" exact component={Resturantdashboard} />
          <Route path="/create/dishes" exact component={Adddishes} />
          <Route path="/dishes/:id" exact component={DishComponent} />
          <Route path="/cart/:id?" exact component={Cart} />
          <Route path="/shipping" exact component={Shipping} />
          <Route path="/checkout" exact component={PlaceOrder} />
          <Route path="/restaurant/:id" exact component={RestaurantComponent} />
          <Route path="/search/:keyword?" exact component={CustomerLanding} />
          <Route path="/orders/:id" exact component={Orders} />
          <Route path="/customer/orders" exact component={ListOrders} />
          <Route path="/favorites" exact component={Favorites} />
          <Route path="/edit/dishes" exact component={Editdish} />
        </Switch>
      </main>
      <Footer />
    </Container>
  </BrowserRouter>
);

export default App;
