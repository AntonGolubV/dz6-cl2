let gen_http = document.querySelector('.gen-http');
let inputArr = document.querySelectorAll('.inp');
let main = document.querySelector('.main');
let obj = {}
let op;
let a = document.querySelector('.a-http');
  gen_http.addEventListener('click', function(){
    for(let i = 0; i < 3; i++){
        if(i == 0){
            obj.first = inputArr[i].value;
        }
        if(i == 1){
            obj.op = `${inputArr[i].value}`;
        }
        if(i == 2){
            obj.therd = inputArr[i].value;
        }
    }

        if(inputArr[1].value == '+'){
        op = 0
        }
        if(inputArr[1].value == '-'){
        op = 1
        }
        if(inputArr[1].value == '/'){
        op = 2
        }
        if(inputArr[1].value == '*'){
        op = 3
        }
    console.log(obj);

  
    
    if((obj.op === '+') || (obj.op === '-') || (obj.op === '/') || (obj.op === '*')){
        a.href = `/calc?param1=${inputArr[0].value}&param2=${inputArr[2].value}&op=${op}`;
    }else{
        alert('В калькуляторе нет такой операции(');
        console.log(obj.op);
    }
  });