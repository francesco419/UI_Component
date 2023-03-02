import "./graph.scss";
import { useRef, useEffect, useState } from "react";
import Button from "../Button";

export default function GraphExA() {
  const ref = useRef<HTMLCanvasElement>(null);
  const refInput = useRef<HTMLInputElement>(null);
  const [arr, setArr] = useState<number[]>([]);
  const [str, setStr] = useState<string>("");

  const num = () => {
    setArr((arr) => [...arr, parseInt(str)]);
    setStr((str) => "");
    //refInput.current?.focus();
  };

  const curve = () => {
    console.log("curve");
    const ctx = ref.current?.getContext("2d");
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      if (ctx !== undefined && ctx !== null) {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
      }
      let point = seperatePoint(); //여러점들에서 고점, 저점 point만을 모은 배열
      let xPoint = 10; //초기 x값

      for (let i = 0; i < point.length; i++) {
        let yPoint = point[i]; //현재 포인트
        let nextYPoint = point[i + 1]; //다음 포인트 (중간점 찾기위해)
        if (i % 2 === 0) {
          //상승곡선 그리기
          if (i + 1 === point.length) {
            //마지막 요소이라면
            drawCurve(ctx, xPoint, yPoint, yPoint, true);
          } else {
            drawCurve(ctx, xPoint, yPoint, (yPoint + nextYPoint) / 2, true);
          }
        } else if (i % 2 === 1) {
          //하강곡선 그리기
          if (i + 1 === point.length) {
            //마지막 요소이라면
            drawCurve(ctx, xPoint, yPoint, yPoint, false);
          } else {
            drawCurve(ctx, xPoint, yPoint, (yPoint + nextYPoint) / 2, false);
          }
        }
        xPoint = xPoint + 40;
        //다음 곡선의 시작포인트 설정
      }
      ctx.moveTo(0, 0);
      for (let i = 0; i < point.length; i++) {
        ctx.lineTo(30 * (i + 1), point[i]);
      }

      ctx.stroke();
    }
  };

  const drawCurve = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    z: number,
    str: boolean
  ) => {
    if (str) {
      ctx.bezierCurveTo(x, y + 20, x + 20, y + 20, x + 30, z);
      //상승곡선
    } else {
      ctx.bezierCurveTo(x, y - 20, x + 20, y - 20, x + 30, z);
      //하강곡선
    }
  };

  const seperatePoint = (): number[] => {
    //여러개의 점을 유연하게 쵸시하기 위해서 상승점과 하강점만을 추출
    let point: number[] = []; //결과점 배열
    let temp = arr[0]; //비교 값
    let dir: string = "up"; //이전까지의 흐름이 상승인지, 하강인지 표시
    for (let i = 1; i < arr.length; i++) {
      if (temp > arr[i]) {
        //이전값이 arr[i]보다 클 때
        if (dir === "up") {
          //흐름은 상승이지만 하강으로의 변곡점이 나왔기에
          point.push(temp); //최고상승점을 point배열에 저장
          dir = "down"; //하강 흐름으로 변경
        }
        temp = arr[i]; //비굣값 temp에 할당
      }

      if (temp < arr[i]) {
        //아전값이 arr[i]보다 작을 때
        if (dir === "down") {
          //흐름이 하강이면 (이전까지는 상승)
          point.push(temp); //최저 하강점을 point배열에 저장
          dir = "up"; //상승 흐름으로 변경
        }
        temp = arr[i]; //비굣값 temp에 할당
      }

      if (temp === arr[i]) {
        //값이 같다면 비굣값만 변경
        temp = arr[i];
      }

      if (i + 1 === arr.length) {
        //다음 인덱스가 없다면 마지막값 point배열에 저장
        point.push(temp);
      }
    }
    return point;
  };

  const doStr = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStr((str) => e.target.value);
  };

  const line = () => {
    console.log("curve");
    const ctx = ref.current?.getContext("2d");
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(0, 20);
      if (ctx !== undefined && ctx !== null) {
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
      }
      ctx.lineTo(300, 20);
      ctx.moveTo(0, 40);
      ctx.lineTo(300, 40);
      ctx.moveTo(0, 60);
      ctx.lineTo(300, 60);
      ctx.stroke();
    }
  };

  return (
    <div>
      <div>
        <canvas ref={ref} id="mycanvas" width="300" height="200"></canvas>
      </div>
      <input type="text" value={str} onChange={(e) => doStr(e)} />
      <Button children="input" disabled={false} click={num} />
      <Button children="curve" disabled={false} click={curve} />
      <Button children="line" disabled={false} click={line} />
      <div style={{ display: "flex", margin: "10px 0 0 0" }}>
        {arr.map((data) => {
          return <p style={{ margin: "0 5px 0 0" }}>{data} /</p>;
        })}
      </div>
    </div>
  );
}
