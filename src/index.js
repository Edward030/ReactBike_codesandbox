import '../public/styles.scss';
import React from 'react';
import { createRoot } from 'react-dom/client';
import APP from './APP.js'; // 导入您的主组件

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <APP />
  </React.StrictMode>
);
