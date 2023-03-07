import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Compo from './pages/components';
import Main from './pages/Main';
import Lodashy from './components/lodash/lodash';

const LazyPlayTest = lazy(() => import('./components/junk/play'));

function App() {
  const [show, setShow] = useState<boolean>(false);
  return (
    <BrowserRouter>
      <React.Suspense>
        <Routes>
          <Route path={`/Compo`} element={<Compo />} />
          <Route path={`/Lodash`} element={<Lodashy />} />
          <Route path={`/`} element={<Main />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;
