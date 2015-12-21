import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

@connect(({ mainStore }) => ({ mainStore }))
class Wimf extends React.Component {
  render() {
    const {mainStore, dispatch} = this.props;

    console.log(mainStore);

    return (
      <div>
        Hello world!
      </div>
    );
  }
}

export default Wimf;