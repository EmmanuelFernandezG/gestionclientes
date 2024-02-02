import React, {useState} from 'react'
import Clienteservice from '../service/ClientesService';
import { useNavigate } from 'react-router-dom';

function AgregarUsuario() {
    const [details, setDetails] = useState({email:"",usuario:"",constrasena:"", perfil:"",password:""});
    const navigate = useNavigate();
    
    const limpiarstorage = () => {
        localStorage.clear();
      }

      const listarUsuarios =(e)=>{
        Clienteservice.getAllUsuario().then(response =>{
            const max = response.data.length
            var validacion = (false)
           for (let i = 0; i < max; i++) {
            console.log(response.data[i])
            if (response.data[i].email === details.email ) {
                alert("usuario " + details.email  +  " Ya Existe")
                var validacion = (true)
                setDetails({email:"",usuario:"",constrasena:"", perfil:"",password:""})
                {break;}
            }            
        }
        if(validacion==false){
            AceptarNuevoOK();
        }

    }).catch(error => {
          console.log(error);
        })
  
      }


const AceptarNuevoOK = ()=>{
    Clienteservice.createUsuario(details).then(response =>{
        console.log(response.data);
        localStorage.clear();
        navigate('/');
        window.location.reload(false);
    }).catch(error => {
      console.log(error);
    })
    }

  return (
    <div >
                <div className='form-inner'>
            <h2> Nuevo Usuario </h2>
            <div className='form-group'>
                <label htmlFor='email'> Email: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                <input type='email' name='email' id='email' onChange={e => setDetails({...details, email: e.target.value})} value={details.email} />
            </div>
            <br></br>
            <div className='form-group'>
                <label htmlFor='name'> Usuario: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                <input type='text' name='usuario' id='usuario' onChange={e => setDetails({...details, usuario: e.target.value})} value={details.usuario} />
            </div>
            <br></br>
            <div className=''>
                <label htmlFor='password'>Password:  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                <input type='password' name='constrasena' autoComplete='on' onChange={e => setDetails({...details, constrasena: e.target.value})} value={details.constrasena}  />
            </div>
            <br></br>
            <div className=''>
                <label htmlFor='password'> Repetir Password:  </label>
                <input type='password' name='password' autoComplete='on' onChange={e => setDetails({...details, password: e.target.value})} value={details.password}  />
            </div>
            <br></br>
            <div className='form-group'>
                <label htmlFor='perfil'> Perfil: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                <select type='text' name='perfil' id='perfil' onChange={e => setDetails({...details, perfil: e.target.value})} value={details.perfil} >
                <option>Seleccionar...</option>
                <option>usuario</option>
                <option disabled>admin</option>
                    </select>
            </div>
            <br></br>
            {details.usuario !="" &&  details.constrasena != "" && details.password != "" && details.password == details.constrasena ?            
            <input  type='Submit' value="Aceptar " onClick={listarUsuarios}></input>
            :
            <input  disabled type='Submit' value="Aceptar "></input>
             }
            <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <a href='/'><input type='Submit' value="Cancelar " onClick={limpiarstorage}></input></a>
            &nbsp;&nbsp;
            &nbsp;&nbsp;
        </div>

    </div>
  )
}

export default AgregarUsuario