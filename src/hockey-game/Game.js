import React, { Component } from 'react';

import Team from './Team';
//{`/assets/imgs/logos/${props.name.toLowerCase()}.png`}
function Team(props) {
  return (
    <div className="team-info">
      <img
        className="team-logo"
        src={`/assets/imgs/logos/${props.name.toLowerCase()}.svg`}
      />
      <span>{props.name}</span>
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
      <div className="game-container">
        <div className="team-score">
          <Team name="Penguins" />
          <h1>3</h1>
        </div>

        <div className="game-info">
          <p className="game-info-detail">PPG Paints Arena</p>
          <p className="game-info-detail">January 2, 2023</p>
        </div>

        <div className="team-score">
          <h1>1</h1>
          <Team name="Penguins" />
        </div>
      </div>
    );
  }
}
