import { Component } from "react";
import { Link } from "react-router-dom";
import { ScoreTable } from "../../components";

class Score extends Component {
  render() {
    return (
      <div className="score">
        <div className="scoreTitle">Highscores</div>
        <div>
          <Link className="returnButton" to="/">
            Zurück
          </Link>
          <ScoreTable scores={this.props.highscores} />
        </div>
      </div>
    );
  }
}

export default Score;
