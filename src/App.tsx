import React from "react";
import ScreenViewButton from "./components/screenView/ScreenViewButton";
import MenuExA from "./components/menu/menu";
import GraphExA from "./components/graph/graph";

function App() {
  return (
    <div className="App" style={{ padding: "50px" }}>
      <ScreenViewButton />
      <MenuExA />
      <GraphExA />
    </div>
  );
}

export default App;
