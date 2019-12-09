/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import styled from 'styled-components';
import { IoMdClose, IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

function FullScreenView(props) {
  const {
    info, fullScreen, index, nextImage, previousImage,
  } = props;
  const FullScreenOverLay = styled.div`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    z-index: 10022;
    margin-top: 0;
    vertical-align: baseline;
    display: block;
  `;
  const FSPhotoSlider = styled.div`
    vertical-align: baseline;
    display: block;
  `;
  const CloseButton = styled.svg`
    color: #fff;
    top: 27px;
    position: absolute;
    right: 36px;
    z-index: 3;
    height: 24px;
    width: 24px;
    fill: #fff;
    overflow: hidden;
  `;
  const PhotoArea = styled.div`
    background-color: #000;
    margin-top: 50px;
    height: calc(100vh - 170px);
    position: relative;
    max-width: 100%;
    vertical-align: baseline;
    display: block;
  `;
  const Stack = styled.div`
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    display: block;
  `;
  const Item = styled.span`
    opacity: 1;
    position: absolute;
    transition: opacity .2s ease-out 0s;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  const ImageCard = styled.div`
    background-color: #000;
    height: auto;
    text-align: center;
    position: relative;
    display: block;
  `;
  const Image = styled.img`
    max-height: calc(100vh -170px);
    max-width: 76%;
    text-align: center;
  `;
  const NavPrev = styled.div`
    color: #fff;
    height: 100%;
    width: 180px;
    position: absolute;
    cursor: pointer;
    z-index: 2;
    top: 0;
    vertical-align: baseline;
    display: block;
  `;
  const NavPrevLocation = styled.div`
    left: 36px;
    height: 44px;
    width: 44px;
    position: absolute;
    top: calc(50% - 18px);
    overflow: hidden;
    cursor: pointer;
  `;
  const NavNextLocation = styled.div`
    right: 48px;
    height: 44px;
    width: 44px;
    position: absolute;
    top: calc(50% - 18px);
    overflow: hidden;
    cursor: pointer;
  `;
  const NavNext = styled.div`
    color: #fff;
    right: 0;
    height: 100%;
    width: 180px;
    position: absolute;
    cursor: pointer;
    z-index: 2;
    top: 0;
    vertical-align: baseline;
    display: block;
  `;
  const IndexBox = styled.div`
    bottom: -42px;
    right: 48%;
    padding 5px 12px;
    position: absolute;
    color: #fff;
    background-color: rgba(0,0,0,.7);
    z-index: 5;
    cursor: default;
    font-size: 0.75rem;
    font-family: Libre Franklin;
  `;

  return (
    <FullScreenOverLay>
      <FSPhotoSlider>
        <CloseButton onClick={fullScreen}>
          <svg viewBox="0 0 24 24">
            <g fillRule="evenodd">
              <IoMdClose size={30} />
            </g>
          </svg>
        </CloseButton>
        <PhotoArea>
          <NavPrev onClick={previousImage}>
            <NavPrevLocation>
              <IoIosArrowBack size={55} />
            </NavPrevLocation>
          </NavPrev>
          <Stack>
            <Item>
              <ImageCard>
                <Image src={info.images[index].imageUrl} alt={info.images[index].index} />
              </ImageCard>
            </Item>
          </Stack>
          <NavNext onClick={nextImage}>
            <NavNextLocation>
              <IoIosArrowForward size={55} />
            </NavNextLocation>
          </NavNext>
          <IndexBox>
            <span>
              {index + 1} of {info.images.length}
            </span>
          </IndexBox>
        </PhotoArea>
      </FSPhotoSlider>
    </FullScreenOverLay>
  );
}

export default FullScreenView;
