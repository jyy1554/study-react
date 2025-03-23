import React from 'react';
import { createRoot } from 'react-dom/client';

// import NumberBaseballClass from './NumberBaseballClass';
import NumberBaseball from './NumberBaseball';

const root = createRoot(document.querySelector('#root'));
root.render(<NumberBaseball />);