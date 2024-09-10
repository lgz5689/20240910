"use client";

import { useState } from "react";
import { pdfjs, Document } from "react-pdf";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { degrees, PDFDocument } from "pdf-lib";

import Title from "./Title";
import PageItem from "./PageItem";
import UploadCard from "./UploadCard";
import Tools from "./Tools";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const MAX_WIDTH = 500;
const MIN_WIDTH = 100;

type PDFFile = string | File | null;

export default function Sample() {
  const [file, setFile] = useState<PDFFile>();
  const [numPages, setNumPages] = useState<number>();
  const [containerWidth, setContainerWidth] = useState<number>(200);
  const [rotationAngles, setRotationAngles] = useState<number[]>([]);

  const zoomPage = (size: number) => {
    if (
      containerWidth + size > MAX_WIDTH ||
      containerWidth + size < MIN_WIDTH
    ) {
      return;
    }
    setContainerWidth(containerWidth + size);
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    const nextFile = files?.[0];

    if (nextFile) {
      setFile(nextFile);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: PDFDocumentProxy) => {
    setNumPages(numPages);
    setRotationAngles(Array(numPages).fill(0));
  };

  const removeAllHandler = () => {
    setFile(null);
  };

  const rotateAllPage = () => {
    setRotationAngles((prev) => {
      const newAngles = prev.map((value) => {
        return (value + 90) % 360;
      });
      return newAngles;
    });
  };

  const rotatePage = (pageIndex: number) => {
    setRotationAngles((prev) => {
      const newAngles = [...prev];
      newAngles[pageIndex] = (newAngles[pageIndex] || 0) + 90;
      return newAngles;
    });
  };

  async function downloadRotatedPDF() {
    if (!file || !(file instanceof File)) {
      console.error("No valid file provided.");
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = async function () {
      const existingPdfBytes = fileReader.result as ArrayBuffer;
      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      for (let i = 0; i < pdfDoc.getPageCount(); i++) {
        const page = pdfDoc.getPage(i);
        const currentRotation = page.getRotation();
        const angle = rotationAngles[i] || 0;

        if (angle !== 0) {
          page.setRotation(degrees(currentRotation.angle + angle));
        }
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${file.name.replace(/\.[^/.]+$/, "")}_rotated.pdf`;
      link.click();
    };

    fileReader.readAsArrayBuffer(file);
  }

  return (
    <main className="bg-[#f7f5ee] h-full text-black">
      <div className="container mx-auto py-20 space-y-5">
        <Title />
        {!file && <UploadCard onFileChange={onFileChange} />}
        {file && (
          <div className="flex flex-col items-center justify-center">
            <Tools
              isMax={containerWidth === MAX_WIDTH}
              isMin={containerWidth === MIN_WIDTH}
              rotateAllPage={rotateAllPage}
              removeAllHandler={removeAllHandler}
              zoomPage={zoomPage}
            />
            <div className="flex flex-row items-center justify-center">
              <Document
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
                options={options}
              >
                {Array.from(new Array(numPages), (_, index) => (
                  <PageItem
                    key={`page_${index + 1}`}
                    index={index}
                    containerWidth={containerWidth}
                    rotate={rotationAngles[index]}
                    rotatePage={rotatePage}
                  />
                ))}
              </Document>
            </div>
            <button
              className="text-white bg-orange-500 py-2 px-3 rounded mt-4"
              onClick={downloadRotatedPDF}
            >
              Download
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
