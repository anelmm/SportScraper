import React from 'react';
import Articles from './Articles';

class App extends React.Component {
  render() {
    return (
      <div id="container">
        {this.props.children}
	<Articles />
      </div>
    );
  }
}

export default App;