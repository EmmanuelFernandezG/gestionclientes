import React, { useEffect, useState } from 'react'
import Clienteservice from '../service/ClientesService';
import { Link , useLocation, useNavigate , useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import {Alert, Dialog, DialogContent, DialogTitle, alertTitleClasses} from '@mui/material/';
import { Input } from '@mui/joy';

export const ListaComponentes = () => {
  const [director , setDirector]= useState([]);
  const [titular , setTitular]= useState([]);
  const [Clientes , setClientes]= useState([]);
  const location = useLocation();
  const [nwarr , setnwarr]=useState([]); 
  const [folioElim , setfolioElim ]= useState({direccion:"",director:"", tipo:"", folio:"" , textorecordatorio:"", frecuenciatipo:"", titular:"" , frecuencia:"", diaenvio:"", fechaprogramada:"", estatus:"", comentarios:"", respuesta:false}); 
  const navigate = useNavigate();
  const [view, setView] = useState(false);
const key = ""
const [valorFolio, setvalorFolio]= useState('');

    const clickDir = (e)=>{
      setvalorFolio("")
      listarClientes(e);
    }
    const handleKeyPress = (event) => {
      if(event.key === 'Enter'){
        listarClientes();
      }
    }
    const deleteClientes = (folioElim) => {
      let id = folioElim.id;
      folioElim.respuesta = "true"
      Clienteservice.updateClientes(id,folioElim).then((response) =>{
            setView(false)
            navigate(0);}
            ).catch(error => {
            console.log(error)
        })
   };
   const handleClose = () => {
       setView(false);
    }
    const Popop = (Cliente)=>{
      setfolioElim(Cliente)
      setView(true)
    }
    useEffect(() =>{
      listarClientes();
      },[]);
  
if(view){
  return(
    <Dialog onClose={handleClose} open={view}>
    <DialogTitle>Confirma eliminar permanentemente </DialogTitle>
    <DialogContent style={{fontSize:22}}>  Folio : {folioElim.folio}  </DialogContent>
    <Stack direction="row">
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button className='btn btn-success' onClick={() => deleteClientes(folioElim)}> Confirmar </button>    
      <button style={{marginLeft:"10px" }} className='btn btn-danger' onClick={handleClose}>Cancelar </button>
    </Stack>
    <br></br>
  </Dialog>  );
};
    const listarClientes =(a)=>{
      const nwarr = new Array();
      if(typeof a === 'undefined' ){
        Clienteservice.getAllClientes().then(response =>{
          let i = 0;
          for(i=0;i<response.data.length ;i++){    
            if (valorFolio === ""){
              if(response.data[i].direccion === location.state.e && response.data[i].respuesta === "false"){
              const exist = director.includes(response.data[i].director)
              if (exist === false){
                director.push(response.data[i].director)              
              }
              nwarr.push(response.data[i])
            setClientes(nwarr)
          }}
          else{
            let texto = response.data[i].textorecordatorio 
            let result = texto.toUpperCase();
              if( result.includes(valorFolio.toUpperCase())){
                nwarr.push(response.data[i])
            setClientes(nwarr)
          }
          }}}

        ).catch(error => {
          console.log(error);
        })        
      }else{
        if (typeof a != 'undefined' ){
        Clienteservice.getAllClientes().then(response =>{

          let i = 0;
          for(i=0;i<response.data.length ;i++){

            if(response.data[i].direccion === location.state.e && response.data[i].director === a.target.value  && a.target.id === "director" && response.data[i].respuesta === "false" ){
              const director = new Array();
              setClientes(director)
              const exist = director.includes(response.data[i].director)
              if (exist === false){
                director.push(response.data[i].director)              
              }
              nwarr.push(response.data[i])
            setClientes(nwarr)

          }
        }}
        ).catch(error => {
          console.log(error);
        })}}}

    const almacenlocalusuario = localStorage.getItem('username');
    const almacenperfil = localStorage.getItem("perfil")
    const almacenlocalpassword = localStorage.getItem('password');
    let max = Clientes.length
      for (let i = 0; i < max; i++) {
      }
    return (
    <div style={{margin:-70 , zoom: '90%'}}>
      <br></br>
      <br></br>
      <br></br>
      <h4 className='text-center'> Recordatorios {location.state.e} </h4>
 <Stack direction='row' >
  <Stack direction={'column'} style={{height:100, maxWidth:'40%', outlineStyle:"auto"}}>     
      <br></br>
      <h6><strong>&nbsp; Filtro Por Director </strong></h6>
<Stack  direction="row" spacing={3} >
{
  director.map(
    director =>
    <Stack maxWidth={"70%"}>
      <label style={{fontSize:12, textAlign:"center"}} for={director}>  &nbsp; {director}   </label>
      <input  style={{height:20}}  onClick={(a)=> clickDir(a) } type="radio" id="director" name="director" value={director}></input>
      <br></br> 
    </Stack>
        )}
</Stack>
</Stack>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

<Stack marginTop={6} direction="column">
  <h6><strong>&nbsp; Filtro por palabra Recordatorio </strong></h6>
  <Stack direction="row">
    <input  onChange={e => setvalorFolio(e.target.value)} onKeyPress={handleKeyPress}  style={{height:30}} type="text" id="folio" name="folio" placeholder='Digite FOLIO' value={valorFolio} ></input>
    &nbsp;
    <button  onClick={(e)=>{listarClientes()}}>Buscar</button>
</Stack>
</Stack>

</Stack>
<br></br><br></br>
      <table  id='myTable'  className='table table-bordered table-striped' style={{outlineStyle:"inset"}}>
      <thead  style={{fontSize:12, backgroundColor:'#949293', color:'white', textAlign:'center'}} >  
         {/* <th style={{width:120}} >Director</th> */}
        <th style={{width:80}}>Tipo</th>
        <th style={{width:120}} >Folio</th>
        <th style={{width:100}}>Frecuencia de envío</th>
        <th style={{width:130}} >Titular</th>
        <th style={{width:100}}>Fecha Inicio</th>
        <th style={{width:150}}>Dia de envío </th>
        <th style={{width:100}}>Fecha Programada</th>
        {/* {almacenperfil === "admin" || almacenperfil === "usuarioseguimiento"  ?
            <th style={{width:150}}>Comentarios</th>
          : 
          <></>
          } */}
        <th style={{width:310}}>Recordatorio</th>
        {almacenperfil === "admin" ?
        <th style={{width:100}}>Estatus</th>
        :
        <></>
        }
        {almacenperfil === "admin" ?
          <th style={{width:100}}>Editar / Eliminar</th>
        :
          <></>
        }
        </thead> 
        <tbody>
  {
    Clientes
      .slice() // Copia el arreglo para evitar mutar el original
      .sort((a, b) => new Date(a.fechaprogramada) - new Date(b.fechaprogramada)) // Ordena por fechaprogramada
      .map(Cliente => (
        <tr key={Cliente.id}>
          <td style={{fontSize:12, alignContent:'center'}}>{Cliente.tipo}</td>
          <td style={{fontSize:12, alignContent:'center'}}>{Cliente.folio}</td>
          <td style={{fontSize:12, alignContent:'center'}}>{Cliente.frecuenciatipo}</td>
          <td style={{fontSize:12, alignContent:'center'}}>{Cliente.titular}</td>
          <td style={{fontSize:12, alignContent:'center'}}>{Cliente.fechainicial}</td>
          <td style={{fontSize:12, alignContent:'center'}}>{Cliente.diaenvio}</td>
          {
            (Math.floor(new Date(Cliente.fechaprogramada).getTime() - new Date().getTime()) / 8.64e7) < 2 ?
                <td style={{ fontSize: 11, alignContent: 'center', backgroundColor: "red" }}>
                  {new Date(Cliente.fechaprogramada).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}</td>
            : (Math.floor(new Date(Cliente.fechaprogramada).getTime() - new Date().getTime()) / 8.64e7) > 15 ?
              <td style={{fontSize:11,alignContent:'center' , backgroundColor:"green"}}>                  
              {new Date(Cliente.fechaprogramada).toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
              })}</td>

            : (Math.floor(new Date(Cliente.fechaprogramada).getTime() - new Date().getTime()) / 8.64e7) < 15 ?
              <td style={{fontSize:11,alignContent:'center' ,backgroundColor:"#DA851D"}}>                  
              {new Date(Cliente.fechaprogramada).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}</td>

            : <td>{new Date(Cliente.fechaprogramada).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}</td>

          }
          {/* Renderización condicional de comentarios y estatus */}
          { almacenperfil === "admin" || almacenperfil === "usuarioseguimiento" ?
            <td style={{fontSize:12, alignContent:'center'}}>{Cliente.comentarios}</td>
          : null }
          { almacenperfil === "admin" ?
            <td>{Cliente.estatus}</td>
          : null }
          { almacenperfil === "admin" ?
            <td>
              <Stack direction='row' spacing={1}>
                <Link className='btn btn-success' to={`/record/edit-Clientes/${Cliente.id}`}>🖉</Link>
                <button style={{marginLeft:"10px"}} className='btn btn-danger' onClick={() => Popop(Cliente)}>❌</button>
              </Stack>
            </td>
          : null }
        </tr>
      ))
  }
</tbody>
      </table>
      <br></br>

    </div>
  )
}
export default ListaComponentes;