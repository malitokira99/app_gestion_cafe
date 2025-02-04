// codigo para desplegar el menu de opciones
function accion(){
    var contra = document.getElementsByClassName('menu');
    for(var incremento = 0; incremento < contra.length; incremento++){
        contra[incremento].classList.toggle('oculto');
    }
} //fin codigo
