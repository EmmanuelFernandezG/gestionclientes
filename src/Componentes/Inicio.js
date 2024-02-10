import React, { useEffect, useState } from 'react'
import Clienteservice from '../service/ClientesService';
import { Link , useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import ListaComponentes from './ListaComponentes';



export const Inicio = () => {

  const navigate = useNavigate();

  const direc = (e) =>{
    // console.log(e.target.value)
        navigate('/record/clientes' , {state:{e: e.target.value}});

  } 
 
  return (

          <div className='container' >
      <h2 className='text-center'> Recordatorios </h2>
      
      <div className="imgbox">
      </div>      
      <br></br>
      <Link to="/record/add-Clientes" className='btn btn-primary mb-2'>Agregar Recordatorio</Link>
        <Stack className='btn btn-warning' direction="column" height={180} spacing={2} style={{backgroundColor:'ButtonShadow'}}>
          <h3 className='text-center'> Unidades de Negocio </h3>
        <Stack direction='row' spacing={2}>

            <button  className="button-10" onClick={e => {direc(e)}} value ="Importaciones" role="button">
              Importaciones
            </button>
            <button  className="button-10" onClick={e => {direc(e)}} value ="Exportaciones" role="button">
              Exportaciones
            </button>

            <button  className="button-10" onClick={e => {direc(e)}} value ="Planta" role="button">
              Planta
            </button>


          </Stack>
        </Stack>
        <div className="imgbox"></div>
    </div>


  )
}
export default Inicio;