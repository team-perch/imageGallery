import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: '',
    };
  }

  render() {
    return (
      <div>Hello from React!!!!</div>
    );
  }
}

export default App;
