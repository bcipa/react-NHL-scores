import React, { Component } from 'react';

function Team(props) {
  return (
    <div className="team-info">
      <img
        className="team-logo"
        src={`/assets/imgs/logos/${props.teamName.toLowerCase()}.svg`}
      />
      <span>{props.teamName}</span>
    </div>
  );
}

export default class TeamInfo extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      teamName: props.name,
      isOpponent: props.isOpponent,
    };
  }

  render() {
    return (
      <div className="team-score">
        {this.state.isOpponent ? <h1>1</h1> : null}
        <Team teamName={this.state.teamName} />
        {!this.state.isOpponent ? <h1>3</h1> : null}
      </div>
    );
  }
}
