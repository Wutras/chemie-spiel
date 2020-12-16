import { Component } from "react";
import { Link } from "react-router-dom";

class Menu extends Component {
  render() {
    return (
      <div className="menu">
        <div className="menuTitle">Chemiespiel</div>
        <div>
          <Link className="playButton" to="/game">
            Spiel starten
          </Link>
        </div>
        <div>
          <Link className="scoreButton" to="/highscores">
            Highscores einsehen
          </Link>
        </div>
      </div>
    );
  }
}

export default Menu;
