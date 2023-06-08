# ma2bcf2000
Control grandMA2 use Behringer BCF2000 controller



Download my code and unarchive to C:

Download and instal NODEJS version 14.17  from https://nodejs.org/dist/v14.17.0/node-v14.17.0-x64.msi


---------------

Start Behringer in Mackie Control mode (turn power off - push button 2 & power on) 

Run MA2 on PC

ADD user "bcf2000" password "remote"

Set node.exe as default open tool for .js files and double click on ma2bcf2000.js file

or Start my code from CMD line

node ma2bcf2000.js



--------------------

Program on start schows all available midi devices MIDI IN & MIDI OUT


dont set this midi device in ma2 settings

--------------------


If U want connect to console or other ON PC - U can change default (localhost) to Console IP Addres

open ma2bcf2000.js use notepad

find line

var client = new W3CWebSocket('ws://localhost:80/');


change "localhost" to ip addres. 


--------------------

CONTROL SURFACE


PRESET LEFT RIGHT - SELECT PAGE 1 - 8

PUSH ENCODER - SELECT PAGE 1 - 8 (LED INDICATOR PAGE ON ENCODERS)



STORE - faders 1 - 8

LERN - faders 8 - 15

EDIT - faders 16 - 23

EXIT - faders 23 - 30


ENCODERS CONTROL

1 2 3 4 - on screen encoders

5 PAN

6 TILT

7 FOCUS

8 ZOOM



---------------------

!!! Program not work with old ma2onpc

!! Program not work - if any executor have more then 1 row ! (thx Philipp Darpe)
