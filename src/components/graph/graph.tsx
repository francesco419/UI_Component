import "./graph.scss";
import { useRef, useEffect, useState } from "react";
import Button from "../Button";

export default function GraphExA() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [arr, setArr] = useState<number[]>([]);
  const [str, setStr] = useState<string>("");
  let raf;

  const num = () => {
    setArr((arr) => [...arr, parseInt(str)]);
    console.log(arr);
  };

  const draw = () => {
    const ctx = ref.current?.getContext("2d");
    ctx?.beginPath();
    ctx?.moveTo(0, 0);
    raf = window.requestAnimationFrame(draw);
    if (ctx !== undefined && ctx !== null) {
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
    }
    for (let i = 0; i < arr.length; i++) {
      ctx?.lineTo(20 * (i + 1), arr[i]); //20의 곱
      ctx?.stroke();
    }
  };

  const doStr = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStr((str) => e.target.value);
  };

  return (
    <div>
      <h2>1</h2>
      <input type="text" onChange={(e) => doStr(e)} />
      <Button children="input" disabled={false} click={num} />
      <Button children="type" disabled={false} click={draw} />
      <canvas ref={ref} id="mycanvas" width="400" height="300"></canvas>
    </div>
  );
}
