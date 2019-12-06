import React from 'react';
import styled from 'styled-components';
import { IoMdClose } from 'react-icons/io';

function FullScreenView(props) {
  const { info, fullScreen, index } = props;
  console.log(info)
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
  const PhotoArea = styled.div`
    background-color: #000;
    margin-top: 50px;
    height: calc(100vh - 170px);
    position: relative;
    width: 100%;
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
    max-width: 100%;
    text-align: center;
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
          <Stack>
            <Item>
              <ImageCard>
                <Image src={info.images[index].imageUrl} alt={info.images[index].index} />
              </ImageCard>
            </Item>
          </Stack>
        </PhotoArea>
      </FSPhotoSlider>
    </FullScreenOverLay>
  );
}

export default FullScreenView;
