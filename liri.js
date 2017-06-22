"use strict";
var request = require("request"); // request

var fs = require("fs"); //file system

var Twitter = require('twitter'); // twitter
var keys = require("./keys.js"); // twitter keys
var client = new Twitter(keys.twitterKeys);

var Spotify = require('node-spotify-api');
var spotify = new Spotify({
    id: '598e9540d9d54268af1b40a4cf5eb222',
    secret: '628bcf05d39c443d82dc847e5c3969aa'
});

var nodeArgs = process.argv;

var myFunction = process.argv[2];

var query = "";

for (var i = 3; i < nodeArgs.length; i++) {
    query += nodeArgs[i] + " ";
}

if (myFunction === 'my-tweets') {
    var params = { screen_name: 'origin' };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log("\n" + (i + 1) + " - " + tweets[i].created_at.substring(0, 10) + "\n" + tweets[i].text + "\n");
            }
        } else {
            console.log(error);
        }
    });
} else if (myFunction === 'spotify-this-song') {
    if (query.length === 0) {
        query = 'The Sign';
    }

    spotify
        .search({ type: 'track', query: query, limit: 1 })
        .then(function(response) {
            var artist = response.tracks.items[0].album.artists[0].name;
            var previewURL = response.tracks.items[0].preview_url;
            var name = response.tracks.items[0].name;
            var album = response.tracks.items[0].album.name;
            console.log("\n");
            console.log("Name: " + name);
            console.log("Artist(s): " + artist);
            console.log("Album: " + album);
            console.log("Preview URL: " + previewURL);
            //console.log(JSON.stringify(response.tracks.items[0].preview_url, null, 2));

        })
        .catch(function(err) {
            console.log(error);
        });

} else if (myFunction === 'movie-this') {
	if (query.length === 0) {
        query = 'Mr. Nobody';
    }
    request("http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

        if (!error && response.statusCode === 200) {
        	console.log(JSON.stringify(body, null, 2));
        	console.log("\n");
        	console.log("Title: " + JSON.parse(body).Title);
        	console.log("Year: " + JSON.parse(body).Year);
        	console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        	console.log("Country: " + JSON.parse(body).Country);
        	console.log("Language: " + JSON.parse(body).Language);
        	console.log("Plot: " + JSON.parse(body).Plot);
        	console.log("Actors: " + JSON.parse(body).Actors);
        	console.log("Rotten Tomatoes URL: ???");
        	
            //console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
        }
    });


} else if (myFunction === 'do-what-it-says') {

} else {
    console.log('Invalid command');
}
