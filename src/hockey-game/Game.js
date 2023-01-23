import React, { Component } from 'react';

import Team from './Team';

function Team(props) {
  return (
    <div>
      <div class="team-container">
        <img class="team-logo" src={`./assets/imgs/logos/${props.name.toLowerCase()}.png`} />
        <span>{props.name}</span>
      </div>
      <span>{props.score}</span>
    </div>
  );
}

export default class Game extends Component {
  constructor(props) {
    super(props);

    // GET https://statsapi.web.nhl.com/api/v1/schedule?teamId=30&startDate=2018-01-02&endDate=2018-01-02
  }

  render() {
    return (
      <div class="game-container">
        <Team name="Penguins" score="3" />
        <Team name="Penguins" score="1" />
      </div>
    );
  }
}
