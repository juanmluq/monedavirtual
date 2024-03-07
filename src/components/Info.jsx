import React from 'react';
import "./Info.css";
import clip1 from "../videos/clip1.mp4"
import clip2 from "../videos/clip2.mp4"

export default function Info() {
  return (
    <div className='centradoinfo'>
        <br />      
        <h3>Info Videos</h3>
        <br />
        <div>
          Para entender mejor el funcionamiento de Moneda Virtual TPC te invitamos
        <br />
          a que veas los siguientes videos informativos:
        <br />
          Videos:
        <br />
        <br />
        El siguiente video informa como comprar monedas:
        <br />
         { <video controls className='vid'>
          <source  src={clip1} />
        </video> } 
        <br />
        <br />
        El siguiente video informa como vender una moneda:
        <br />
        { <video controls className='vid'>
          <source  src={clip2} />
        </video> } 
        {/* { <video controls>
          <source src="https://player.vimeo.com/video/338795767?h=9e40727958&amp;muted=1&amp;autoplay=1&amp;loop=1&amp;transparent=0&amp;background=1&amp;app_id=122963" />
        </video> }  */}
      </div>
    </div>
  );
}
