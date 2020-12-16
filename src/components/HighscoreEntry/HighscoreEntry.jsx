import { Component } from "react";


/**
 * An individual table row which renders all relevant highscore data
 * 
 * @property {Number} position The position of the player within the score board
 * @property {String} playername The name of the player
 * @property {Number} score The score of the player
 */
class HighscoreEntry extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.position + 1}</td>
        <td>{this.props.playername}</td>
        <td>{this.props.score}</td>
      </tr>
    );
  }
}

export default HighscoreEntry;
