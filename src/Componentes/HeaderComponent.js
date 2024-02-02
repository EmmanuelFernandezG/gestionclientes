import React from 'react'

const limpiarstorage = () => {
  localStorage.clear();
}

export const HeaderComponent = () => {

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
                <a href='/'><button className='btn btn-danger'  onClick={limpiarstorage}> Log Out </button></a>

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
                    <a href="/" className='navbar-brand'> Inicio </a>
                </div>
                <a href='/'><button className='btn btn-danger'  onClick={limpiarstorage}> Log Out </button></a>

            </nav>
        </header>
    </div>
  )
}
export default HeaderComponent;