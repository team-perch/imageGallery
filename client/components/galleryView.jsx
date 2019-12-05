import React from 'react';
import styled from 'styled-components';
import GalleryHeader from './galleryHeader.jsx';
import GalleryContent from './galleryContent.jsx';

function GalleryView(props) {
  const DialogContainer = styled.div`
    position: relative;
    height: auto;
    left: 0;
    bottom: 0;
    z-index: 10021;
    background: #fff;
    display: flex;
    flex-direction: column;
    width: 100%;
  `;

  return (
    <DialogContainer>
      <GalleryHeader info={props.info} changeStatus={props.changeStatus} />
      <GalleryContent info={props.info} />
    </DialogContainer>
  );
}

export default GalleryView;
