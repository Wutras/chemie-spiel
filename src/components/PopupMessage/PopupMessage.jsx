import { Component } from "react";
import { Link } from "react-router-dom";
import { history } from "../../helpers/history";
import "./PopupMessage.css";

/**
 * @description The game over message which is displayed at the end of a game. It allows the player to view their own score, enter their name and then to return to the main menu
 *
 * @property {Number} score The score the player achieved in this round
 * @memberof Game This is a child component of the Game component
 * @name PopupMessage
 */
class PopupMessage extends Component {
  constructor(_props) {
    super();

    this.state = {
      playername: "",
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleNameChange(evt) {
    this.setState({ playername: evt.target.value });
  }

  handleKeyDown(evt) {
    if (evt.key === "Enter") {
      this.props.gameOver(this.state.playername, this.props.score);
      history.push("/");
    }
  }

  render() {
    return (
      <div className="popupMessage">
        <div>Deine Punktzahl: {this.props.score}</div>
        <div>
          Gib bitte deinen Namen an:{" "}
          <input
            placeholder="Spielername"
            value={this.state.playername}
            onChange={this.handleNameChange}
            onKeyDown={this.handleKeyDown}
          />
        </div>
        <div>
          {this.state.playername.length > 0 ? (
            <Link
              className="returnButton"
              onClick={(evt) => {
                this.props.gameOver(this.state.playername, this.props.score);
              }}
              to="/"
            >
              Zurück zum Menü
            </Link>
          ) : (
            <div> Gib bitte deinen Namen an, bevor du zurückkehrst.</div>
          )}
        </div>
      </div>
    );
  }
}

export default PopupMessage;
