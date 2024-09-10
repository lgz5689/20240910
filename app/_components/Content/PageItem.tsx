import { FC } from "react";
import { Page } from "react-pdf";

type PageItemProps = {
  index: number;
  containerWidth: number;
  rotate: number;
  rotatePage: (index: number) => void;
};

const PageItem: FC<PageItemProps> = ({
  index,
  containerWidth,
  rotate,
  rotatePage,
}) => {
  return (
    <div
      className=" bg-white relative m-3"
      style={{ maxWidth: `${containerWidth}px` }}
    >
      <div
        className="bg-orange-500 rounded-full p-1 fill-white cursor-pointer absolute z-10 top-1 right-1"
        onClick={() => rotatePage(index)}
      >
        <svg
          className="w-3"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z"></path>
        </svg>
      </div>
      <Page pageNumber={index + 1} width={containerWidth} rotate={rotate} />
      <div className="text-xs text-gray-500 italic text-center mb-1">
        {index + 1}
      </div>
    </div>
  );
};

export default PageItem;
