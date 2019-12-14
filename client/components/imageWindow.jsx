/* eslint-disable import/extensions */
import React from 'react';
import styled from 'styled-components';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { TiArrowMaximise } from 'react-icons/ti';
import Thumbnail from './thumbnail.jsx';

function ImageWindow(props) {
  const ImageWindowDiv = styled.div`
    margin-left: 2%;
    width: 66.6%;
    max-width: 666.6px;
    min-width: 600px;
    height: 511px;
    color: #333;
    display: block;
  `;
  const MediaBrowser = styled.div`
    position: relative:
    width: 666.6px;
  `;
  const PhotoArea = styled.div`
    position: relative;
    height: 441px;
    width: 100%;
    background: #333;
  `;
  const NavPrev = styled.div`
    color: #fff;
    transition: opacity .25s linear;
    opacity: 0;
    height: 100%;
    width: 180px;
    position: absolute;
    cursor: pointer;
    z-index: 2;
    top: 0;
    vertical-align: baseline;
    display: block;
    ${MediaBrowser}:hover & {
      opacity: 1;
    }
  `;
  const NavNext = styled.div`
    color: #fff
    right: 0;
    transition: opacity .25s linear;
    opacity: 0;
    height: 100%;
    width: 180px;
    position: absolute;
    cursor: pointer;
    z-index: 2;
    top: 0;
    vertical-align: baseline;
    display: block;
    ${MediaBrowser}:hover & {
      opacity: 1;
    }
  `;
  const ImageCard = styled.span`
    height: 441px;
    background-color: #333;
    position: relative;
  `;
  const Image = styled.img`
    width: 100%;
    max-width: 666.6px;
    height: 441px;
    position: relative;
  `;
  const ThumbnailDrawer = styled.div`
    width: 100%
    height: 60px;
    display: table;
    background-color: #767676;
  `;
  const PagerViewPort = styled.div`
    display: table-cell;
    position: relative;
    overflow: hidden;
  `;
  const ThumbnailContainer = styled.div`
    position: absolute;
    width: 100%;
    top: 0;
  `;
  const PagerControl = styled.div`
    background-color: #585858;
    cursor: pointer;
    width: 28px;
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    color: #fff;
  `;
  const NavPrevLocation = styled.div`
    left: 10px;
    height: 44px;
    width: 44px;
    position: absolute;
    top: calc(50% - 18px);
    overflow: hidden;
    cursor: pointer;
  `;
  const NavNextLocation = styled.div`
    right: 25px;
    height: 44px;
    width: 44px;
    position: absolute;
    top: calc(50% - 18px);
    overflow: hidden;
    cursor: pointer;
  `;
  const PagerFade = styled.div`
    opacity: 0.5;
    ${PagerControl}:hover & {
      opacity: 1;
    }
  `;
  const Open = styled.div`
    width: 38px;
    height: 38px;
    top: 10px;
    right: 10px;
    position: absolute;
    z-index: 3;
    vertical-align: baseline;
    display: block;
  `;
  const Maximize = styled.div`
    transition: opacity .25s linear;
    opacity: 0
    height: 24px;
    width: 24px;
    position: absolute;
    top: 7px;
    right: 7px;
    vertical-align: baseline;
    display: block;
    color: #fff;
    ${MediaBrowser}:hover & {
      opacity: 1;
    }
  `;
  const {
    changeStatus,
    info,
    index,
    previousImage,
    nextImage,
    handleClick,
    nextThumbnail,
    previousThumbnail,
    start,
    end,
  } = props;
  return (
    <ImageWindowDiv>
      <MediaBrowser>
        <PhotoArea>
          <Open>
            <Maximize onClick={changeStatus}>
              <TiArrowMaximise size={30} />
            </Maximize>
          </Open>
          <NavPrev onClick={previousImage}>
            <NavPrevLocation>
              <IoIosArrowBack size={55} />
            </NavPrevLocation>
          </NavPrev>
          <div>
            <ImageCard>
              <Image onClick={changeStatus} src={info.images[index].imageUrl} alt="" />
            </ImageCard>
          </div>
          <NavNext onClick={nextImage}>
            <NavNextLocation>
              <IoIosArrowForward size={55} />
            </NavNextLocation>
          </NavNext>
        </PhotoArea>
        <ThumbnailDrawer>
          <PagerControl>
            <PagerFade onClick={previousThumbnail}>
              <IoIosArrowBack size={20} />
            </PagerFade>
          </PagerControl>
          <PagerViewPort>
            <span>
              <ThumbnailContainer>
                <Thumbnail
                  handleClick={handleClick}
                  images={info.images.slice(start, end)}
                />
              </ThumbnailContainer>
            </span>
          </PagerViewPort>
          <PagerControl>
            <PagerFade onClick={nextThumbnail} type="button">
              <IoIosArrowForward size={20} />
            </PagerFade>
          </PagerControl>
        </ThumbnailDrawer>
      </MediaBrowser>
    </ImageWindowDiv>
  );
}

export default ImageWindow;
