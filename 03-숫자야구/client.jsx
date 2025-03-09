import React from 'react';
import { createRoot } from 'react-dom/client';

import NumberBaseballClass from './NumberBaseballClass';

const root = createRoot(document.querySelector('#root'));
root.render(<NumberBaseballClass />);