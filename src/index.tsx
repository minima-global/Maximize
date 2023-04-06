import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from "react-router-dom";
import App from './App'
import './index.css'
import 'decimal.js';
import Decimal from "decimal.js";

Decimal.set({ precision: 9 });

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <HashRouter>
        <App />
    </HashRouter>
)
