import React from 'react'
import { Link ,useNavigate } from 'react-router-dom';



export const HeaderComponent = () => {

  const limpiarstorage = () => {
    localStorage.clear();
    navigate('/record/');
    window.location.reload(false);
  }
  
  const navigate = useNavigate();

  const almacenlocalusuario = localStorage.getItem('username')
  const almacenlocalpassword = localStorage.getItem('password')

if (almacenlocalusuario == "NuevoUser"){
  return(
    <div>
        <header>
            <nav  className='navbar navbar-expand-mb navbar-dark- bg-dark'>
                <div>
                  <h1></h1>
                </div>
                <Link to='/record/'><button className='btn btn-danger'  onClick={limpiarstorage}> Log Out </button></Link>

            </nav>
        </header>
    </div>

  )
}
  return (
    <div>
        <header>
            <nav  className='navbar navbar-expand-mb navbar-dark- bg-dark'>
                <div>
                  <h1></h1>
                    <Link  to="record" className='navbar-brand'> Inicio </Link>
                </div>
                <Link to='/record/'><button className='btn btn-danger'  onClick={limpiarstorage}> Log Out </button></Link>

            </nav>
        </header>
    </div>
  )
}
export default HeaderComponent;