import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppProvider from './AppContext';
import Help from './pages/Help';
import Splash from './pages/Splash';
import Dashboard from './pages/Dashboard';
import Div100vh from 'react-div-100vh';
import Bootstrap from './components/Bootstrap';

function App() {
  return (
    <AppProvider>
      <Bootstrap>
        <Div100vh>
          <div className="app select-none">
            <div className="screen relative ">
              <Splash />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/help" element={<Help />} />
              </Routes>
            </div>
          </div>
        </Div100vh>
      </Bootstrap>
    </AppProvider>
  );
}

export default App;
