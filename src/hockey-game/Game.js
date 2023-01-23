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
      <p className="game-info-detail">{props.arena}</p>
      <p className="game-info-detail">{props.date}</p>
    </div>
  );
}

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTeamName: 'Penguins',
      selectedTeamId: 5,
      selectedTeamScore: 0,
      opponent: 'Penguins',
      opponentScore: 0,
      arena: '',
      date: '',
    };
  }

  importGameData(data) {
    const awayTeam = data['teams']['away'];
    const homeTeam = data['teams']['home'];
    let selectedTeam = null;
    let opponent = null;

    if (this.state.selectedTeamId == awayTeam['team']['id']) {
      selectedTeam = awayTeam;
      opponent = homeTeam;
    } else {
      selectedTeam = homeTeam;
      opponent = awayTeam;
    }

    let opponentName = opponent['team']['name'].split(' ');
    let opponentScore = opponent['teamStats']['teamSkaterStats']['goals'];
    let selectedTeamName = selectedTeam['team']['name'].split(' ');
    let selectedTeamScore =
      selectedTeam['teamStats']['teamSkaterStats']['goals'];

    this.setState({
      opponent: opponentName[opponentName.length - 1],
      opponentScore: opponentScore,
      selectedTeamName: selectedTeamName[selectedTeamName.length - 1],
      selectedTeamScore: selectedTeamScore,
    });
  }

  importTeamData(data) {
    console.log(data);
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
        <TeamInfo
          name={this.state.selectedTeamName}
          score={this.state.selectedTeamScore}
        />

        <GameInfo arena={this.state.arena} date={this.state.date} />

        <TeamInfo
          name={this.state.opponent}
          score={this.state.opponentScore}
          isOpponent={true}
        />
      </div>
    );
  }
}
