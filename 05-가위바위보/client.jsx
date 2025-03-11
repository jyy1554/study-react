import React from 'react';
import { createRoot } from 'react-dom/client';
import RSPClass from './RSPClass';

const root = createRoot(document.querySelector('#root'));
root.render(<RSPClass />);