$(document).ready(function() {

// ----------------------------- //
// data = Conteúdo do retorno;   //
// status = Condição do retorno; //
// xhr = XML Http Request.       //
// ----------------------------- //
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
    $('#temperature').text(data.weather.temp);
};

function onError(xhr, status, error) {
    console.log(xhr);
    console.log(status);
    console.log(error);

    var msg;

    // ------------------------------------------------- //
    // Caso o servidor retorne algum erro na requisição. //
    // ------------------------------------------------- //
    if(error == "Internal Server Error") {
        msg = xhr.responseJSON.Exception.Message;
    // ------------------------------------------------------------------- //
    // Caso o servidor demore mais de 3 segundos para retornar (timeout). //
    // ------------------------------------------------------------------- //
    } else if (status == 'timeout') {
        msg = "The server took too long to respond.";
    // --------------------------------------------------------------------- //
    // Caso a chamada não tenha tido sucesso ao se comunicar com o servidor. //
    // --------------------------------------------------------------------- //
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
            // 3 - Em caso de sucesso, será chamada a função 'onDataReceived'. //
            // 4 - Adicionando ao header o formato que queremos o retorno (json). //
            // 5 - Tratamento de erros, chamando a função 'onError'. //
            // 6 - Timeout para definir tempo limite aguardando resposta. //

            url: 'http://services.faa.gov/airport/status/{CODE}'.replace('{CODE}', $('input').val()),
            type: 'GET',
            success: onDataReceived,
            headers: {
                Accept: 'application/json'
            },
            error: onError,
            timeout: 3000
        };
        $.ajax(request);
    });

});