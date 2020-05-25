$(document).ready(function() {

function onDataReceived(data) {
    console.log(data);

    // ---------------------------------------------------------------------- //
    // Selecionando os elementos no dom e substituindo pelo conteúdo do JSON. //
    // ---------------------------------------------------------------------- //
    $('#name').text(data.name);
    $('#city').text(data.city);
    $('#weather').text(data.weather.weather);
    $('temeprature').text(data.weather.temp);
};

    $('button').click(function() {
        
        // ------------------------------------------------------------------------------ //
        // Montando a URL do endpoint em que solicitaremos o get, notar a requisição está //
        // solicitando que o retorno esteja no formato JSON. //
        // ------------------------------------------------------------------------------ //
        var url = 
        'http://services.faa.gov/airport/status/{CODE}?format=application/json'
        .replace('{CODE}', $('input').val());
        
        $.get(url, onDataReceived);
    });

});