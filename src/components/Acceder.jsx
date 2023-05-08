import React, { useState, useEffect } from "react";
import "./Acceder.css"
import { getUsers, putAccess } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


export default function Acceder(){
    const dispatch = useDispatch()
    const history = useHistory()
    const users = useSelector(state => state.users) 
    var acceso = {
        access: "true"
    }
    const [ input, setInput ] = useState({
        user: "",
        password: ""
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

function handleSubmit(e){
    e.preventDefault();
    for (let index = 0; index < users.length; index++) {
        if(users[index].user === input.user && users[index].password === input.password){ 
            var id= users[index].id;
            index = users.length;
            // para que nadie ingrese solo poniendo el id en el buscador hago:
             dispatch(putAccess(acceso, id))
            // y cuando cierro sesion putUser(activarentrada=false)  
            history.push("/home/" + id)
        }else if(index === users.length - 1){ 
            alert("usuario o contraseña invalida!");
            window.location.reload()
    }
    }
    setInput({
        user:"",
        password:""
    })
}

      useEffect(()=>{
        dispatch(getUsers())
      }, [dispatch]);

return(
    <div className="acceder">    
    <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
      <h1 style={{textAlign:"center"}}>Iniciar sesión</h1>
      
      <form className="formular" onSubmit={(e) => handleSubmit(e)}>
        <input className="inp" type='user' name='user' placeholder='Usuario' required 
        onChange={(e) => handleChange(e)}/>
        <input className="inp" type='password' name='password' placeholder='Contraseña' required 
        onChange={(e) => handleChange(e)} />
        <input type="submit" value='Ingresar' />
      </form>
      {/* <div style={{display:"flex", justifyContent:"center"}}>
      <img style={{border:" 5px groove"}} src="https://www.criptonoticias.com/wp-content/uploads/2020/01/Monederos.jpg" alt="" />
      </div> */}
      </div> 
    </div>
)

}
