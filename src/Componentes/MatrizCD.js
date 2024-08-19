import * as React from "react";
import Box from "@mui/material/Box";
import { Link, } from 'react-router-dom';
import { Dialog, DialogContent, DialogTitle } from '@mui/material/';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import Stack from '@mui/material/Stack';
import { useEffect  } from "react";
import Clienteservice from "../service/ClientesService";
import "./button.css";
import ClientesService from "../service/ClientesService";
function FullFeaturedCrudGrid() {
  const [dialogo2,setdialogo2]= React.useState(false)
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [filtrofull , setfiltrofull] = React.useState([])
  const [valores, setvalores] = React.useState([]);
  const [dialogo, setdialogo] = React.useState(false)
  const [modificar, setmodificar] = React.useState(false)
  const [sortModel, setSortModel] = React.useState([
    {
      field: "fechaderecepcion",
      sort: "desc",
    },
  ]);
  const handleClose =()=>{
    setdialogo(false)
  };
  const listarClientes = (e) => {   
    const nwarr = new Array();
    Clienteservice.getAllmatrizcd()
      .then((response) => {
        if (e === undefined  && filtrofull.length === 0) {
          setvalores(response.data);
        } else {
          if (typeof filtrofull !== 'object' ){
          const var2 = filtrofull.split("\n")
          var2.forEach(function(rango){
            let i = 0;
            var rango = parseInt(rango)
            for (i = 0; i < response.data.length; i++) {
              const var1 = response.data[i].foliott;
              if (var1 === rango) {  
                nwarr.push(response.data[i]);
                break;
                }}
            setvalores(nwarr);
          });
          }
          else{
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
  const nuevorango  = (filtrofull) =>{
      setfiltrofull(filtrofull.target.value)
  }; 
  const abrirdialogo= (filtrofull)=>{
    setdialogo2(true)
  }
const funcionfiltro = ()=>{
  setdialogo(false);
  listarClientes();
  setmodificar(true)
};
  useEffect(() => {
    listarClientes();
  }, []);
  if (dialogo){
    return (
      <Dialog onClose={handleClose} open={dialogo} >
      <DialogTitle>Pega POs a Filtrar </DialogTitle>
      <DialogContent style={{fontSize:22}}>  Test  </DialogContent>
      <div style={{height:'250px', width:'300px'}} >
      &nbsp;&nbsp;
      <textarea onChange={(filtrofull)=>{ nuevorango(filtrofull)}} className="filtroPOs" style={{width:'280px', height:'180px'}} placeholder="pega POs">

        </textarea>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={()=>{ funcionfiltro() }} className='btn btn-success' > Confirmar </button>    
        <button style={{marginLeft:"10px" }} className='btn btn-danger' onClick={handleClose}>Cancelar </button>
      </div>
      <br></br>
    </Dialog>  );
  };
  if (dialogo2){
    return (
      <React.Fragment>
      <Dialog
        open={dialogo2}
        onClose={handleClose}
      >
        <DialogTitle>Modifiacion Masiva</DialogTitle>
        <DialogContent>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
            }}
          >
            <Stack direction='row' sx={{height:'250px'}}>
            <textarea >{filtrofull}</textarea>
              <select style={{height:'10%'}}>
                <option>Opc 1</option>
                <option>Opc 1</option>
              </select>
              </Stack>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <stack direction='row'>
              <button onClick={()=>{ funcionfiltro() }} className='btn btn-success' > Confirmar </button>    
              <button style={{marginLeft:"10px" }} className='btn btn-danger' onClick={handleClose}>Cancelar </button>  
        </stack>
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
    )};

  function CustomToolbar() {
        return (
        <GridToolbarContainer>
          <Link to={`/record/matrizcd/NuevaPO`} className='btn btn-success'>Nueva PO</Link>        
          <select
          onChange={(e) => {
            listarClientes(e.target.value);
          }}
          style={{ height: 25 }}
          name="Area">
          <option value="all">Filtro Area Destino</option>
          <option value="compras">COMPRAS</option>
          <option value="planeacion">PLANEACION</option>
          <option value="auditoria/sap">AUDITORIA / SAP</option>
          <option value="envio">ENVIO</option>
          <option value="cancelada">CANCELADA</option>
          <option value="cerrada">CERRADA</option>
        </select>
        <button className="filtropos" onClick={()=>{setdialogo(true)}}> Filtro por POs </button>
          { modificar === true ?  
          <button hidden onClick={ () => { abrirdialogo (filtrofull)} } style={{backgroundColor:'red' ,borderRadius:'10px', color:'white'}} > Modificar Masivo </button>
           :
            <button hidden  className="modi" > Modificar </button>
          }
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
  const  funcionModif = (id, updatedRow, originalRow)=>{
    console.log(updatedRow)
    // ClientesService.updatematrizcd(id, updatedRow).then((response) =>{
    //         funcionfiltro()
    //       }
    //        ).catch(error => {
    //        console.log(error)
    //    })
  };
  const handleProcessRowUpdateError = (id , error) => {
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
      field: "fechaderecepcion",
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
      field: "fechainicial",
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
      field: "foliott",
      headerName: "FOLIO TT",
      width: 90,
      editable: false,
      headerClassName: "gris",
    },
    {
      field: "nooc",
      headerName: "NO. O.C.",
      width: 90,
      editable: false,
      headerClassName: "gris",
    },
    {
      field: "unidaddenegocio",
      headerName: "UNIDAD DE NEGOCIO",
      width: 140,
      editable: false,
      headerClassName: "gris",
    },
    {
      field: "nodeproveedor",
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
      field: "gerentedecompras",
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
      type: 'singleSelect',
      valueOptions: ['Si', 'No'],
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
      field: "datosfiscales",
      headerName: "DATOS FISCALES",
      width: 80,
      editable: true,
      headerClassName: "gris",
    },
    {
      field: "termdepago",
      headerName: "TERM. DE PAGO",
      width: 80,
      editable: true,
      headerClassName: "gris",
    },
    {
      field: "dirdeprov",
      headerName: "DIR. DE PROV.",
      width: 80,
      editable: true,
      headerClassName: "gris",
    },
    {
      field: "taxid",
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
    },
    {
      field: "etdpo",
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
      field: "etdpi",
      headerName: "ETD PI",
      width: 100,
      editable: true,
      type:'date',
      headerClassName: "gris",
      valueFormatter: (params) => {
        if (params === null){
          const date = "";
          return date;  
        }else{
        const date = new Date(params).toLocaleDateString("es-MX", opciones);
        return date;
      }},
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
      field: "addelimitem",
      headerName: "ADD/ELIM ITEM",
      width: 100,
      editable: true,
      headerClassName: "gris",
    },
    {
      field: "pesovol",
      headerName: "PESO/VOL",
      width: 100,
      editable: true,
      headerClassName: "gris",
    },
    {
      field: "ptodirecto",
      headerName: "PTO. DIRECTO",
      width: 100,
      editable: true,
      headerClassName: "gris",
    },
    {
      field: "validacionpodvspi",
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
      field: "liberaciondematricesconsello",
      headerName: "LIBERACION DE MATRICES CON SELLO",
      width: 160,
      editable: true,
      headerClassName: "gris",
    },
    {
      field: "validacionesextraordinarias",
      headerName: "VALIDACIONES EXTRAORDINARIAS",
      width: 160,
      editable: true,
      headerClassName: "gris",
    },
    {
      field: "condiciondematrices",
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
      field: "areadestino",
      headerName: "AREA DESTINO",
      width: 110,
      editable: true,
      headerClassName: "area",
       valueGetter: (value, row) => {
      if (row.acuse === 'CERRADA' || row.acuse === 'CANCELADA') {
        return row.acuse;
      }
      if(row.qty === 'OK' &&  row.liberadaporbu === 'ACEPTADA' && row.liberadaporplaneacion !== '' && row.liberadaporauditoria === 'ACEPTADA' &&(row.addelimitem === 'N/A' || row.addelimitem === 'ADD ITEM' || row.addelimitem === 'HC')){
        return 'ENVIO';
      }
      if (['R', 'PPU', 'MS', 'X', 'N/A'].includes(row.liberadapormatrices) && row.liberadaporbu === 'ACEPTADA' && row.liberadaporplaneacion === 'ACEPTADA') {
          if (row.qty === 'MAL' || row.addelimitem !== 'N/A' || row.precio !== 'OK') {
              if (row.liberadaporauditoria === 'ACEPTADA' && row.liberadaporsap === '') {
                  return 'ENVIO';
              } else {
                  return 'AUDITORIA/SAP';
              }
          } else {
              return 'ENVIO';
          }
      } else {
          if (!['R', 'PPU', 'MS', 'X', 'N/A'].includes(row.liberadapormatrices)) {
              return 'COMPRAS';
          } else if (row.liberadaporbu !== 'ACEPTADA') {
              return 'COMPRAS';
          } else {
              return 'PLANEACION';
          }
      }
  }},
    {
      field: "fechadestino",
      headerName: "FECHA",
      width: 100,
      type:'date',
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
      field: "statusproblema",
      headerName: "STATUS/ PROBLEMA",
      width: 100,
      editable: true,
      headerClassName: "area",
    },
    {
      field: "liberadapormatrices",
      headerName: "LIBERADA POR MATRICES",
      width: 100,
      editable: true,
      headerClassName: "matrices",
      type: 'singleSelect',
      valueOptions: ['ACEPTADA', 'RECHAZADA'],
    },
    {
      field: "fechamatrices",
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
      field: "motivomatrices",
      headerName: "MOTIVO",
      width: 180,
      editable: true,
      headerClassName: "matrices",
    },
    {
      field: "liberadaporbu",
      headerName: "LIBERADA POR BU",
      width: 100,
      editable: true,
      headerClassName: "bu",
      type: 'singleSelect',
      valueOptions: ['ACEPTADA', 'RECHAZADA'],
    },
    {
      field: "fechabu",
      headerName: "FECHA",
      width: 100,
      type:'date',
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
      field: "motivobu",
      headerName: "MOTIVO",
      width: 180,
      editable: true,
      headerClassName: "bu",
    },
    {
      field: "liberadaporplaneacion",
      headerName: "LIBERADA POR PLANEACION",
      width: 100,
      editable: true,
      headerClassName: "planeacion",
      type: 'singleSelect',
      valueOptions: ['ACEPTADA', 'RECHAZADA'],
    },
    {
      field: "fechaplaneacion",
      headerName: "FECHA",
      width: 100,
      type:'date',
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
      field: "motivoplaneacion",
      headerName: "MOTIVO",
      width: 180,
      editable: true,
      headerClassName: "planeacion",
    },
    {
      field: "liberadaporauditoria",
      headerName: "LIBERADA POR AUDITORIA",
      width: 100,
      editable: true,
      headerClassName: "auditoria",
      type: 'singleSelect',
      valueOptions: ['ACEPTADA', 'RECHAZADA'],
    },
    {
      field: "fechaauditoria",
      headerName: "FECHA",
      width: 100,
      type:'date',
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
      field: "motivoauditoria",
      headerName: "MOTIVO",
      width: 180,
      editable: true,
      headerClassName: "auditoria",
    },
    {
      field: "liberadaporsap",
      headerName: "LIBERADA POR SAP",
      width: 100,
      editable: true,
      headerClassName: "sap",
      type: 'singleSelect',
      valueOptions: ['ACEPTADA', 'RECHAZADA'],
    },
    {
      field: "fechasap",
      headerName: "FECHA",
      width: 100,
      editable: true,
      type:'date',
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
      field: "motivosap",
      headerName: "MOTIVO",
      width: 180,
      editable: true,
      headerClassName: "sap",
    },
    {
      field: "envioaproveedor",
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
      field: "historialdemodificacion",
      headerName: "HISTORIAL DE MODIFICACION",
      width: 100,
      editable: false,
    },
    {
      field: "fecharevision",
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
        marginLeft:'-50px',
        height: 500,
        width: "108%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}>
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
        processRowUpdate={(updatedRow , originalRow) => {
          funcionModif(updatedRow.id , updatedRow , originalRow);
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