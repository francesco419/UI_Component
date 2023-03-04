import React, { useRef, useEffect, useState } from 'react';
import { ReactComponent as Home } from '../../assets/MENUEXA/home.svg';
import { ReactComponent as Profile } from '../../assets/MENUEXA/profile.svg';
import { ReactComponent as Setting } from '../../assets/MENUEXA/setting.svg';
import { ReactComponent as Contact } from '../../assets/MENUEXA/contact.svg';
import './menu.scss';

export default function MenuExA() {
  const [letter, setLetter] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current !== null) {
      ref.current.style.left = `${12}px`;
    }
  }, []);

  const svg = [<Home />, <Profile />, <Setting />, <Contact />];

  const clickMe = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const { current } = ref;
    const alt = e.currentTarget;
    let num: number;
    if (typeof alt.dataset.badges === 'string') {
      num = parseInt(alt.dataset.badges, 10);
      setLetter(num);
    }
    const doc = document.getElementById('circle');
    if (current !== null) {
      if (doc !== null) {
        doc.classList.add('pop');
        current.style.left = `${alt.offsetLeft - 80}px`;
        setTimeout(() => {
          doc.classList.remove('pop');
        }, 500);
      }
    }
  };

  return (
    <div className='one'>
      <div className='two'>
        <div ref={ref} className='three'>
          <div className='four'>
            <div id='circle' className='five'>
              {svg[letter]}
            </div>
          </div>
        </div>
      </div>
      <div className='menu'>
        <button type='button' data-badges={0} onClick={(e) => clickMe(e)}>
          {svg[0]}
        </button>
        <button type='button' data-badges={1} onClick={(e) => clickMe(e)}>
          {svg[1]}
        </button>
        <button type='button' data-badges={2} onClick={(e) => clickMe(e)}>
          {svg[2]}
        </button>
        <button type='button' data-badges={3} onClick={(e) => clickMe(e)}>
          {svg[3]}
        </button>
      </div>
    </div>
  );
}
