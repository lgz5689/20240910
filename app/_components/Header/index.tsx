import Image from "next/image";

const Header = () => {
  return (
    <header className="p-5 bg-white flex flex-row justify-between">
      <div className="flex flex-row">
        <Image src="/favicon.ico" alt="icon" width={28} height={28} />
        <h1 className="text-xl ml-4">Rotate PDF Sample</h1>
      </div>
      <div className="flex flex-row justify-center items-center">
        <a className="hover:underline mx-2" href="">
          Get started →
        </a>
      </div>
    </header>
  );
};

export default Header;
