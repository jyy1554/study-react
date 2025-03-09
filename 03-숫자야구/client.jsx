import React from 'react';
import { createRoot } from 'react-dom';

import NumberBaseballClass from './NumberBaseballClass';

const root = createRoot(document.querySelector('#root'));
root.render(<NumberBaseballClass />);