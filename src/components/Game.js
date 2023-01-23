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
      {isOpponent ? <h1 className="team-score-goals">{props.score}</h1> : null}
      <Team name={props.name} />
      {!isOpponent ? <h1 className="team-score-goals">{props.score}</h1> : null}
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
      selectedTeamScore: 0,
      selectedTeamId: 0,
      opponent: 'Penguins',
      opponentScore: 0,
      arena: '',
      date: '',
    };
  }

  importTeamData(data) {
    const gameInformation =
      data['teams'][0]['previousGameSchedule']['dates'][0]['games'][0];

    const awayTeam = gameInformation['teams']['away'];
    const homeTeam = gameInformation['teams']['home'];
    let selectedTeam = null;
    let opponent = null;

    if (
      this.props.selectedTeamId ==
      gameInformation['teams']['home']['team']['id']
    ) {
      selectedTeam = homeTeam;
      opponent = awayTeam;
    } else {
      selectedTeam = awayTeam;
      opponent = homeTeam;
    }

    let gamePath = gameInformation['content']['link'];
    gamePath = gamePath.replace('/content', '');

    const selectedTeamScore = selectedTeam['score'];
    const selectedTeamName = selectedTeam['team']['name'].split(' ');
    const opponentTeamScore = opponent['score'];
    const opponentTeamName = opponent['team']['name'].split(' ');

    const arena = gameInformation['venue']['name'];
    const gameDate = new Date(gameInformation['gameDate']).toLocaleDateString();

    this.setState({
      arena: arena,
      date: gameDate,
      opponent: opponentTeamName[opponentTeamName.length - 1],
      opponentScore: opponentTeamScore,
      selectedTeamName: selectedTeamName[selectedTeamName.length - 1],
      selectedTeamScore: selectedTeamScore,
    });
  }

  componentDidUpdate() {
    if (this.props.selectedTeamId !== this.state.selectedTeamId) {
      this.setState({
        selectedTeamId: this.props.selectedTeamId,
      });

      fetch(
        `https://statsapi.web.nhl.com/api/v1/teams/${this.props.selectedTeamId}?expand=team.schedule.previous`
      )
        .then((response) => response.json())
        .then((data) => this.importTeamData(data));
    }
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
