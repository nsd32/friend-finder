const friends = require("../data/friends");
const bodyParser = require('body-parser');



module.exports = function(app) {

	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	app.get("/api/friends", function(req, res) {
		res.json(friends);
	});

	app.post('/api/friends', function (req, res) {
		
		console.log(req.body.scores[0]);
		var newFriend = req.body; 
		var index = 0;
    var smallestTotal = 0;

    for (let k = 0; k < friends[0].scores.length; k++) {
      smallestTotal += (Math.abs(newFriend.scores[k] - friends[0].scores[k]));
    }

    for (let i = 1; i < friends.length; i++) {
      var currentTotal = 0;

      for (let j = 0; j < friends[i].scores.length; j++) { 
        currentTotal += (Math.abs(friends[i].scores[j] - newFriend.scores[j]));
      }

      if (currentTotal < smallestTotal) {
        smallestTotal = currentTotal;
        index = i;
      }
    }
    console.log('Smallest Total: ' + smallestTotal);
    console.log('Index: ' + index);
    console.log(friends[index]); 

    res.send(friends[index]);
	  
	  friends.push(newFriend);
  });

}