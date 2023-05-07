import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getUsers, putUser } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import "./vender.css"

export default function Comprar(){
    const history = useHistory();
    const { id } = useParams();
    const { saldo } = useParams();
    const { user } = useParams();
    const dispatch = useDispatch();
    const users = useSelector(state => state.users)
    let [ segundos, setSegundos ] = useState(5)
    let sal = "0";
    let idUser = "9999"
    var saldoACargar = { saldo : [sal] };
    let arrayValores = [{pago: "2000", carga: "6"},{pago: "5000", carga: "15"},{pago: "8000", carga: "24"},{pago: "14000", carga: "42"},{pago: "20000", carga: "60"},{pago: "25000", carga: "75"}]
    var text = "5000"


    useEffect( () => {
        let intervalo = null;
        intervalo = setInterval ( () => {
            setSegundos(segundos => {
            if(segundos > 0){
                segundos = segundos - 1;
            return segundos
            } else {
                history.push("/home/" + idUser)
            }
            })
        }, 1000 )
        return () => setInterval(intervalo)   
    },[segundos]) 

    function obtenerId(){
        let idUsuario = "";
         for (let i = 0; i < users.length; i++) {
             if(users[i].user === user){
                idUsuario = users[i].id;
             }           
         }
         return idUsuario
     }
     idUser = obtenerId();

    useEffect(()=>{
        dispatch(getUsers());       
    },[dispatch])
 
    function saldoAEnviar(){
        for (let i = 0; i < arrayValores.length; i++) {
            if (String(saldo * 10000) === arrayValores[i].pago) {
                sal = [arrayValores[i].carga]
             }    
        }
    }
    saldoAEnviar();
//   setTimeout( () => {
//  console.log(`?x=${encodeURIComponent('test?')}`)        
//     },2000)
     saldoACargar.saldo = sal

     setTimeout( () => {
        dispatch(putUser(saldoACargar , idUser));        
    },2000)
    
    
    return(
        <div>
            <img className="imgVender" src="https://usagif.com/wp-content/uploads/gif/confetti-16.gif" alt="gif felicitaciones"></img>
        <div className="txtVender">
            <h3> Felicitaciones!</h3>
            <h3>  Compraste 3 monedas! </h3> 
            <br />
            <h5> No salga de esta pagina hasta se actualice su saldo en: <h5 style={{color:"red", fontWeight:"700"}}>{segundos} segundos</h5> </h5>

        </div>
        </div>
    )
}