import React from 'react';

class Thumbnail extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <span>
        {this.props.images.map((image, key) => {
          return(
            <span key={key} >
              <img src={image.imageUrl} style={{ width: '75px', height: '65px' }} />
            </span>
          )
        })}
      </span>
    )
  }
}

export default Thumbnail;
