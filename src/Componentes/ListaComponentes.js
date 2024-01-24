import React, { useEffect, useState } from 'react'
import Clienteservice from '../service/ClientesService';
import { Link , useNavigate } from 'react-router-dom';

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
      <table style={{whiteSpace:'nowrap'}} className='table table-bordered table-striped'>
        <th>ID</th>
        <th>Direccion</th>
        <th>Director</th>
        <th>Tipo</th>
        <th>Folio</th>
        <th>Recordatorio</th>
        <th>Frecuencia de envío</th>
        <th>Titular</th>
        <th>Frecuencia</th>
        <th>Dia</th>
        <th>Fecha Programada</th>
        <th>Estatus</th>
        <th>Comentarios</th>
        <th>Acciones</th>
        
      <tbody>
        {
          Clientes.map(
              Clientes =>
              <tr key={Clientes.id}>
                <td>{Clientes.id}</td>
                <td>{Clientes.direccion}</td>
                <td>{Clientes.director}</td>
                <td>{Clientes.tipo}</td>
                <td>{Clientes.folio}</td>
                <td>{Clientes.textorecordatorio}</td>
                <td>{Clientes.frecuenciatipo}</td>
                <td>{Clientes.titular}</td>
                <td>{Clientes.frecuencia}</td>
                <td>{Clientes.diaenvio}</td>
                <td>{Clientes.fechaprogramada}</td>
                <td>{Clientes.estatus}</td>
                <td>{Clientes.comentarios}</td>
                <td>
                  <Link className='btn btn-info' to={`/edit-Clientes/${Clientes.id}`}>Actualizar</Link>
                  <button style={{marginLeft:"10px" }} className='btn btn-danger' onClick={() => deleteClientes(Clientes.id) }>Eliminar</button>
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