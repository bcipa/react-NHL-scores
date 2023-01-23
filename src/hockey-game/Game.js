import React, { Component } from 'react';

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

function TeamInfo(props) {
  const isOpponent = props.isOpponent;
  return (
    <div className="team-score">
      {isOpponent ? <h1>1</h1> : null}
      <Team name={props.name} />
      {!isOpponent ? <h1>3</h1> : null}
    </div>
  );
}

function GameInfo(props) {
  return (
    <div className="game-info">
      <p className="game-info-detail">PPG Paints Arena</p>
      <p className="game-info-detail">January 2, 2023</p>
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
        <TeamInfo name="Penguins" />

        <GameInfo />

        <TeamInfo name="Penguins" isOpponent={true} />
      </div>
    );
  }
}
