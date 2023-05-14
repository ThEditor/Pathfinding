import { useEffect, useState } from "react";
import clsxm from "../lib/clsxm";

const dist = ([x1, y1]: [number, number], [x2, y2]: [number, number]) => {
  return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Home() {
  const [tileGridSize, setTileGridSize] = useState([0, 0]);
  const [tileGrid, setTileGrid] = useState([]);

  const updateTileGrid = () => {
    const columns = window.innerWidth / 50;
    const rows = window.innerHeight / 50;
    setTileGridSize([columns, rows]);

    const tiles = [];
    for (let i = 0; i < columns * rows; i++) {
      tiles.push(0);
    }
    setTileGrid(tiles);
  };

  useEffect(() => {
    updateTileGrid();
    const handleWindowResize = () => {
      updateTileGrid();
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div
      style={{
        width: "calc(100vw - 1px",
        height: "calc(100vh - 1px)",
        display: "grid",
        gridTemplateColumns: `repeat(${Math.floor(tileGridSize[0])}, 1fr)`,
        gridTemplateRows: `repeat(${Math.floor(tileGridSize[1])}, 1fr)`,
      }}
    >
      {tileGrid.map((v, i) => (
        <div key={i} className="outline outline-1 outline-red-500" />
      ))}
    </div>
  );
}
