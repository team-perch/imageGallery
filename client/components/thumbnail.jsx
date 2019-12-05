import React from 'react';
import styled from 'styled-components';

function Thumbnail(props) {
  const Vieport = styled.div`
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
  opacity: 1;
    width: 70px;
    height: 50px;
  `;
  return(
    <div>
      {props.images.map((image,) => (
        <Vieport>
          <PhotoThumbnail>
            <ImageThumbnail onClick={props.handleClick} src={image.imageUrl} alt={image.index} />
          </PhotoThumbnail>
        </Vieport>
      ))}
    </div>
  );
}

export default Thumbnail;
