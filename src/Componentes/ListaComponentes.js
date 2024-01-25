import React, { useEffect, useState } from 'react'
import Clienteservice from '../service/ClientesService';
import { Link , useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';

export const ListaComponentes = () => {
  
    const [Clientes , setClientes]= useState([]);
    useEffect(() =>{
      listarClientes();
    },[])
    const listarClientes =()=>{
      Clienteservice.getAllClientes().then(response =>{
        setClientes(response.data);
        console.log(response.data);
      }).catch(error => {
        console.log(error);
      })

    }

    const deleteClientes = (ClientesId) => {
      Clienteservice.deleteClientes(ClientesId).then((response)=>{
        listarClientes();
      }).catch(error =>{
        console.log(error)
      })
    }
  return (
    <div style={{margin:5 , zoom: '90%'}}>
      <h2 className='text-center'> Recordatorios </h2>
      <Link to="/add-Clientes" className='btn btn-primary mb-2'>Agregar Recordatorio</Link>
      <table  className='table table-bordered table-striped'>
      <thead >  
        <th>Direccion</th>
        <th>Director</th>
        <th>Tipo</th>
        <th>Folio</th>
        <th>Recordatorio</th>
        <th>Frecuencia de envío</th>
        <th>Titular</th>
        <th>Dia</th>
        <th>Fecha Programada</th>
        <th>Frecuencia</th>
        <th>Estatus</th>
        <th>Comentarios</th>
        <th>Acciones</th>
        </thead> 
      <tbody>
        {
          Clientes.map(
              Clientes =>
              <tr key={Clientes.id +1}>
                <td>{Clientes.direccion}</td>
                <td>{Clientes.director}</td>
                <td>{Clientes.tipo}</td>
                <td>{Clientes.folio}</td>
                <td>{Clientes.textorecordatorio}</td>
                <td>{Clientes.frecuenciatipo}</td>
                <td>{Clientes.titular}</td>
                <td>{Clientes.diaenvio}</td>
                <td>{Clientes.fechaprogramada}</td>
                <td>{Clientes.frecuencia}</td>
                <td>{Clientes.estatus}</td>
                <td>{Clientes.comentarios}</td>
                <td>
                  <Stack direction='row' spacing={1}>
                  <Link className='btn btn-success' to={`/edit-Clientes/${Clientes.id}`}>Actualizar</Link>
                  <button style={{marginLeft:"10px" }} className='btn btn-danger' onClick={() => deleteClientes(Clientes.id) }>Eliminar</button>
                  </Stack>
                </td>
              </tr>
          )
        }        
      </tbody>
      </table>
    </div>
  )
}
export default ListaComponentes;