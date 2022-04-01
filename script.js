'use strict'


var d = document,
    pantalla = d.getElementById("pantalla"),
    teclas=d.querySelectorAll(".tecla span"),
    ultOperacion="",
    resultado=0.0,
    principio=true,
    calc=true;

function calculador(val){
    resultado = parseFloat (resultado);
    val=parseFloat(val);
    switch(ultOperacion){
        case "+":
            resultado+=val;
            break;
        case "-":
            resultado-=val;
            break;

        case "X":
            resultado*=val;
            break;

        case "/":
            resultado/=val;
            break;
    }
}

function keyCodeClick(elem,keyCode){
    var entrada = elem.textContent,
        code = 0;
        if(entrada=="")return;

        // console.log(keyCode,entrada,entrada.charCodeAt(0));
        // console.log(elem.textContent);
    switch(entrada){
     
        case "C":
            code="Escape";
            break;
        case "<":
            code="Backspace";
            break;
        case "X":
            code="*";
            break;
        case "+":
            code="+";
            break;
        case "/":
            code="/";
            break;
        case "=":
            code="Enter";
            break;
        case "-":
            code='-';
            break;
        case ".":
            code=".";
            break;
         default:
             code=String(entrada);
             break;
    }

    if(isNumKeyPad(keyCode)){
        var numPad=convertToNumPadKey(keyCode);
        if((keyCode)==numPad){
            // console.log(Number(keyCode)+48)
            elem.click();
        }
    }

    if(keyCode==code){
        elem.click();
        return;
    }
   
}

function isNumKeyPad( numKey){
    if(numKey>="0"&&numKey<="9") return true;
    else return false;
}

function convertToNumPadKey(numKey){
    // console.log(Number(numKey)+48)
    return Number(numKey)+48;
}

window.addEventListener("keyup",function(e){
    // var entrada=this.textContent;
    // var c=parseInt(e.key)+48;
    console.log(e.key,"   ",(e.key.charCodeAt(0))," ",e.keyCode);
    // if(isNumKeyPad(e.key)){
    //     var c=convertToNumPadKey(e.key);
    // }

     var c=e.key;
    // var c=e.keyCode;
    teclas.forEach(function(e){
        keyCodeClick(e,c);
    })

    
})

function procesador(entrada){
    // console.log(entrada);

    var val = pantalla.textContent;
    // console.log(val)
    if(entrada=="."&&val.indexOf(".")>-1) return;
    
    if(entrada=="<"){
        if(val.length>1){
            val =val.substring(0,val.length-1);
            pantalla.textContent=val;
        }else{
            pantalla.textContent="0";
            principio=true;
            calc=true;
        }
    }else{
        if(entrada=="C"){
            pantalla.textContent="0";
            resultado=0;
            principio=true;
            calc = true;
        }else{
            if(principio){
                val = "";
                pantalla.textContent=val;
                principio=false;

            }

            if(entrada=="+"||entrada=="-"||entrada=="X"||entrada=="/"){
                principio=true;

                if(calc){
                    resultado=val;
                    calc=false;

                }else{
                    calculador(val);
                    pantalla.textContent=resultado;
                }

                ultOperacion=entrada;
            }else{

                if(entrada=="="){
              
                    calculador(val);

                    pantalla.textContent=resultado;
                    calc=true;
                    principio=true;
                }else{
                    pantalla.textContent=val+entrada;
                }
            }

        }
    }
 
    
}

teclas.forEach(function(e){
    var entrada=e.textContent;
    e.addEventListener("click",function(){
        var entrada=this.textContent;

        if(entrada !=""){
            procesador(entrada);
        }
    })



   
});





