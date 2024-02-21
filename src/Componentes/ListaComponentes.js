import React, { useEffect, useState } from 'react'
import Clienteservice from '../service/ClientesService';
import { Link , useLocation, useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';

export const ListaComponentes = () => {
  const [director , setDirector]= useState([]);
  const [titular , setTitular]= useState([]);
  const [Clientes , setClientes]= useState([]);
  const location = useLocation();
  const [nwarr , setnwarr]=useState([]); 
  const navigate = useNavigate();
    useEffect(() =>{
    listarClientes();
    },[])
    const listarClientes =(a)=>{
      
      if(typeof a === 'undefined' ){
        Clienteservice.getAllClientes().then(response =>{

          let i = 0;
          for(i=0;i<response.data.length ;i++){
            if(response.data[i].direccion == location.state.e  ){
              const exist = director.includes(response.data[i].director)
              if (exist == false){
                director.push(response.data[i].director)              
              }
              const existtitul = titular.includes(response.data[i].titular)
              if (existtitul == false){
                titular.push(response.data[i].titular)              
              }
              nwarr.push(response.data[i])
            setClientes(nwarr)
          }}
        }
        ).catch(error => {
          console.log(error);
        })        
      }else{
        if (typeof a != 'undefined' ){
        const nwarr = new Array();
        const titular = new Array();
        Clienteservice.getAllClientes().then(response =>{

          let i = 0;
          for(i=0;i<response.data.length ;i++){

            if(response.data[i].direccion == location.state.e && response.data[i].director == a.target.value  && a.target.id == "director" ){
              const director = new Array();
              setClientes(director)
              const exist = director.includes(response.data[i].director)
              if (exist == false){
                director.push(response.data[i].director)              
              }
              const existtitul = titular.includes(response.data[i].titular)
              if (existtitul == false){
                titular.push(response.data[i].titular)              
              }
              nwarr.push(response.data[i])
            setClientes(nwarr)
            setTitular(titular)
          }
          if(response.data[i].direccion == location.state.e && response.data[i].titular == a.target.value  && a.target.id == "titular" && response.data[i].director == Clientes[0].director ){
            const existtitul = titular.includes(response.data[i].titular)

                    if (existtitul == false){
                      titular.push(response.data[i].titular)              
                    }
                    nwarr.push(response.data[i])
                    setClientes(nwarr)
        
        }
        }
        }
        ).catch(error => {
          console.log(error);
        })        
    }  
  }
}


    const deleteClientes = (ClientesId) => {
      Clienteservice.deleteClientes(ClientesId).then((response)=>{
        listarClientes();
        navigate(0)
      }).catch(error =>{
        console.log(error)
      })
    };
    const almacenlocalusuario = localStorage.getItem('username');
    const almacenlocalpassword = localStorage.getItem('password');

    if(almacenlocalusuario == "efernandezg" || almacenlocalusuario == "lgrochah" ) {

      let max = Clientes.length
      for (let i = 0; i < max; i++) {

      }

    return (
    <div style={{margin:-70 , zoom: '90%'}}>
      <br></br>
      <br></br>
      <br></br>
      <h2 className='text-center'> Recordatorios {location.state.e} </h2>
 <Stack direction='row'>
  <Stack direction={'column'} style={{backgroundColor:"#FCE8C8" , maxWidth:'25%'}}>     
      <h4><strong>Filtro Por Director</strong></h4>
<Stack  direction="row" spacing={5} >
{
  director.map(
    director =>
    <Stack maxWidth={"70%"}>
      <label for={director}>{director}</label>
      <input  style={{height:20}}  onClick={(a)=> listarClientes(a) } type="radio" id="director" name="director" value={director}></input>
    </Stack> 
        )}
</Stack>
</Stack>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<Stack direction={'column'} style={{backgroundColor:"#FCE8C8" , maxWidth:'25%'}}>    
 
      <h4><strong>Filtro Por Titular</strong></h4>
<Stack  direction="row" spacing={5} >
{
  titular.map(
    titular =>
    <Stack>
      <label for={titular}>{titular}</label>
      <input style={{height:20}} onClick={(a)=> listarClientes(a) } type="radio" id="titular" name="titular" value={titular}></input>
    </Stack> 
        )}
</Stack>
</Stack>

</Stack>
<br></br>
      <table  id='myTable'  className='table table-bordered table-striped'>
      <thead  style={{backgroundColor:'#EE914F', color:'white', textAlign:'center'}} >  
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
               <tr key={Clientes.id }>
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
                 <td></td>
                 {/* <td>{Clientes.estatus}</td> */}
                 <td>{Clientes.comentarios}</td>
                 <td>
                   <Stack direction='row' spacing={1}>
                   <Link className='btn btn-success' to={`/record/edit-Clientes/${Clientes.id}`}>Actualizar</Link>
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
}else{
  return (
    <div style={{margin:5 , zoom: '90%'}}>
      <h2 className='text-center'> Recordatorios </h2>
      {/* <Link to="/add-Clientes" className='btn btn-primary mb-2'>Agregar Recordatorio</Link> */}
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
        {/* <th>Acciones</th> */}
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
                {/* <td>
                  <Stack direction='row' spacing={1}>
                  <Link className='btn btn-success' to={`/edit-Clientes/${Clientes.id}`}>Actualizar</Link>
                  <button style={{marginLeft:"10px" }} className='btn btn-danger' onClick={() => deleteClientes(Clientes.id) }>Eliminar</button>
                  </Stack>
                </td> */}
              </tr>
          )
        }        
      </tbody>
      </table>
    </div>
  )
}
}
export default ListaComponentes;