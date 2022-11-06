import React from "react";
import { Header } from "./components/header";
import { AppRouters } from "./routers";

function App() {
  return (
    <div>
      <Header />
      <AppRouters />
    </div>
  );
}

export default App;
