# MultiOgarII
MultiOgarII is a FOSS agar.io server implementation that is based upon the [work done](https://github.com/Barbosik/MultiOgar) by [Barbosik](https://github.com/Barbosik/).


# Details
This section is a brief documentation of the server for those interested in using it.

## Quick Start
Before the server can be used you need to install [NodeJS](https://nodejs.org/en/) onto your machine. Instructions for which are available on the NodeJS website linked above.

Once this is done, the server can be ran by executing the following commands in a `Linux` terminal or a `Windows Command Prompt`. This is assuming that you're in the project directory. 

```BASH
# install modules
$ npm i

# change directory
$ cd src

# start server
$ node index.js
```


## Protocols
This server implementation supports the majority of the early Agar protocols. This includes protocols ranging from `v4` to around `v11`. This means that clients running protocols outside of that range *may malfunction or not work at all.* It is suggested that you use a client such as [Cigar](https://github.com/Luka967/Cigar), or its [Cigar2](https://github.com/Cigar2/Cigar2) variant - both of these use protocol v6 and are compatible with the server.
