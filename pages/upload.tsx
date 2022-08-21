import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import Webcam from 'react-webcam';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface MyFile extends File {
  lastModified: any;
}

const UploadPage: NextPage = () => {
  const router = useRouter();

  return (
    <div>
      <WebcamCapture />
    </div>
  );
};

const WebcamCapture = () => {
  const router = useRouter();
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<MyFile | null>(null);
  const [imgFile, setImgFile] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef?.current?.getScreenshot();
    setImgSrc(imageSrc);
    const file = dataURLtoFile(imageSrc, 'upload_img');
    setImgFile(file);
    onSubmitImageFile();
  }, [webcamRef]);

  const videoConstraints = {
    width: '100vw',
    height: '100vh',
    facingMode: 'environment',
  };

  useEffect(() => {
    if (navigator.mediaDevices.getUserMedia !== null) {
      navigator.getUserMedia(
        { video: true },
        function (stream: any) {
          stream.getTracks().forEach((x: any) => x.stop());
        },
        (err: any) => console.log(err),
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

  const onSubmitImageFile = () => {
    router.push('/result');
  };
  return (
    <>
      <div>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            left: '50%',
            marginLeft: '-50%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      </div>
      <Button onClick={capture} />
      {imgSrc && <img src={imgSrc} />}
    </>
  );
};
export default UploadPage;

const Button = styled.button`
  position: fixed;
  bottom: 3rem;
  margin-left: calc(50% - 3.5rem);
  width: 7rem;
  height: 7rem;
  border-radius: 3.5rem;
  background=color: white;
`;
