//var baseUrl = 'http://localhost:8080';
var baseUrl = '';
var connectUrl = baseUrl + '/ws-room';
var subscribeUrl = '/channel/broadcast';
var joinUrl = '/room/join';
var stompClient = null;
function setConnected(connected){
    $('#connect').prop('disabled', connected);
    $('#disconnect').prop('disabled', !connected);
    if (connected){
        $('#conversation').show();
    }
    else{
        $('#conversation').hide();
    }
    $('#message').html("");

}
function connect(){
    var socket = new SockJS(connectUrl);
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function(frame){
        setConnected(true);
        console.log("connected: " + frame);
        stompClient.subscribe(subscribeUrl, function(greeting){
            console.log(JSON.parse(greeting.body).content);
            showMessage(JSON.parse(greeting.body).content);
        });
    });

}
function disconnect(){
    if (stompClient !== null){
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");

}
function sendName(){
    stompClient.send(joinUrl, {}, JSON.stringify({'name': $('#name').val()}));
}
function showMessage(message){
    $('#message').append("<tr><td>" + message +"</td></tr>");
}
$(function(){
    $("form").on('submit', function(e){
        e.preventDefault();
    });
    $("#connect").click(function(){connect();});
    $('#send').click(function(){sendName();});
    $('#disconnect').click(function(){disconnect();});
})