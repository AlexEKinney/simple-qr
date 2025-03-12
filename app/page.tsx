"use client";
import QRCode from "react-qr-code";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState(""); // State for the text input
  
  const handleDownload = () => {
    // get the SVG element from the DOM (it WILL exist, as there is a QR code, even with no text)
    const svgElement = document.querySelector("svg");
    if (!svgElement) return;
    
    // create a blob from the SVG
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    
    // create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "qrcode.svg";
    document.body.appendChild(link);
    link.click();
    
    // clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full max-w-xs"
          placeholder="Enter text for QR code"
        />
        <div className="bg-white p-4 rounded-md shadow-md center flex items-center justify-center" style={{justifyContent: "center", alignItems: "center", display: "flex"}}>
          <QRCode value={text} size={160} />
          {/* result of the QR code */}
        </div>
        <button
          onClick={handleDownload}
          disabled={!text}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Download QR Code
        </button> 
        {/* downloads as SVG TODO: add PNG option */}
      </main>
    </div>
  );
}