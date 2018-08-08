var friends = require("../data/friends.js");

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {

        var bestMatch = {
            name: "",
            photo: "",
            friendDisparity: 600
        };
        console.log(req.body);

        // Take the result of the user's survey POST and parse it..........
        var userData = req.body;
        var userScores = userData.scores;

        console.log(userScores);

        var totalDisparity = 0;
        // LOOP through all the friend options in the database
        for (var i = 0; i < friends.length; i++) {
            console.log(friends[i]);
            totalDisparity = 0;
            // Then loop through all the scores of each friend
            for (var j = 0; j < friends[i].scores[j]; j++) {
                // Calculate difference btwn the scores and sum those into the totalDisparity
                // Run Math absolute----if NEG, will convert to POS
                totalDisparity += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
                // If the sum of differences is less then the differences of the current "best match"
                if (totalDisparity <= bestMatch.friendDisparity) {
                    // Reset the match to the new friend
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDisparity = totalDisparity;
                }
            }
        }
        // Save the user's data to database
        friends.push(userData);
        // return JSON with bestMatch.  
        res.json(bestMatch);
    })
}