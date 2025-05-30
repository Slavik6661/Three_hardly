import { useState } from "react";
import Game from "./gamePage/game";

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
      <Game />
    </div>
  );
}

export default App;
