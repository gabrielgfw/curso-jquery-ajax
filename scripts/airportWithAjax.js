$(document).ready(function() {

function onDataReceived(data, status, xhr) {
    console.log(data);
    console.log(status);
    console.log(xhr);

    // ---------------------------------------------------------------------- //
    // Selecionando os elementos no dom e substituindo pelo conteúdo do JSON. //
    // ---------------------------------------------------------------------- //
    $('#name').text(data.name);
    $('#city').text(data.city);
    $('#weather').text(data.weather.weather);
    $('temeprature').text(data.weather.temp);
};

function onError(xhr, status, error) {
    console.log(xhr);
    console.log(status);
    console.log(error);

    var msg;

    if(error == "Internal Server Error") {
        msg = xhr.responseJSON.Exception.Message;
    } else {
        msg = "Unable to communicate with the server.";
    }
    alert(msg);
};

    $('button').click(function() {
        
        // ------------------------------------------------- //
        // Criando a requisição utilizando uma chamada Ajax //
        // ------------------------------------------------- //
        var request = {
            
            // 1 - URL da requisição. //
            // 2 - Tipo de chamada HTTP que será requisitado à URL. //
            // 3 - Em caso de sucesso, será chamada a função abaixo. //
            // 4 - Adicionando ao header o formato que queremos o  retorno (json). //
            // 5 - Tratamento de erros, feedback ao usuário. //

            url: 'http://services.faa.gov/airport/status/{CODE}'.replace('{CODE}', $('input').val()),
            type: 'GET',
            success: onDataReceived,
            headers: {
                Accept: 'application/json'
            },
            error: onError
        };
        $.ajax(request);
    });

});