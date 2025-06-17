import React, { Fragment, useState } from "react";
import ClientesService from "../service/ClientesService";
import Stack from "@mui/material/Stack";
import { Input } from "@mui/material";

function NuevaPO() {
  const [x, setx] = useState();
  const [sub, setsub] = useState();
  const[view,setview]= useState(false);
  const[view2,setview2]= useState(false);
  const[registro, setregistro] = useState([])
  const opciones = { day: "2-digit", month: "2-digit", year: "numeric" };
  const crearRegistro = ()=>{
      console.log(registro)
  } 
const seg_corr = (x)=>{
      if(x ==='correccion'){
            setx('correccion')
            setview2(false)
      }else{
            console.log(registro)
            setx('2da')
            setview2(false)             
      }
}
  const cerrar = ()=>{
    setsub();
    setview(false);
  };
    const handleopen = ()=>{
      ClientesService.getnuevapo(sub).then((response) => {
      if (response.data.NoOc !== undefined) {
            console.log("entra")
          setregistro(response.data)
          setview(true);
      if (response.data.segundavalid !=='primera')
           setview2(true);
        }else{
          alert("NO EXISTE PO " + sub + " en Socs")
        }
      }
    ).catch(error =>{
      console.log(error)
    })
    }; 
    if (view2){
      return(
      <div style={{padding:'10px'}}> 
      <br></br>
      <span style={{outline:'2px solid black'}}> PO  <b>{registro.NoOc}</b> </span> &nbsp;
      <button onClick={(x)=>{ seg_corr('segunda') }} className="btn btn-success mb-2"> Segunda </button>&nbsp;
      <button onClick={(x)=>{ seg_corr('correccion') }} className="btn btn-danger mb-2"> Correccion </button>
      </div>
)
    }
    if  (view){
      registro.historial = localStorage.getItem('username')       
      return(
        <Stack direction='column' >
          <br></br>
          <h2>Nueva Orden</h2>
          <Stack direction='column'  >
            <fieldset  style={{ outline: '1px solid black'}}> &nbsp;&nbsp;&nbsp;
            <label style={{ display:'inline-block', width:'10%'}} for='NoPO' > No Po <br></br> 
            <Input readOnly value={sub} name="NoPO" style={{borderStyle:'groove', width:'100%'}}></Input> </label>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <label style={{  display:'inline-block', width:'10%'}} for='foliott'> Folio TT <br></br> 
                <Input readOnly name="foliott" style={{borderStyle:'groove', width:'80%'}}value={registro.NoOc}></Input></label>
                <label style={{  display:'inline-block', width:'17%'}} for='bu'> Unidad de Negocio 
                <Input readOnly name="bu" style={{borderStyle:'groove', width:'100%' }} value={registro.unidad_de_negocio}></Input></label>&nbsp;&nbsp;
            <label  style={{  display:'inline-block', width:'15%'}} for='noprov'> Numero de Proveedor 
                <Input readOnly name="noprov" style={{borderStyle:'groove', width:'90%' }} value={registro.no_de_proveedor}></Input></label>
            <label style={{  marginTop:'1%', display:'inline-block', width:'43%'}} for='nprov'> Proveedor 
            <input multiline='true' readOnly name="nprov" style={{borderStyle:'groove', width:'100%' }} value={registro.Nombreproveedor}></input></label>
                <hr></hr>
                &nbsp;&nbsp;&nbsp;
            <label style={{ display:'inline-block', width:'19%'}} for='gcompras'> Gerente Compras 
                <Input readOnly name="gcompras" style={{borderStyle:'groove', width:'100%' }} value={registro.GerenteCompras}></Input></label> &nbsp;&nbsp;
            <label style={{ display:'inline-block', width:'23%'}} for='confir'> Confirmador 
                <Input readOnly name="confir" style={{borderStyle:'groove', width:'100%' }} value={registro.Confirmador}></Input></label> &nbsp;&nbsp;
            <label style={{ display:'inline-block', width:'10%'}}  for='etdf'> ETD 
                <Input readOnly name="etdf" type="Date" style={{borderStyle:'groove', width:'100%' }} value={registro.fecha_de_embarque_de_laoc}></Input></label>&nbsp;&nbsp;&nbsp;

              <label style={{ display:'inline-block', width:'12%'}}  for='ptodirecto'> Pto Directo
                <Input readOnly name="ptodirecto" style={{ borderStyle:'groove', width:'100%' }} value={registro.PuertoDirecto}></Input></label>&nbsp;&nbsp;&nbsp;
              <label style={{ display:'inline-block', width:'6%'}}  for='moneda'> Moneda 
                <Input readOnly name="moneda" style={{borderStyle:'groove', width:'100%' }} value={registro.moneda}></Input></label>&nbsp;&nbsp;&nbsp;
              <label style={{ display:'inline-block', width:'18%'}}  for='vextr'> Validaciones Extraodinarias 
                <Input readOnly name="vextr"  style={{borderStyle:'groove', width:'100%' }} value={registro.validacionesextraordinarias}></Input></label>
                <hr></hr>
                &nbsp;&nbsp;&nbsp;
                {registro.fechaMatrices === "" ? (<></>) : ( <> <label style={{ display: 'inline-block', width: '45%' }} htmlFor='Mmatrices'> Motivo Matrices <Input multiline readOnly name="Mmatrices" style={{ borderStyle: 'groove', width: '100%' }} value={registro.MotivoMatrices}/>
    </label>
    &nbsp;&nbsp;&nbsp;
    <label style={{ display: 'inline-block', width: '18%' }} htmlFor='FMatrices'>
      Fecha Matrices
      <Input readOnly name="FMatrices" style={{ borderStyle: 'groove', width: '100%' }} value={registro.fechaMatrices} /></label></>)}
                <hr></hr>
          &nbsp;&nbsp;&nbsp;            
          <label style={{ display:'inline-block', width:'6%'}}  for='segunda'> 2DA 
                  <select defaultValue={x === '2da' ? 'SI' :  x === '' ? '' : registro.segunda}  onChange={(a)=>{registro.segunda = (a.target.value)}} name="segunda" style={{width:'100%'}}  >
                        <option>...</option>
                        <option>SI</option>
                        <option>NO</option>
                        <option>PF</option>
                  </select></label>
            &nbsp;&nbsp;&nbsp;
            <label style={{ display:'inline-block', width:'11%'}}  for='Precio'> PRECIO 
                  <select  onChange={(a)=>{registro.precio = (a.target.value)}} name="Precio" style={{width:'100%'}} value={x === 'correccion' ? registro.precio : ''} >
                        <option>...</option>
                        <option>A LA ALZA</option>
                        <option>A LA BAJA</option>
                        <option>OK</option>
                        <option>ALZA Y BAJA</option>
                        <option>MONEDA</option>
                        <option>NOTA $</option>
                  </select></label>
            &nbsp;&nbsp;&nbsp;
            <label style={{ display:'inline-block', width:'10%'}}  for='Matriz'> MATRIZ 
                  <select  onChange={(a)=>{registro.matriz = (a.target.value)}} name="Matriz" style={{width:'100%'}} value={x === 'correccion' ? registro.matriz : ''}>
                        <option>...</option>
                        <option>REFERENCIA</option>
                        <option>FIRMADA</option>
                        <option>MIXTA</option>
                        <option>N/A</option>
                  </select></label>
            &nbsp;&nbsp;&nbsp;
            <label style={{ display:'inline-block', width:'7%'}}  for='Dfiscales'> DATOS FISCALES 
                  <select  onChange={(a)=>{registro.datosfiscales = (a.target.value)}} name="datosfiscales" style={{width:'100%'}} value={x === 'correccion' ? registro.datosfiscales : ''}>
                        <option>...</option>
                        <option>OK</option>
                        <option>MAL</option>
                  </select></label>
            &nbsp;&nbsp;&nbsp;
            <label style={{ display:'inline-block', width:'7%'}}  for='tpago'> TERM DE PAGO 
                  <select  onChange={(a)=>{registro.termdepago = (a.target.value)}} name="termdepago" style={{width:'100%'}} value={x === 'correccion' ? registro.termdepago : ''}>
                        <option>...</option>
                        <option>OK</option>
                        <option>MAL</option>
                  </select></label>
            &nbsp;&nbsp;&nbsp;
            <label style={{ display:'inline-block', width:'7%'}}  for='dprov'> DIR DE PROV 
                  <select  onChange={(a)=>{registro.dirdeprov = (a.target.value)}} name="dirdeprov" style={{width:'100%'}} value={x === 'correccion' ? registro.dirdeprov : ''}>
                        <option>...</option>
                        <option>OK</option>
                        <option>MAL</option>
                  </select></label>
            &nbsp;&nbsp;&nbsp;
            <label style={{ display:'inline-block', width:'7%'}}  for='taxid'> TAX ID 
                  <select  onChange={(a)=>{registro.taxid = (a.target.value)}} name="taxid" style={{width:'100%'}} value={x === 'correccion' ? registro.taxid : ''}>
                        <option>...</option>
                        <option>OK</option>
                        <option>MAL</option>
                  </select></label>
            &nbsp;&nbsp;&nbsp;
            <label style={{ display:'inline-block', width:'7%'}}  for='incoterm'> INCOTERM
                  <select  onChange={(a)=>{registro.incoterm = (a.target.value)}} name="incoterm" style={{width:'100%'}} value={x === 'correccion' ? registro.incoterm : ''}>
                        <option>...</option>
                        <option>OK</option>
                        <option>MAL</option>
                  </select></label>
            &nbsp;&nbsp;&nbsp;
            <label style={{ display:'inline-block', width:'7%'}}  for='qty'> QTY 
                  <select  onChange={(a)=>{registro.qty = (a.target.value)}} name="qty" style={{width:'100%'}} value={x === 'correccion' ? registro.qty : ''}>
                        <option>...</option>
                        <option>OK</option>
                        <option>MAL</option>
                  </select></label>
            &nbsp;&nbsp;&nbsp;
            <label style={{ display:'inline-block', width:'7%'}}  for='etdnw'> ETD 
                  <select onChange={(a)=>{registro.etd = (a.target.value)}} name="etd" style={{width:'100%'}} value={x === 'correccion' ? registro.etd : ''}>
                        <option>...</option>
                        <option>OK</option>
                        <option>MAL</option>
                  </select></label>
            &nbsp;&nbsp;&nbsp;
            <label style={{ display:'inline-block', width:'10%'}}  for='addelim'> ADD/ELIM ITEM 
                  <select  onChange={(a)=>{registro.addelimitem = (a.target.value)}} name="addelimitem" style={{width:'100%'}} value={x === 'correccion' ? registro.addelimitem : ''}>
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
                  <select  onChange={(a)=>{registro.pesovol = (a.target.value)}} name="pesovol" style={{width:'100%'}} value={x === 'correccion' ? registro.pesovol : ''}>
                        <option>...</option>
                        <option>OK</option>
                        <option>MAL</option>
                  </select></label>
            &nbsp;&nbsp;&nbsp;
            <label style={{ display:'inline-block', width:'10%'}}  for='validpopi'> VALIDACIÓN POD VS PI 
                  <select  onChange={(a)=>{registro.validacionpodvspi = (a.target.value)}} name="validacionpodvspi" style={{width:'100%'}} value={x === 'correccion' ? registro.validacionpodvspi : ''}>
                        <option>...</option>
                        <option>OK</option>
                        <option>NO INDICA</option>
                        <option>DIFERENTE</option>
                        <option>N/A</option>
                  </select></label>
            &nbsp;&nbsp;&nbsp;
            <label style={{ display:'inline-block', width:'10%'}}  for='condmatr'> CONDICIÓN DE MATRICES  
                  <select  onChange={(a)=>{registro.condiciondematrices = (a.target.value)}} name="condiciondematrices" style={{width:'100%'}} value={x === 'correccion' ? registro.condiciondematrices : ''}>
                        <option>...</option>
                        <option>NAM</option>
                  </select></label>

        <label style={{width:'12%'}}></label>
        <label style={{ display:'inline-block', width:'10%' ,  textAlign:'center'}}  for='compartida'> <b>COMPARTIDA</b>  
                  <select  onChange={(a)=>{registro.trial = (a.target.value)}} name="compartida" style={{width:'100%'}} value={x === 'correccion' ? registro.compartida : ''}>
                        <option>...</option>
                        <option>Si</option>
                        <option>No</option>
                  </select></label>
                  <label style={{width:'7%'}}></label>

            <label style={{ display:'inline-block', width:'10%' , backgroundColor:'red' , color:'white', textAlign:'center'}}  for='trial'> <b>TRIAL</b>  
                  <select  onChange={(a)=>{registro.trial = (a.target.value)}} name="trial" style={{width:'100%'}} value={x === 'correccion' ? registro.trial : ''}>
                        <option>...</option>
                        <option>Si</option>
                        <option>No</option>
                  </select></label>
                  <label style={{width:'10%'}}></label>

                  <button onClick={()=>{crearRegistro()}} style={{ padding:'7px', color:'white', backgroundColor:'green', borderRadius:"10%"}}>Guardar</button>
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
