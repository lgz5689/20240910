import Image from "next/image";
import { FC } from "react";

type UploadCardProps = {
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const UploadCard: FC<UploadCardProps> = ({ onFileChange }) => {
  return (
    <div className="w-full flex justify-center">
      <div className="h-[350px] relative text-center w-[275px]">
        <input
          className="cursor-pointer hidden"
          type="file"
          id="input-file-upload"
          accept=".pdf"
          onChange={onFileChange}
        />
        <label
          className="h-full flex items-center justify-center border rounded transition-all bg-white border-dashed border-stone-300"
          htmlFor="input-file-upload"
        >
          <div className="cursor-pointer flex flex-col items-center space-y-3">
            <Image src="/images/upload.svg" alt="pdf" width={32} height={32} />
            <p className="pointer-events-none font-medium text-sm leading-6 pointer opacity-75">
              Click to upload or drag and drop
            </p>
          </div>
        </label>
      </div>
    </div>
  );
};

export default UploadCard;
