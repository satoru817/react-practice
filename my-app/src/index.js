import React from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";
import "./index.css";

class Human {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  getDescription() {
    return `${this.name}は${this.age}歳です`;
  }

  canVote() {
    return this.age >= 18;
  }

  getLifeStage() {
    if (this.age <= 12) {
      return "子供";
    } else if (this.age <= 19) {
      return "青年";
    } else if (this.age <= 65) {
      return "大人";
    } else {
      return "シニア";
    }
  }
}

function HumanCard(props) {
  const [human, hogeHuman] = useState(props.initialHuman);

  const [count, setCount] = useState(0);

  const increaseAge = () => {
    const updatedHuman = new Human(human.name, human.age + 2);
    hogeHuman(updatedHuman);
  };

  return (
    <div style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
      <h2>{human.getDescription()}</h2>
      <p>ライフステージ:{human.getLifeStage()}</p>
      <p>
        {human.name}は{human.canVote() ? "投票できます" : "投票できません"}
      </p>

      <button onClick={increaseAge}>年齢を上げる</button>

      <hr></hr>

      <p>カウント:{count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
    </div>
  );
}

function App() {
  return (
    <div>
      <HumanCard initialHuman={new Human("alice", 27)} />
      <HumanCard initialHuman={new Human("Bob", 33)} />
      <HumanCard initialHuman={new Human("Satoru", 27)} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
