import React from 'react';

export const coveredCard =   {
  name: "Covered", 
  beat: [
    { card: "", message: "" },
    { card: "", message: "" },
  ],
  image: "assets/card_covered.png"
};

export const emptyCard =   {
  name: "Empty", 
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

export const cardBeatTo = (card1, card2) => card1.beat.some(b => b.card == card2.name);

export const Card = (props) => {
  return (
    <>
      <div className="card" style={{width: "100%", textAlign: "center", backgroundColor: "rgba(255, 255, 255, 0.192)"}} >
        <img src={props.card.image} style={{width: props.width ? props.width : "100%"}} className="rounded mx-auto d-block p-1 m-0" alt="card-image"/>       
      </div>
   </>
  )
}
