import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState("blue");
  const [inputColor, setInputColor] = useState("blue");

  const decrement = () => {
    const decrementedCount = count - 1;
    setCount(decrementedCount);
  };

  const increment = () => {
    const incrementedCount = count + 1;
    setCount(incrementedCount);
  };

  const reset = () => {
    setCount(0);
  };

  const handleColorChange = (e) => {
    setInputColor(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setColor(inputColor);
  };

  return (
    <div
      style={{
        color: color,
        border: "1px solid gray",
        margin: "10px",
        padding: "10px",
      }}
    >
      <h2>現在のカウント{count}</h2>
      <button onClick={() => decrement()}>-1</button>
      <button onClick={() => increment()}>+1</button>
      <button onClick={() => reset()}>リセット</button>
      <form onSubmit={handleSubmit}>
        <label>Color:</label>
        <input
          type="text"
          value={inputColor}
          onChange={handleColorChange}
        ></input>
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}

function App() {
  return (
    <div>
      <Counter />
      <Counter />
      <Counter />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
