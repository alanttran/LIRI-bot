"use strict";
var request = require("request"); // request

var fs = require("fs"); //file system

var Twitter = require('twitter'); // twitter
var twitkeys = require("./keys.js"); // twitter keys
var client = new Twitter(twitkeys.twitterKeys);

var Spotify = require('node-spotify-api');
var spotkeys = require("./keys.js"); // twitter keys
var spotify = new Spotify(spotkeys.spotifyKeys);

initialize();

function initialize(){
	var nodeArgs = process.argv;

	var myFunction = process.argv[2];

	var query = "";

	for (var i = 3; i < nodeArgs.length; i++) {
	    query += nodeArgs[i] + " ";
	}

	allDaFunctions(myFunction, query );
}

function allDaFunctions(myFunction, query) {
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
        spotifyThisSong(query);

    } else if (myFunction === 'movie-this') {

        movieThis(query);

    } else if (myFunction === 'do-what-it-says') {
        fs.readFile('random.txt', 'utf8', function(error, data) {
            if (error) {
                return console.log(error);
            }

            var dataArr = data.split(",");

            var myFunction = dataArr[0];
            var query = dataArr[1];

            allDaFunctions(myFunction, query);

        });
    } else {
        console.log('Invalid command');
    }
}

function spotifyThisSong(query) {
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
}

function movieThis(query) {
    if (query.length === 0) {
        query = 'Mr. Nobody';
    }
    request("http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

        if (!error && response.statusCode === 200) {
            //console.log(JSON.stringify(body, null, 2));
            console.log("\n");
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);

            //console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
        }
    });
}
