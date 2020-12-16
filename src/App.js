import { Component } from "react";
import { BehaviorSubject } from "rxjs";
import { Menu, Score, Game } from "./pages/index";
import { Router, Route } from "react-router-dom";
import { history } from "./helpers/history";
const QUESTIONS = require("./questions.json").questions;
const CONFIG = require("./config.json");
const currentHighScoresSubject = new BehaviorSubject(
  JSON.parse(sessionStorage.getItem("highscores"))
);


/**
 * @description The main component which contains all other components. Render it to render the application.
 * @name App
 */
class App extends Component {
  constructor(_props) {
    super();

    this.state = {
      highscores: {
        maxEntries: CONFIG["maximum-highscores"],
        scores: [
          { playername: "Niemand", score: -1 },
          { playername: "Niemand", score: -2 },
          { playername: "Niemand", score: -3 },
          { playername: "Niemand", score: -4 },
          { playername: "Niemand", score: -5 },
        ],
      },
    };

    this.gameOver = this.gameOver.bind(this);
  }

  /**
   * @description A method which will check, if the player's score is worthy of being added to the highscores board and will add it in the right place, if it is.
   *
   * @param {String} playername The name of the player who played
   * @param {Number} score The score of the player who played
   */
  gameOver(playername, score) {
    if (!playername || !score) return null;
    let updatedHighscores = this.state.highscores.scores;
    if (updatedHighscores.length === 0) {
      updatedHighscores.push({
        playername: playername,
        score: score,
      });
    } else {
      for (let i = 0; i < updatedHighscores.length; i++) {
        if (
          score === updatedHighscores[i].score &&
          playername === updatedHighscores[i].playername
        ) {
          return null;
        }
        if (
          score > updatedHighscores[i].score ||
          (updatedHighscores.length < this.state.highscores.maxEntries &&
            i === updatedHighscores.length - 1 &&
            i !== 0)
        ) {
          updatedHighscores.splice(i, 0, {
            playername: playername,
            score: score,
          });
          updatedHighscores.length >= this.state.highscores.maxEntries
            ? updatedHighscores.pop()
            : (() => null)(); 
          break;
        }
      }
    }
    sessionStorage.setItem("highscores", JSON.stringify(updatedHighscores));
    currentHighScoresSubject.next(updatedHighscores);
  }

  pickRandomQuestions(list = [], amount = 1) {
    let picked = [];
    let randomPos;
    do {
      randomPos = Math.floor(Math.random()*list.length);
      if (!picked.includes(list[randomPos])) {
        picked.push(list[randomPos]);
      }
    } while (picked.length < list.length && picked.length < amount);
    return picked;
  }

  componentDidMount() {
    currentHighScoresSubject.asObservable().subscribe((newHighscores) => {
      if (!!newHighscores) {
        this.setState({
          highscores: {
            maxEntries: this.state.highscores.maxEntries,
            scores: newHighscores,
          },
        });
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Router history={history}>
          <Route
            exact
            path="/"
            render={() => {
              return <Menu />;
            }}
          />
          <Route
            path="/highscores"
            render={() => {
              return <Score highscores={this.state.highscores.scores} />;
            }}
          />
          <Route
            path="/game"
            render={() => {
              return <Game questions={this.pickRandomQuestions(QUESTIONS, CONFIG["questions-per-round"])} gameOver={this.gameOver} />;
            }}
          />
        </Router>
      </div>
    );
  }
}

export default App;
