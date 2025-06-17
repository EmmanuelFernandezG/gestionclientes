import * as React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle } from "@mui/material/";
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
import { OneK } from "@mui/icons-material";
function FullFeaturedCrudGrid() {
  const [dialogo2, setdialogo2] = React.useState(false);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [filtrofull, setfiltrofull] = React.useState([]);
  const [valores, setvalores] = React.useState([]);
  const [dialogo, setdialogo] = React.useState(false);
  const [modificar, setmodificar] = React.useState(false);
  const [masivos,setMasivos] = React.useState({})
  const [sortModel, setSortModel] = React.useState([
    {
      field: "fechaDeRecepcion",
      sort: "desc",
    },
  ]);
  const handleClose = () => {
    setdialogo(false);
    setdialogo2(false);

  };
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
                const var1 = response.data[i].folioTt;
                if (var1 === rango) {
                  nwarr.push(response.data[i]);
                  break;
                }
              }
              setvalores(nwarr);
            });
          } else {
            let i = 0;
            for (i = 0; i < response.data.length; i++) {
              const var1 = response.data[i].areadestino.toUpperCase();
              const var2 = e.toUpperCase();
              if (var1 === var2) {
                nwarr.push(response.data[i]);
              }
            }
            setvalores(nwarr);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
 const cambiomasivos = (event) => {
  setvalores(prevValores => ({
    ...prevValores,
    [event.target.id]: event.target.value
  }));
};   
console.log(valores)
  const postearStatus = () => {
  const var2 = filtrofull.split("\n");
  var2.forEach(function (rango) {
    Clienteservice.getmatrizporId(rango).then((response) => {
        masivos.forEach(function (rango){
        response.data[masivos.id] = masivos.value   
        funcionModif(response.data.id, response.data)   
    })
    }).catch((error)=>{
      console.log(error)
    })
  }
)}
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
                    <th scope="row" style={{fontSize:10.5}}>{valores[0].areaDestino}</th>
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
                 onClick={() => { console.log(valores) }} className="btn btn-success">{" "}Confirmar Masivo{" "}
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
        <Link to={`/auditoria/inicio/matrizcd/matrizcd/nuevapo`} className="btn btn-success">  Nueva PO </Link>
        <select onChange={(e) => {
            listarClientes(e.target.value);
          }} style={{ height: 25 }} name="Area">
          <option value="all">Filtro Area Destino</option>
          <option value="compras">COMPRAS</option>
          <option value="planeacion">PLANEACION</option>
          <option value="auditoria/sap">AUDITORIA / SAP</option>
          <option value="envio">ENVIO</option>
          <option value="cancelada">CANCELADA</option>
          <option value="cerrada">CERRADA</option>
        </select>
        <button
          className="filtropos"
          onClick={() => {
            setdialogo(true);
          }}
        >
          {" "}
          Filtro por POs{" "}
        </button>
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
    Clienteservice.updatematrizcd(id, updatedRow)
      .then((response) => {
        funcionfiltro();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleProcessRowUpdateError = (id, error) => {
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
      field: "fechaDeRecepcion",
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
      field: "fechaInicio",
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
      field: "folioTt",
      headerName: "FOLIO TT",
      width: 90,
      editable: false,
      headerClassName: "gris",
    },
    {
      field: "noOc",
      headerName: "NO. O.C.",
      width: 90,
      editable: false,
      headerClassName: "gris",
    },
    {
      field: "unidadDeNegocio",
      headerName: "UNIDAD DE NEGOCIO",
      width: 140,
      editable: false,
      headerClassName: "gris",
    },
    {
      field: "noDeProveedor",
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
      field: "gerenteDeCompras",
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
      valueOptions: ["Si", "No"],
    },
    {
      field: "precio",
      headerName: "PRECIO",
      width: 80,
      editable: true,
      headerClassName: "gris",
    },
    {
      field: "matriz",
      headerName: "MATRIZ",
      width: 140,
      editable: true,
      headerClassName: "gris",
    },
    {
      field: "datosFiscales",
      headerName: "DATOS FISCALES",
      width: 80,
      editable: true,
      headerClassName: "gris",
    },
    {
      field: "termDePago",
      headerName: "TERM. DE PAGO",
      width: 80,
      editable: true,
      headerClassName: "gris",
    },
    {
      field: "dirDeProv",
      headerName: "DIR. DE PROV.",
      width: 80,
      editable: true,
      headerClassName: "gris",
    },
    {
      field: "taxId",
      headerName: "TAX ID",
      width: 80,
      editable: true,
      headerClassName: "gris",
    },
    {
      field: "incoterm",
      headerName: "INCOTERM",
      width: 80,
      editable: true,
      headerClassName: "gris",
    },
    {
      field: "qty",
      headerName: "QTY",
      width: 80,
      editable: true,
      headerClassName: "gris",
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
      field: "etdPo",
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
      field: "etdPi",
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
      field: "montoPi",
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
      field: "addElimItem",
      headerName: "ADD/ELIM ITEM",
      width: 100,
      editable: true,
      headerClassName: "gris",
    },
    {
      field: "pesoVol",
      headerName: "PESO/VOL",
      width: 100,
      editable: true,
      headerClassName: "gris",
    },
    {
      field: "ptoDirecto",
      headerName: "PTO. DIRECTO",
      width: 100,
      editable: true,
      headerClassName: "gris",
    },
    {
      field: "validacionPodVsPi",
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
      field: "liberacionDeMatrConSello",
      headerName: "LIBERACION DE MATRICES CON SELLO",
      width: 160,
      editable: true,
      headerClassName: "gris",
    },
    {
      field: "validacionesExtraordinarias",
      headerName: "VALIDACIONES EXTRAORDINARIAS",
      width: 160,
      editable: true,
      headerClassName: "gris",
    },
    {
      field: "condicionDeMatrices",
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
      field: "areaDestino",
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
            return "COMPRAS";
          } else if (row.liberada_por_bu !== "ACEPTADA") {
            return "COMPRAS";
          } else {
            return "PLANEACION";
          }
        }
      },
    },
    {
      field: "fechaAreaDestino",
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
      field: "statusProblema",
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
      field: "fechaMatrices",
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
      field: "motivoMatrices",
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
      field: "fechaBu",
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
      field: "motivoBu",
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
      field: "fechaPlaneacion",
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
      field: "motivoPlaneacion",
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
      field: "fechaAuditoria",
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
      field: "motivoAuditoria",
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
      field: "fechaSap",
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
      field: "motivoSap",
      headerName: "MOTIVO",
      width: 180,
      editable: true,
      headerClassName: "sap",
    },
    {
      field: "envioAProveedor",
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
      field: "historialDeModificacion",
      headerName: "HISTORIAL DE MODIFICACION",
      width: 100,
      editable: false,
    },
    {
      field: "fechaRevision",
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
