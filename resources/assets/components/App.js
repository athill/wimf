import React from 'react';

import createStore from 'lib/createStore';
import { Provider } from 'react-redux';

import Wimf from 'components/Wimf/Wimf';

const store = createStore();

class App extends React.Component {
  render() {
    return (
      <Provider {...{ store }}>
        { () => <Wimf/>}
      </Provider>
    );
  }
}

export default App;