import React from "react";
import { useState } from "react";
import AppRouter from "./AppRouter";
import LoginRouter from "./LoginRouter";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // change to true if you don't want to do login

  function loginAction() {
    setIsLoggedIn(true);   
  }

  return (
    <div>
      {isLoggedIn ? <AppRouter /> : <LoginRouter loginAction={loginAction} />}
    </div>
  );
}

export default App;
