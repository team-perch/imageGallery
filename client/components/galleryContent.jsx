import React from 'react';
import styled from 'styled-components';
import GalleryPhotos from './galleryPhotos.jsx';

function GalleryContent(props) {
  const DialogContent = styled.div`
    position: relative;
    display: block;
    flex: 1;
  `;
  const PaddedDiv = styled.div`
    padding-top: 60px;
    padding-bottom: 60px;
  `;
  const PhotoList = styled.div`
    width: 100vw;
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    padding: 0 4px;
  `;
  const CenterRow = styled.div`
    margin: 0 auto!important;
    width: 95.84%;
    padding-right: 0;
    padding-left: 0;
    box-sizing: border-box;
    display: block;
    zoom: 1;
  `;
  const PhotoColumn = styled.div`
    display: block;
    float: left;
    margin-right: .98039216%;
    margin-left: .98039216%;
    box-sizing: border-box;
    width: 48.03921569%;
  `;
  return (
    <DialogContent>
      <PaddedDiv>
        <div>
          <PhotoList>
            <CenterRow>
              <PhotoColumn>
                {props.images.slice(0, Math.floor(props.images.length / 2)).map((image) => (
                  <GalleryPhotos image={image} />))}
              </PhotoColumn>
              <PhotoColumn>
                {props.images.slice(Math.floor(props.images.length / 2)).map((image) => (
                  <GalleryPhotos image={image} />))}
              </PhotoColumn>
            </CenterRow>
          </PhotoList>
        </div>
      </PaddedDiv>
    </DialogContent>
  );
}

export default GalleryContent;
