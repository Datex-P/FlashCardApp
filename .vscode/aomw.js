function bald(x){

  let count = 0;
  let arr = ['Clean', 'Unicorn', 'Homer', 'Careless', 'Careless', 'Careless', 'Hobo']
  
  for (let i =0; i<x.length; i++) {
    if (x[i] === '/') {
      count +=1
    }
  }
  let string =x.replace(/\//g, '-')
  //console.log(x.replace(/\/ /g, '') )
  console.log([string, count>6? arr[6]+'!':arr[count]+'!'])
  
}

bald('/---------')


