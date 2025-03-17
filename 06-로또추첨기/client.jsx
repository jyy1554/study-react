import React from 'react';
import { createRoot } from 'react-dom/client';
import LottoClass from './LottoClass';

const root = createRoot(document.querySelector('#root'));
root.render(<LottoClass />);