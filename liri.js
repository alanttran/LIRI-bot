var request = require("request");
var fs = require("fs");

var nodeArgs = process.argv;

var myFunction = process.argv[1];

var query = "";

for (var i = 2; i < nodeArgs.length; i++) {
	query += nodeArgs[i];
}

if(myFunction === 'my-tweats'){

}
else if( myFunction === 'spotify-this-song'){

}
else if (myFunction === 'movie-this'){

}
else if (myFunction === 'do-what-it-says'){

}
else{
	console.log('Invalid command');
}