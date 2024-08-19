import React from 'react'
import { Link ,useNavigate } from 'react-router-dom';

export const HeaderComponent = () => {

  const limpiarstorage = () => {
    localStorage.clear();
    navigate('record/');
    window.location.reload(false);
  }
  const navigate = useNavigate();
  const almacenlocalusuario = localStorage.getItem('username')
  const almacenlocalpassword = localStorage.getItem('password')
if (almacenlocalusuario === "NuevoUser"){
  return(
    <div style={{position:"sticky", top:0}}>
        <header >
            <nav  className='navbar navbar-expand-mb navbar-dark- bg-dark'>
                <div>
                  <h1> </h1>
                </div>
                <Link to='record'><button className='btn btn-danger'  onClick={limpiarstorage}> Log Out </button></Link>

            </nav>
        </header>
    </div>

  )
}
if(localStorage.getItem('perfil') === 'ControlDocumental' ){
  return (
    <div style={{position:"sticky", top:0}}>
        <header >
            <nav  style={{border: "1px solid black"}}  className='navbar navbar-expand-mb navbar-light- bg-light'>
                <div>
                    <Link  to="record" style={{color:"#FF6720" }} className='navbar-brand'>&nbsp; <strong>Inicio</strong> </Link>    
                    <Link  to="record/matrizcd" style={{color:"#FF6720" }} className='navbar-brand'>&nbsp; <strong>Matriz CD</strong> </Link>    
                </div>
                <Link to='record'><button className='btn btn-danger'  onClick={limpiarstorage}> Log Out </button></Link>

            </nav>
        </header>
    </div>
  )
}
  else{
  return (
    <div style={{position:"sticky", top:0}}>
        <header >
            <nav  style={{border: "1px solid black"}}  className='navbar navbar-expand-mb navbar-light- bg-light'>
                <div>
                    <Link  to="record" style={{color:"#FF6720" }} className='navbar-brand'>&nbsp; <strong>Inicio</strong> </Link>                    
                </div>
                <Link to='record'><button className='btn btn-danger'  onClick={limpiarstorage}> Log Out </button></Link>

            </nav>
        </header>
    </div>
  )
}
}
export default HeaderComponent;