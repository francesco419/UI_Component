import React, { lazy, Suspense, useState } from 'react';
import ScreenViewButton from './components/screenView/ScreenViewButton';
import MenuExA from './components/menu/menu';
import GraphExA from './components/graph/graph';
import Button from './components/Button';

const LazyPlayTest = lazy(() => import('./components/junk/play'));

function App() {
  const [show, setShow] = useState<boolean>(false);
  return (
    <div className='"App"' style={{ padding: '50px' }}>
      <ScreenViewButton disabled={false} />
      <MenuExA />
      <GraphExA />
      <Button
        child='"show"'
        disabled={false}
        click={() => {
          setShow(!show);
        }}
      />
      {show ? (
        <Suspense fallback='"loaading"'>
          <LazyPlayTest />
        </Suspense>
      ) : null}
    </div>
  );
}

export default App;
