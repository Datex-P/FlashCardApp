import React, {useRef} from 'react';
import Navigation from  './Navigation'
import MainBody from  './MainBody'
import SliderComp from './SliderComp'
import 'bootstrap/dist/css/bootstrap.min.css';
import AnyQuestions from './AnyQuestions'


function App() {

  const mainAppRef = useRef('mainApp')

  
  return (
    <>
    <div 
    style={{width: '335px', height: '565px',
     overflowY: 'scroll', overflowX:'hidden'
     }}
    //id='mainApp'
    ref={mainAppRef}
    >
      <Navigation/>
      <MainBody forwardedRef={mainAppRef}/>
  
      <SliderComp/>
      <AnyQuestions/>
    </div>
      </>
  );
}

export default App;
