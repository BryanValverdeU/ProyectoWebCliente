var loaded = false;
var peopleName = [];
var filmsArray = [];
var starshipArray = [];
var vehiculesArray = [];



$(document).ready(function () {
    $('#TableBusqueda1').DataTable({
        "ordering": false,
    }
    );
    $('#TableBusqueda2').DataTable({
        "ordering": false,
    }
    );

    var count = 1;

    for (x = 1; x <= 10; x++) {
        $.ajax({
            async: false,
            dataType: 'json',
            url: "https://swapi.co/api/people/?page=" + x,
            type: 'GET',
            success: function (data) {
                $.getJSON("https://swapi.co/api/people/?page=" + x, function (data) {
                    for (y = 0; y < data.results.length; y++) {
                        peopleName.push(capitalizeFirstLetter(data.results[y].name));
                        $('#nombres').append("<option value=" + count++ + ">" + capitalizeFirstLetter(data.results[y].name) + "</option>");
                        var t = $('#TableBusqueda1').DataTable();
                        t.row.add([data.results[y].name, data.results[y].height, capitalizeFirstLetter(data.results[y].hair_color), capitalizeFirstLetter(data.results[y].skin_color), capitalizeFirstLetter(data.results[y].gender)]).draw(false);
                    };
                });
            }
        });
    }
    $.ajax({
        async: false,
        dataType: 'json',
        url: "https://swapi.co/api/films/?page=" + 1,
        type: 'GET',
        success: function (data) {
            $.getJSON("https://swapi.co/api/films/?page=" + 1, function (data) {
                for (x = 0; x <= data.results.length; x++) {
                    filmsArray.push(capitalizeFirstLetter(data.results[x].title)); // Here 'this' points to an 'item' in 'items'
                };
            });
        }
    });

    document.getElementById("Loading").style.visibility = "hidden";
    document.getElementById("Loading").style.position = "fixed";

    for (x = 1; x <= 4; x++) {
        $.ajax({
            async: false,
            dataType: 'json',
            url: "https://swapi.co/api/vehicles/?page=" + x,
            type: 'GET',
            success: function (data) {
                $.getJSON("https://swapi.co/api/vehicles/?page=" + x, function (data) {
                    for (y = 0; y < data.results.length; y++) {
                        vehiculesArray.push(capitalizeFirstLetter(data.results[y].name));
                    };
                });
            }
        });
    }
    for (x = 1; x <= 4; x++) {
        $.ajax({
            async: false,
            dataType: 'json',
            url: "https://swapi.co/api/starships/?page=" + x,
            type: 'GET',
            success: function (data) {
                $.getJSON("https://swapi.co/api/starships/?page=" + x, function (data) {
                    for (y = 0; y < data.results.length; y++) {
                        starshipArray.push(capitalizeFirstLetter(data.results[y].name)); // Here 'this' points to an 'item' in 'items'
                    };
                });
            }
        });
    }

});

function Cargar_Todos() {
    var valoresTabla;
    for (x = 1; x <= 87; x++) {

        if (x != 17) {
            var link = "https://swapi.co/api/people/" + x + "/";
            var data = webConsumer(link);
            manageData(data);

        }

        if (x == 20) {
            document.getElementById("Loading").style.visibility = "hidden";
            document.getElementById("Loading").style.position = "fixed";
        }
    }
}

function CargarUno() {
    var numeroAcargar = 0;
    var opcionSeleccionada = parseInt($('#nombres').find(':selected').val());
    if(parseInt(opcionSeleccionada) >= 17){
        numeroAcargar = parseInt(opcionSeleccionada)+1;        
    }else{
        numeroAcargar = opcionSeleccionada;
    }
    if(parseInt(numeroAcargar) >= 35){
            numeroAcargar = parseInt(numeroAcargar)+1;
    }
    if(parseInt(numeroAcargar) >= 47){
            numeroAcargar = parseInt(numeroAcargar)+1;
    }
    if(parseInt(numeroAcargar) >= 76){
            numeroAcargar = parseInt(numeroAcargar)-1;
    }
    if(parseInt(opcionSeleccionada) == 87){
            numeroAcargar = 35;
    }
    if(parseInt(opcionSeleccionada) == 72){
            numeroAcargar = 47;
    }
        var link = "https://swapi.co/api/people/" + numeroAcargar + "/";
        
        var data = webConsumer(link);
        var films = data.films;
        var vehicles = data.vehicles;
        var starships = data.starships;
        var x = 0;
        var filmsNames = "<ul>";
        if (films != null) {
            while (films[x] != null) {
                filmsNames = filmsNames + "<li>" + filmsArray[x] + "</li>";
                parseInt(x++);
            }
            filmsNames = filmsNames + "</ul>";
        }
        var x = 0;
        var vehiclesNames = "<ul>";
        if (vehicles != null) {
            while (vehicles[x] != null) {
                vehiclesNames = vehiclesNames + "<li>" + vehiculesArray[x] + "</li>";
                parseInt(x++);
            }
            vehiclesNames = vehiclesNames + "</ul>";
        }
        var x = 0;
        var starshipsNames = "<ul>";
        if (starships != null) {
            while (starships[x] != null) {
                starshipsNames = starshipsNames + "<li>" + starshipArray[x] + "</li>";
                parseInt(x++);
            }
            starshipsNames = starshipsNames + "</ul>";
        }   

    var Datos = [data.name, capitalizeFirstLetter(data.gender), filmsNames, vehiclesNames, starshipsNames]

    $('#NameDetails').text(Datos[0]);
    $('#GenderDetails').text(Datos[1]);
    $('#FilmsDetails').text("");
    $('#FilmsDetails').append(Datos[2]);
    $('#VehiclesDetails').text("");
    $('#VehiclesDetails').append(Datos[3]);
    $('#StarshipsDetails').text("");
    $('#StarshipsDetails').append(Datos[4]);
    
    document.getElementById("divCentrado").style.visibility = "visible";
    document.getElementById("divCentrado").style.position = "fixed";
    
    
}

function manageData(data) {
    var films = data.films;
    var vehicles = data.vehicles;
    var starships = data.starships;
    var x = 0;
    var filmsNames = "";
    if (films != null) {
        while (films[x] != null) {
            filmsNames = filmsNames + ">" + filmsArray[x] + '<br/>';
            parseInt(x++);
        }
    }
    x = 0;
    var vehiclesNames = "";
    if (vehicles != null) {
        while (vehicles[x] != null) {
            vehiclesNames = vehiclesNames + ">" + vehiculesArray[x] + '<br/>';
            parseInt(x++);
        }
    }
    x = 0;
    var starshipsNames = "";
    if (starships != null) {
        while (starships[x] != null) {
            starshipsNames = starshipsNames + ">" + starshipArray[x] + '<br/>';
            parseInt(x++);
        }
    }
    if (data.name == "Anakin Skywalker") {
        document.getElementById("Loading").style.visibility = "hidden";
        document.getElementById("Loading").style.position = "fixed";
    }
    var t = $('#TableBusqueda2').DataTable();
    t.row.add([data.name, capitalizeFirstLetter(data.gender), filmsNames, vehiclesNames, starshipsNames]).draw(false);
}

function webConsumer(link) {
    var response = "";
    $.ajax({
        async: false,
        dataType: 'json',
        url: link,
        type: 'GET',
        success: function (data) {
            response = data;
        }
    });
    return response;
}

function capitalizeFirstLetter(string) {
    
        return string.charAt(0).toUpperCase() + string.slice(1);
   
}

function cambiarEntreTablas() {
    if (document.getElementById("Busqueda2").classList.contains("esconder")) {
        document.getElementById("Busqueda2").classList.remove("esconder");
        document.getElementById("Busqueda1").classList.add("esconder");
        document.getElementById("Busqueda2").classList.add("mostrar");
    }
    else {
        document.getElementById("Busqueda1").classList.remove("esconder");
        document.getElementById("Busqueda2").classList.add("esconder");
        document.getElementById("Busqueda1").classList.add("mostrar");
    }
    if (loaded == false) {
        document.getElementById("Loading").style.visibility = "visible";
        document.getElementById("Loading").style.position = "fixed";
        Cargar_Todos();
        loaded = true;
        document.getElementById("Loading").style.visibility = "hidden";
        document.getElementById("Loading").style.position = "fixed";
    }
}

function EsconderDiv() {
    document.getElementById("divCentrado").style.visibility = "hidden";
    document.getElementById("divCentrado").style.position = "fixed";
}