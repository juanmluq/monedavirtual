import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getUsers, putUser } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import "./vender.css"

export default function Vender(){
    const history = useHistory();
    const { id } = useParams();
    const { saldo } = useParams();
    const { usercomp } = useParams();
    const users = useSelector(state => state.users)
    const dispatch = useDispatch();
    let [ segundos, setSegundos ] = useState(6)
    let idUser = "9999";
    let sal = "0";
    var saldoACargar = { saldo : [sal] };
    let arrayValores = [{pago: "400", carga: "6"},{pago: "1000", carga: "15"},{pago: "1600", carga: "24"},{pago: "2800", carga: "42"},{pago: "4000", carga: "60"},{pago: "5000", carga: "75"}]

    useEffect( () => {
        let intervalo = null;
        intervalo = setInterval ( () => {
            setSegundos(segundos => {
            if(segundos > 0){
                segundos = segundos - 1;
            return segundos
            } else {
                history.push("/home/" + id)
            }
            })
        }, 1000 )
        return () => setInterval(intervalo)   
    },[segundos]) 

    useEffect(()=>{
        dispatch(getUsers());       
    },[dispatch])
 
    function saldoAEnviar(){
        for (let i = 0; i < arrayValores.length; i++) {
            if (String(Math.round(saldo * 10000)) === arrayValores[i].pago) {
                sal = [arrayValores[i].carga]
             }    
        }
    }
    saldoAEnviar();

     function obtenerId(){
        var idUsuario = "";
         for (let i = 0; i < users.length; i++) {
             if(users[i].user === usercomp){
                idUsuario = users[i].id
             }           
         }
         return idUsuario
     }
     idUser = obtenerId();
     saldoACargar.saldo = sal

     setTimeout( () => {
        dispatch(putUser(saldoACargar , idUser));        
    },3000)
    
    return(
        <div>
            <img className="imgVender" src="https://usagif.com/wp-content/uploads/gif/confetti-16.gif" alt="gif felicitaciones"></img>
            <div className="txtVender">
                <h3> Felicitaciones!</h3>
                <h3>  Moneda vendida! </h3> 
                <br />
                <h5> No salga de esta pagina hasta se actualice el saldo de su comprador en: <h5 style={{color:"red", fontWeight:"700"}}>{segundos} segundos</h5> </h5>
                {/* <div style={{display:"flex", justifyContent:"center"}}>
                 <Link style={{width:"60px"}} to={"/home/" + id} >Volver</Link>
                 </div> */}
            </div>
        </div>
    )
}
