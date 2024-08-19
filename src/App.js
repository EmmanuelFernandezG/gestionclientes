import './App.css';
import  ListaComponentes from './Componentes/ListaComponentes'
import HeaderComponent from './Componentes/HeaderComponent'
import {  BrowserRouter, Route, Routes } from 'react-router-dom'
import AddClientesComponent from './Componentes/AddClientesComponent';
import Inicio from './Componentes/Inicio';
import React, {useState, useEffect} from 'react';
import LoginForm from './Componentes/LoginForm';
import AgregarUsuario from './Componentes/AgregarUsuario';
import MatrizCD from './Componentes/MatrizCD';
import NuevaPO from './Componentes/NuevaPO';

function App() {
  
  const almacenlocalusuario = localStorage.getItem('username')
  const almacenlocalpassword = localStorage.getItem('password')
  const [user,setUser] = useState({username:"",password:""});
  const[error,setError] =useState("");

const Login = async usuarioinfo =>{
    if ( usuarioinfo.perfil === "admin" ||  usuarioinfo.perfil === "usuarioinicial"  ||  usuarioinfo.perfil === "usuarioseguimiento" || usuarioinfo.perfil ==="ControlDocumental" ) {
      setUser({
        username:usuarioinfo.usuario,
        password:usuarioinfo.constrasena})
        localStorage.setItem('username', usuarioinfo.usuario)
        localStorage.setItem('perfil', usuarioinfo.perfil)
        
        // localStorage.setItem('password', usuarioinfo.constrasena)
    }
    else{
      if(usuarioinfo === "NuevoUser") {
        setUser({
          username:usuarioinfo.usuario,
          password:usuarioinfo.constrasena})
          localStorage.setItem('username', usuarioinfo)
          // localStorage.setItem('password', usuarioinfo)   
      }else{
      setError("Usuario / Contraseña incorrectos")
    }
  }
  }
if(almacenlocalusuario === null){
  return (
    
    <div>
         <BrowserRouter>
      <div className='container'>
      <Routes>
        <Route  path='record/' element={<LoginForm Login={Login} error={error} />}></Route>    
      </Routes>
      </div>
      </BrowserRouter>
   
  </div>
)
}else{
  if(almacenlocalusuario ==="NuevoUser"){

    return(
      <div>
      <BrowserRouter>
      <HeaderComponent />
      <div className='container'>
      <Routes>
        <Route  path='record/usuario' element={<AgregarUsuario/>}></Route>    
      </Routes>
      </div>
      </BrowserRouter>
    </div>
    )    
  }
  if(localStorage.getItem('perfil') === "ControlDocumental"){
    return(
      <div>
      <BrowserRouter>
      <HeaderComponent />
      <div className='container'>
      <Routes>
          <Route path='record/matrizcd' element={<MatrizCD/>}></Route>    
          <Route path='record/matrizcd/NuevaPO' element={<NuevaPO/>}></Route>    
      </Routes>
      </div>
      </BrowserRouter>
    </div>
    )
  }
  else{
  return(
  <div>
  <BrowserRouter>
  <HeaderComponent/>
  <div className='container'>
  <Routes>
    <Route exact path='record/' element={<Inicio/>}></Route>
    <Route  path='record/clientes' element={<ListaComponentes/>}></Route>
    <Route  path='record/add-Clientes' element={<AddClientesComponent/>}></Route>
    <Route  path='record/edit-Clientes/:id' element={<AddClientesComponent/>}></Route>
    <Route  path='record/usuario' element={<AgregarUsuario/>}></Route>

  </Routes>
  </div>
  </BrowserRouter>
</div>
)}};}

export default App;
