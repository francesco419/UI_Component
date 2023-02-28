import styled, { css, FlattenSimpleInterpolation } from "styled-components";
import "./anything.scss";
import { useRef, useEffect, useState } from "react";

interface ButtonProps {
  disabled?: boolean;
  children?: string;
  act?: any;
}

type btnColorType = {
  [anyKeyword: string]: FlattenSimpleInterpolation;
  dark: FlattenSimpleInterpolation;
  light: FlattenSimpleInterpolation;
};

const BTNCOLOR: btnColorType = {
  dark: css`
    background-color: #d3d3d3;
  `,
  light: css`
    background-color: #fad739;
  `,
};

const BTNBACKCOLOR: btnColorType = {
  dark: css`
    background-color: #4c5762;
  `,
  light: css`
    background-color: #5b93dd;
  `,
};

export default function Button({
  disabled = false,
  children,
  act,
}: ButtonProps) {
  const [right, setRight] = useState<boolean>(false);
  const refs = useRef<HTMLDivElement>(null);
  const btnColor = BTNBACKCOLOR[right ? "dark" : "light"];
  const backColor = BTNCOLOR[right ? "dark" : "light"];

  const move = () => {
    const { current } = refs;
    setRight((right) => !right);
    if (current !== null) {
      if (right) {
        current.style.marginLeft = "0";
        return;
      } else {
        current.style.marginLeft = "30px";
        return;
      }
    }
  };

  return (
    <StyleButton
      disabled={disabled}
      onClick={move}
      btnColor={btnColor}
      className="button-first"
    >
      {children}
      <StyleDiv backColor={backColor} ref={refs}></StyleDiv>
    </StyleButton>
  );
}

const StyleButton = styled.button<{ btnColor: any }>`
  ${(p) => p.btnColor}
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 30px;
  width: 60px;
  padding: 0 3px;
  box-shadow: inset 2px 2px 4px 0 rgba(0, 0, 0, 0.7);
  border: inset 1px;
  border-radius: 15px;
  transition: all 1s;
`;

const StyleDiv = styled.div<{ backColor: any }>`
  ${(p) => p.backColor}
  display: inline-block;
  height: 20px;
  width: 20px;
  margin-left: 0px;
  border-radius: 50%;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
  transition: all 0.3s;
`;
