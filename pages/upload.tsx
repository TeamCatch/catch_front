import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import Webcam from 'react-webcam';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { postApi } from '../lib/api';
import { Loading } from '../src/components/common';

interface MyFile extends File {
  lastModified: any;
}

interface ImagePorps {
  readonly src: string;
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
  const [imgSrc, setImgSrc] = useState<string | null | undefined>(null);
  const [imgFile, setImgFile] = useState<MyFile | null>(null);
  const [isPC, setIsPC] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  let filter =
    'win16|win32|win64|wince|mac|macintel|macppc|mac68k|linux i686|linux armv7l|hp-ux|sunos';

  // 접속 기기가 pc인지 확인
  useEffect(() => {
    if (navigator.platform) {
      if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
        setIsPC(false);
      }
    }
  }, []);

  const capture = useCallback(() => {
    setIsLoading(true);
    const imageSrc = webcamRef?.current?.getScreenshot();
    if (imageSrc) {
      setImgSrc(imageSrc);
      const file = dataURLtoFile(imageSrc, 'upload_img');
      setImgFile(file);
      onSubmitImageFile(file);
    }
  }, [webcamRef]);

  const videoConstraints = {
    width: 2000,
    height: 2000,
    facingMode: 'environment',
  };

  useEffect(() => {
    let navi: any;
    navi = navigator;
    if (navi && navi.mediaDevices.getUserMedia !== null && navi.getUserMedia) {
      navi.getUserMedia(
        { video: true },
        function (stream: any) {
          stream.getTracks().forEach((x: any) => x.stop());
        },
        (err: any) => console.log(err),
      );
    }
  }, []);

  const dataURLtoFile = (dataurl: string, fileName: string) => {
    let arr: any[];
    arr = dataurl.split(',');
    let mime = arr[0]?.match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, { type: mime });
  };

  const onSubmitImageFile = async (imgFile: File) => {
    const result = await postApi.postImageFile(imgFile);
    router.push(`/result/?imageID=${result.imageId}`);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
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
        </>
      )}
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
