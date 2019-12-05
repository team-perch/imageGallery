import React from 'react';
import $ from 'jquery';
// import styled from 'styled-components';
import ImageWindow from './imageWindow.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  render() {
    return (
      <div>
        <ImageWindow info={this.state.info} />
      </div>
    );
  }
}

export default App;
