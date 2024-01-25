import logo from './logo.svg';
import './App.css';
import  ListaComponentes from './Componentes/ListaComponentes'
import HeaderComponent from './Componentes/HeaderComponent'
import ClientesService from './service/ClientesService'
import {  BrowserRouter, Route, Routes } from 'react-router-dom'
import AddClientesComponent from './Componentes/AddClientesComponent';
import Inicio from './Componentes/Inicio';

function App() {
  return (
    <div>
      <BrowserRouter>
      <HeaderComponent/>
      <div className='container'>
      <Routes>
        <Route exact path='/' element={<Inicio/>}></Route>
        <Route  path='/clientes' element={<ListaComponentes/>}></Route>
        <Route  path='/add-Clientes' element={<AddClientesComponent/>}></Route>
        <Route  path='/edit-Clientes/:id' element={<AddClientesComponent/>}></Route>

      </Routes>
      </div>
      </BrowserRouter>
    </div>

    );
}

export default App;
