import styled, { css } from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import lottie from 'lottie-web';

const Loading = () => {
  const loadingImg = useRef<HTMLDivElement>(null);

  const [isLottie, setIsLottie] = useState(false);
  useEffect(() => {
    if (!isLottie && loadingImg.current) {
      setIsLottie(true);
      lottie.loadAnimation({
        container: loadingImg.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: require('../../assets/lottie/loading.json'),
      });
    }
  }, []);

  return (
    <>
      <ModalContainer>
        <div style={{ width: '8rem', height: '8rem' }} ref={loadingImg} />
        <div
          style={{
            fontSize: '1.6rem',
            fontWeight: '600',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
            textAlign: 'center',
          }}
        >
          {`분류 모델 동작 중입니다...\n잠시만 기다려주세요`}
        </div>
      </ModalContainer>
    </>
  );
};

export default Loading;

const ModalContainer = styled.div`
  position: fixed;
  z-index: 11;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  @media screen and (min-width: 480px) {
    width: 432px;
  }
  @media screen and (max-width: 480px) {
    width: 90%;
  }

  padding: 2.4rem 2rem;
  padding-top: 3rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
