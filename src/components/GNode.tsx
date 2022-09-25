import { useState } from "react";
import clsxm from "../lib/clsxm";

export enum GNodeType {
  VOID = "white",
  START = "red",
  // WALL = "black",
  STOP = "green"
}

export interface GNodeProps {
    x: number;
    y: number;
    click: (type: GNodeType) => unknown;
}

export default function GNode({ x, y, click }: GNodeProps) {
  const [ type, setType ] = useState(GNodeType.VOID);
  
  const clicked = () => {
    console.log(`X: ${x}, Y: ${y}`);
    // setType(type == GNodeType.VOID ? GNodeType.START :
    //   type == GNodeType.START ? GNodeType.WALL :
    //   type == GNodeType.WALL ? GNodeType.STOP : GNodeType.VOID);
    const newType = type == GNodeType.VOID ? GNodeType.START :
    type == GNodeType.START ? GNodeType.STOP : GNodeType.VOID
    setType(newType);
    click(newType);
  };
  
  return (
    <div id={`gnode-${x}-${y}`} onClick={clicked} className={'border-black border-2 w-5 h-5'}
      style={{
        backgroundColor: type
      }} />
  );
}
