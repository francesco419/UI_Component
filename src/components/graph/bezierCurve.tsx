import React, { useRef, useState } from 'react';
import './graph.scss';
import Button from '../Button';

export default function BezierCurve() {
  const ref = useRef<HTMLCanvasElement>(null);
  const point = [60, 20, 80, 100];
  let stop = false;

  let ball = { x: 0, y: 0, speed: 0.02, t: 0, radius: 10 };

  let points = [
    { x: ball.x, y: ball.y },
    { x: 10, y: 70 },
    { x: 30, y: 70 },
    { x: 40, y: 50 }
  ];
  let pointa = [
    { x: ball.x, y: ball.y },
    { x: 50, y: 10 },
    { x: 70, y: 10 },
    { x: 80, y: 30 }
  ];
  /*   let pointt = [
    { x: ball.x, y: ball.y },
    { x: 10, y: 70 },
    { x: 30, y: 70 },
    { x: 40, y: 50 }
  ]; */

  type poi = { x: number; y: number }[];

  let arr = [points, pointa];

  console.log(arr);

  function drawball(ctx: CanvasRenderingContext2D) {
    if (ctx) {
      ctx.fillStyle = 'black';
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
      ctx.fill();
    }
  }

  function moveBallBezierCurve(ctx: CanvasRenderingContext2D, points: poi) {
    let [p0, p1, p2, p3] = points;
    let cx = 3 * (p1.x - p0.x);
    let bx = 3 * (p2.x - p1.x) - cx;
    let ax = p3.x - p0.x - cx - bx;

    let cy = 3 * (p1.y - p0.y);
    let by = 3 * (p1.y - p0.y) - cy;
    let ay = p3.y - p0.y - cy - by;

    let t = ball.t;
    //increase t value by speed
    ball.t += ball.speed;
    //calculate new x,y position of the ball
    let xt = ax * (t * t * t) + bx * (t * t) + cx * t + p0.x;
    let yt = ay * (t * t * t) + by * (t * t) + cy * t + p0.y;

    if (ball.t > 1) {
      ball.t = 0;
      stop = true;
    }

    ball.x = xt;
    ball.y = yt;
    drawball(ctx);
  }

  function animate() {
    const ctx = ref.current?.getContext('2d');
    console.log(1);
    requestAnimationFrame(animate);
    if (ref.current) {
      ctx?.clearRect(0, 0, ref.current?.width, ref.current?.height);
    }
    if (ctx) {
      if (!stop) {
        moveBallBezierCurve(ctx, arr[0]);
      } else {
        moveBallBezierCurve(ctx, arr[1]);
      }
    }
  }

  return (
    <>
      <div>
        <canvas ref={ref} id='mycanvas' width='600' height='600'></canvas>
      </div>
      <Button child='Bezier' disabled={false} click={animate} />
    </>
  );
}
