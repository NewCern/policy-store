import './App.css';
import './css/Login.css';
import './css/Register.css';
import './css/NavBar.css';
import './css/AddCard.css';
import './css/UpdatePersonal.css';
import './css/Inventory.css';
import './css/Home.css';
import './css/Cart.css';

import Users from './components/Users';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import NavBar from './components/NavBar';
import AddCard from './components/AddCard';
import UpdatePersonal from './components/UpdatePersonal';
import Inventory from './components/Inventory';
import Home from './components/Home';
import PaymentOptions from './components/PaymentOptions';
import cartSlice from './components/store/cart/cartSlice';
import Confirm from './components/Confirm';
import ShowPurchase from './components/ShowPurchase';
import Policies from './components/Policies';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/paymentmethod' element={<AddCard/>} />
        {/* <Route path='/' element={<UpdatePersonal/>} /> */}
        <Route path='/paymentoptions' element={<PaymentOptions/>} />
        <Route path='/inventory' element={<Inventory/>} />
        <Route path='/confirm' element={<Confirm/>} />
        <Route path='/showpurchase' element={<ShowPurchase/>} />
        <Route path='/policies' element={<Policies/>} />
        {/* <Route path='/' element={<Users/>} /> */}
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App;
