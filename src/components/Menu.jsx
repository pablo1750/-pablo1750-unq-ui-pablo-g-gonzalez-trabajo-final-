import React from 'react';
import { Player } from './Player';
import { Session } from './Session';

export const Menu = (props) => {
  return (
    <>
    <button>1 vs cpu</button>
    <button>1 vs 1</button>
    <Session />
    </>
  )
}