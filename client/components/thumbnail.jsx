import React from 'react';
import styled from 'styled-components';

function Thumbnail(props) {
  const { images, handleClick } = props;
  const Viewport = styled.div`
    display: inline-block;
    vertical-align: middle;
  `;
  const PhotoThumbnail = styled.div`
    box-sizing: border-box;
    border: 1px solid #767676;
    background-color: #333;
    width: 70px;
    height: 50px;
    position: relative;
    margin: 5px 0 0 5px;
    display: flex;
    align-items: center;
  `;
  const ImageThumbnail = styled.img`
    opacity: 0.5;
    width: 70px;
    height: 50px;
    &:hover {
      opacity: 1;
      border: 1px solid #fff;
    }
  `;
  return (
    <div>
      {images.map((image, key) => (
        // eslint-disable-next-line react/no-array-index-key
        <Viewport key={key}>
          <PhotoThumbnail>
            <ImageThumbnail onClick={handleClick} src={image.imageUrl} alt={image.index} />
          </PhotoThumbnail>
        </Viewport>
      ))}
    </div>
  );
}

export default Thumbnail;
