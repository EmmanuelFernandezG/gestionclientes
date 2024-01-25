import React, { useEffect, useState } from 'react'
import Clienteservice from '../service/ClientesService';
import { Link , useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';

export const Inicio = () => {
 
  return (

          <div className='container' >
      <h2 className='text-center'> Recordatorios </h2>
      
      <div className="imgbox">
      </div>      
      <br></br>
        <Stack className='btn btn-warning' direction="column" height={180} spacing={2} style={{backgroundColor:'ButtonShadow'}}>
          <h3 className='text-center'> Unidades de Negocio </h3>
        <Stack direction='row' spacing={2}>
              <a href='/clientes'><button className="button-10" role="button">
              <span className="text"> Importaciones </span>
            </button></a>

            <a href='/'><button className="button-10" role="button">
              <span className="text"> Direccion () </span>
            </button></a>

            <a href='/'><button className="button-10" role="button">
              <span className="text"> Direccion () </span>
            </button></a>


          </Stack>
        </Stack>
        <div className="imgbox"></div>
    </div>


  )
}
export default Inicio;