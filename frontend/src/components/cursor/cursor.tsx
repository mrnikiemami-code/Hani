"use client";
import { useEffect, useRef, useState } from 'react';

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    cursor.style.visibility = 'visible';

    const onMove = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    const onOver = (e: MouseEvent) => setIsHovered(!!(e.target as Element | null)?.closest?.('a'));

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
    };
  }, []);

  return (
    <div ref={cursorRef} className={`xb-cursor tx-js-cursor is-enabled ${isHovered ? 'is-active' : ''}`}>
      <div className="xb-cursor-wrapper">
        <div className="xb-cursor--follower xb-js-follower"></div>
      </div>
    </div>
  );
};

export default Cursor;
