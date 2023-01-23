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
export default class TeamInfo extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return <div>hi</div>;
  }
}
