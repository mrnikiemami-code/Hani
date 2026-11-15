"use client";
import  { useEffect, useState } from 'react';

const Cursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || typeof window === 'undefined' || typeof document === 'undefined') return;

    const e = document.querySelector<HTMLElement>('.tx-js-cursor');
    if (!e) return;

    const handleMouseMove = (event: MouseEvent) => {
      e.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    e.style.visibility = 'visible';

    const anchors = document.getElementsByTagName('a');
    const anchorArray = Array.from(anchors);

    const handleMouseOver = () => setIsHovered(true);
    const handleMouseOut = () => setIsHovered(false);

    anchorArray.forEach((item: HTMLElement) => {
      item.addEventListener('mouseover', handleMouseOver);
      item.addEventListener('mouseout', handleMouseOut);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      anchorArray.forEach((item: HTMLElement) => {
        item.removeEventListener('mouseover', handleMouseOver);
        item.removeEventListener('mouseout', handleMouseOut);
      });
    };
  }, [isClient, isHovered]);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <div
        className={`xb-cursor tx-js-cursor is-enabled ${
          isHovered ? 'is-active' : ''
        }`}
      >
        <div className="xb-cursor-wrapper">
          <div className="xb-cursor--follower xb-js-follower"></div>
        </div>
      </div>
    </>
  );
};

export default Cursor;
