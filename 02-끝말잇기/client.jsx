import React from 'react';
import { createRoot } from 'react-dom/client';

import WordRelay from './WordRelay';


const root = createRoot(document.querySelector('#root'));
root.render(<WordRelay />);