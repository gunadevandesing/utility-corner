"use client";
import { useRef, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import styles from "./page.module.css";

const ImageToBaseStringConvertor = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [imageString, setImageString] = useState("");

  const uploadOpen = () => {
    (fileRef?.current as HTMLInputElement)?.click();
  };

  const convertToBaseString = () => {
    if (
      !fileRef.current ||
      !fileRef.current.files ||
      fileRef.current.files.length === 0
    ) {
      console.error("No file selected");
      alert("No file selected");
      return;
    }

    const file = fileRef.current.files[0];

    const reader = new FileReader();

    reader.onloadend = () => {
      setImageString(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const copyBaseString = () => {
    navigator.clipboard.writeText(imageString);
  };

  const downloadBaseString = () => {
    const blob = new Blob([imageString], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "baseString.txt";
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(a.href);
    document.removeChild(a);
  };

  return (
    <div className="mx-2">
      <Stack direction="horizontal" gap={3} className="my-2">
        <input
          ref={fileRef}
          hidden
          type="file"
          accept="image/jpeg, image/png"
        />
        <Button variant="primary" onClick={uploadOpen}>
          Upload File
        </Button>
        <Button variant="primary" onClick={convertToBaseString}>
          Convert to Base String
        </Button>
      </Stack>
      <Stack direction="vertical" gap={3}>
        <div>
          <h5>Base string</h5>
          <div className={styles.baseString}>{imageString}</div>
          <Stack direction="horizontal" gap={3}>
            <Button
              className="my-2"
              variant="primary"
              onClick={copyBaseString}
              disabled={!imageString}
            >
              Copy
            </Button>
            <Button
              className="my-2"
              variant="primary"
              onClick={downloadBaseString}
              disabled={!imageString}
            >
              Download
            </Button>
          </Stack>
        </div>
      </Stack>
    </div>
  );
};
export default ImageToBaseStringConvertor;
