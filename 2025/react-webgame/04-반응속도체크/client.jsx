import React from 'react';
import { createRoot } from 'react-dom/client';
// import ResponseCheckClass from './ResponseCheckClass';
import ResponseCheck from './ResponseCheck';

const root = createRoot(document.querySelector('#root'));
root.render(<ResponseCheck />);