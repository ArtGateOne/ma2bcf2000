var easymidi = require('easymidi');
//ma2bcf2000 by ArtGateOne - version 1.1.8

//-----------------------------------------------------------------

//config 
var wing = 0;   //set wing 0, 1, 2 or 3
var midi_in = 'BCF2000';     //set correct midi in device name
var midi_out = 'BCF2000';    //set correct midi out device name


//-----------------------------------------------------------------

var session = 0;
var pageIndex = 0;
//var pageIndex2 = 0;
var encodervalue = 0;
var request = 0;
var interval_on = 0;
var controller = 0;
//var matrix = [213, 212, 211, 210, 209, 208, 207, 206, 113, 112, 111, 110, 109, 108, 107, 106, 13, 12, 11, 10, 9, 8, 7, 6, 13, 12, 11, 10, 9, 8, 7, 6];
var exec = JSON.parse('{"index":[[0,1,2,3,4,5,6,7],[7,8,9,10,11,12,13,14],[15,16,17,18,19,20,21,22],[22,23,24,25,26,27,28,29]]}');



//interval send data to server function
function interval() {
    if (session > 0) {
        if (wing == 0) {
            //client.send('{"requestType":"playbacks","startIndex":[100],"itemsCount":[90],"pageIndex":' + pageIndex + ',"itemsType":[3],"view":3,"execButtonViewMode":2,"buttonsViewMode":0,"session":' + session + ',"maxRequests":1}')
            client.send('{"requestType":"playbacks","startIndex":[0],"itemsCount":[15],"pageIndex":' + pageIndex + ',"itemsType":[2],"view":2,"execButtonViewMode":1,"buttonsViewMode":0,"session":' + session + ',"maxRequests":1}');
        }
        else if (wing == 1) {
            //client.send('{"requestType":"playbacks","startIndex":[100],"itemsCount":[90],"pageIndex":' + pageIndex + ',"itemsType":[3],"view":3,"execButtonViewMode":2,"buttonsViewMode":0,"session":' + session + ',"maxRequests":1}')
            client.send('{"requestType":"playbacks","startIndex":[0],"itemsCount":[15],"pageIndex":' + pageIndex + ',"itemsType":[2],"view":2,"execButtonViewMode":1,"buttonsViewMode":0,"session":' + session + ',"maxRequests":1}');
        }
        else if (wing == 2) {
            //client.send('{"requestType":"playbacks","startIndex":[130],"itemsCount":[60],"pageIndex":' + pageIndex + ',"itemsType":[3],"view":3,"execButtonViewMode":2,"buttonsViewMode":0,"session":' + session + ',"maxRequests":1}')
            client.send('{"requestType":"playbacks","startIndex":[15],"itemsCount":[15],"pageIndex":' + pageIndex + ',"itemsType":[2],"view":2,"execButtonViewMode":1,"buttonsViewMode":0,"session":' + session + ',"maxRequests":1}');

        }
        else if (wing == 3) {
            //client.send('{"requestType":"playbacks","startIndex":[130],"itemsCount":[60],"pageIndex":' + pageIndex + ',"itemsType":[3],"view":3,"execButtonViewMode":2,"buttonsViewMode":0,"session":' + session + ',"maxRequests":1}')
            client.send('{"requestType":"playbacks","startIndex":[15],"itemsCount":[15],"pageIndex":' + pageIndex + ',"itemsType":[2],"view":2,"execButtonViewMode":1,"buttonsViewMode":0,"session":' + session + ',"maxRequests":1}');

        }
    }
}




//midi clear function
function midiclear() {
    for (i = 0; i < 90; i++) {
        //ledmatrix[i] = 0;
        output.send('noteon', { note: i, velocity: 0, channel: 0 });
        //sleep(10, function () { });
    }
    return;
}


//clear terminal
//console.log('\033[2J');

//display info
console.log("BCF2000 MA2 WING " + wing);
console.log(" ");

//display all midi devices
console.log("Midi IN");
console.log(easymidi.getInputs());
console.log("Midi OUT");
console.log(easymidi.getOutputs());
console.log(" ");
console.log("Connecting to midi device " + midi_in);



var input = new easymidi.Input(midi_in);
var output = new easymidi.Output(midi_out);

midiclear();//clear led

//send wing led status
if (wing == 0) { output.send('noteon', { note: 44, velocity: 127, channel: 0 }); }
else if (wing == 1) { output.send('noteon', { note: 43, velocity: 127, channel: 0 }); }
else if (wing == 2) { output.send('noteon', { note: 42, velocity: 127, channel: 0 }); }
else if (wing == 3) { output.send('noteon', { note: 45, velocity: 127, channel: 0 }); }





for (controller = 48; controller <= 55; controller++) {//encoders
    output.send('cc', { controller: controller, value: 0, channel: 0 });
}

output.send('cc', { controller: 48, value: 54, channel: 0 });

//setInterval (interval, 100);


//send fader pos do dot2
input.on('pitch', function (msg) {
    var faderValue = ((msg.value - 134) * 0.0000625)
    if (msg.value <= 134) { faderValue = 0; }
    if (faderValue > 1) { faderValue = 1; }
    client.send('{"requestType":"playbacks_userInput","execIndex":' + exec.index[wing][msg.channel] + ',"pageIndex":' + pageIndex + ',"faderValue":' + (faderValue) + ',"type":1,"session":' + session + ',"maxRequests":0}');
});



input.on('noteon', function (msg) {

    if (msg.note == 42) {//wing 2 - Faders 16 - 23
        wing = 2;
        output.send('noteon', { note: 42, velocity: 127, channel: 0 });
        output.send('noteon', { note: 43, velocity: 0, channel: 0 });
        output.send('noteon', { note: 44, velocity: 0, channel: 0 });
        output.send('noteon', { note: 45, velocity: 0, channel: 0 });
        matrix = [213, 212, 211, 210, 209, 208, 207, 206, 113, 112, 111, 110, 109, 108, 107, 106, 13, 12, 11, 10, 9, 8, 7, 6, 13, 12, 11, 10, 9, 8, 7, 6];
    }

    if (msg.note == 43) {//wing 1 - Faders 8 - 15
        wing = 1;
        output.send('noteon', { note: 42, velocity: 0, channel: 0 });
        output.send('noteon', { note: 43, velocity: 127, channel: 0 });
        output.send('noteon', { note: 44, velocity: 0, channel: 0 });
        output.send('noteon', { note: 45, velocity: 0, channel: 0 });
        matrix = [221, 220, 219, 218, 217, 216, 215, 214, 121, 120, 119, 118, 117, 116, 115, 114, 21, 20, 19, 18, 17, 16, 15, 14, 21, 20, 19, 18, 17, 16, 15, 14];
    }

    if (msg.note == 44) {//wing 0 - Faders 1-8
        wing = 0;
        output.send('noteon', { note: 42, velocity: 0, channel: 0 });
        output.send('noteon', { note: 43, velocity: 0, channel: 0 });
        output.send('noteon', { note: 44, velocity: 127, channel: 0 });
        output.send('noteon', { note: 45, velocity: 0, channel: 0 });
        matrix = [221, 220, 219, 218, 217, 216, 215, 214, 121, 120, 119, 118, 117, 116, 115, 114, 21, 20, 19, 18, 17, 16, 15, 14, 21, 20, 19, 18, 17, 16, 15, 14];
    }

    if (msg.note == 45) {//wing 3 - Faders 23-
        wing = 3;
        output.send('noteon', { note: 42, velocity: 0, channel: 0 });
        output.send('noteon', { note: 43, velocity: 0, channel: 0 });
        output.send('noteon', { note: 44, velocity: 0, channel: 0 });
        output.send('noteon', { note: 45, velocity: 127, channel: 0 });
        matrix = [221, 220, 219, 218, 217, 216, 215, 214, 121, 120, 119, 118, 117, 116, 115, 114, 21, 20, 19, 18, 17, 16, 15, 14, 21, 20, 19, 18, 17, 16, 15, 14];
    }

    if (msg.note == 46 && msg.velocity == 127) {
        if (pageIndex > 0) {
            output.send('cc', { controller: pageIndex + 48, value: 0, channel: 0 });
            pageIndex--;
            output.send('cc', { controller: pageIndex + 48, value: 54, channel: 0 });
        }
    }
    if (msg.note == 47 && msg.velocity == 127) {
        if (pageIndex < 7) {
            output.send('cc', { controller: pageIndex + 48, value: 0, channel: 0 });
            pageIndex++;
            output.send('cc', { controller: pageIndex + 48, value: 54, channel: 0 });
        }

    }




    if (31 < msg.note && msg.note < 40) {//page
        for (controller = 48; controller <= 55; controller++) {
            output.send('cc', { controller: controller, value: 0, channel: 0 });
        }
        output.send('cc', { controller: ((msg.note) + 16), value: 54, channel: 0 });
        pageIndex = msg.note - 32;

    }


    if (msg.note <= 31) {//send fader buttons to ma2

        if (msg.note < 24) {
            if (msg.velocity === 127) {
                client.send('{"requestType":"playbacks_userInput","cmdline":"","execIndex":' + exec.index[wing][msg.note - 16] + ',"pageIndex":' + pageIndex + ',"buttonId":2,"pressed":true,"released":false,"type":0,"session":' + session + ',"maxRequests":0}'.toString());
            } else {
                client.send('{"requestType":"playbacks_userInput","cmdline":"","execIndex":' + exec.index[wing][msg.note - 16] + ',"pageIndex":' + pageIndex + ',"buttonId":2,"pressed":false,"released":true,"type":0,"session":' + session + ',"maxRequests":0}'.toString());
            }
        } else {
            if (msg.velocity === 127) {
                client.send('{"requestType":"playbacks_userInput","cmdline":"","execIndex":' + exec.index[wing][msg.note - 24] + ',"pageIndex":' + pageIndex + ',"buttonId":1,"pressed":true,"released":false,"type":0,"session":' + session + ',"maxRequests":0}'.toString());
            } else {
                client.send('{"requestType":"playbacks_userInput","cmdline":"","execIndex":' + exec.index[wing][msg.note - 24] + ',"pageIndex":' + pageIndex + ',"buttonId":1,"pressed":false,"released":true,"type":0,"session":' + session + ',"maxRequests":0}'.toString());
            }
        }
    }

});


input.on('cc', function (msg) {
    if (msg.value == 1){ encodervalue = 1; }
    if (msg.value == 2) { encodervalue = 2; }
    if (msg.value == 3) { encodervalue = 4; }
    if (msg.value == 4) { encodervalue = 8; }
    if (msg.value == 65) { encodervalue = -1; }
    if (msg.value == 66) { encodervalue = -2; }
    if (msg.value == 67) { encodervalue = -4; }
    if (msg.value == 68) { encodervalue = -8; }

    if (msg.controller == 16){ client.send('{"command":LUA "gma.canbus.encoder(0,' + encodervalue + ',pressed)","session":' + session + ',"requestType":"command","maxRequests":0}'); }
    else if (msg.controller == 17){ client.send('{"command":LUA "gma.canbus.encoder(1,' + encodervalue + ',pressed)","session":' + session + ',"requestType":"command","maxRequests":0}'); }
    else if (msg.controller == 18){ client.send('{"command":LUA "gma.canbus.encoder(2,' + encodervalue + ',pressed)","session":' + session + ',"requestType":"command","maxRequests":0}'); }
    else if (msg.controller == 19){ client.send('{"command":LUA "gma.canbus.encoder(3,' + encodervalue + ',pressed)","session":' + session + ',"requestType":"command","maxRequests":0}'); }
    else if (msg.controller == 20){ client.send('{"requestType":"encoder","name":"PAN","value":' + encodervalue + ',"session":' + session + ',"maxRequests":0}'); }
    else if (msg.controller == 21){ client.send('{"requestType":"encoder","name":"TILT","value":' + encodervalue + ',"session":' + session + ',"maxRequests":0}'); }
    else if (msg.controller == 22){ client.send('{"requestType":"encoder","name":"FOCUS","value":' + encodervalue + ',"session":' + session + ',"maxRequests":0}'); }
    else if (msg.controller == 23){ client.send('{"requestType":"encoder","name":"ZOOM","value":' + encodervalue + ',"session":' + session + ',"maxRequests":0}'); }
});




//WEBSOCKET-------------------
var W3CWebSocket = require('websocket').w3cwebsocket;

var client = new W3CWebSocket('ws://localhost:80/');


client.onerror = function () {
    console.log('Connection Error');
};

client.onopen = function () {
    console.log('WebSocket Client Connected');

    function sendNumber() {
        if (client.readyState === client.OPEN) {
            //var number = Math.round(Math.random() * 0xFFFFFF);
            //client.send(number.toString());
            client.send('{"session":' + session + '}'.toString());
            client.send('{"requestType":"getdata","data":"set,clear,solo,high","session":' + session + ',"maxRequests":1}'.toString());
            setTimeout(sendNumber, 1000);
        }
    }
    //sendNumber();
};

client.onclose = function () {
    setInterval(interval, 0);
    console.log('echo-protocol Client Closed');
};

client.onmessage = function (e) {
    request = request + 1;
    //console.log(request);
    if (request >= 9) {
        client.send('{"session":' + session + '}');
        client.send('{"requestType":"getdata","data":"set,clear,solo,high","session":' + session + ',"maxRequests":1}'.toString());
        request = 0;
    }

    if (typeof e.data === 'string') {
        //console.log("Received: '" + e.data + "'");
        //console.log(e.data);

        obj = JSON.parse(e.data);
        //console.log(obj);

        if (obj.status == "server ready") {
            console.log("SERVER READY");
            client.send('{"session":0}'.toString())
        }
        if (obj.forceLogin == true) {
            console.log("LOGIN ...");
            session = (obj.session);
            client.send('{"requestType":"login","username":"bcf2000","password":"2c18e486683a3db1e645ad8523223b72","session":' + session + ',"maxRequests":10}'.toString())
        }

        if (obj.session == 0) {
            console.log("CONNECTION ERROR");
            client.send('{"session":' + session + '}'.toString());
        }

        if (obj.session) {
            if (obj.session == -1) {
                console.log("Please turn on Web Remote, and set Web Remote password to \"remote\"");
                midiclear();
                input.close();
                output.close();
                process.exit();
            } else {
                session = (obj.session);
            }
        }

        if (obj.text) {
            console.log(obj.text);
            text = obj.text;
        }

        if (obj.responseType == "login" && obj.result == true) {
            if (interval_on == 0) {
                interval_on = 1;
                setInterval(interval, 100);//80
            }
            console.log("...LOGGED");
            console.log("SESSION " + session);
        }

        if (obj.responseType == "login" && obj.result == false) {
            setInterval(interval, 100);//80
            console.log("...LOGIN ERROR");
            console.log("SESSION " + session);
        }

        if (obj.responseType == "presetTypeList") {
            //console.log("Preset Type List");
        }

        if (obj.responseType == "presetTypes") {
            //console.log("Preset Types");
        }

        if (obj.responseType == "getdata") {
            //console.log("Get Data");
        }




        if (obj.responseType == "playbacks") {//recive data from dot & set to BCF

            if (obj.responseSubType == 2) {//Fader
                if (wing == 0 || wing == 2) {
                    j = 0;
                    for (var i = 0; i < 5; i++) {

                        var value = (obj.itemGroups[0].items[0][i].executorBlocks[0].fader.v);//fader
                        if (value == 1) { value = 16368; }
                        else if (value == 0) { ; }
                        else {
                            value = (value / 0.0000625) + 134;
                        }
                        output.send('pitch', { value: (value), channel: (j) });


                        m = 0;

                        if ((obj.itemGroups[0].items[0][i].i.c) != "#000000") { m = 127; }
                        if (i == 0 && wing == 0 && pageIndex == 0) { m = 127; }
                        output.send('noteon', { note: j + 24, velocity: m, channel: 0 });


                        if (obj.itemGroups[0].items[0][i].isRun) { m = 127; }
                        else { m = 0; }
                        output.send('noteon', { note: j + 16, velocity: m, channel: 0 });

                        /*if (obj.itemGroups[0].items[0][i].isRun) { m = 1; }
                        //else { m = 0; }
                        output.send('noteon', { note: j + 24, velocity: m, channel: 0 });*/
                        j++;
                    }

                    for (var i = 0; i < 3; i++) {

                        var value = (obj.itemGroups[0].items[1][i].executorBlocks[0].fader.v);//fader
                        if (value == 1) { value = 16368; }
                        else if (value == 0) { ; }
                        else {
                            value = (value / 0.0000625) + 134;
                        }
                        output.send('pitch', { value: (value), channel: (j) });

                        m = 0;
                        if ((obj.itemGroups[0].items[1][i].i.c) != "#000000") { m = 127; }
                        output.send('noteon', { note: j + 24, velocity: m, channel: 0 });

                        if (obj.itemGroups[0].items[1][i].isRun) { m = 127; }
                        else { m = 0; }
                        output.send('noteon', { note: j + 16, velocity: m, channel: 0 });

                        /*if (obj.itemGroups[0].items[1][i].isRun) { m = 1; }
                        //else { m = 0; }
                        output.send('noteon', { note: j + 24, velocity: m, channel: 0 });*/
                        j++;
                    }
                }
                else if (wing == 1 || wing == 3) {
                    j = 0;
                    for (var i = 2; i < 5; i++) {

                        var value = (obj.itemGroups[0].items[1][i].executorBlocks[0].fader.v);//fader
                        if (value == 1) { value = 16368; }
                        else if (value == 0) { ; }
                        else {
                            value = (value / 0.0000625) + 134;
                        }
                        output.send('pitch', { value: (value), channel: (j) });


                        m = 0;

                        if ((obj.itemGroups[0].items[1][i].i.c) != "#000000") { m = 127; }
                        if (i == 0 && wing == 0 && pageIndex == 0) { m = 127; }
                        output.send('noteon', { note: j + 24, velocity: m, channel: 0 });


                        if (obj.itemGroups[0].items[1][i].isRun) { m = 127; }
                        else { m = 0; }
                        output.send('noteon', { note: j + 16, velocity: m, channel: 0 });

                        /*if (obj.itemGroups[0].items[1][i].isRun) { m = 1; }
                        //else { m = 0; }
                        output.send('noteon', { note: j + 24, velocity: m, channel: 0 });*/
                        j++;
                    }

                    for (var i = 0; i < 5; i++) {

                        var value = (obj.itemGroups[0].items[2][i].executorBlocks[0].fader.v);//fader
                        if (value == 1) { value = 16368; }
                        else if (value == 0) { ; }
                        else {
                            value = (value / 0.0000625) + 134;
                        }
                        output.send('pitch', { value: (value), channel: (j) });

                        m = 0;
                        if ((obj.itemGroups[0].items[2][i].i.c) != "#000000") { m = 127; }
                        output.send('noteon', { note: j + 24, velocity: m, channel: 0 });

                        if (obj.itemGroups[0].items[2][i].isRun) { m = 127; }
                        else { m = 0; }
                        output.send('noteon', { note: j + 16, velocity: m, channel: 0 });

                        /*if (obj.itemGroups[0].items[2][i].isRun) { m = 1; }
                        //else { m = 0; }
                        output.send('noteon', { note: j + 24, velocity: m, channel: 0 });*/
                        j++;
                    }
                }
            }

            if (obj.responseSubType == 3) {//Buttons
                if (wing == 0) {
                    var j = 24;
                    var l = 0;
                    for (k = 0; k < 6; k++) {

                        for (i = 0; i < 5; i++) {
                            var m = 3;
                            if (obj.itemGroups[0].items[l][i].isRun == 1) { m = 127; }
                            else { m = 5; }
                            output.send('noteon', { note: j, velocity: m, channel: 0 });
                            j++;
                        }

                        l++;

                        for (i = 0; i < 3; i++) {
                            var m = 3;
                            if (obj.itemGroups[0].items[l][i].isRun == 1) { m = 127; }
                            else { m = 0; }
                            output.send('noteon', { note: j, velocity: m, channel: 0 });
                            j++;
                        }

                        l = l + 2;
                        j = j - 16;
                    }

                }
            }










            /*var channel = 7;
            for (var i = 0; i < 5; i++) {
                output.send('noteon', { note: (channel), velocity: ((obj.itemGroups[2].items[i][0].isRun) * 127), channel: 0 });//executor
                output.send('noteon', { note: ((channel) + 8), velocity: ((obj.itemGroups[1].items[i][0].isRun) * 127), channel: 0 });//executor
                //output.send('noteon', {note: ((channel)+16), velocity: ((obj.itemGroups[0].items[i][0].isRun)*127), channel: 0});
                output.send('noteon', { note: ((channel) + 24), velocity: ((obj.itemGroups[0].items[i][0].isRun) * 127), channel: 0 });//executor


                var value = (obj.itemGroups[0].items[i][0].executorBlocks[0].fader.v);//fader
                if (value == 1) { value = 16368; }
                else if (value === 0) { ; }
                else {
                    value = (value / 0.0000625) + 134;
                }
                output.send('pitch', { value: (value), channel: (channel) });
                channel--;

            }*/
        }
    }
}

