//Variables

const numero = document.getElementById('numero');
let btn1 = document.getElementById('btn1');
let btn2 = document.getElementById('btn2');

const sumar = () => {

   removeAnimationClass();

   setTimeout(() =>{
      numero.classList.add('animation');
   }, 10);
   
   return numero.innerText++;
}

const restar = () => {
   
   removeAnimationClass();

   setTimeout(() =>{
      numero.classList.add('animation2');
   }, 10);
   
   return numero.innerText--;
}

const removeAnimationClass = () => {
   numero.classList.remove('animation2', 'animation');
}


// Activar contador automático: 

// Suma automáticamente
// setInterval(sumar, 1000); 

// Resta automáticamente
// setInterval(restar, 1000); 