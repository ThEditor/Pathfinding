import { useRouter } from "next/router";
import { useState } from "react";
import GNode, { GNodeType } from "../components/GNode";

const dist = ([x1,y1]: [number, number], [x2,y2]: [number, number]) => {
  return Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
}

const sleep = (ms: number) => new Promise(
  resolve => setTimeout(resolve, ms)
);

export default function Home() {
  const [start, setStart] = useState([null,null] as [number, number]);
  const [stop, setStop] = useState([null,null] as [number, number]);
  const router = useRouter();
  // const [walls, setWalls] = useState([]);

  const startAlgo = () => {
    algo(start[0], start[1]);
  };

  const algo = async (x: number, y: number) => {

    // go all 8 directions, check distance, take lowest
    const directions = [[0,1], [1,1], [1,0], [1, -1], [0,-1], [-1,-1], [-1,0], [-1,1]];
    let least: [number, number, number] = [dist([x, y], stop), x, y];

    for (const direction of directions) {
      const nowX = x + direction[0];
      const nowY = y + direction[1];
      const nowDist = dist([nowX, nowY], stop);
      if (nowX !== start[0] || nowY !== start[1])
        mark(nowX, nowY, "cyan");
      if (nowDist < least[0]) least = [nowDist, nowX, nowY];
    }

    console.log(`Moved to ${least[1]}, ${least[2]} at dist ${least[0]}`)

    if (least[1] === stop[0] && least[2] === stop[1]) {
      mark(least[1], least[2], "blue");
      console.log(`Reached solution at ${least[1]}, ${least[2]}`);
    } else {
      await sleep(300);
      algo(least[1], least[2]);
    }
  }

  const mark = (x: number, y: number, color: string) => {
    document.getElementById(`gnode-${x}-${y}`).style.backgroundColor = color;
  }

  const clearBoard = () => {
    router.reload();
  };

  const nodeClicked = (x: number, y: number, type: GNodeType) => {
    if (type == GNodeType.START && start[0] === null) setStart([x,y]);
    if (type == GNodeType.STOP && stop[0] === null) setStop([x,y]);
    // if (type == GNodeType.WALL) setWalls([ [x,y], ...walls])
  }

  const arr = [];
  for (let i = 0; i < 20; i++) {
    let arr2 = [];
    for (let j = 0; j < 20; j++) {
      arr2.push(0);
    }
    arr.push(arr2);
  }

  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="flex flex-row gap-2">
          {arr.map((v, i) => (
            <div key={i} className="flex flex-col gap-2">
              {v.map((_o, j) => (
                <GNode x={i} y={j} click={(type) => nodeClicked(i, j, type)} key={j} />
              ))}
            </div>
          ))}
        </div>
        <button onClick={startAlgo} className="ml-5 p-1 border-2 border-red-800">Start Algo</button>
        <button onClick={clearBoard} className="ml-5 p-1 border-2 border-red-800">Clear Board</button>
      </div>
    </div>
  );
}
