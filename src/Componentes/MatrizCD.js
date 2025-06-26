import * as React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle } from "@mui/material/";
import { BUs } from "./materialReutilizable/RangosReusables"
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";
import Clienteservice from "../service/ClientesService";
import "./button.css";
function FullFeaturedCrudGrid() {
  const [dialogo2, setdialogo2] = React.useState(false);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [filtrofull, setfiltrofull] = React.useState([]);
  const [valores, setvalores] = React.useState([]);
  const [dialogo, setdialogo] = React.useState(false);
  const [modificar, setmodificar] = React.useState(false);
  const [sortModel, setSortModel] = React.useState([
    {
      field: "fecha_de_recepcion",
      sort: "desc",
    },
  ]);
  const handleClose = () => {
    setdialogo(false);
    setdialogo2(false);
    
  };
  const refreshTab = ()=> {
    setmodificar(false);
    setfiltrofull()
    Clienteservice.getAllmatrizcd().then((response)=>{
      setvalores(response.data)
    }).catch((error)=>{
      console.log(error)
    })
  }

  function transformarFechas(obj) {
  const regexFecha = /^\d{2}\/\d{2}\/\d{4}$/;

  const nuevoObjeto = {};

  for (const key in obj) {
    const valor = obj[key];

    if (typeof valor === "string" && regexFecha.test(valor)) {
      // Convertir "dd/mm/yyyy" → "yyyy-mm-ddT00:00:00"
      const [dia, mes, anio] = valor.split("/");
      nuevoObjeto[key] = `${anio}-${mes}-${dia}T00:00:00`;
    } else {
      nuevoObjeto[key] = valor;
    }
  }

  return nuevoObjeto;
}

  const listarClientes = (e) => {
    const nwarr = new Array();
    Clienteservice.getAllmatrizcd()
      .then((response) => {
        if (e === undefined && filtrofull.length === 0) {
          setvalores(response.data);
        } else {
          if (typeof filtrofull !== "object") {
            const var2 = filtrofull.split("\n");
            var2.forEach(function (rango) {
              let i = 0;
              var rango = parseInt(rango);
              for (i = 0; i < response.data.length; i++) {
                const var1 = response.data[i].folio_tt;
                if (var1 === rango) {
                  nwarr.push(response.data[i]);
                  break;
                }}
              setvalores(nwarr);
            });
          } else {
            let i = 0;
            for (i = 0; i < response.data.length; i++) {
              const var1 = response.data[i].area_destino.toUpperCase();
              const var2 = e.toUpperCase();
              if (var1 === var2) {
                nwarr.push(response.data[i]);
              }}
            setvalores(nwarr);
          }}})
      .catch((error) => {
        console.log(error);
      });};

const filtrosCalculados = (e)=>{
      const nwarr = new Array();
  Clienteservice.getAllClientes().then((response)=>{
        for (let i = 0; i < response.data.length; i++) {
            const var1 = response.data[i].area_destino;
            const var2 = response.data[i].fecha_area_destino;
            const hoy = new Date().toISOString().split('T')[0] + "T00:00:00";
            const acuseV = response.data[i].acuse;
              if (var1 === e.target.name && var2 === hoy && (acuseV === "" || acuseV === null)) {
                nwarr.push(response.data[i]);
              }
          setvalores(nwarr);
        };
  }).catch((error)=>{
    console.log(error)
  })
}      

  const fechaarea = (e) => { 
    e.target.id.replace("liberada_por_","fecha_")
    setvalores(prevValores =>
    prevValores.map(val => ({
      ...val,
      [e.target.id.replace("liberada_por_","fecha_")]: new Date().toISOString().split('T')[0] + "T00:00:00"
    })));
}
const cambiomasivos = (event) => {
  fechaarea(event);
  setvalores(prevValores =>
    prevValores.map(val => ({
      ...val,
      [event.target.id]: event.target.value
    }))
  );
};

const postearStatus = () => {
   valores.forEach(val => {
      Clienteservice.updatematrizcd(val.id, val)
        .then((response) => {
        })
        .catch((error) => {
          console.error(error);
        });
   });
           setdialogo2(false);
          listarClientes()         
};
const nuevorango = (filtrofull) => {
    setfiltrofull(filtrofull.target.value);
  };
  const abrirdialogo = (filtrofull) => {
    setdialogo2(true);
  };
  const funcionfiltro = () => {
    setdialogo(false);
    listarClientes();
    setmodificar(true);
  };

  useEffect(() => {
    listarClientes();
  }, []);

  if (dialogo) {
    return (
      <Dialog onClose={handleClose} open={dialogo}>
        <DialogTitle>Pega POs a Filtrar </DialogTitle>
        <div style={{ height: "250px", width: "300px" }}>
          &nbsp;&nbsp;
          <textarea
            onChange={(filtrofull) => {
              nuevorango(filtrofull);
            }}
            className="filtroPOs"
            style={{ width: "280px", height: "180px" }}
            placeholder="pega POs"
          ></textarea>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button
            onClick={() => { funcionfiltro();}} className="btn btn-success" >{" "} Confirmar{" "}</button>
          <button style={{ marginLeft: "10px" }}
            className="btn btn-danger"
            onClick={handleClose}
          > Cancelar{" "}</button>
        </div>
        <br></br>
      </Dialog>
    );
  }
  if (dialogo2) {
    return (
      <div>
        <Dialog open={dialogo2} onClose={handleClose} PaperProps={{style: {backgroundColor: 'transparent',}, }}
                          BackdropProps={{style: { backgroundColor: "transparent", }, }}> 
          <DialogTitle>Modificar Masivo</DialogTitle>
          <DialogContent>
            <Box
              // noValidate
              // component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                m: "auto",
                width: "fit-content",
              }}
            >
              <span>{filtrofull}</span>
              <Stack direction="row" >
                <table class="table" >
                  <thead>
                    <tr>
                      <th style={{fontSize:13}} scope="col"> Area Destino</th>
                      <th style={{fontSize:13}} scope="col"> Liberado por Matrices</th>
                      <th style={{fontSize:13}} scope="col"> Liberado por BU</th>
                      <th style={{fontSize:13}} scope="col"> Liberado por Planeacion</th>
                      <th style={{fontSize:13}} scope="col"> Liberado por Auditoria</th>
                      <th style={{fontSize:13}} scope="col"> Liberado por SAP</th>
                    </tr>
                  </thead>
                  <tr>
                    <th scope="row" style={{fontSize:10.5}}>{valores[0].area_destino}</th>
                    <th scope="row">
                    <select disabled id="liberada_por_matrices" onChange={cambiomasivos} style={{fontSize:12}}>
                        <option > {valores[0].liberada_por_matrices}</option>
                      </select>
                      </th>
                      <th scope="row">
                      <select id="liberada_por_bu" onChange={cambiomasivos} style={{fontSize:12}}>
                        <option> {valores[0].liberada_por_bu}</option>
                        <option> ACEPTADA</option>
                        <option> RECHAZADA</option>
                      </select>
                    </th>
                    <th scope="row">
                      <select id="liberada_por_planeacion" onChange={cambiomasivos} style={{fontSize:12}}>
                        <option> {valores[0].liberada_por_planeacion}</option>
                        <option> ACEPTADA</option>
                        <option> RECHAZADA</option>
                      </select>
                    </th>
                    <th scope="row">
                      <select id="liberada_por_auditoria" onChange={cambiomasivos} style={{fontSize:12}}>
                        <option> {valores[0].liberada_por_auditoria}</option>
                        <option> ACEPTADA</option>
                        <option> RECHAZADA</option>
                      </select>
                    </th>
                    <th scope="row">
                      <select id="liberada_por_sap" onChange={cambiomasivos} style={{fontSize:12}}>                                            
                        <option> {valores[0].liberada_por_sap}</option>
                        <option> ACEPTADA</option>
                        <option> RECHAZADA</option>
                      </select>
                    </th>
                  </tr>
                </table>
              </Stack>
              <stack direction="row">
                <button
                 onClick={() => { postearStatus() }} className="btn btn-success">{" "}Confirmar Masivo{" "}
                  </button>
                <button
                  style={{ marginLeft: "10px" }} className="btn btn-danger" onClick={handleClose}>Cancelar{" "}
                </button>
              </stack>
            </Box>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <Link to={`/importaciones/controldocumental/matrizcd/NuevaPO`} className="btn btn-success">  Nueva PO </Link>
        <button  className="filtropos"  onClick={() => { setdialogo(true);}}>
          {" "} Filtro por POs{" "}
        </button>
        <button className="btn btn-warning" name="PLANEACION" onClick={(e)=>{ filtrosCalculados(e) }}> Filtro Planeacion</button>
        <button className="btn btn-info" name="ENVIO" onClick={(e)=>{ filtrosCalculados(e) }}> Filtro Envio</button>
        <button className="btn btn-primary" name="Refresh" onClick={()=>{ refreshTab() }}> <b>↻</b> </button>
        {modificar === true ? (
          <button onClick={() => { abrirdialogo(filtrofull);}}style={{ backgroundColor: "red", borderRadius: "10px", color: "white",}}>{" "} Modificar Masivo{" "} </button>
        ) : (
          <button hidden className="modi">{" "} Modificar{" "} </button>
        )}
        <Box sx={{ flexGrow: 1 }} />
        <GridToolbarExport
          slotProps={{
            tooltip: { title: "Export data" },
            button: { variant: "outlined" },
          }}
        />
        <br></br>
        <br></br>
      </GridToolbarContainer>
    );
  }
  const funcionModif = (id, updatedRow, originalRow) => {
const rowConFechasTransformadas = transformarFechas(updatedRow);
   Clienteservice.updatematrizcd(id, rowConFechasTransformadas).then((response) => {
           // funcionfiltro();
         })
         .catch((error) => {
           console.log(error);
         });
  };

  const handleProcessRowUpdateError = (error) => {
    console.log(error);
  };
  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
        event.defaultMuiPrevented = true;
    }
  };
  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  const opciones = { day: "2-digit", month: "2-digit", year: "numeric" };
  const columns = [
    {
      field: "fecha_de_recepcion",
      headerName: "FECHA DE RECEPCION",
      width: 110,
      editable: false,
      headerClassName: "testback",
      valueFormatter: (params) => {
        const date = new Date(params).toLocaleDateString("es-MX", opciones);
        return date;
      },
    },
    {
      field: "fecha_inicio",
      headerName: "FECHA",
      width: 100,
      editable: false,
      headerClassName: "gris",
      valueFormatter: (params) => {
        const date = new Date(params).toLocaleDateString("es-MX", opciones);
        return date;
      },
    },
    {
      field: "folio_tt",
      headerName: "FOLIO TT",
      width: 90,
      editable: false,
      headerClassName: "gris",
    },
    {
      field: "no_oc",
      headerName: "NO. O.C.",
      width: 90,
      editable: false,
      headerClassName: "gris",
    },
    {
      field: "unidad_de_negocio",
      headerName: "UNIDAD DE NEGOCIO",
      width: 140,
      editable: true,
      type: "singleSelect",
      headerClassName: "gris",
      valueOptions: BUs
    },
    {
      field: "no_de_proveedor",
      headerName: "NO. DE PROVEEDOR",
      width: 110,
      editable: false,
      headerClassName: "gris",
    },
    {
      field: "proveedor",
      headerName: "PROVEEDOR",
      width: 180,
      editable: false,
      headerClassName: "gris",
    },
    {
      field: "gerente_de_compras",
      headerName: "GERENTE DE COMPRAS",
      width: 180,
      editable: false,
      headerClassName: "gris",
    },
    {
      field: "confirmador",
      headerName: "CONFIRMADOR",
      width: 180,
      editable: false,
      headerClassName: "gris",
    },
    {
      field: "segunda",
      headerName: "2DA",
      width: 80,
      editable: true,
      headerClassName: "gris",
      type: "singleSelect",
      valueOptions: ["Si", "No","PF"],
    },
    {
      field: "precio",
      headerName: "PRECIO",
      width: 80,
      editable: true,
      headerClassName: "gris",
      type: "singleSelect",
      valueOptions: ["A LA ALZA", "A LA BAJA", "OK","ALZA Y BAJA", "MONEDA", "NOTA $"],
    },
    {
      field: "matriz",
      headerName: "MATRIZ",
      width: 140,
      editable: true,
      headerClassName: "gris",
      type: "singleSelect",
      valueOptions: ["REFERENCIA", "FIRMADA", "MIXTA","N/A"],
    },
    {
      field: "datos_fiscales",
      headerName: "DATOS FISCALES",
      width: 80,
      editable: true,
      headerClassName: "gris",
      type: "singleSelect",
      valueOptions: ["REFERENCIA", "FIRMADA", "MIXTA","N/A"],
    },
    {
      field: "term_de_pago",
      headerName: "TERM. DE PAGO",
      width: 80,
      editable: true,
      headerClassName: "gris",
      type: "singleSelect",
      valueOptions: ["REFERENCIA", "FIRMADA", "MIXTA","N/A"],
    },
    {
      field: "dir_de_prov",
      headerName: "DIR. DE PROV.",
      width: 80,
      editable: true,
      headerClassName: "gris",
      type: "singleSelect",
      valueOptions: ["REFERENCIA", "FIRMADA", "MIXTA","N/A"],
    },
    {
      field: "tax_id",
      headerName: "TAX ID",
      width: 80,
      editable: true,
      headerClassName: "gris",
      type: "singleSelect",
      valueOptions: ["REFERENCIA", "FIRMADA", "MIXTA","N/A"],
    },
    {
      field: "incoterm",
      headerName: "INCOTERM",
      width: 80,
      editable: true,
      headerClassName: "gris",
      type: "singleSelect",
      valueOptions: ["REFERENCIA", "FIRMADA", "MIXTA","N/A"],
    },
    {
      field: "qty",
      headerName: "QTY",
      width: 80,
      editable: true,
      headerClassName: "gris",
      type: "singleSelect",
      valueOptions: ["REFERENCIA", "FIRMADA", "MIXTA","N/A"],
    },
    {
      field: "etd",
      headerName: "ETD",
      width: 80,
      editable: true,
      headerClassName: "gris",
      type: "singleSelect",
      valueOptions: ["OK", "MAL"],
    },
    {
      field: "etd_po",
      headerName: "ETD PO",
      width: 100,
      editable: false,
      headerClassName: "gris",
      valueFormatter: (params) => {
        const date = new Date(params).toLocaleDateString("es-MX", opciones);
        return date;
      },
    },
    {
      field: "etd_pi",
      headerName: "ETD PI",
      width: 100,
      editable: true,
      type: "date",
      headerClassName: "gris",
      valueFormatter: (params) => {
        if (params === null) {
          const date = "";
          return date;
        } else {
          const date = new Date(params).toLocaleDateString("es-MX", opciones);
          return date;
        }
      },
      },
    {
      field: "montopi",
      headerName: "MONTO PI",
      width: 100,
      editable: true,
      headerClassName: "testback",
      valueFormatter: (params) => {
        return "$" + params.toLocaleString("es-MX");
      },
    },
    {
      field: "moneda",
      headerName: "MONEDA",
      width: 80,
      editable: true,
      headerClassName: "testback",
    },
    {
      field: "add_elim_item",
      headerName: "ADD/ELIM ITEM",
      width: 100,
      editable: true,
      headerClassName: "gris",
    },
    {
      field: "peso_vol",
      headerName: "PESO/VOL",
      width: 100,
      editable: true,
      headerClassName: "gris",
    },
    {
      field: "pto_directo",
      headerName: "PTO. DIRECTO",
      width: 100,
      editable: true,
      headerClassName: "gris",
    },
    {
      field: "validacion_pod_vs_pi",
      headerName: "VALIDACIÓN POD VS PI",
      width: 100,
      editable: true,
      headerClassName: "gris",
    },
    {
      field: "observaciones",
      headerName: "OBSERVACIONES",
      width: 320,
      editable: true,
      headerClassName: "gris",
    },
    {
      field: "liberacion_de_matr_con_sello",
      headerName: "LIBERACION DE MATRICES CON SELLO",
      width: 160,
      editable: true,
      headerClassName: "gris",
    },
    {
      field: "validaciones_extraordinarias",
      headerName: "VALIDACIONES EXTRAORDINARIAS",
      width: 160,
      editable: true,
      headerClassName: "gris",
    },
    {
      field: "condicion_de_matrices",
      headerName: "CONDICIÓN DE MATRICES",
      width: 110,
      editable: true,
      headerClassName: "gris",
    },
    {
      field: "compartida",
      headerName: "Compartida",
      width: 180,
      editable: true,
    },
    {
      field: "area_destino",
      headerName: "AREA DESTINO",
      width: 110,
      editable: true,
      headerClassName: "area",
      valueGetter: (value, row) => {
        if (row.acuse === "CERRADA" || row.acuse === "CANCELADA") {
          return row.acuse;
        }
        if (
          row.qty === "OK" &&
          row.liberada_por_bu === "ACEPTADA" &&
          row.liberada_por_planeacion !== "" &&
          row.liberada_por_auditoria === "ACEPTADA" &&
          (row.addElimItem === "N/A" ||
            row.addElimItem === "ADD ITEM" ||
            row.addElimItem === "HC")
        ) {
          return "ENVIO";
        }
        if (
          ["R", "PPU", "MS", "X", "N/A"].includes(row.liberada_por_matrices) &&
          row.liberada_por_bu === "ACEPTADA" &&
          row.liberada_por_planeacion === "ACEPTADA"
        ) {
          if (
            row.qty === "MAL" ||
            row.addElimItem !== "N/A" ||
            row.precio !== "OK"
          ) {
            if (
              row.liberada_por_auditoria === "ACEPTADA" &&
              row.liberada_por_sap === ""
            ) {
              return "ENVIO";
            } else {
              return "AUDITORIA/SAP";
            }
          } else {
            return "ENVIO";
          }
        } else {
          if (
            !["R", "PPU", "MS", "X", "N/A"].includes(row.liberada_por_matrices)
          ) {
          if (["Mecánica 1","Der. Petróleo 1","Máquinas 2","Htas. Manuales 1","Volteck 1","Volteck 2","Volteck 3"].includes(row.unidad_de_negocio)){
            return "COMPRAS/PLANEACION";
          }  else{
            return "COMPRAS";
          }
          } else if (row.liberada_por_bu !== "ACEPTADA") {
          if (["Mecánica 1","Der. Petróleo 1","Máquinas 2","Htas. Manuales 1","Volteck 1","Volteck 2","Volteck 3"].includes(row.unidad_de_negocio)){
            return "COMPRAS/PLANEACION";
          }  else{
            return "COMPRAS";
          }
          } else {
            return "PLANEACION";
          }
        }
      },
    },
    {
      field: "fecha_area_destino",
      headerName: "FECHA",
      width: 100,
      type: "date",
      editable: true,
      headerClassName: "area",
      valueFormatter: (params) => {
        if (params === null) {
          const date = "";
          return date;
        } else {
          const date = new Date(params).toLocaleDateString("es-MX", opciones);
          return date;
        }
      },
    },
    {
      field: "acuse",
      headerName: "ACUSE",
      width: 100,
      editable: true,
      headerClassName: "area",
    },
    {
      field: "status__problema",
      headerName: "STATUS/ PROBLEMA",
      width: 100,
      editable: true,
      headerClassName: "area",
    },
    {
      field: "liberada_por_matrices",
      headerName: "LIBERADA POR MATRICES",
      width: 100,
      editable: true,
      headerClassName: "matrices",
      type: "singleSelect",
      valueOptions: ["" , "ACEPTADA", "RECHAZADA"],
    },
    {
      field: "fecha_matrices",
      headerName: "FECHA",
      width: 100,
      editable: true,
      headerClassName: "matrices",
      valueFormatter: (params) => {
        if (params === null) {
          const date = "";
          return date;
        } else {
          const date = new Date(params).toLocaleDateString("es-MX", opciones);
          return date;
        }
      },
    },
    {
      field: "motivo_matrices",
      headerName: "MOTIVO",
      width: 180,
      editable: true,
      headerClassName: "matrices",
    },
    {
      field: "liberada_por_bu",
      headerName: "LIBERADA POR BU",
      width: 100,
      editable: true,
      headerClassName: "bu",
      type: "singleSelect",
      valueOptions: ["" , "ACEPTADA", "RECHAZADA"],
    },
    {
      field: "fecha_bu",
      headerName: "FECHA",
      width: 100,
      type: "date",
      editable: true,
      headerClassName: "bu",
      valueFormatter: (params) => {
        if (params === null) {
          const date = "";
          return date;
        } else {
          const date = new Date(params).toLocaleDateString("es-MX", opciones);
          return date;
        }
      },
    },
    {
      field: "motivo_bu",
      headerName: "MOTIVO",
      width: 180,
      editable: true,
      headerClassName: "bu",
    },
    {
      field: "liberada_por_planeacion",
      headerName: "LIBERADA POR PLANEACION",
      width: 100,
      editable: true,
      headerClassName: "planeacion",
      type: "singleSelect",
      valueOptions: ["" , "ACEPTADA", "RECHAZADA"],
    },
    {
      field: "fecha_planeacion",
      headerName: "FECHA",
      width: 100,
      type: "date",
      editable: true,
      headerClassName: "planeacion",
      valueFormatter: (params) => {
        if (params === null) {
          const date = "";
          return date;
        } else {
          const date = new Date(params).toLocaleDateString("es-MX", opciones);
          return date;
        }
      },
    },
    {
      field: "motivo_planeacion",
      headerName: "MOTIVO",
      width: 180,
      editable: true,
      headerClassName: "planeacion",
    },
    {
      field: "liberada_por_auditoria",
      headerName: "LIBERADA POR AUDITORIA",
      width: 100,
      editable: true,
      headerClassName: "auditoria",
      type: "singleSelect",
      valueOptions: ["" , "ACEPTADA", "RECHAZADA"],
    },
    {
      field: "fecha_auditoria",
      headerName: "FECHA",
      width: 100,
      type: "date",
      editable: true,
      headerClassName: "auditoria",
      valueFormatter: (params) => {
        if (params === null) {
          const date = "";
          return date;
        } else {
          const date = new Date(params).toLocaleDateString("es-MX", opciones);
          return date;
        }
      },
    },
    {
      field: "motivo_auditoria",
      headerName: "MOTIVO",
      width: 180,
      editable: true,
      headerClassName: "auditoria",
    },
    {
      field: "liberada_por_sap",
      headerName: "LIBERADA POR SAP",
      width: 100,
      editable: true,
      headerClassName: "sap",
      type: "singleSelect",
      valueOptions: ["" , "ACEPTADA", "RECHAZADA"],
    },
    {
      field: "fecha_sap",
      headerName: "FECHA",
      width: 100,
      editable: true,
      type: "date",
      headerClassName: "sap",
      valueFormatter: (params) => {
        if (params === null) {
          const date = "";
          return date;
        } else {
          const date = new Date(params).toLocaleDateString("es-MX", opciones);
          return date;
        }
      },
    },
    {
      field: "motivo_sap",
      headerName: "MOTIVO",
      width: 180,
      editable: true,
      headerClassName: "sap",
    },
    {
      field: "envio_a_proveedor",
      headerName: "ENVIO A PROVEEDOR",
      width: 100,
      editable: true,
      headerClassName: "gris",
    },
    {
      field: "trial",
      headerName: "TRIAL",
      width: 100,
      editable: true,
      headerClassName: "trial",
    },
    {
      field: "historial_de_modificacion",
      headerName: "HISTORIAL DE MODIFICACION",
      width: 100,
      editable: false,
    },
    {
      field: "fecha_revision",
      headerName: "Fecha Revision",
      width: 100,
      editable: false,
      headerClassName: "gris",
      valueFormatter: (params) => {
        if (params === null) {
          const date = "";
          return date;
        } else {
          const date = new Date(params).toLocaleDateString("es-MX", opciones);
          return date;
        }
      },
    },
    {
      field: "fecha_entrega_compras",
      headerName: "FECHA DE ENTREGA COMPRAS",
      width: 100,
      editable: true,
      headerClassName: "gris",
      type: "singleSelect",
      valueOptions: [new Date(Date()+1).toLocaleDateString("es-MX", opciones)],
      valueFormatter: (params) => {
  return params === null
    ? ""
    : params.includes("T")
      ? (() => {
          const [yyyy, mm, dd] = params.split("T")[0].split("-");
          const fecha = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
          fecha.setDate(fecha.getDate() );
          return fecha.toLocaleDateString("es-MX", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
          });
        })()
      : params;
},
    },
  ];
  return (
    <Box
      sx={{
        marginLeft: "-50px",
        height: 500,
        width: "108%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <br></br>
      <DataGrid
        sx={{
          "& .MuiDataGrid-columnHeaderTitle": {
            whiteSpace: "normal",
            lineHeight: "normal",
          },
          "& .MuiDataGrid-columnHeader": {
            height: "unset ",
          },
          "& .MuiDataGrid-columnHeaders": {
            maxHeight: "168px !important",
          },
        }}
        processRowUpdate={(updatedRow, originalRow) => {
          funcionModif(updatedRow.id, updatedRow, originalRow);

          const newRowModesModel = {
            ...rowModesModel,
            [updatedRow.id]: { mode: "view" },
          };
          setRowModesModel(newRowModesModel);
          return updatedRow; 
        }}
        filterMode="client"
        disableColumnFilter={false}
        disableColumnSelector={false}
        disableDensitySelector={false}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        sortModel={sortModel}
        rows={valores}
        columns={columns}
        editMode="cell"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        slots={{
          toolbar: CustomToolbar,
        }}
      />
    </Box>
  );
}

export default FullFeaturedCrudGrid;
