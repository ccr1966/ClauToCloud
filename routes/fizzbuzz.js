var resultado ="";

for (let i=1; i <= 100; i++){
    if (i % 15 ===0){
        resultado = resultado + "("+i +"):FizzBuzz-";
    }
    else{
        if (i % 5 ===0){
            resultado = resultado + "("+i +"):Buzz-";
        }
        else{
            if (i % 3 ===0){
                resultado = resultado + "("+i +"):Fizz-";
            }
            else{
           
                    resultado = resultado+ " " + i +"-";
                }
        }
                
    }
}
console.log(resultado);
