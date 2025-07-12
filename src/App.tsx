import React, { useState } from 'react';
import Home from './components/Home/Home';
import LoginForm from './components/ui/LoginForm';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return loggedIn ? <Home onLogout={() => setLoggedIn(false)} /> : <LoginForm onLogin={() => setLoggedIn(true)} />;
}

export default App;
