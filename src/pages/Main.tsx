import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Main() {
  const nav = useNavigate();
  return (
    <div>
      <StyledNav>
        <div style={{ margin: '0 auto', width: 'fit-content' }}>
          <Button
            disabled={false}
            child='Compo Page'
            click={() => nav('Compo')}
          ></Button>
          <Button
            disabled={false}
            child='Lodash Page'
            click={() => nav('Lodash')}
          ></Button>
        </div>
      </StyledNav>
    </div>
  );
}

const StyledNav = styled.nav`
  margin: 30px 0;
`;
