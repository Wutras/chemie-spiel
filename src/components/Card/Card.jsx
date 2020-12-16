import { Component } from "react";
import "./Card.css";


/**
 * A card component which renders the information on a card
 * 
 * @property {String} name The name of the card, e. g. "King", "Queen"
 * @property {String} image The URI of the card's image
 * @property {String} text The card's text, e. g. an instruction, a description, a question
 * @property {Function} clickHandler The function that gets called when the card is clicked. Put all relevant logic inside of that.
 */
class Card extends Component {
  render() {
    return (
      <div className="card">
          <hr/>
          <div className="cardName">
            {this.props.name}
          </div>
          <hr/>
          <div className="cardImage">
            <img onClick={this.props.clickHandler} src={this.props.image} alt={`Bild der Karte "${this.props.name}"`} />
          </div>
          <hr/>
          <div className="cardText">
            {this.props.text}
          </div>
          <hr/>
      </div>
    );
  }
}

export default Card;
