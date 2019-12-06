import React from 'react';
import styled from 'styled-components';

function FullScreenView(props) {
  const { info, fullScreen } = props;
  const FullScreenOverLay = styled.div`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    z-index: 10022;
    margin-top: 0;
    display: block;
  `;
  const FSPhotoSlider = styled.div`
    display: block;
    color: white;
  `;
  const CloseButton = styled.svg`
    top: 27px;
    position: absolute;
    right: 36px;
    z-index: 3;
    height: 24px;
    width: 24px;
    fill: #fff;
    overflow: hidden;
  `;
  return (
    <FullScreenOverLay>
      <FSPhotoSlider>
        <CloseButton onClick={fullScreen}>
          <svg viewBox="0 0 24 24">
            <g gillRule="evenodd">
              <path d="M 21.105 4.134 l -1.061 -1.061 a 0.252 0.252 0 0 0 -0.354 0 l -7.601 7.602 l -7.602 -7.602 a 0.25 0.25 0 0 0 -0.353 0 l -1.061 1.06 a 0.252 0.252 0 0 0 0 0.355 l 7.602 7.6 l -7.602 7.603 a 0.25 0.25 0 0 0 0 0.353 l 1.06 1.06 a 0.25 0.25 0 0 0 0.354 0 l 7.602 -7.601 l 7.6 7.602 a 0.252 0.252 0 0 0 0.355 0 l 1.06 -1.061 a 0.25 0.25 0 0 0 0 -0.353 l -7.601 -7.602 l 7.602 -7.601 a 0.252 0.252 0 0 0 0 -0.354"/>
            </g>
          </svg>
        </CloseButton>
      </FSPhotoSlider>
    </FullScreenOverLay>
  );
}

export default FullScreenView;
