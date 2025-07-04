import React, { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/navbar/sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Video from './pages/Video/Video';

const App = () => {
  const [sidebar, setSidebar] = useState(true);

  return (
    <div className="app">
      <Navbar setSidebar={setSidebar} />
      <div style={{ display: 'flex' }}>
        {sidebar && <Sidebar />}
        <Routes>
          <Route path="/" element={<Home sidebar={sidebar}/>} />
          <Route path="/video/:categoryId/:videoId" element={<Video />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
