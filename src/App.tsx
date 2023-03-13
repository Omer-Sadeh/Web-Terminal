import React, { useState } from 'react';
import './App.css';
import { OverclockedTerminal } from './components/terminalOC';
import { Terminal } from './components/terminal';

function App() {

	const [overclockedMode, setOverclockedMode] = useState(false);

	const handleChangeMode = () => {setOverclockedMode(!overclockedMode)};

	return (
		<div className="container">
			{overclockedMode ? <OverclockedTerminal changeMode={handleChangeMode} /> : <Terminal changeMode={handleChangeMode} />}
		</div>
  	);
}

export default App;
