import React from 'react';
import Portfolio from './Portfolio';
import CustomCursor from "./components/CustomCursor";
import ScrollIndicator from "./components/ScrollIndicator";

function App() {
  return (
    <>
      <ScrollIndicator />
      <CustomCursor />
      <Portfolio />
    </>
  );
}

export default App;
