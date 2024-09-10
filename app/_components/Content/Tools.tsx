import Image from "next/image";
import { FC } from "react";

type ToolsProps = {
  isMax:boolean,
  isMin:boolean,
  rotateAllPage: () => void;
  removeAllHandler: () => void;
  zoomPage: (zoom: number) => void;
};

const Tools: FC<ToolsProps> = ({
  isMax,
  isMin,
  rotateAllPage,
  removeAllHandler,
  zoomPage,
}) => {
  return (
    <div className="flex flex-row items-center justify-center mb-4">
      <button
        className="text-white bg-orange-500 py-2 px-3 rounded mx-1"
        onClick={rotateAllPage}
      >
        Rotate all
      </button>
      <button
        className="text-white bg-slate-600 py-2 px-3 rounded mx-1"
        onClick={removeAllHandler}
      >
        Remove PDF
      </button>
      <button
        className="bg-white rounded-full p-2 shadow mx-1  disabled:cursor-not-allowed"
        disabled={isMax}
        onClick={() => zoomPage(100)}
      >
        <Image
          src="/images/magnifying.svg"
          alt="magnifying"
          width={20}
          height={20}
        />
      </button>
      <button
        className="bg-white rounded-full p-2 shadow mx-1 disabled:cursor-not-allowed"
        disabled={isMin}
        onClick={() => zoomPage(-100)}
      >
        <Image src="/images/lessen.svg" alt="lessen" width={20} height={20} />
      </button>
    </div>
  );
};

export default Tools;
