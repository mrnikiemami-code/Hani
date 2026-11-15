"use client";
import type { CSSProperties } from "react";

/** Text laid out around a circle (the "Play Video" button ring). */
const CircularText = ({ text }: { text: string }) => {
  const characters = text.split("");
  const angle = 360 / characters.length;

  return (
    <p className="button-text">
      {characters.map((char, index) => (
        <span key={index} style={{ "--index": index, "--angle": angle } as CSSProperties}>
          {char}
        </span>
      ))}
    </p>
  );
};

export default CircularText;
