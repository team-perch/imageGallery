import React from 'react';
import $ from 'jquery';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: 58,
    };
    this.getInfo = this.getInfo.bind(this);
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo() {
    $.ajax({
      type: 'GET',
      url: `/api/images/${this.state.info}`,
      success: (data) => { console.log(data); },
    });
  }

  render() {
    return (
      <div>Hello from React!!!!!!!!!!</div>
    );
  }
}

export default App;
