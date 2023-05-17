import React from 'react';
import './Home.css';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { BsTelephoneInbound, BsWhatsapp, BsFacebook, BsInstagram } from "react-icons/bs";
import { BiMailSend } from "react-icons/bi"


export default function Home() {
  const history = useHistory();
  const [ person, setPerson ] = useState(1193)
const [personas, setPersonas] = useState(Math.floor (Math.random() * 70 + 541))
const [crece,  setCrece] =useState(true)
const[creceSeg, setCreceSeg] =useState(true)
 
useEffect(()=>{
  let intervalo = null;

  if(personas >= 541 && crece){
  intervalo = setInterval ( () => { 
  setPersonas(personas => personas + 1);
  }, 9000);
  if(personas === 599){
  setCrece(false)
  }
} 


if(personas <= 611 && !crece && !creceSeg){
  if(personas === 599){
    setCrece(true)
    setCreceSeg(true)
    }

  intervalo = setInterval(() => { 
  setPersonas(personas => personas - 1);
  }, 9000); 
}

if(personas <= 611 && !crece && creceSeg){
  if(personas === 579){
    setCrece(true)
    setCreceSeg(false)
    }
  intervalo = setInterval(() => { 
  setPersonas(personas => personas - 1);
  }, 9000); 
}

  return () => clearInterval(intervalo);

}, [personas]);

  return (
    <div className='home'>
      <div className='centrartres'>
                <h7 style={{fontWeight:"700", textAlign:"center"}} > En que podemos ayudarte? </h7> 
       </div>
     <div className='centrardos'>
      <a style={{ width:"auto"}} href="https://api.whatsapp.com/send?phone=+5491176351958">  
         <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
           <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
         </svg>   
       </a>
       </div>
      {/* <img className='image' src="https://img.freepik.com/vector-premium/fondo-tecnologia-abstracta-fondo-innovacion-concepto-comunicacion-alta-tecnologia_42421-664.jpg?w=360" alt="gif" /> */}
      
      {/* { <video controls>
          <source src="https://player.vimeo.com/video/338795767?h=9e40727958&amp;muted=1&amp;autoplay=1&amp;loop=1&amp;transparent=0&amp;background=1&amp;app_id=122963" />
        </video> }  */}
              {/* <br/>
              <br/>
              <br/>

              <div className='texto'>
          <h1>Potenciar Cash</h1>
         
        </div>
        
        <h5 className='tex'>Moneda Vitual TPC</h5>*/}

              <br/>
              <br/>
              <br/>

              <div className='texto'>
          <h1>Potenciar Cash</h1>
         
        </div>
        
        <h5 className='tex'>Moneda Vitual TPC</h5>


        <div style={{ display:"flex", position:"relative", justifyContent:"flex-end", margin:"2%"}}>
        <div className='conect'>  
        {personas} personas conectadas
        <img className='imgcon' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJLdhbWjBAw8YhmkaUj_O6NgzjJ2kkGFh9bA&usqp=CAU" alt="img" />
      </div>
      </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>

        <div className='bienvenido'>
          <div className='subbienv' >
            <h2>Ingresá</h2>
              <h8>Registrate o envianos un whatsapp.</h8>
          </div>
          <div className='subbienv'>
            <h2>Depositá</h2>
              <h8>Realiza un primer deposito.</h8>
          </div>
          <div className='subbienv'>
            <h2>Vendé</h2>
              <h8>Vende a u nuevo usuario.</h8>
              <h8>Recibes usuario y clave nuevos.</h8>
          </div>
         
          <div className='subbienv'>
           <h2>Ganá</h2>
            <h8>Ya tienes tu 1er ganancia!</h8>
          </div>
          <br/>
        </div>
        <div className='fondo'>
        <div className="pagos">
          <h3>Metodos aceptados:</h3>
            </div>
          
          <div className='metpag'>
            <div className='dospag'> 
              <img className='tb' src="https://www.codere.bet.ar/_catalogs/masterpage/codere/images/mercado-pago.svg" alt="imagenmp" />
              <img className='tb' src="https://www.codere.bet.ar/_catalogs/masterpage/codere/img/Logo_TransferenciaBancariacolor.png" alt="imagentansferencia" />
              <img className='tj' src="https://www.bodog.com/cms/BDG/TBvSuab9Qvyj5dczL03oFQ//american-express-bodog.png" alt="imagenamerican" />
              <img className='tj' src="https://www.bodog.com/cms/BDG/MntYnxPqQVeNdn1G8H52YA//master-card-bodog.png" alt="imagenmaster" />
              <img className='tj' src="https://www.bodog.com/cms/BDG/WZpFmUOhQgmSxSw97Z1ytg//visa-bodog.png" alt="imagenvisa" />
            </div>
          
        </div>
        </div>
        {/* <img style={{height: "400px"}} src="https://img6.s3wfg.com/web/img/images_uploaded/6/f/bitcoincb259.gif" alt="piemoneda" /> */}
        <br />
        <br/>
        <br />
        <footer className='piePagin'>

        <div style={{display: "flex", position: "relative", justifyContent: "space-between", margin:"0% 5%" }}>
          <div> <BsWhatsapp/> (011) 7635 1958 </div>
          <div> <BiMailSend/> potenciarcash@outlook.com </div>

        </div>        
        <div style={{display: "flex", position: "relative", justifyContent:"space-between", margin:"0% 5%" }}>
        <a style={{color: "white"}} href='https://www.instagram.com/potenciarcash/'><BsInstagram/> Instagram</a>
        <a style={{color: "white"}} href='https://www.facebook.com/profile.php?id=100066945122334'> <BsFacebook/> Facebook</a>
        </div>
        <div style={{display: "flex", position: "relative", justifyContent:"center" }}>
          Potenciar Cash te ofrece Moneda Virtual TPC!
          <br />
          Con Moneda Vitual TPC multiplicas tu dinero!
          <br />
        </div>
        <a style={{display: "flex", position: "relative", justifyContent:"center", paddingBottom:"10px" }} href="/terminosycondiciones">Terminos y condiciones</a> 
        </footer>
      </div> 
        );
}



