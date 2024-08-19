import axios from "axios";

// const Clientes_BASE_REST_API =  "http://172.18.2.87:8080/recordatorios/api/v1/clientes";
const Clientes_BASE_REST_API =  "http://localhost:8080/recordatorios/api/v1/clientes";
// const Usuario_BASE_REST_API = "http://172.18.2.87:8080/recordatorios/api/v1/usuario";
const Usuario_BASE_REST_API =  "http://localhost:8080/recordatorios/api/v1/usuario";
// const matrizcd_BASE_REST_API =   "http://172.18.2.87:8080/recordatorios/api/v1/matrizcd";
const matrizcd_BASE_REST_API =  "http://localhost:8080/recordatorios/api/v1/matrizcd";

class Clienteservice {
  getAllClientes() {
    return axios.get(Clientes_BASE_REST_API);
  }
  createClientes(Clientes) {
    return axios.post(Clientes_BASE_REST_API, Clientes);
  }
  getClientesById(ClientesId) {
    return axios.get(Clientes_BASE_REST_API + "/" + ClientesId);
  }
  updateClientes(ClientesId, Clientes) {
    return axios.put(Clientes_BASE_REST_API + "/" + ClientesId, Clientes);
  }
  deleteClientes(ClientesId) {
    return axios.delete(Clientes_BASE_REST_API + "/" + ClientesId);
  }

  getAllUsuario() {
    return axios.get(Usuario_BASE_REST_API);
  }
  createUsuario(Usuario) {
    return axios.post(Usuario_BASE_REST_API, Usuario);
  }
  getUsuarioById(UsuarioId) {
    return axios.get(Usuario_BASE_REST_API + "/" + UsuarioId);
  }
  getAllmatrizcd() {
    return axios.get(matrizcd_BASE_REST_API);
  }
  updatematrizcd(MatrizId, RegistroMatriz) {
    return axios.put(matrizcd_BASE_REST_API + "/" + MatrizId, RegistroMatriz);
  }
  getnuevapo(OrdenC){
    return axios.get(matrizcd_BASE_REST_API + "/NuevaPO/" + OrdenC);

  }
}
export default new Clienteservice();
