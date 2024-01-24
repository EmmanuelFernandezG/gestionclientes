import axios from "axios";

const Clientes_BASE_REST_API = "http://localhost:8080/api/v1/clientes";

class Clienteservice{

    getAllClientes(){
        return axios.get(Clientes_BASE_REST_API);
    }
    createClientes(Clientes){
        console.log(Clientes)
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
}
export default new Clienteservice;