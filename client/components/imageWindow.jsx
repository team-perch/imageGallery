import React from 'react';
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
      const start = this.state.start + 1;
      const end = this.state.end + 1;
      this.setState({ start, end });
    }
  }

  previousThumbnail() {
    if (this.state.start !== 0) {
      const start = this.state.start - 1;
      const end = this.state.end - 1;
      this.setState({ start, end });
    }
  }

  render() {
    return (
      <div className="imageWindow">
        <span>
          <button onClick={this.previousImage} type="button">
            {'<'}
          </button>
        </span>
        <span>
          <img src={this.props.info.images[this.state.index].imageUrl} alt="" style={{ width: '600px', height: '500px' }} />
        </span>
        <span>
          <button onClick={this.nextImage} type="button">
            {'>'}
          </button>
        </span>
        <div>
        <span>
          <button onClick={this.previousThumbnail} type="button">
            {'<'}
          </button>
        </span>
          <Thumbnail images={this.props.info.images.slice(this.state.start, this.state.end)} />
          <span>
          <button onClick={this.nextThumbnail} type="button">
            {'>'}
          </button>
        </span>
        </div>
      </div>
    );
  }
}

export default ImageWindow;
