import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import Webcam from 'react-webcam';
import { useCallback, useEffect, useRef, useState } from 'react';

const UploadPage: NextPage = () => {
  const router = useRouter();

  return (
    <div>
      <div>안녕</div>
      <WebcamCapture />
    </div>
  );
};

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user',
};

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [imgFile, setImgFile] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef?.current?.getScreenshot();
    console.log(imageSrc);
    setImgSrc(imageSrc);
    const file = dataURLtoFile(imageSrc, 'upload_img');
    console.log(file);
    setImgFile(file);
  }, [webcamRef]);

  const videoConstraints = {
    width: 100,
    height: 100,
    facingMode: 'environment',
  };
  useEffect(() => {
    if (navigator.mediaDevices.getUserMedia !== null) {
      navigator.getUserMedia(
        { video: true },
        function (stream) {
          stream.getTracks().forEach((x) => x.stop());
        },
        (err) => console.log(err),
      );
    }
  }, []);

  const dataURLtoFile = (dataurl, fileName) => {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, { type: mime });
  };
  console.log(webcamRef);

  return (
    <>
      <div style={{ width: '100px', height: '100px', backgroundColor: 'gray' }}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
      </div>
      <button onClick={capture}>Capture photo</button>
      {imgSrc && <img src={imgSrc} />}
    </>
  );
};
export default UploadPage;
