import { useState } from 'react';

import './index.css';
import WpmGame from './pages/wpm/WpmGame';

import Navbar from './components/navigation/Navbar';
import FallingWordsGame from './pages/fallingwords/FallingWordsGame';
import { RouterProvider } from 'react-router-dom';
import { router } from './lib/router';



function App() {




  return (
    <main className="">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
