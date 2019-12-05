import React from 'react';
import $ from 'jquery';
// import styled from 'styled-components';
import ImageWindow from './imageWindow.jsx';
import GalleryView from './galleryView.jsx';

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
  }

  componentDidMount() {
    this.getInfo(5);
  }

  getInfo(siteId) {
    $.ajax({
      type: 'GET',
      url: `/api/images/${siteId}`,
      success: (data) => {
        for (var i = 0; i < data.images.length; i += 1) {
          data.images[i].index = i;
        }
        console.log(data);
        this.setState({ info: data });
      },
    });
  }

  changeStatus() {
    if (this.state.status === 'imageWindow') {
      this.setState({ status: 'galleryView' });
    } else {
      this.setState({ status: 'imageWindow' });
    }
  }

  render() {
    if (this.state.status === 'imageWindow') {
      return (
        <div>
          <ImageWindow info={this.state.info} />
        </div>
      );
    } else if (this.state.status === 'galleryView') {
      return (
        <div>
          <GalleryView />
        </div>
      );
    }
  }
}

export default App;
