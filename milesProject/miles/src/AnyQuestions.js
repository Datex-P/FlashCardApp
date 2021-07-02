import React, {useState} from 'react'

export default function AnyQuestions() {

  const [showLabel, setShowLabel] = useState(0);
  const [initialZero, setInitialZero] = useState(true);

  return (
   
    <>
    <div style={{display: 'flex', flexDirection:'column', maxWidth: '91%', margin:'auto', 
    height:'fitContent', justifyContent:'space-between',
    marginTop:'30px'
    }}>
      <h3>Any Questions? <br/>Leave us a <br/>message!</h3>
      <input style={{width: '100%', height: '32px', marginTop: '13px',
      borderRadius: '3px', border:'1px solid black', zIndex: '2'
      }} className='someclass'  id='cl' name='someclass' required={true}
      onInput={(e)=>{
        setInitialZero(false)
        setShowLabel(e.target.value.length)
        console.log(showLabel)

        if (showLabel ===0 && initialZero === false) {
          document.getElementById('cl').required = false
        } else {
          document.getElementById('cl').required = true
        }
      }}
      ></input>
      {showLabel ===0?
    <label for='someclass' id='addNameLabel'>Add name</label>
    :
    <div style={{height:'32px'}}></div>

    
    }

      <button style={{background: '#03045e', width:'100%', border:'7px',
       borderRadius:'5px', marginTop: '-4px', color:'white', height:'35px'}}>Send</button>


    <div style={{width:'111%', backgroundColor:'black', height:'70px', color:'#f5f5dc', 
    marginTop:'40px', position: 'relative', left: '-14px'}}>
    <span style={{position: 'absolute', top:'10px', left:'10px', fontSize:'14px'}}>
    (c) Copyright 2021</span>
    </div>
    </div>
    </>
   
  )
}
