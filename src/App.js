import './App.css';
import {useState} from "react";
import {Button} from "react-bootstrap";
import axios from "axios";

function App() {
    const dummy = {
        ip: "161.185.160.93",
        city: "New York City",
        region: "New York",
        country: "US",
        loc: "40.7143,-74.0060",
        org: "AS22252 The City of New York",
        postal: "10004",
        timezone: "America/New_York",
        readme: "https://ipinfo.io/missingauth"
    };
    const [IP, setIP] = useState('');
    const [valido,setValido]=useState(false)
    const [validCall,setValidCall]=useState(false);
    const [info,setInfo]=useState('');

    const handleSubmit =async (e)=>{
        e.preventDefault();
        try{
            const respuesta = await axios.get("https://ipinfo.io/" + IP + "/geo");
            setInfo(respuesta.data);
            if(respuesta.status!==200){
                alert("IP Valida, sin embargo ocurrio un error de llamada");
            }
            setValidCall(true);
            document.getElementById("save").disabled= false;
        }catch (e) {
            console.log(e);
            //ESTAS 2 LINEAS NO TENDRIA QUE IR, SOLO PARA EFECTOS DE ENVIAR EL DUMMY POR EL ERROR 429
            setValidCall(true);
            document.getElementById("save").disabled= false;
        }
    }

    const handleInfo= async (info)=>{
        info.preventDefault();
        try{
            const respuesta = await axios.post("https://jsonplaceholder.typicode.com/posts",/*info*/ dummy);
            console.log(respuesta.data);
            if(respuesta.status===201){
                alert("Informacion enviada correctamente")
            }else{
                alert("Error al enviar informacion, intente nuevamente")
            }
        }catch (e) {
            console.log(e);
        }
    }

    function validar(ip){
        const arrayIP = ip.split(".");
        if(arrayIP.length === 4){
            for(let i=0; i< arrayIP.length;i++){
                let number= parseInt(arrayIP[i]);
                if(number>0 && number<255){
                    setValido(true)
                }
                else{
                    break
                }
            }
        }
        console.log(arrayIP)
    }
  return (
    <div className="App">
      <h1>CONTROL 2 TEL-335</h1>
        <div className="container">
            <div className="form-container">
            <p className="tittle" >Ingrese IP con formato IPV4</p>
            <form className="form" onSubmit={handleSubmit}>
                <input type="text" id="ip" onChange={(e) => {
                    validar(e.target.value);
                    document.getElementById("button").disabled= !(valido);
                    setIP(e.target.value);
                }
                }/>
                <Button id="button" variant="outline-dark" type="submit" disabled>Enviar</Button>
            </form>
            <form className="form-save" onSubmit={handleInfo}>
                <Button id="save" variant="outline-dark" type="submit" disabled>Guardar</Button>
            </form>
        </div>
        </div>

        {(validCall) ?
            //JSON.stringfy(info)
            JSON.stringify(dummy): ""
        }
        <div id="mapa"></div>
    </div>
  );
}

export default App;
