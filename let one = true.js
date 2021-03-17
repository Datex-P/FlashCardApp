//'use strict'
one = true

function foo(){
  if(one){
    console.log('ok')
  }else{
    console.log('not ok')

  }
}

foo()
one = false
foo()