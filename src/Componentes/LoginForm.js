import React, {useState, useNavigate, useEffect} from 'react';
import Clienteservice from '../service/ClientesService';
import { Button } from 'bootstrap';

function LoginForm({Login, error}) {
    const [details, setDetails] = useState({username:"",password:""});
    const [usuarioinfo , setUsuarios]= useState({id:"",usuario:"",constrasena:"",perfil:""});
    
      const listarUsuarios =(e)=>{
        Clienteservice.getAllUsuario().then(response =>{
            const max = response.data.length
           for (let i = 0; i < max; i++) {
            if (response.data[i].usuario === details.username && response.data[i].constrasena === details.password) {
                 Login(response.data[i]);
                {break;}
            }
            if (i == max -1 ){
              alert("usuario incorrecto ")            
            }
          }
        }).catch(error => {
          console.log(error);
        })
  
      }
    const NuevoUser  = (e) =>{
        usuarioinfo.usuario ="NuevoUser"    
    console.log(usuarioinfo.usuario)
    Login(usuarioinfo.usuario)
    }
    const handleKeyPress = (event) => {
      if(event.key === 'Enter'){
        listarUsuarios();
      }
    }
  return (
    <div style={{margin:40,height:185,width:300,backgroundColor:'gray' ,backgroundRepeat:'repeat-x',backgroundImage: "url('/truperimagen.jpg')"}}>
      
        <div className='form-inner'>
              <h2> Login</h2>
            {(error !="") ? ( <div className='error'>{error}</div>):""}
            <div className='form-group'>
                <label htmlFor='name'> <strong>Name: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong> </label>
                <input type='text' name='username' id='username' onChange={e => setDetails({...details, username: e.target.value})} value={details.username} />
            </div>
            <div className=''>
                <label htmlFor='password'> <strong> Password:</strong> </label>
                <input type='password' name='password' autoComplete='on' onChange={e => setDetails({...details, password: e.target.value})} onKeyPress={handleKeyPress} value={details.password}  />
            </div>
            <input type='Submit' value="LOGIN" onClick={e => listarUsuarios()}></input>
            &nbsp;&nbsp;
            &nbsp;&nbsp;
            <a href='/usuario'><input type='Submit' value="Nuevo Usuario" onClick={e => NuevoUser()}></input></a>
        </div>
    </div>
  );
  }
  
export default LoginForm;