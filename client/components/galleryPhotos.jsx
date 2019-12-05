import React from 'react';
import styled from 'styled-components';

function GalleryPhotos(props) {
  const Item = styled.div`
    position: relative;
    margin: 22px auto;
    width: 100%;
    cursor: pointer;
  `;
  const ImageCard = styled.div`
    overflow: auto;
    width: 100%;
    background-color: #333;
    position: relative;
  `;
  const Image = styled.img`
    width: 100%;
    display: block;
  `;
  return (
    <Item>
      <ImageCard>
        <Image src={props.image.imageUrl} alt={props.image.index} />
      </ImageCard>
    </Item>
  );
}

export default GalleryPhotos;
