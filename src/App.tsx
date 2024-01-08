import { useState } from 'react';

import './index.css';
import WpmGame from './pages/wpm/WpmGame';

import Navbar from './components/navigation/Navbar';
import FallingWordsGame from './pages/fallingwords/FallingWordGame';
import { RouterProvider } from 'react-router-dom';
import { router } from './lib/router';
import Providers from './Providers';



function App() {




  return (
    <main className="">
      <Providers />
    </main>
  );
}

export default App;
