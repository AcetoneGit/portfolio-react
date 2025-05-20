import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Portfolio from './Portfolio';
import ScrollIndicator from './components/ScrollIndicator';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="app">
        <ScrollIndicator />
        <Portfolio />
      </div>
    </ThemeProvider>
  );
};

export default App;
