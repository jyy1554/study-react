import React from 'react';
import { createRoot } from 'react-dom/client';

const WordRelay = require('./WordRelay');

const root = createRoot(document.querySelector('#root'));
root.render(<WordRelay />);