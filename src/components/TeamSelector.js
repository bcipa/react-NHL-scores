import React, { Component } from 'react';

import Game from './Game';

export default class TeamSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Game />
      </div>
    );
  }
}
