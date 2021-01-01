// VARIABLES
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

//contenedor para los resultados
const resultado = document.querySelector('#resultado');

const max = new Date().getFullYear();
const min = max - 10;


// Objeto de busqueda
const datosBusqueda = {
     marca: '',
     year: '',  
     minimo: '',  
     maximo: '',  
     puertas: '',  
     transmision: '',  
     color: '',  
}


// EVENT LISTENERS
document.addEventListener('DOMContentLoaded' , ()=> {
    mostrarAutos(autos);  // muestra los automoviles al cargar

    // llena las opciones de años
    llenarSelect();
})


// EVENT LISTENERS PARA LAS OPCIONES DEL FORMULARIO
marca.addEventListener('change' , e => {
    datosBusqueda.marca = e.target.value;

    filtrarAutos();
});

year.addEventListener('change' , e =>{
    datosBusqueda.year = parseInt(e.target.value);

    filtrarAutos();
});

minimo.addEventListener('change' , e => {
    datosBusqueda.minimo = e.target.value;

    filtrarAutos();
});

maximo.addEventListener('change' , e => {
    datosBusqueda.maximo = e.target.value;

    filtrarAutos();
});

puertas.addEventListener('change' , e => {
    datosBusqueda.puertas = parseInt (e.target.value);

    filtrarAutos();
});

transmision.addEventListener('change' , e => {
    datosBusqueda.transmision = e.target.value;

    filtrarAutos();
});

color.addEventListener('change' , e => {
    datosBusqueda.color = e.target.value;
   // console.log(datosBusqueda);
   filtrarAutos();
});




// FUNCIONES

// Mostrar en pantalla todos los 
function mostrarAutos(autos){

    limpiarHtml(); // clean html

    autos.forEach(auto => {
        const autoHTML = document.createElement('p');
        const {modelo , marca , year , puertas , transmision, precio, color} = auto;

        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmision: ${transmision} - Precio: $${precio} - Color: ${color}
        
        `;
        // Insertar en el HTML
        resultado.appendChild(autoHTML);
    })
};


// Limpiar en el HTML
function limpiarHtml(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
};


// Generar los años del select
function llenarSelect(){
    for( i = max ; i >= min ; i--){
        const option = document.createElement('option');

        option.value = i;
        option.textContent = i;
        year.appendChild(option);
    }
};


// FUNCIONES QUE FILTRAN EN BASE A LA BUSQUEDA
function filtrarAutos(){
    const result = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransimision).filter(filtrarColor);

    console.log(result);

    mostrarAutos(result);

    if (result.length){

         mostrarAutos(result); 
    } else {
        noResult();
    }
}

function noResult(){

    limpiarHtml();

    const noResult = document.createElement('div');
    noResult.classList.add('alerta' , 'error');
    noResult.textContent = 'NO HAY RESULTADOS';
    resultado.appendChild(noResult);
}

    


function filtrarMarca(auto){
    const { marca } = datosBusqueda;

    if (marca){
        return auto.marca === marca;
    }
    return auto;
}


function filtrarYear(auto){
    const { year } = datosBusqueda;

    if(year){
        return auto.year === year;
    }
    return auto;
}

function filtrarMinimo(auto){
    const { minimo } = datosBusqueda;
    
    if(minimo){
        return auto.precio >= minimo;
    } 
    return auto;
}

function filtrarMaximo(auto){
    const { maximo } = datosBusqueda;

    if(maximo){
        return auto.precio <= maximo;
    }
    return auto;
}

function filtrarPuertas(auto){
    const { puertas } = datosBusqueda;

    if(puertas){
        return auto.puertas === puertas;
    }
    return auto;
}

function filtrarTransimision(auto){
    const { transmision } = datosBusqueda;

    if(transmision){
        return auto.transmision === transmision
    }
    return auto;
};

function filtrarColor(auto){
    const { color } = datosBusqueda;

    if(color){
        return auto.color === color;
    }
    return auto;
}