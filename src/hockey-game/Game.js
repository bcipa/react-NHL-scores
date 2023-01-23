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
  }

  importGameData(data) {
    console.log(data);
  }

  importTeamData(data) {
    const game_path =
      data['teams'][0]['previousGameSchedule']['dates'][0]['games'][0][
        'content'
      ]['link'];

    fetch('https://statsapi.web.nhl.com' + game_path)
      .then((response) => response.json())
      .then((data) => this.importGameData(data));
  }

  componentDidMount() {
    fetch(
      'https://statsapi.web.nhl.com/api/v1/teams/5?expand=team.schedule.previous'
    )
      .then((response) => response.json())
      .then((data) => this.importTeamData(data));
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
