import _ from 'lodash';
import React, { useRef, useState } from 'react';

export default function Lodashy() {
  const [test, setTest] = useState<number>(0);
  var done = _.before(3, function () {
    setTest((test) => test + 1);
  });

  return (
    <div>
      <h2>{test}</h2>
      <button onClick={done}>세번</button>
    </div>
  );
}
