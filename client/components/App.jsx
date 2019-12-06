import React from 'react';
import $ from 'jquery';
// import styled from 'styled-components';
import ImageWindow from './imageWindow.jsx';
import GalleryView from './galleryView.jsx';
import FullScreenView from './fullScreenView.jsx';

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
    };
    this.getInfo = this.getInfo.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.fullScreen = this.fullScreen.bind(this);
  }

  componentDidMount() {
    this.getInfo(8);
  }

  getInfo(siteId) {
    $.ajax({
      type: 'GET',
      url: `/api/images/${siteId}`,
      success: (data) => {
        const property = data;
        for (let i = 0; i < data.images.length; i += 1) {
          property.images[i].index = i;
        }
        console.log(data);
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

  fullScreen() {
    const { status } = this.state;
    if (status === 'galleryView') {
      this.setState({ status: 'fullScreen' });
    } else {
      this.setState({ status: 'galleryView' });
    }
  }

  render() {
    const { status } = this.state;
    let rendered;
    const { info } = this.state;

    if (status === 'imageWindow') {
      rendered = <ImageWindow changeStatus={this.changeStatus} info={info} />;
    } else if (status === 'galleryView') {
      rendered = <GalleryView fullScreen={this.fullScreen} changeStatus={this.changeStatus} info={info} />;
    } else if (status === 'fullScreen') {
      rendered = <FullScreenView fullScreen={this.fullScreen} info={info} />;
    }
    return (
      <div>
        {rendered}
      </div>
    );
  }
}

export default App;
