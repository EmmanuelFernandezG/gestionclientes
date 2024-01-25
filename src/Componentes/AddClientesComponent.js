import React, { useEffect, useState } from 'react'
import Clienteservice from '../service/ClientesService';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';


export const AddClientesComponent = () => {
    const [direccion , setdireccion] = useState('');
    const [director , setdirector] = useState('');
    const [tipo , settipo] = useState('');
    const [folio , setfolio] = useState('');
    const [folionew , setfolionew] = useState('');
    const [frecuenciatipo , setfrecuenciatipo] = useState('');
    const [titular , settitular] = useState('');
    const [frecuencia , setfrecuencia] = useState('');
    const [diaenvio , setdiaenvio] = useState('');
    const [fechaprogramada , setfechaprogramada] = useState('');
    const [estatus , setestatus] = useState('');
    const [comentarios , setcomentarios] = useState('');
    const [textorecordatorio , settextorecordatorio] = useState('');
    const [Clientes , setClientes]= useState([]);
    const navigate = useNavigate();
    const {id} =useParams();


    function myfunction(e){

        if (folionew - folionew === 0){
            
            const numero = folionew.toString().padStart(3,'0');
            settipo(e)    
            setfolio(direccion.substring(0,3) + '-' + numero + '-' + e.substring(0,3));

        }else{
            console.log("numero ")

        }
    }
    const saveOrUpdateClientes = (e) => {
        e.preventDefault();
        const Clientes = {direccion,director, tipo, folio , textorecordatorio, frecuenciatipo, titular , frecuencia, diaenvio, fechaprogramada, estatus, comentarios};
        if(id){
            Clienteservice.updateClientes(id,Clientes).then((response) =>{
                console.log(response.data);
                navigate('/clientes');
            }).catch(error => {
                console.log(error)
            })
        }
        else{

            Clienteservice.createClientes(Clientes).then((response) =>{
                console.log( response.data);
                navigate('/clientes');
            }).catch(error => {
                console.log(error)
            })
    
        }
    }

    useEffect(()=>{
        setClientes();

        if(id){
        Clienteservice.getClientesById(id).then((response)=>{
            setdireccion(response.data.direccion);
            setdirector(response.data.director);
            settipo(response.data.tipo);
            setfolio(response.data.folio);
            settextorecordatorio(response.data.textorecordatorio);
            setfrecuenciatipo(response.data.frecuenciatipo);
            settitular(response.data.titular);
            setfrecuencia(response.data.frecuencia);
            setdiaenvio(response.data.diaenvio);
            setfechaprogramada(response.data.fechaprogramada);
            setestatus(response.data.estatus);
            setcomentarios(response.data.comentarios);
        }).catch(error=>{
            console.log(error)
        })
    }else{
        Clienteservice.getAllClientes().then(response =>{
            setfolionew(response.data.length + 1  );
            
          }).catch(error => {
            console.log(error);
          })
    
    }
    },[])

    const title =()=>{
        if(id){
            return (
                <Stack direction='row'>
                   <Link onClick={() => navigate(-1)} className='btn btn-secondary mb-2'> Atras </Link>
                    <h2 className='text-center'> Actualizar Recordatorio</h2> 
                </Stack>
                )
            }
        else{

            return (
            <Stack direction='row'>
               <Link onClick={() => navigate(-1)}  className='btn btn-secondary mb-2'> Atras </Link>
                <h2 className='text-center'> Agregar Recordatorio</h2> 
            </Stack>
            )
        }
    }

    return (
    <div>
        <div className='container'>
        <div className='row'>
        <div className='card col-md-6 offset-md-3 offset-md-3'>    
        <h2 className='text-center'> { title()} </h2>
        <div className='card-body'>
    </div>
        <form>
        <div className='form-group -mb-2'>
                <label className='form-label'>Direccion</label>
                <select 
                type='text' 
                placeholder='Digite Direccion' 
                name='direccion' 
                className='form-control' 
                value={direccion} 
                onChange={(e) => setdireccion(e.target.value)}
                 >
                   <option> Seleccionar... </option> 
                   <option> Importaciones </option> 
                   <option> Exportaciones </option> 
                   <option> Planta </option> 
                 </select>
        </div>
        <div className='form-group -mb-2'>
                <label className='form-label'>Director</label>
                <select 
                type='text' 
                placeholder='Digite Director' 
                name='director' 
                className='form-control' 
                value={director} 
                onChange={(e) => setdirector(e.target.value)}
                >
                <option> Seleccionar... </option> 
                <option> Fernando Pelusi de Icaza </option> 
                <option> Gil Morley </option> 
                <option> Sergio Isunza </option> 
              </select>
     </div>
        <div className='form-group -mb-2'>
                <label className='form-label'>Tipo</label>
                <select 
                onChange={(e)=> myfunction(e.target.value)}
                type='text' 
                placeholder='Digite Tipo' 
                name='tipo' 
                className='form-control' 
                value={tipo} 
                >
                <option> Seleccionar... </option> 
                <option> DG </option> 
                <option> INTERNO </option> 
              </select>

        </div>
        <div className='form-group -mb-2'>
                <label className='form-label'>Folio</label>
                <input 
                disabled  
                type='text' 
                placeholder='Digite Folio' 
                name='folio' 
                className='form-control' 
                value={folio} 
                onChange={(e) => setfolio(e.target.value)}
                 />
        </div>
        <div className='form-group -mb-2'>
                <label className='form-label'>recordatorio</label>
                <input 
                type='text' 
                placeholder='Digite Recordatorio' 
                name='textorecordatorio' 
                className='form-control' 
                value={textorecordatorio} 
                onChange={(e) => settextorecordatorio(e.target.value)}
                 />
        </div>
        <div className='form-group -mb-2'>
                <label className='form-label'>Frecuencia </label>
                <select 
                type='text' 
                placeholder='Digite Frecuencia Envio' 
                name='frecuenciatipo' 
                className='form-control' 
                value={frecuenciatipo} 
                onChange={(e) => setfrecuenciatipo(e.target.value)}
                >
                    <option>Quincenal</option>
                    <option>Mensual</option>
                    <option>Semanal</option>
                    <option>Trimestral</option>
                    <option>Bimestral</option>
                    <option>Semestral</option>
                    <option>Cuatrimestral</option>
                    <option>72horas</option>
                    <option>48 horas</option>
                    <option>Anual</option>
                    <option>Diario</option>
              </select>

        </div>
        <div className='form-group -mb-2'>
                <label className='form-label'>Titular</label>
                <select 
                type='text' 
                placeholder='Digite Titular' 
                name='titular' 
                className='form-control' 
                value={titular} 
                onChange={(e) => settitular(e.target.value)}
                >
            <option>Adrien Moreno</option>
            <option>Anwar Ortiz</option>
            <option>Edwige Wegiel</option>
            <option>Fernando Pelusi</option>
            <option>Gil Morley</option>
            <option>Juan Carlos Oneto</option>
            <option>Sergio Isunza</option>
          </select>

        </div>
        <div className='form-group -mb-2'>
                <label className='form-label'>Frecuencia Envio</label>
                <input 
                type='text' 
                placeholder='Digite Frecuencia Envio' 
                name='frecuencia' 
                className='form-control' 
                value={frecuencia} 
                onChange={(e) => setfrecuencia(e.target.value)}
                 />
        </div>
        <div className='form-group -mb-2'>
                <label className='form-label'>Dia de Envio</label>
                <select 
                type='text' 
                placeholder='Digite Dia de Envio' 
                name='diaenvio' 
                className='form-control' 
                value={diaenvio} 
                onChange={(e) => setdiaenvio(e.target.value)}
                >
                <option>Lunes</option>
                <option>Martes</option>
                <option>Miercoles</option>
                <option>Jueves</option>
                <option>Viernes</option>
                <option>Sabado</option>
                <option>Domingo</option>
              </select>
    
        </div>
        <div className='form-group -mb-2'>
                <label className='form-label'> Fecha Programada </label>
                <input 
                type='date' 
                placeholder='Digite fecha Programada' 
                name='fechaprogramada' 
                className='form-control' 
                value={fechaprogramada} 
                onChange={(e) => setfechaprogramada(e.target.value)}
                 />
        </div>
        <div className='form-group -mb-2'>
                <label className='form-label'>Estatus </label>
                <select 
                type='text' 
                placeholder='Digite Estatus' 
                name='estatus' 
                className='form-control' 
                value={estatus} 
                onChange={(e) => setestatus(e.target.value)}
                >
                <option> Seleccione... </option>
                <option> Vigente </option>
                <option> Caducado </option>
              </select>
    
        </div>
        <div className='form-group -mb-2'>
                <label className='form-label'>Comentarios </label>
                <input 
                type='text' 
                placeholder='Digite Comentarios' 
                name='comentarios' 
                className='form-control' 
                value={comentarios} 
                onChange={(e) => setcomentarios(e.target.value)}
                 />
        </div>
            <button className='btn btn-success' onClick={ (e) => saveOrUpdateClientes(e) } >Guardar</ button>
            &nbsp;&nbsp;
            <Link to='/Clientes' className='btn btn-danger'>Cancelar</Link>
        </form>
        </div>
        </div>    
        </div>        
    </div>
  )
}

export default AddClientesComponent;