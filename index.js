
//carga cuando este el contenido sin esperar x todos los recursos
document.addEventListener("DOMContentLoaded", () => { 
    
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-menu");

    // Al hacer clic en el botón nav-toggle, alterna la visibilidad del menú
    navToggle.addEventListener("click", () => {
        console.log("se clickea el boton"); // test: prueba consola
        navMenu.classList.toggle("nav-menu_visible");
    });


});