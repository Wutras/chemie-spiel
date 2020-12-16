import { Component } from "react";
import { HighscoreEntry } from "..";

class ScoreTable extends Component {
  render() {
    return (
      <table className="scoreTable">
        <tbody>
          <tr>
            <th>Platzierung</th>
            <th>Spieler</th>
            <th>Punktzahl</th>
          </tr>
          {this.props.scores.map((score, index) => (
            <HighscoreEntry
              key={`${score.playername}/${score.score}`}
              position={index}
              {...score}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

export default ScoreTable;
