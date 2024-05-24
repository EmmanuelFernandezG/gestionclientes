import axios from "axios";

const Clientes_BASE_REST_API =  "http://172.18.34.219:8080/recordatorios/api/v1/clientes";
// //  const Clientes_BASE_REST_API = "http://localhost:8080/recordatorios/api/v1/clientes";
const Usuario_BASE_REST_API = "http://172.18.34.219:8080/recordatorios/api/v1/usuario";    
// //  const Usuario_BASE_REST_API =   "http://localhost:8080/recordatorios/api/v1/usuario";

class Clienteservice{

    getAllClientes(){
        return axios.get(Clientes_BASE_REST_API);
    }
    createClientes(Clientes){
        return axios.post(Clientes_BASE_REST_API,Clientes);
    }    
    getClientesById(ClientesId){
        return axios.get(Clientes_BASE_REST_API + '/' + ClientesId);
    }
    updateClientes(ClientesId,Clientes){
        return axios.put(Clientes_BASE_REST_API +'/' + ClientesId,Clientes)
    }
    deleteClientes(ClientesId){
        return axios.delete(Clientes_BASE_REST_API + '/' + ClientesId)
    }

    getAllUsuario(){
        return axios.get(Usuario_BASE_REST_API);
    }
    createUsuario(Usuario){
        return axios.post(Usuario_BASE_REST_API,Usuario);
    }    
    getUsuarioById(UsuarioId){
        return axios.get(Usuario_BASE_REST_API + '/' + UsuarioId);
    }
}


export default new Clienteservice;