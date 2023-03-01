import styled from "styled-components";
import "./graph/graph.scss";

interface ButtonType {
  children: string;
  disabled: boolean;
  click?: any;
}

export default function Button({ children, disabled, click }: ButtonType) {
  return (
    <StyledButton disabled={disabled} onClick={click}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  width: 100px;
  height: 30px;
  border: 0;
  margin: 0 20px;
  box-shadow: -2px -2px 10px 0 #c0c0c0, 2px 2px 4px 0 #00000088;
`;
