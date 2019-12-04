import React from 'react';

class ImageWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
  }

  previous() {
    if (this.state.index !== 0) {
      const index = this.state.index - 1;
      this.setState({ index });
    }
  }

  next() {
   const index = this.state.index + 1;
   this.setState({ index });
   console.log(this.props.info.images)
  }

  render() {
    return (
      <div>
        <span>
          <button onClick={this.previous} type="button">
            {'<'}
          </button>
        </span>
        <span>
          <img src={this.props.info.images[this.state.index].imageUrl} alt="" />
        </span>
        <span>
          <button onClick={this.next} type="button">
            {'>'}
          </button>
        </span>
      </div>
    );
  }
}

export default ImageWindow;
