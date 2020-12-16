import { Component } from "react";
import { Link } from "react-router-dom";
import { Card, PopupMessage } from "../../components/index";
import "./Game.css";
const CONFIG = require("../../config.json");

/**
 * @description The game page. This page handles all game related logic and renders card sets that are passed to it.
 *
 * @property {Function} gameOver The function to be called, should the game be over
 * @property {Array} questions An array of questions which each contain a qText and cards property
 *
 * @memberof App This is a page and therefore a member of the App component
 * @name Game
 */
class Game extends Component {
  constructor(_props) {
    super();

    this.state = {
      score: 0,
      currQuestion: 0,
      healthpoints: CONFIG.healthpoints,
      maxHealthpoints: CONFIG.healthpoints,
      hasEnded: false,
    };

    this.correctClick = this.correctClick.bind(this);
    this.incorrectClick = this.incorrectClick.bind(this);
  }

  correctClick() {
    if (!this.state.hasEnded) {
      console.log("Correct click. Well done!");
      this.setState({
        score: this.state.score + 1,
        currQuestion: this.state.currQuestion + 1,
      });
      if (this.state.currQuestion + 1 >= this.props.questions.length) {
        this.setState({
          hasEnded: true,
        });
      }
    }
  }

  incorrectClick() {
    if (!this.state.hasEnded) {
      console.log("Incorrect click. Better luck next time!");
      const oldLifepoints = this.state.healthpoints;
      this.setState({
        healthpoints: oldLifepoints - 1,
        currQuestion: this.state.currQuestion + 1,
      });
      if (
        oldLifepoints - 1 <= 0 ||
        this.state.currQuestion + 1 >= this.props.questions.length
      ) {
        this.setState({
          hasEnded: true,
        });
      }
    }
  }

  render() {
    return (
      <div className="game">
        <div className="gameTitle">Im Spiel</div>
        <div className="scoreDisplay">
          Deine aktuelle Punktzahl: {this.state.score}
        </div>
        <div className="healthDisplay">
          <div
            style={{
              width: `${
                (this.state.healthpoints / this.state.maxHealthpoints) * 100
              }%`,
            }}
            className="healthBar"
          />{" "}
          <span className="healthBarLabel">
            {" "}
            Deine aktuellen Lebenspunkte: {this.state.healthpoints}/
            {this.state.maxHealthpoints}
          </span>
        </div>
        <div>
          <Link className="returnButton" to="/">
            Zurück
          </Link>
          <div className="questionText">
            {this.props.questions[this.state.currQuestion]?.qText}
          </div>
          <div className="cardContainer">
            {this.props.questions[this.state.currQuestion]?.answers?.map(
              (currCard, index) => {
                return (
                  <Card
                    {...currCard}
                    key={index}
                    clickHandler={
                      currCard.isCorrect
                        ? this.correctClick
                        : this.incorrectClick
                    }
                  />
                );
              }
            )}
          </div>
        </div>
        {this.state.hasEnded ? (
          <PopupMessage
            score={this.state.score}
            gameOver={this.props.gameOver}
          />
        ) : null}
      </div>
    );
  }
}

export default Game;
