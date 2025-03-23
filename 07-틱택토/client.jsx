import React from 'react';
import { createRoot } from 'react-dom/client';
import TicTacToe from './TicTacToe';

const root = createRoot(document.querySelector('#root'));
root.render(<TicTacToe />);