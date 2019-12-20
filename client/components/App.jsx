/* eslint-disable max-len */
/* eslint-disable import/extensions */
import React from 'react';
import $ from 'jquery';
import ImageWindow from './imageWindow.jsx';
import GalleryView from './galleryView.jsx';
import FullScreenView from './fullScreenView.jsx';

// const url = 'http://13.56.43.120';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'imageWindow',
      info: {
        property: {
          address: '',
          baths: '',
          beds: '',
        },
        images: [{ imageUrl: '' }],
      },
      indexMain: 0,
      indexFull: 0,
      start: 0,
      end: 8,
    };
    this.getInfo = this.getInfo.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.fullScreen = this.fullScreen.bind(this);
    this.nextImageFull = this.nextImageFull.bind(this);
    this.previousImageFull = this.previousImageFull.bind(this);
    this.previousImage = this.previousImage.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.nextThumbnail = this.nextThumbnail.bind(this);
    this.previousThumbnail = this.previousThumbnail.bind(this);
  }

  componentDidMount() {
    const { id } = this.props;
    this.getInfo(id);
  }

  getInfo(siteId) {
    $.ajax({
      type: 'GET',
      // url: `${url}/api/images/${siteId}`,
      url: `/api/images/${siteId}`,
      success: (data) => {
        const property = data;
        for (let i = 0; i < data.images.length; i += 1) {
          property.images[i].index = i;
        }
        this.setState({ info: property });
      },
    });
  }

  changeStatus() {
    const { status } = this.state;
    if (status === 'imageWindow') {
      this.setState({ status: 'galleryView' });
    } else {
      this.setState({ status: 'imageWindow' });
    }
  }

  fullScreen(e) {
    const indexFull = parseInt(e.target.alt, 10);
    this.setState({ indexFull });
    const { status } = this.state;
    if (status === 'galleryView') {
      this.setState({ status: 'fullScreen' });
    } else {
      this.setState({ status: 'galleryView' });
    }
  }

  previousImageFull() {
    let { indexFull } = this.state;
    if (indexFull !== 0) {
      indexFull -= 1;
      this.setState({ indexFull });
    }
  }

  nextImageFull() {
    const { info } = this.state;
    let { indexFull } = this.state;
    if (indexFull < info.images.length - 1) {
      indexFull += 1;
      this.setState({ indexFull });
    }
  }

  previousImage() {
    let { indexMain } = this.state;
    if (indexMain !== 0) {
      indexMain -= 1;
      this.setState({ indexMain });
    }
  }

  nextImage() {
    const { info } = this.state;
    let { indexMain } = this.state;
    if (indexMain < info.images.length - 1) {
      indexMain += 1;
      this.setState({ indexMain });
    }
  }

  nextThumbnail() {
    const { info } = this.state;
    let { start, end } = this.state;
    if (end < info.images.length) {
      start += 8;
      end += 8;
      this.setState({ start, end });
    }
  }

  previousThumbnail() {
    let { start, end } = this.state;
    if (start !== 0) {
      start -= 8;
      end -= 8;
      this.setState({ start, end });
    }
  }

  handleClick(e) {
    const indexMain = parseInt(e.target.alt, 10);
    this.setState({ indexMain });
  }

  render() {
    const {
      status, info, indexFull, indexMain, start, end,
    } = this.state;
    let rendered;

    if (status === 'imageWindow') {
      rendered = <ImageWindow nextThumbnail={this.nextThumbnail} previousThumbnail={this.previousThumbnail} handleClick={this.handleClick} previousImage={this.previousImage} nextImage={this.nextImage} start={start} end={end} index={indexMain} changeStatus={this.changeStatus} info={info} />;
    } else if (status === 'galleryView') {
      rendered = <GalleryView fullScreen={this.fullScreen} changeStatus={this.changeStatus} info={info} />;
    } else if (status === 'fullScreen') {
      rendered = <FullScreenView previousImage={this.previousImageFull} nextImage={this.nextImageFull} index={indexFull} fullScreen={this.fullScreen} info={info} />;
    }
    return (
      <div>
        {rendered}
      </div>
    );
  }
}

export default App;
