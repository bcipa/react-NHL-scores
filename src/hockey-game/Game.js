import React, { Component } from 'react';

import TeamInfo from './TeamInfo';

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
    var gamePath =
      data['teams'][0]['previousGameSchedule']['dates'][0]['games'][0][
        'content'
      ]['link'];
    gamePath = gamePath.replace('/content', '');

    fetch('https://statsapi.web.nhl.com' + gamePath + '/boxscore')
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
