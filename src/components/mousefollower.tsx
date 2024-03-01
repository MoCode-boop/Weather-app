import React, { useEffect } from "react";

interface MousefollowerProps {
  cursorRef: React.RefObject<HTMLDivElement>;
}

const Mousefollower: React.FC<MousefollowerProps> = ({ cursorRef }) => {
  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX - 20}px`;
        cursorRef.current.style.top = `${e.clientY - 15}px`;
      }
    };
    document.addEventListener("mousemove", updatePosition);

    return () => document.removeEventListener("mousemove", updatePosition);
  }, [cursorRef]);

  return null;
};

export default Mousefollower;
