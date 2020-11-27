

import React from 'react';

export const coveredCard =   {
  name: "Empty", 
  beat: [
    { card: "", message: "" },
    { card: "", message: "" },
  ],
  image: "assets/card_covered.png"
};

export const emptyCard =   {
  name: "Covered", 
  beat: [
    { card: "", message: "" },
    { card: "", message: "" },
  ],
  image: "assets/card_empty.png"
};

export const cards = [
  {
    name: "Rock", 
    beat: [
      { card: "Lizard", message: "Rock crushes Lizard" },
      { card: "Scissors", message: "Rock crushes Scissors" },
    ],
    image: "assets/card_rock.png"
  },
  {
    name: "Paper", 
    beat: [
      { card: "Rock", message: "Paper covers Rock" },
      { card: "Spock", message: "Paper disproves Spock" },
    ],
    image: "assets/card_paper.png"
  },
  {
    name: "Scissors", 
    beat: [
      { card: "Paper", message: "Scissors cuts Paper" },
      { card: "Lizard", message: "Scissors decapitates Lizard" },
    ],
    image: "assets/card_scissors.png"
  },
  {
    name: "Lizard", 
    beat: [
      { card: "Spock", message: "Lizard poisons Spock" },
      { card: "Paper", message: "Lizard eats Paper" },
    ],
    image: "assets/card_lizard.png"
  },
  {
    name: "Spock", 
    beat: [
      { card: "Scissors", message: "Spock smashes Scissors" },
      { card: "Rock", message: "Spock vaporizes Rock" },
    ],
    image: "assets/card_spock.png"
  },
];

export const whoWins = (card1, card2) => {
  if(card1.beat.any(card => card.name == card2.name)){
    return card1;
  }
  if(card2.beat.any(card => card.name == card1.name)){
    return card2;
  }
  return null;
}

export const Card = (props) => {
  return (
    <>
      <div className="card">
        <img src={props.card.image} style={{width: "100%"}}/>
        <span>{props.card.name}</span>
      </div>
   </>
  )
}
