  import React, { useState, useEffect } from "react";
  import { getUsers, postUser, putAccess, putUser, putPassword } from "./actions";
  import { useDispatch, useSelector } from "react-redux";
  import { Link, useHistory } from "react-router-dom";
  import "./HomeInversores.css";
  import tickets from "../img/monedadesentralizada.png";
  import FadeLoader from 'react-spinners/FadeLoader';
  import { GiHamburgerMenu } from "react-icons/gi";
  import { IoNotificationsSharp, IoSettingsSharp, IoPersonCircleOutline } from "react-icons/io5";
  import { TfiHeadphoneAlt } from "react-icons/tfi";
  import { IoIosPower } from "react-icons/io";
  import { BiMailSend } from "react-icons/bi"; 

  function validateUser(input, users){
    let errors= {};
    for (let i = 0; i < users.length; i++) {
      const element = users[i].user;
      if (element === input.user) {
        errors.user = "El nombre de usuario ya existe, Pruebe con otro!"
      }}
    return errors;
  }
  export default function HomeInversores(id){ 
    const dispatch = useDispatch();
    const history = useHistory();
    const users = useSelector(state => state.users);
    var user = {};
    var numTicket = 0;
    var saldoNetoUser = 0;
    var saldoNetoMoneda = 0;
    var [cargaSaldo, setCargaSaldo] = useState({
      saldo: ["null"]
    })
    const [errors, setErrors]= useState({})
    const [input, setInput] = useState({
      name: "",
      user: "",
      password: "",
      saldo: ["0"],
      correo: "Sin informar",
      pais:"Argentina",
      phone: "",
      access: "false",
      fecdata:"",
      pagopending: "0"
    });
    var usuario = undefined;
    var valor = undefined ;
    var strValor = undefined;
    var sal = {};

    var salDos = undefined;
    var saldoUser = undefined
    
    const arreglosal = [{valor:"2", codif:"%34%30%30", carga:"4"}, {valor:"5", codif:"%31%30%30%30%30", carga:"10"},  {valor:"8", codif:"%31%36%30%30", carga:"16"},  {valor:"14", codif:"%32%38%30%30", carga:"28"},  {valor:"20", codif:"%34%30%30%30", carga:"40"},  {valor:"25", codif:"%35%30%30%30", carga:"50"},  {valor:"0", codif:"%30%30%30%30", carga:"0"}]
    var indexSaldo = 6; //este valor dice que el saldo del cliente es cero
    const cantidadTickets = [1, 2, 3]
    const [isLoading, setIsLoading] = useState(3)
    const [inputPassword, setInputPassword] = useState({
      password: ""
    });
    const [definirValores, SetDefinirValores ] = useState(1);

    useEffect(()=>{
      dispatch(getUsers());
    },[dispatch]);

    function datosUser(user){
      if(user !== "null"){
        for (let index = 0; index < users.length; index++) {
          if (users[index].id === id.id){
            user = users[index]
          }    
        }
      }
      return user
    }
    
    function definValores(){
      if(definirValores === 0 ){
      usuario = datosUser(user);
      if(usuario !== undefined){
      valor = usuario.saldo[0] ;
     strValor = [String(valor)];
      sal = { saldo: strValor };
      salDos = usuario.saldo[0];
     saldoUser = usuario.saldo[0];
      }
    }
    };
    definValores()

    useEffect(() => {
      let interv = null;
      interv = setInterval(()=>{
      if (definirValores > 0) {
        SetDefinirValores(definirValores => definirValores - 1)
  }
    },1000)
    return () => clearInterval(interv);
  },[definirValores])

    function obtenerSaldoUser(){

      if(indexSaldo !== 9)
      for (let i = 0; i < arreglosal.length - 1 ; i++) {
        for (let j = 1; j < cantidadTickets.length + 1; j++) {
          if(arreglosal[indexSaldo].valor === arreglosal[i].valor && arreglosal[i].valor * j == saldoUser){
              saldoNetoUser = j * arreglosal[indexSaldo].valor - (j * arreglosal[i].valor * 0.2);
              saldoNetoMoneda = usuario.saldo[0] - saldoNetoUser             
          }  
        }
      }
    }

    function obtenerIndexSaldo(saldoUser, arreglosal){
    for (let i = 0; i < arreglosal.length - 1; i++) {
      for (let j = 1; j < cantidadTickets.length + 1; j++) {
        if(arreglosal[i].valor * j == saldoUser){
          numTicket = j;
          indexSaldo = i
        }   
      }
    }
    }

    function actualizarSaldo(){
      for (let i = 0; i < arreglosal.length - 1; i++) {
        if(indexSaldo === i){
          salDos = usuario.saldo[0] - arreglosal[i].valor;
        }
      }
    return salDos;
    }

  //   //2 4 6 //400
  //   //5 10 15 //1000
  //   //8 16 24  //
  //   //14 28 42  //
  //   //20 40 60  //
  //   //25 50 75  //

    function saldoParaBack(enviarSaldo){
      for (let i = 0; i < arreglosal.length - 1; i++) {
        if (indexSaldo === i){
          enviarSaldo = arreglosal[i].carga / 10
          }
      }
    //si no entra a ningun if, el saldo del cliente es cero
        return enviarSaldo
    }

    function handleChange(e){
      setInput({
        ...input,
        [e.target.name]: e.target.value
      })
      setErrors(validateUser({
        ...input,
        [e.target.name]: e.target.value
      }, users));
    }

    function handleChangeCarga(e){
      setCargaSaldo({
        saldo: [String(e.target.value)]
      })
    }

    function handleSubmit(e) {
      e.preventDefault();
      var enviarSaldo = "0";
      var ultimoSaldo = "0";

      if(errors.user){
        alert("El usuario ingresado ya existe! Pruebe con otro!")
      } else { 
      ultimoSaldo = saldoParaBack(enviarSaldo);
      
      if(ultimoSaldo !== "0"){
      sal.saldo[0] = String(actualizarSaldo(salDos));
      dispatch(postUser(input));
      dispatch(putUser(sal, usuario.id));
      alert("Usuario creado con exito!! ");
      window.location.href = `https://pagomp.vercel.app/${usuario.user}/${usuario.id}/${ultimoSaldo}/${input.user}`;
      setInput({
          name: "",
          user: "",
          password: "",
          saldo: ["0"],
          correo: "Sin informar",
          pais:"Argentina",
          phone: "",
          access: "false",
          fecdata:"",
          pagopending: "0"
      }) 
    }
    else {
    alert("No dispone de Monedas!")  
    }
    }}

    function handleSubmitDos(e){
      e.preventDefault();
      if(usuario.saldo[0] == 0){
        if( cargaSaldo.saldo[0] !== "null"){
          var recargarSaldoMp = Number(cargaSaldo.saldo[0]) / 3
          // dispatch(putUser(cargaSaldo, usuario.id));
       setCargaSaldo({
       saldo:["null"]
       });
          window.location.href = `https://pagomp.vercel.app/${usuario.user}/${usuario.id}/${recargarSaldoMp}/${usuario.id}`;

      } else {
        alert("Debe seleccionar un valor de moneda!") 
      }
      }
      else 
        alert("Debe vender todas sus monedas para volver a comprar!")
    }
      
    obtenerIndexSaldo(saldoUser, arreglosal);

    useEffect(() => {
        let intervalo = null;
        intervalo = setInterval(()=>{
        if (isLoading > 0) {
        setIsLoading(isLoading => isLoading - 1)
    }
      },1000)
      return () => clearInterval(intervalo);
    },[isLoading])

      const renderSpinner = () => {

        return (
            < div style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>         
                <br />
                <h4>Cargando</h4>
              < FadeLoader 
                color="#e4eceb"
                size={1500}
              // speedMultiplier={0.3}
              />
            </div>
          )
      }
  //   // para que nadie ingrese solo poniendo el id en el buscador hago en /acceder: putUser({access=true})
  //   // y cuando cierro sesion putUser({access=false})  
    obtenerSaldoUser();

    function handleCambioPass(e){
      e.preventDefault();
      dispatch (putPassword(inputPassword ,usuario.id));
      dispatch (putAccess({
        access: "false"
      } ,usuario.id));
        history.push("/acceder")
    }

    function handleChangePasword(e){
      setInputPassword({
        password: e.target.value
      })
    }

    function hanldleNotif(){      
      if(document.getElementById("cambioNotif").style.display === "none" )
      document.getElementById("cambioNotif").style.display = "flex";
      else{
        document.getElementById("cambioNotif").style.display = "none";

      }
    }

    function hanldleDatos(){
      if(document.getElementById("cambioDatos").style.display === "none" )
      document.getElementById("cambioDatos").style.display = "flex";
      else{
        document.getElementById("cambioDatos").style.display = "none";

      }
    }

    function hanldleContraseña(){
      if(document.getElementById("cambioPassword").style.visibility === "hidden" ){
      document.getElementById("cambioPassword").style.visibility = "visible";
      document.getElementById("cambioDatos").style.display = "none";
      document.getElementById("cambioNotif").style.display = "none";

    }
      else{
        document.getElementById("cambioPassword").style.visibility = "hidden";

      }
    }

    function handleButtonPass(){ 
          document.getElementById("cambioPassword").style.visibility = "hidden";
    }

    function hanldleSesion(e){
      e.preventDefault();
      dispatch (putAccess({
        access: "false"
      } ,usuario.id));
        history.push("/")
    }

    function MuestraDetalleSaldo(e){
      e.preventDefault();
      if(document.getElementById("saldovisible").style.visibility === "visible" )
      document.getElementById("saldovisible").style.visibility = "hidden";
      else
      document.getElementById("saldovisible").style.visibility = "visible";
    }

    function sinMonedas(){
      if(indexSaldo === 6){
        return(
          <h7>Cada moneda vendida genera una cuenta al cliente comprador con 3 monedas nuevas y un saldo total triplicado al valor de la moneda. </h7>    
        )
       }
      else return(
        <div>
        <h7>Cada moneda vendida genera una cuenta al cliente comprador con 3 monedas nuevas y un saldo total de ${arreglosal[indexSaldo].valor * 3}.000 (${arreglosal[indexSaldo].valor * 3000 - (Math.round(arreglosal[indexSaldo].valor * 600))} para el cliente comprador + ${Math.round(arreglosal[indexSaldo].valor * 600)} de Potenciar Cash ). </h7>
      <br />
     
      <h7>El cliente que compra la moneda debe abonar ${arreglosal[indexSaldo].valor}.000 al usuario {usuario.name}.</h7>
      <br />
      <h7>Para cargar los ${arreglosal[indexSaldo].valor * 3000} y las 3 monedas a la cuenta nueva, el usuario {usuario.name} debe abonar ${arreglosal[indexSaldo].valor * 1000 / 5} a Potenciar Cash.</h7>
      </div>
      )
      }               
       

       function Mostrar() {
        if (isLoading > 0) {
         return renderSpinner();
        }
         else if(usuario !== undefined && usuario.access == true) { 
       return(         
         <div>
        <div className="encab" >
        <h7>Bienvenido/a {usuario.name}</h7>
        <h7> Saldo total: ${usuario.saldo[0]}.000</h7>
        </div>

        <div style={{display:"flex", position:"absolute", right:"1%", textAlign:"end"}}>
            <div class="mostrarSal" onClick={(e)=> MuestraDetalleSaldo(e)}>
              Click para ver/ocultar detalle:
              <div id="saldovisible" style={{visibility:"hidden"}}>
              <h8>Tu saldo: ${Math.round(saldoNetoUser * 1000)} </h8>
              <br />
              <h8>
              Saldo Potenciar Cash: ${Math.round(saldoNetoMoneda * 1000)}</h8> 
              </div>
              </div>  
        </div>
        <div id="cambioPassword" >
          <button className="buttonPass" onClick={()=>handleButtonPass()}>X</button>
         <form class="row g-4" style={{backgroundColor:"#000000e6"}} className="formul" onSubmit={(e)=> handleCambioPass(e)}>
          <div class="col-md-12" style= {{paddingRight:"0px", paddingLeft:"0px"}}>
          <label for="cambioPas" class="form-label">Contraseña nueva:</label>
          <br />
        <input id ="cambioPas"
              placeholder='Ingrese su nueva clave'
              type="password" name="passwordnuevo"
                      value = {inputPassword.password}
              onChange={(e) => handleChangePasword(e)}
              required
              />
      </div> 
    
      <br />
      <button style={{backgroundColor:"transparent", color:"white", border:"solid 1px", width:"50%", marginLeft:"25%"}} type= "submit">Cambiar</button>
    </form>

      </div>

        <div className="cajauser">
        <input type="checkbox"  id="spoiler2" /> 
          <label for="spoiler2" ><h3>< GiHamburgerMenu /></h3></label>
        <div class="spoiler">
        < a style={{backgroundColor:"transparent", cursor:"pointer"}} onClick={()=> hanldleNotif()}>Notificaciones <IoNotificationsSharp/></a>
        <br />
        <div id="cambioNotif" style={{display:"none"}}>
          No tiene Notificaciones!
          </div>
          <br />
        < a style={{backgroundColor:"transparent", cursor:"pointer"}} onClick={()=> hanldleDatos()}><IoPersonCircleOutline/> Mis Datos</a>
        <br />
        <div id="cambioDatos">
                Usuario: {usuario.user}
                <br/>
                <div><BiMailSend/> {usuario.correo}</div>
                Telefono: {usuario.phone}
                <br />
                <br />

          </div>
          < a style={{backgroundColor:"transparent", cursor:"pointer"}} onClick={()=> hanldleContraseña()}><IoSettingsSharp/> Cambiar Contraseña </a>
          <br />
          <a style={{ width:"auto", backgroundColor:"transparent", cursor:"pointer"}} href="https://api.whatsapp.com/send?phone=1176351958"><TfiHeadphoneAlt/> Ayuda</a>

          <br />
          <br />
          < button style={{backgroundColor:"transparent", border:"solid 1px"}} onClick={(e)=> hanldleSesion(e)}> <IoIosPower/> Cerrar Sesion</button>
          </div>
        </div>
        <br />
  

              <div className="invinterno">
                <div style={{marginBottom:"-60px", zIndex:"1"}}>
              <h2 >Potenciar Cash</h2>
              </div>
        <img src="https://i.pinimg.com/originals/55/01/60/5501609ee45d514d1f2c4a63502045e2.gif" alt="gifinversion" /> 
        <br />

        <div className="venta">

              <div style={{"text-align": "center",  border:"solid 1px"}}>
            <img class="imgGif" src="https://i.pinimg.com/originals/9b/67/b4/9b67b4e5299c980b2d6beaf7dc6958b4.gif" alt="gif tecnologia" />
            <br />
            <h5>Monedas:</h5>
            <h7>Usted cuenta con {numTicket} Moneda/s</h7>
            <br />
            <h7>Valor de venta por cada moneda: ${arreglosal[indexSaldo].valor}.000 </h7> 
            {function ticks(){
              if (numTicket === 3){
              return(
    <fragment>
            <div className="cajatarj">
              <a className="atam" > <img className="tarjta" src={tickets} alt="ticket"/></a>
              <a className="atam" > <img className="tarjta" src={tickets} alt="ticket"/></a>
              <a className="atam" > <img className="tarjta" src={tickets} alt="ticket"/></a>
            </div>
    </fragment>
              )
            }
            if (numTicket === 2){
              return(
    <fragment>
            <div className="cajatarj">
              <a className="atam" > <img className="tarjta" src={tickets} alt="ticket"/></a>
              <a className="atam" > <img className="tarjta" src={tickets} alt="ticket"/></a>
            
            </div>
    </fragment>
              )
            }
            if (numTicket === 1){
              return(
    <fragment>
            <div className="cajatarj">
              <a className="atam" > <img className="tarjta" src={tickets} alt="ticket"/></a>
            </div>
    </fragment>
              )
            }
            if (numTicket === 0){
              return(
    <fragment>
            <div className="cajatarj">
            <h4>No dispone de Monedas!</h4>   
            
            </div>
    </fragment>
              )
            }
            }()}
            <br />
            <div style={{"text-align": "center", padding:"2px"}}>
            {sinMonedas()}
               </div>
    <br />
          </div>      
            <br />
    <form class="row g-4" className="formul" onSubmit={(e)=> handleSubmit(e)}>
    Complete los siguientes datos del comprador para vender una moneda:
    <div class="col-md-12" style={{"margin-top": "5px"}}>
        <label for="inputName" class="form-label">*Nombre y Apellido:</label>
        <input class="form-control" id="inputName" placeholder="Nombre y Apellido"
        type= "text"
        value = {input.name}
        name = "name"
        onChange={(e) => handleChange(e)} 
        required
      />
    </div>
    <div class="col-md-12"style={{"margin-top": "5px"}}>
          <label for="inputUser" class="form-label">*Usuario:</label>
          <input class="form-control" id="inputUser" placeholder="Nombre de usuario"
          type= "text"
          value = {input.user}
          name = "user"
          onChange={(e) => handleChange(e)} 
        required
        />
    </div>
    <div class="col-md-12" style={{"margin-top": "5px"}}>
          <label for="inputPassword" class="form-label">*Contraseña:</label>
          <input class="form-control" id="inputPassword" placeholder="Contraseña"
          type= "password"
          value = {input.password}
          name = "password"
          onChange={(e) => handleChange(e)} 
        required
        />
    </div>

    <div class="col-md-12" style={{"margin-top": "5px"}}>
        <label for="inputEmail4" class="form-label">Mail(opcional)</label>
        <input class="form-control" id="inputEmail4" placeholder="Correo electronico"
        type= "text"
        value = {input.correo}
        name = "correo"
        onChange={(e) => handleChange(e)} 
      />
    </div>
    <div class="col-md-12" style={{"margin-top": "5px"}}>
      <label for="inputPhone" class="form-label">*Celular</label>
      <input class="form-control" id ="inputPhone"  placeholder='Ingrese su numero de celular'
      type="number"
      value = {input.phone}
      name="phone"
      onChange={(e) => handleChange(e)}
      required
    />
    </div>
    <div class="col-md-12" style={{"margin-top": "5px"}}>
      <label for="inputFecNac" class="form-label">*Fecha Nac:</label>
      <input class="form-control" id ="inputFecNac"  placeholder='xx/xx/xxxx'
      type="date"
      value = {input.fecdata}
      name="fecdata"
      onChange={(e) => handleChange(e)}
      required
    />
    </div>
    <br />
      <div class="col-12" style={{"margin-top": "10px"}}>
      <button class="btn btn-primary" type= "submit">Vender 1 Moneda</button>
      </div>
    </form>
    </div>
    </div>
    <br />
    <div style={{display:"flex", justifyContent:"center", textAlign: "center", flexDirection:"column", backgroundColor:"#000000a1", border: "solid 2px"}}>
      <div>
        <br />
      <h6 >Si no dispone de monedas puede comprar más seleccionando el valor de su moneda:</h6>
        Comprar Monedas
        <br />
          <form class="row g-4" className="formul" onSubmit={(e)=> handleSubmitDos(e)}>
          <div class="col-md-12">
          <label for="inputSaldoCarga" class="form-label">Valor Moneda:</label>
        <br />
        <select class="form-control" id ="inputSaldoCarga"
              placeholder='Seleccione el valor que desea ingresar para su moneda:'
              type="text" name="saldo"
              onChange={(e) => handleChangeCarga(e)}
              required
              >
          <option value= "null" >Seleccione Valor</option>
          <option value="6">$2.000</option>
          <option value="15">$5.000</option>
          <option value="24">$8.000</option>
          <option value="42">$14.000</option>
          <option value="60">$20.000</option>
          <option value="75">$25.000</option>
        </select>
      </div> 
      <br />
      <button class="btn btn-primary" type= "submit">Comprar monedas</button>
    </form>
  </div>
  <br />
  </div>
   </div>
     )
   }
     else{
      return(
        <div style={{display:"center", textAlign:"center", flexDirection:"column"}}>
          <br />
          Si no ingreso su usuario y clave debe loguearse en:
          <br />
          <br />
          <Link class="btn" style= {{width:"25%", marginLeft:"37%"}} to="/acceder">Acceder</Link>
          <br />
          <br />
          Si ingreso correctamente pruebe recargando la pagina!
        </div>
      )
    }
  }

  return(
    
    <div style={{padding:"8px"}}>
    {Mostrar()}
      </div>
    )
   }
    
