import '../public/styles.scss';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import * as APP from './APP.js'; // 导入您的主组件

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <Router>
      <APP />
    </Router>
  </React.StrictMode>
);
