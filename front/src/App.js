import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useThemeHook } from './GlobalComponents/ThemeProvider';
import Header from './components/Header';
import { Router } from "@reach/router";

//Pages
import Home from './Pages/Home';
import Cart from './Pages/Cart';
import ProductDetails from "./Pages/ProductDetails";
import SignIn from "./Pages/SignIn";
import Register from "./Pages/Register"; 
import Messenger from "./Pages/Messenger/Messenger"
import MyAccount from "./Pages/MyAccount";
import './App.css';
import ChatBotRobot from './Chatbot.component';


function App() {
  const [theme] = useThemeHook();
  return (
    <main className={theme? 'bg-black': 'bg-light-2'} style={{ height: '100vh', overflowY: 'auto'}}>
      <Header/>
      <Router>
        <Home path="/" />
        <MyAccount path="my-account" />
        <SignIn path="sign-in"/>
        <Register path="register"/>
        <Messenger path="messenger"/>
        <ProductDetails path="product-details/:productId"/>
        <Cart path="/cart" />
      </Router>
      <ChatBotRobot />

    </main>
    
  );
}

export default App;
