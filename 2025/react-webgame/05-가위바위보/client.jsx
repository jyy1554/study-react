import React from 'react';
import { createRoot } from 'react-dom/client';
// import RSPClass from './RSPClass';
import RSP from './RSP';

const root = createRoot(document.querySelector('#root'));
root.render(<RSP />);