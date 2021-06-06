import React from 'react';
import './App.css';
import UsersPage from './pages/Users';
import { StateProvider } from './store';

function App() {
  return (
    <StateProvider value={{}}>
      <div className="App">
        <UsersPage />
      </div>
    </StateProvider>
  );
}

export default App;
