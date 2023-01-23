import React, { Component } from 'react';

import * as constants from '../constants.js';

import Game from './Game';

function TeamButtons(props) {
  return (
    <div className="team-buttons-container">
      {constants.hockeyTeams.map(function (team) {
        return (
          <button
            className={
              team[1] === props.selectedTeamId
                ? 'team-button active'
                : 'team-button'
            }
            onClick={() => props.setClickedId(team[1])}
            key={team[1]}
          >
            {team[0]}
          </button>
        );
      })}
    </div>
  );
}

export default class TeamSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTeamId: 0,
      selected: false,
    };
  }

  setSelectedTeam = (teamId) => {
    this.setState({
      selectedTeamId: teamId,
    });
  };

  render() {
    return (
      <div>
        <Game
          selectedTeamId={this.state.selectedTeamId}
          selected={this.state.selected}
        />

        <TeamButtons
          selectedTeamId={this.state.selectedTeamId}
          setClickedId={this.setSelectedTeam}
        />
      </div>
    );
  }
}
