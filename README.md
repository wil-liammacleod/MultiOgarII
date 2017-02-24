# MultiOgar-Edited

A fast, open source server that supports multiple protocol versions and smooth vanilla physics.

Since august 2016 [Barbosik](https://github.com/Barbosik) has stopped working on this project. 
<br>Due to this I have decided to continue improving his work in order to make this project even better!



# Information 

Current version : **1.6.0**

![Language](https://img.shields.io/badge/language-node.js-yellow.svg)
[![License](https://img.shields.io/badge/license-APACHE2-blue.svg)](https://github.com/Barbosik/OgarMulti/blob/master/LICENSE.md)


Original MultiOgar code is based on the private server implementation [Ogar](https://github.com/OgarProject/Ogar).
<br>However the original code rightfully belongs to the [OgarProject](https://github.com/OgarProject).

<br>MultiOgar-Edited code however, is based on MultiOgar code that has been heavily modified and improved by me and many other people.
<br>The overall goal of this fork is to make physics as vanilla as possible, cleanup most of the code, and add lots of new features while maintaining better performance than the original MultiOgar.

## MultiOgar-Edited Wiki
Please see the issue templete before you make an issue, you can find it [here](https://github.com/Megabyte918/MultiOgar-Edited/wiki/Issue-Template). Along with client information, and a FAQ section. More coming soon!

# Installation
#### Windows:
* Download and install node.js: https://nodejs.org/en/download/ 
* Download this repo
* Unzip MultiOgar code into some folder.

*Quick*
1. Run the win-Install_Dep.bat file.
2. Run win-Start.bat
* All these files can be found in the *run* folder.


*Manual*

Start command line and execute from MultiOgar folder.

Install modules

```
npm install
```

Run the server

```
cd src
node index.js

or 

npm start
```

#### Linux:
```bash
# First update your packages:
sudo apt-get update

# Install git:
sudo apt-get install git

# Install node.js:
sudo apt-get install nodejs-legacy npm

# Clone MultiOgar:
git clone git://github.com/Megabyte918/MultiOgar-Edited.git

# Install dependencies:
cd MultiOgar
npm install

# Run the server:
```bash
cd src
sudo node index.js
```


# Gallery

### Console:

![Console](http://i.imgur.com/bS5ToRD.png)

### Gameplay:

![Gameplay](http://i.imgur.com/XsXjT0o.png)

### Performance:

Version 1.2.8 (Original MultiOgar): 
* 1000 bots, 500 viruses, 1000 foods, map 14142x14142
* Works slightly slower than normal, speed decreases gradually as bots get larger.
* CPU load: 14% (x4 cores)
* Memory usage: 70 MB
* MS [lag]: Minimum of around 78

Version 1.6.0 (MultiOgar-Edited):
* 1000 bots, 500 viruses, 1000 foods, map 14142x14142
* Works very-very smooth, speed decreases gradually as bots get larger.
* CPU load: 24% (x2 cores)
* Memory usage: 35 MB
* MS [lag]: Minimum of around 45

## Ogar Server Tracker

You can find active Ogar servers on http://ogar-tracker.tk.
It updates server information in realtime with no need to refresh the page.

If you want to include your server in the list. Just install the latest version of MultiOgar-Edited and enable server tracking with `serverTracker = 1` in gameserver.ini

If you have other server and want to include it in the list, just insert the code to ping ogar-tracker.tk into your server.
You can found example in MultiOgar source code: https://github.com/Megabyte918/MultiOgar-Edited/blob/master/src/GameServer.js#L1350-L1373

# Clients

Replace 127.0.0.1:443 with server and port 

URL | Protocol | Description
--- | --- | ---
http://agar.io/?ip=127.0.0.1:443 | 11 | Vanilla client
http://cell.sh/?ip=127.0.0.1:443 | 5 (custom) | Custom graphics, < skin > support
http://ogar.mivabe.nl/?ip=127.0.0.1:443 | early 5 | Pretty smooth, custom graphics
http://old.ogarul.io/?ip=127.0.0.1:443 | 4 | OgarUL, old vanilla style & graphics
http://astr.io/?ip=127.0.0.1:443 | 9 | Like an extension, pretty smooth & has chat
Cigar Project --> https://github.com/CigarProject/Cigar


<br>
Most of the physics code from the original MultiOgar were rewritten.
The physics engine in this project are pretty close to vanilla physics.
