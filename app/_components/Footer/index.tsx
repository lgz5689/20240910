import Image from "next/image";
import { FOOTER_ITEM } from "./data";

const Footer = () => {
  return (
    <footer className="bg-white max-w-7xl mx-auto mt-16 p-8  border-t flex flex-col justify-between xl:flex-row">
      <div className=" max-w-64">
        <Image src="/favicon.ico" alt="icon" width={28} height={28} />
        <div className="text-sm leading-6 text-gray-500 mt-4">
          Chat with any PDF: ask questions, get summaries, find information, and
          more.
        </div>
      </div>
      {FOOTER_ITEM.map((value) => {
        return (
          <div key={value.title} className="mt-16 xl:mt-0">
            <h3 className="text-sm font-semibold leading-6 text-gray-900 mb-2">
              {value.title}
            </h3>
            <div className="flex flex-col">
              {value.list.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  className="text-sm leading-6 text-gray-500 hover:text-gray-900 mt-4"
                >
                  {item.title}
                </a>
              ))}
            </div>
          </div>
        );
      })}
    </footer>
  );
};

export default Footer;
