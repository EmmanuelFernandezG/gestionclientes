import logo from './logo.svg';
import './App.css';
import  ListaComponentes from './Componentes/ListaComponentes'
import HeaderComponent from './Componentes/HeaderComponent'
import {  BrowserRouter, Route, Routes } from 'react-router-dom'
import AddClientesComponent from './Componentes/AddClientesComponent';
import Inicio from './Componentes/Inicio';
import React, {useState, useEffect} from 'react';
import LoginForm from './Componentes/LoginForm';
import AgregarUsuario from './Componentes/AgregarUsuario';

function App() {

  const almacenlocalusuario = localStorage.getItem('username')
  const almacenlocalpassword = localStorage.getItem('password')

  const [user,setUser] = useState({username:"",password:""});
  const[error,setError] =useState("");

const Login = async usuarioinfo =>{
console.log(usuarioinfo)

    if ( usuarioinfo.perfil == "admin" ||  usuarioinfo.perfil == "usuario" ) {
      setUser({
        username:usuarioinfo.usuario,
        password:usuarioinfo.constrasena})
        localStorage.setItem('username', usuarioinfo.usuario)
        // localStorage.setItem('password', usuarioinfo.constrasena)
    }
    else{
      if(usuarioinfo == "NuevoUser") {
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
if(almacenlocalusuario == null){

  return (
    <div>
  <LoginForm Login={Login} error={error} />  
  </div>
)
}else{
  if(almacenlocalusuario =="NuevoUser"){
    return(
      <div>
      <BrowserRouter>
      <HeaderComponent/>
      <div className='container'>
      <Routes>
        <Route  path='/usuario' element={<AgregarUsuario/>}></Route>    
      </Routes>
      </div>
      </BrowserRouter>
    </div>
    )    
  }else{
  return(
  <div>
  <BrowserRouter>
  <HeaderComponent/>
  <div className='container'>
  <Routes>
    <Route exact path='/' element={<Inicio/>}></Route>
    <Route  path='/clientes' element={<ListaComponentes/>}></Route>
    <Route  path='/add-Clientes' element={<AddClientesComponent/>}></Route>
    <Route  path='/edit-Clientes/:id' element={<AddClientesComponent/>}></Route>
    <Route  path='/usuario' element={<AgregarUsuario/>}></Route>
  </Routes>
  </div>
  </BrowserRouter>
</div>
)
}
}
;
}

export default App;
