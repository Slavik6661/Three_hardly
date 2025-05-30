import { useState } from "react";
import MainGamePage from "./gamePage/gamePage";
// import './App.css'

function App() {
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MainGamePage />
    </div>
  );
}

export default App;
