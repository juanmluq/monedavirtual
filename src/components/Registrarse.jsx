import React from 'react';
import './Registrarse.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, postUser } from './actions';

function validate(input, users){
  let errors= {};
  for (let i = 0; i < users.length; i++) {
    const element = users[i].user;
    if (element === input.user) {
      errors.user = "El nombre de usuario ya existe, Pruebe con otro!"
    }  
  }
  return errors;
}

export default function Reg () {
  const dispatch = useDispatch();
const [ errors, setErrors ] = useState({});
const users = useSelector(state => state.users);
const [auxCash, setAuxCash] = useState([0]);
  const [ input, setInput ] = useState({
  name:"",
  user: "",
  password:"",
  saldo:["0"],
  correo:"",
  pais:"Argentina",
  phone:"",
  fecdata:"",
  access:"false",
  pagopending: "0"
});

function handleCash(e){
  setAuxCash([e.target.value])
}

function handleChange(e){
  setInput({
    ...input,
    [e.target.name]: e.target.value
  })
  setErrors(validate({
    ...input,
    [e.target.name]: e.target.value
  }, users));
}

function handleSubmit(e){
  e.preventDefault();
  if (errors.user) {
  alert("El usuario ingresado ya existe! Pruebe con otro!")
} else{ 
  dispatch(postUser(input));
  alert("Usuario creado con exito! Si selecciono un valor para su moneda sera redireccionado para abonar!");
     
  if(auxCash[0] > 0){ 
  setTimeout(() => {
    window.location.href = `https://pagomp.vercel.app/${input.user}/82f26bd9-742c-4279-8eb1-hj65413874jml/${auxCash[0] / 3}/82f26bd9-742c-4279-8eb1-hj65413874jml`;
  }, 500);
}
  setInput({
    name:"",
    user: "",
    password:"",
    saldo:["0"],
    correo:"",
    pais:"",
    phone:"",
    fecdata:"",
    pagopending: "0",
    access:"false"
  });  
}
}


useEffect(()=> {
  dispatch(getUsers());
  },[dispatch]);

    return (
      <div>
      <br />
      <div className="regist">
     
        <br />
        <h1>Registrate</h1>

        <form onSubmit={(e) => handleSubmit(e)} >
          <div>
            <label for="inputName" class="form-label">Nombre:</label>
            <input class="form-control" id ="inputName"  placeholder='Nombre y apellido'
            type="text"
            value = {input.name}
            name="name"
            onChange={(e) => handleChange(e)}
            required
          />
          </div>
          <br />
         <div>
            <label for="inputUser" class="form-label">Usuario:</label>
            <input class="form-control" id ="inputUser"  placeholder='Ingrese un usuario'
            type="text"
            value = {input.user}
            name="user"
            onChange={(e) => handleChange(e)}
            required
          />
          {errors.user && (
            <p>{errors.user}</p>
          )}
          </div>
         <br />
         <div>
            <label for="inputPassword" class="form-label">Contraseña:</label>
            <input class="form-control" id ="inputPassword"  placeholder='Ingrese una contraseña'
            type="password"
            value = {input.password}
            name="password"
            onChange={(e) => handleChange(e)}
            required
          />
          </div>
         <br />
         <div>
            <label for="inputSaldo" class="form-label">Valor Moneda:</label>
          <br />
          El valor que ingresa para su moneda es el que debera abonar
          <br />
  <select class="form-control" id ="inputSaldo"
          placeholder='Seleccione el valor que desea ingresar para su moneda:'
          // value = {input.saldo}
          type="text" name="saldo"
          onChange={(e) => handleCash(e)}
          required
          >
    <option value="0">$0</option>
    <option value="6">$2.000</option>
    <option value="15">$5.000</option>
    <option value="24">$8.000</option>
    <option value="42">$14.000</option>
    <option value="60">$20.000</option>
    <option value="75">$25.000</option>
  </select>
          </div> 
        <br />
          <div>
            <label for="inputCorreo" class="form-label">Email:</label>
            <input class="form-control" id ="inputCorreo"  placeholder='Ingrese su correo electronico'
            type="text"
            value = {input.correo}
            name="correo"
            onChange={(e) => handleChange(e)}
            required
          />
          </div> 
          <br />
          <div>
            <label for="inputPhone" class="form-label">Celular:</label>
            <input class="form-control" id ="inputPhone"  placeholder='Ingrese su numero de celular'
            type="number"
            value = {input.phone}
            name="phone"
            onChange={(e) => handleChange(e)}
            required
          />
          </div>
          <br />
          <div>
            <label for="inputFecNac" class="form-label">Fecha Nac:</label>
            <input class="form-control" id ="inputFecNac"  placeholder='xx/xx/xxxx'
            type="date"
            value = {input.fecdata}
            name="fecdata"
            onChange={(e) => handleChange(e)}
            required
          />
          </div>
          <br />
          <div>
            <label for="inputPais" class="form-label">Pais de residencia:</label>
          <br />
          Seleccione su pais:
          <br />
  <select class="form-control" id ="inputPais"
          placeholder='Pais'
          type="text" name="pais"
          onChange={(e) => handleChange(e)}
          required
          >
    <option value="Argentina">Argentina</option>
    <option value="Bolivia">Bolivia</option>
    <option value="Brasil">Brasil</option>
    <option value="Canada">Canada</option>
    <option value="Chile">Chile</option>
    <option value="Colombia">Colombia</option>
    <option value="Ecuador">Ecuador</option>
    <option value="El Salvador">El Salvador</option>
    <option value="España">España</option>
    <option value="Estados Unidos">Estados Unidos</option>
    <option value="Guatemala">Guatemala</option>
    <option value="Honduras">Honduras</option>
    <option value="México">México</option>
    <option value="Paraguay">Paraguay</option>
    <option value="Perú">Perú</option>
    <option value="Uruguay">Uruguay</option>
    <option value="Venezuela">Venezuela</option>

  </select>
          </div> 
        <br />
          <div>
            <button class="btn btn-primary" type='submit'>Crear Usuario</button>
            </div>
        </form>
          <div className='info'>
              Una vez completado el formulario, puede acceder a su cuenta con el usuario y contraseña ingresados.
          </div>
        </div>
       
       <div className='cent'>
          <h7 style={{fontWeight:"700"}} > WhatsApp </h7> 
           <a style={{ width:"auto"}} href="https://api.whatsapp.com/send?phone=+5491176351958">  
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
              </svg>   
            </a>
            </div>
        <br />
        <br />
      </div>
    );
};

