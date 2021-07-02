import React, {useRef} from 'react'
import './index.scss';
import logoUpper from './Pictures/milesAlternative.jpeg'
import arrowDown from './Pictures/arrowDown.svg'

export default function MainBody({forwardedRef}) {


  const arrowRef = useRef()
  
  function handle() {
    
      if (!arrowRef.current.classList.contains('rotated-image')) {

          forwardedRef.current.scrollTo({top:315, left: 0, behavior: 'smooth'})
          arrowRef.current.classList.add('rotated-image')
      } else {
          forwardedRef.current.scrollTo({top:0, left: 0, behavior: 'smooth'})
          arrowRef.current.classList.remove('rotated-image')
  }
}


  return (
    <div style={{width: 'inherit', height: 'auto'}}>
  
 
      <div style={{width:'inherit', height:'inherit', position:'relative'}}>
          <img src= {logoUpper} alt = 'background-logo' 
               style = {{width:'320px', maxHeight: '280px'}} 
          />
          
           <h3 className='welcomeText'>Hello, welcome!</h3>
          
            <img src={arrowDown} 
              alt='arrowDown' 
             className='arrowDown'
             ref={arrowRef}
            onClick={handle}
             />

        <div style={{display: 'flex', justifyContent:'center', width:'90%'}}>
       
        </div>   
      </div>

    </div>
  )
}
