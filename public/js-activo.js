// Marca la página antes de pintarla para que el CSS sepa que el mapa será interactivo
// y oculte los andenes que no están elegidos. Va en un archivo aparte porque la CSP
// no permite scripts en línea.
document.documentElement.classList.add("js");
