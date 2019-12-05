import React from 'react';
import styled from 'styled-components';
import Thumbnail from './thumbnail.jsx';

class ImageWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      start: 0,
      end: 8,
    };
    this.previousImage = this.previousImage.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.nextThumbnail = this.nextThumbnail.bind(this);
    this.previousThumbnail = this.previousThumbnail.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  previousImage() {
    if (this.state.index !== 0) {
      const index = this.state.index - 1;
      this.setState({ index });
    }
  }

  nextImage() {
    if (this.state.index < this.props.info.images.length - 1) {
      const index = this.state.index + 1;
      this.setState({ index });
    }
  }

  nextThumbnail() {
    if (this.state.end < this.props.info.images.length) {
      const start = this.state.start + 8;
      const end = this.state.end + 8;
      this.setState({ start, end });
    }
  }

  previousThumbnail() {
    if (this.state.start !== 0) {
      const start = this.state.start - 8;
      const end = this.state.end - 8;
      this.setState({ start, end });
    }
  }

  handleClick(e) {
    const index = parseInt(e.target.alt);
    this.setState({ index });
  }

  render() {
    const ImageWindow = styled.div`
      width: 66.6%;
      max-width: 666.6px;
      min-width: 600px;
      height: 511px;
      color: #333;
      display: block;
    `;
    const MediaBrowser = styled.div`
      position: relative:
      width: 665px;
    `;
    const PhotoArea = styled.div`
      position: relative;
      height: 441px;
      width: 100%;
      background: #333;
    `;
    const NavPrev = styled.button`
      transition: opacity .25s linear;
      opacity: 0;
      height: 100%;
      width: 180px;
      position: absolute;
      cursor: pointer;
      z-index: 2;
      top: 0;
    `;
    const NavNext = styled.div`
      right: 0;
      transition: opacity .25s linear;
      opacity: 0;
      height: 100%;
      width: 180px;
      position: absolute;
      cursor: pointer;
      z-index: 2;
      top: 0;
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
    `;
    return (
      <ImageWindow>
        <MediaBrowser>
          <PhotoArea>
            <span>
              <NavPrev onClick={this.previousImage} type="button">
                {'<'}
              </NavPrev>
            </span>
            <div>
              <ImageCard>
                <Image src={this.props.info.images[this.state.index].imageUrl} alt="" />
              </ImageCard>
            </div>
            <span>
              <NavNext onClick={this.nextImage} type="button">
                {'>'}
              </NavNext>
            </span>
          </PhotoArea>
          <ThumbnailDrawer>
            <PagerControl>
              <div onClick={this.previousThumbnail} type="button">
                {'<'}
              </div>
            </PagerControl>
            <PagerViewPort>
              <span>
                <ThumbnailContainer>
                  <Thumbnail handleClick={this.handleClick} images={this.props.info.images.slice(this.state.start, this.state.end)} />
                </ThumbnailContainer>
              </span>
            </PagerViewPort>
            <PagerControl>
              <div onClick={this.nextThumbnail} type="button">
                {'>'}
              </div>
            </PagerControl>
          </ThumbnailDrawer>
        </MediaBrowser>
      </ImageWindow>
    );
  }
}

export default ImageWindow;
