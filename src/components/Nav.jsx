import React from 'react';
import Swal from 'sweetalert2';

export const Nav = () => {

  
  const handleRulesClick = () => {

    Swal.fire({
      title: 'RPSLS Game Rules',
      html: 
      '<div style="text-align:left">' +
      'Scissors cuts Paper<br/>' + 
      'Paper covers Rock<br/>' + 
      'Rock crushes Lizard<br/>' + 
      'Lizard poisons Spock<br/>' + 
      'Spock smashes Scissors<br/>' + 
      'Scissors decapitates Lizard<br/>' + 
      'Lizard eats Paper<br/>' + 
      'Paper disproves Spock<br/>' + 
      'Spock vaporizes Rock<br/>' + 
      '(and as it always has) Rock crushes Scissors' +
      '</div'
      ,
    });
  }


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <div className="navbar-header">
          <a className="navbar-brand" href="/">RPSLS Game</a>
        </div>
        <ul className="nav navbar-nav navbar-right">
          <li>
            <div className="btn-nav">
              <button className="btn btn-info btn-sm m-1" onClick={handleRulesClick}>Rules</button>
            </div>
          </li>
        </ul>  
      </div>

    </nav>
  )
}
