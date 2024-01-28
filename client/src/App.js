import './css/app.css';
import './css/products.css';
import './css/details.css';
import './css/paginate.css';
import './css/home.css';
import './css/utility.css';
import './css/profile.css';
import './css/about.css';
import './css/favorite.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { Register } from './components/Register';
import { Login } from './components/Login';
import { Create } from './components/Sell';
import { Peripherals } from './components/Peripherals';
import { Details } from './components/Details';
import { About } from './components/About';
import { Profile } from './components/Profile';
import { Edit } from './components/Edit';
import { Favorites } from './components/Favorites';
import { History } from './components/History';
import React, { useContext, useEffect, useState } from 'react';



function App() {


  return (
    <div className="App">
      <Header />
      <div className='main'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/sell' element={<Create />} />
          <Route path='/products/:peripheral' element={<Peripherals />} />
          <Route path='/products/:component' element={<Peripherals />} />
          <Route path='/products/:desktop' element={<Peripherals />} />
          <Route path='/products/:laptop' element={<Peripherals />} />
          <Route path='/products/:type/:id' element={<Details />} />
          <Route path='/about' element={<About />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/products/edit/:id' element={<Edit />} />
          <Route path='/products/favorites/:id' element={<Favorites />} />
          <Route path='/productHistory/:id' element={<History />} />
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
