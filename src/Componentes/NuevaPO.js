import React, { Fragment, useState } from "react";
import ClientesService from "../service/ClientesService";
import Stack from "@mui/material/Stack";
import { Input } from "@mui/material";
import { BUs } from "./materialReutilizable/RangosReusables"

function NuevaPO() {
  const [x, setx] = useState();
  const [sub, setsub] = useState();
  const[view,setview]= useState(false);
  const[view2,setview2]= useState(false);
  const[registro, setRegistro] = useState([])
  const opciones = { day: "2-digit", month: "2-digit", year: "numeric" };
 
  const crearRegistro = ()=>{
      ClientesService.createClientes(registro).then((response) =>{
            setview(false)
      }).catch((error)=>{
            console.log(error)
      })
} 
const seg_corr = (x)=>{
      if(x ==='correccion'){
            setx('correccion')
            setview2(false)
      }else{
            setx('segunda')
            setview2(false)             
      }
}
  const cerrar = ()=>{
    setsub();
    setview(false);
  };
  const ActualizarRegistro = (a) =>{
      console.log(a.target.name )
      let valor;
   if (a.target.type === "date") {
       valor = `${a.target.value}T00:00`;
 } else {
      valor = a.target.value;
 }
      setRegistro((prev) => ({...prev, [a.target.name]: valor} ))
      setRegistro((prev) => ({...prev, ["fecha_inicio"]: new Date().toISOString().split('T')[0] + "T00:00"} ))
      setRegistro((prev) => ({...prev, ["fecha_revision"]: new Date().toISOString().split('T')[0] + "T00:00"} ))
}

    const handleopen = ()=>{
      ClientesService.getnuevapo(sub).then((response) => {
      if (response.data[0].folio_tt !== undefined) {
           setRegistro(response.data[0])
           setview(true);
           setx('Correccion')
       if (response.data[0].segunda ==='NO')
            setview2(true);
         }else{
           alert("NO EXISTE PO " + sub + " en Socs")
         }
      }
    ).catch(error => {
  ClientesService.getnuevapoNA(sub).then((response) => {
    if (response.data[0]?.folio_tt !== undefined) {
      const datos = response.data[0];
      const datosFormateados = Object.fromEntries(
        Object.entries(datos).map(([clave, valor]) => {
          if (
            typeof valor === "string" &&
            /^\d{4}-\d{2}-\d{2}$/.test(valor) ) {
            return [clave, `${valor}T00:00`];
          }
          return [clave, valor];
        })
      );
      setRegistro(datosFormateados);
      setview(true);

      if (datos.segunda === 'NO') {
        setview2(true);
      }
    } else {
      alert("NO EXISTE PO " + sub + " en Socs");
    }
  }).catch(error => {
    console.log(error);
  });
});
    };

      const fechaFormateada = (fecha) => { 
           return  registro.length !== 0   ? new Date(fecha).toISOString().split('T')[0]   : ''; 
      }
if (view2){
      return(
      <div style={{padding:'10px'}}> 
      <br></br>
      <span style={{outline:'2px solid black'}}> PO  <b>{registro.folio_tt}</b> </span> &nbsp;
      <button onClick={(x)=>{ seg_corr('segunda') }} className="btn btn-success mb-2"> Segunda </button>&nbsp;
      <button onClick={(x)=>{ seg_corr('correccion') }} className="btn btn-danger mb-2"> Correccion </button>
      </div>
)
    }
    if  (view){
      registro.historial_de_modificacion = localStorage.getItem('username')       
      return(
        <Stack direction='column' >
          <br></br>
          <div>
          <h2> {x === undefined ? "Nuevo Registro" : x} </h2>
            <label for="fecha_de_recepcion" >FECHA DE RECEPCION</label> &nbsp;&nbsp;
          <input onChange={(a)=>{ActualizarRegistro(a)}} type="date" name="fecha_de_recepcion" value={registro.fecha_de_recepcion?.split('T')[0]}/>&nbsp;&nbsp;
            <label for="fecha_inicio" >FECHA INICIO</label> &nbsp;&nbsp;
          <input readOnly type="date" name="fecha_inicio" value={new Date().toISOString().split('T')[0]}/>
          </div>
          <Stack direction='column'  >
            <fieldset  style={{ outline: '1px solid black'}}> &nbsp;&nbsp;&nbsp;
            <label style={{ display:'inline-block', width:'10%'}} for='NoPO' > No Po <br></br> 
            <Input readOnly value={sub} name="NoPO" style={{borderStyle:'groove', width:'100%'}}></Input> </label>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <label style={{  display:'inline-block', width:'10%'}} for='foliott'> Folio TT <br></br> 
                <Input readOnly name="no_oc" style={{borderStyle:'groove', width:'80%'}}value={registro.no_oc}></Input></label>
                <label style={{  display:'inline-block', width:'17%'}} for='bu'> Unidad de Negocio 
                <select id="bu" name="unidad_de_negocio" style={{borderStyle:'groove', width:'100%' }} >
                        <option>{registro.unidad_de_negocio}</option>
                         {BUs.map((item) => (
                        <option key={item} value={item}>
                              {item}
                        </option>
                        ))} 
                  </select></label> &nbsp;&nbsp;
            <label  style={{  display:'inline-block', width:'15%'}} for='noprov'> Numero de Proveedor 
                <Input readOnly name="no_de_proveedor" style={{borderStyle:'groove', width:'90%' }} value={registro.no_de_proveedor}></Input></label>
            <label style={{  marginTop:'1%', display:'inline-block', width:'43%'}} for='nprov'> Proveedor 
            <input multiline='true' readOnly name="proveedor" style={{borderStyle:'groove', width:'100%' }} value={registro.proveedor}></input></label>
                <hr></hr>
                &nbsp;&nbsp;&nbsp;
            <label style={{ display:'inline-block', width:'19%'}} for='gcompras'> Gerente Compras 
                <Input readOnly name="gerente_de_compras" style={{borderStyle:'groove', width:'100%' }} value={registro.gerente_de_compras}></Input></label> &nbsp;&nbsp;
            <label style={{ display:'inline-block', width:'23%'}} for='confir'> Confirmador 
                <Input readOnly name="confirmador" style={{borderStyle:'groove', width:'100%' }} value={registro.confirmador}></Input></label> &nbsp;&nbsp;
            <label style={{ display:'inline-block', width:'10%'}}  for='etdf'> ETD 
                <Input readOnly name="etd_po" type="date" style={{borderStyle:'groove', width:'100%' }} value={fechaFormateada(registro.etd_po)}></Input></label>&nbsp;&nbsp;&nbsp;

              <label style={{ display:'inline-block', width:'12%'}}  for='ptodirecto'> Pto Directo
                <Input readOnly name="pto_directo" style={{ borderStyle:'groove', width:'100%' }} value={registro.pto_directo}></Input></label>&nbsp;&nbsp;&nbsp;
              <label style={{ display:'inline-block', width:'6%'}}  for='moneda'> Moneda 
                <Input readOnly name="moneda" style={{borderStyle:'groove', width:'100%' }} value={registro.moneda}></Input></label>&nbsp;&nbsp;&nbsp;
              <label style={{ display:'inline-block', width:'18%'}}  for='vextr'> Validaciones Extraodinarias 
                <Input readOnly name="validaciones_extraordinarias"  style={{borderStyle:'groove', width:'100%' }} value={registro.validaciones_extraordinarias}></Input></label>
                <hr></hr>
                &nbsp;&nbsp;&nbsp;
                {registro.fecha_matrices === "" ? (<></>) : ( <> <label style={{ display: 'inline-block', width: '45%' }} htmlFor='Mmatrices'> Motivo Matrices <Input multiline readOnly name="motivo_matrices" style={{ borderStyle: 'groove', width: '100%' }} value={registro.motivo_matrices}/>
    </label>
    &nbsp;&nbsp;&nbsp;
    <label style={{ display: 'inline-block', width: '18%' }} htmlFor='FMatrices'>
      Fecha Matrices
      <Input readOnly type={registro.fecha_matrices === undefined ? "" : "date"} name="fecha_matrices" style={{ borderStyle: 'groove', width: '100%' }}  value={registro.fecha_matrices === undefined ? "N/A" : registro.fecha_matrices} /></label></>)}
                <hr></hr>
          &nbsp;&nbsp;&nbsp;            
          <label style={{ display:'inline-block', width:'6%'}}  for='segunda'> 2DA 
                  <select defaultValue={x === '2da' ? 'SI' :  x === '' ? '' : registro.segunda}  onChange={(a)=>{ActualizarRegistro(a)}} name="segunda" style={{width:'100%'}}  >
                        <option>...</option>
                        <option>SI</option>
                        <option>NO</option>
                        <option>PF</option>
                  </select></label>
            &nbsp;&nbsp;&nbsp;
            <label style={{ display:'inline-block', width:'11%'}}  for='Precio'> PRECIO 
                  <select  onChange={(a)=>{ActualizarRegistro(a)}} name="precio" style={{width:'100%'}} value={x === 'correccion' ||  x === undefined ? registro.precio : ''} >
                        <option>...</option>
                        <option>A LA ALZA</option>
                        <option>A LA BAJA</option>
                        <option>OK</option>
                        <option>ALZA Y BAJA</option>
                        <option>MONEDA</option>
                        <option>NOTA $</option>
                  </select></label>
            &nbsp;&nbsp;&nbsp;
            <label style={{ display:'inline-block', width:'10%'}}  for='matriz'> MATRIZ 
                  <select  onChange={(a)=>{ActualizarRegistro(a)}} name="matriz" style={{width:'100%'}} value={x === 'correccion' ||  x === undefined ? registro.matriz : ''}>
                        <option>...</option>
                        <option>REFERENCIA</option>
                        <option>FIRMADA</option>
                        <option>MIXTA</option>
                        <option>N/A</option>
                  </select></label>
            &nbsp;&nbsp;&nbsp;
            <label style={{ display:'inline-block', width:'7%'}}  for='Dfiscales'> DATOS FISCALES 
                  <select  onChange={(a)=>{ActualizarRegistro(a)}} name="datos_fiscales" style={{width:'100%'}} value={x === 'correccion' ||  x === undefined ? registro.datos_fiscales : ''}>
                        <option>...</option>
                        <option>OK</option>
                        <option>MAL</option>
                  </select></label>
            &nbsp;&nbsp;&nbsp;
            <label style={{ display:'inline-block', width:'7%'}}  for='tpago'> TERM DE PAGO 
                  <select  onChange={(a)=>{ActualizarRegistro(a)}} name="term_de_pago" style={{width:'100%'}} value={x === 'correccion' ||  x === undefined ? registro.term_de_pago : ''}>
                        <option>...</option>
                        <option>OK</option>
                        <option>MAL</option>
                  </select></label>
            &nbsp;&nbsp;&nbsp;
            <label style={{ display:'inline-block', width:'7%'}}  for='dprov'> DIR DE PROV 
                  <select  onChange={(a)=>{ActualizarRegistro(a)}} name="dir_de_prov" style={{width:'100%'}} value={x === 'correccion' ||  x === undefined ? registro.dir_de_prov : ''}>
                        <option>...</option>
                        <option>OK</option>
                        <option>MAL</option>
                  </select></label>
            &nbsp;&nbsp;&nbsp;
            <label style={{ display:'inline-block', width:'7%'}}  for='taxid'> TAX ID 
                  <select  onChange={(a)=>{ActualizarRegistro(a)}} name="tax_id" style={{width:'100%'}} value={x === 'correccion' ||  x === undefined ? registro.tax_id : ''}>
                        <option>...</option>
                        <option>OK</option>
                        <option>MAL</option>
                  </select></label>
            &nbsp;&nbsp;&nbsp;
            <label style={{ display:'inline-block', width:'7%'}}  for='incoterm'> INCOTERM
                  <select  onChange={(a)=>{ActualizarRegistro(a)}} name="incoterm" style={{width:'100%'}} value={x === 'correccion' ||  x === undefined ? registro.incoterm : ''}>
                        <option>...</option>
                        <option>OK</option>
                        <option>MAL</option>
                  </select></label>
            &nbsp;&nbsp;&nbsp;
            <label style={{ display:'inline-block', width:'7%'}}  for='qty'> QTY 
                  <select  onChange={(a)=>{ActualizarRegistro(a)}} name="qty" style={{width:'100%'}} value={x === 'correccion' ||  x === undefined ? registro.qty : ''}>
                        <option>...</option>
                        <option>OK</option>
                        <option>MAL</option>
                  </select></label>
            &nbsp;&nbsp;&nbsp;
            <label style={{ display:'inline-block', width:'7%'}}  for='etdnw'> ETD 
                  <select onChange={(a)=>{ActualizarRegistro(a)}} name="etd" style={{width:'100%'}} value={x === 'correccion' ||  x === undefined ? registro.etd : ''}>
                        <option>...</option>
                        <option>OK</option>
                        <option>MAL</option>
                  </select></label>
            &nbsp;&nbsp;&nbsp;
            <label style={{ display:'inline-block', width:'10%'}}  for='addelim'> ADD/ELIM ITEM 
                  <select  onChange={(a)=>{ActualizarRegistro(a)}} name="add_elim_item" style={{width:'100%'}} value={x === 'correccion' ||  x === undefined ? registro.add_elim_item : ''}>
                        <option>...</option>
                        <option>ADD ITEM</option>
                        <option>ALIM ITEM</option>
                        <option>N/A</option>
                        <option>ELIM/ADD</option>
                        <option>HC</option>
                  </select></label>
                  <p></p>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <label style={{ display:'inline-block', width:'7%'}}  for='pesovol'> PESO/VOL 
                  <select  onChange={(a)=>{ActualizarRegistro(a)}} name="peso_vol" style={{width:'100%'}} value={x === 'correccion' ||  x === undefined ? registro.peso_vol : ''}>
                        <option>...</option>
                        <option>OK</option>
                        <option>MAL</option>
                  </select></label>
            &nbsp;&nbsp;&nbsp;
            <label style={{ display:'inline-block', width:'10%'}}  for='validpopi'> VALIDACIÓN POD VS PI 
                  <select  onChange={(a)=>{ActualizarRegistro(a)}} name="validacion_pod_vs_pi" style={{width:'100%'}} value={x === 'correccion' ||  x === undefined ? registro.validacion_pod_vs_pi : ''}>
                        <option>...</option>
                        <option>OK</option>
                        <option>NO INDICA</option>
                        <option>DIFERENTE</option>
                        <option>N/A</option>
                  </select></label>
            &nbsp;&nbsp;&nbsp;
            <label style={{ display:'inline-block', width:'10%'}}  for='condicion_de_matrices'> CONDICIÓN DE MATRICES  
                  <select  onChange={(a)=>{ActualizarRegistro(a)}} name="condicion_de_matrices" style={{width:'100%'}} value={x === 'correccion' ||  x === undefined ? registro.condicion_de_matrices : ''}>
                        <option>...</option>
                        <option>NAM</option>
                  </select></label>

        <label style={{width:'12%'}}></label>
        <label style={{ display:'inline-block', width:'10%' ,  textAlign:'center'}}  for='compartida'> <b>COMPARTIDA</b>  
                  <select  onChange={(a)=>{ActualizarRegistro(a)}} name="compartida" style={{width:'100%'}} value={x === 'correccion' ||  x === undefined ? registro.compartida : ''}>
                        <option>...</option>
                        <option>Si</option>
                        <option>No</option>
                  </select></label>
                  <label style={{width:'7%'}}></label>

            <label style={{ display:'inline-block', width:'10%' , backgroundColor:'red' , color:'white', textAlign:'center'}}  for='trial'> <b>TRIAL</b>  
                  <select  onChange={(a)=>{ActualizarRegistro(a)}} name="trial" style={{width:'100%'}} value={x === 'correccion' ||  x === undefined ? registro.trial : ''}>
                        <option>...</option>
                        <option>Si</option>
                        <option>No</option>
                  </select></label>
                  <label style={{width:'10%'}}></label>

                  <button  onClick={()=>{crearRegistro()}} style={{ padding:'7px', color:'white', backgroundColor:'green', borderRadius:"10%"}}>Guardar</button>
                  <label style={{width:'1%'}}></label>
                  <button onClick={()=>{cerrar()}} style={{ padding:'7px', color:'white', backgroundColor:'red', borderRadius:"10%"}}>Cancelar</button>
            &nbsp;&nbsp;&nbsp;
          <p></p>
            </fieldset>
            <div>
            </div>
        </Stack>
        <p></p>
        </Stack>
      );
    }

  return (
    <Stack direction="row"  style={{ marginTop: "30px", width: "100px" }} >
        <input  onChange={(i)=>{setsub(i.target.value)}} type="number" placeholder="Digite PO" ></input>
        &nbsp;&nbsp;
        <button onClick={()=>{handleopen()}} className="buscar" style={{ padding:'5px', color:'white', backgroundColor:'green', borderRadius:"10%"}}> Aceptar </button>
    </Stack>
  );
  
}

export default NuevaPO;
