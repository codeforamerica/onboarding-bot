import React from 'react';
import { render } from 'react-dom';
import Base from './components/Base.jsx';

// Here is where our React app touches our HTML
const entryDiv = document.getElementById('ob-interface');

render(<Base />, entryDiv);
