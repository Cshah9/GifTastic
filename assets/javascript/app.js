

// array to hold topic names
var topics = ["Stargate SG1", "A-Team", "Knight Rider", "MacGyver", "Family Guy", "Batman"];

// for loop to create inital set of buttons 
for (var i = 0; i < topics.length; i++) {

	// add a topic button for each initial topic
	addTopicButton(topics[i]);

}

//add onclick functions for topic buttons, gifs, and submit button
//$(".topic").click(topicClick);
//$(".gif").click(gifClick);
$("#submit").click(submitClick);


/***
On click function for topic buttons

Function gets the topic value, sends an AJAX request to GIPHY API, and then displays 10 images. 
Each image is initially displayed as a still; but setup with still and animated GIF urls as attributes.
*/
function topicClick(){
	
	// grab data-value attribute from the topic that was clicked,
	// then replace spaces with "+" using a regular expession and String.replace() function,
	// and add to query URL as q parameter, with limit=10 so only 10 gifs are returned
	queryURL = "http://api.giphy.com/v1/gifs/search?q=" + 
		($(this).attr("data-value")).replace(/\s/g, "+") + 
		"&limit=10&api_key=dc6zaTOxFJmzC";

	console.log(queryURL);

	//handle to div with #gif-section; which will be updated with gifs
	var $gifSection = $("#gif-section");


	// create a jQuery AJAX "GET" request with the queryURL.
	$.ajax({ url:queryURL, method:"GET"})

	//function to process response once its available
	 .done(function(response){

	 	console.log(response);

	 	//iterate through gifs in response and add to page
	 	for (var i = 0; i < response.data.length; i++) {
	 		console.log(response.data[i]);	

	 		//create img element to add the gif
	 		var $img = $("<img>");
	 		//add classes for styling; and onclick function
	 		$img.addClass("original");
	 		$img.addClass("gif");
	 		//Add still GIF url as the "data-still" attribute
	 		$img.attr("data-still", response.data[i].images.original_still.url );
	 		//Add animated GIF url as the "data-animate" attribute
	 		$img.attr("data-animate", response.data[i].images.original.url );
	 		////Add "still-new" as the "data-state" attribute
	 		$img.attr("data-state", "still-new" );
	 		//add still GIF URL as the source attribute becuase we want the still image displayed as default
	 		$img.attr("src", response.data[i].images.original_still.url);
	 		//prepend the img to the gif section so that we can keep adding new gifs to the top of gif section
	 		$gifSection.prepend($img);
	 		//add onclick function for new images
	 		$img.click(gifClick);

	 	}

	 	

	 });

}

/***
On click function for gifs

Function checks the state of the GIF and then stops or starts the animation. 
GIF border formating is updated as well. 
*/

function gifClick() {
	//console.log("Clicked on "+ $(this).attr("data-still"));

	//handle to GIF that was clicked
	var $this = $(this);
	//retrieve the state of the GIF
	var state = $this.attr("data-state");

	//GIF state will be 1 of 3 - still-new, still, or animate; based on that update GIF accordingly
	if (state == "still-new") {
		//this means that this is the first time that user is clicking on the GIF
		//remove "original" class, which will remove that formating
		$this.removeClass("original");
		//GIF will be animated, so add "play" formating
		$this.addClass("play");
		//Change the source attribute to animate gif url
		$this.attr("src", $this.attr("data-animate"));
		//update data-state to animate, so we can handle next time its clicked
		$this.attr("data-state", "animate");

	}
	else if (state == "still") {
		//this means that this is the GIF is still and user wants to start animation

		//remove stop class
		$this.removeClass("stop");
		//add play class to update formatting
		$this.addClass("play");
		//Change the source attribute to animate gif url
		$this.attr("src", $this.attr("data-animate"));
		//update data-state to animate, so we can handle next time its clicked
		$this.attr("data-state", "animate");

	}
	else if (state == "animate") {
		//this means that this is the GIF is animated and user wants to stop animation

		//remove play class
		$this.removeClass("play");
		//add stop class to update formatting
		$this.addClass("stop");
		//Change the source attribute to still gif url
		$this.attr("src", $this.attr("data-still"));
		//update data-state to still, so we can handle next time its clicked
		$this.attr("data-state", "still");

	}

}

/***
On click function for submitting new topics

Function takes the value of the input field and adds a new button with that topic to the top of the page
*/

function submitClick(){
	//console.log("submitClick");
	
	event.preventDefault();

	//get value from text input with id topic-name
	var newTopic = $("#topic-name").val().trim();

	// push the new topic into array, if we need it later
	topics.push(newTopic);

	//call function to add new topic button
	addTopicButton(newTopic);

}

/***
Helper function that adds a topic button

Function takes a topic name and adds a new button with that topic to the top of the page
*/
function addTopicButton(topic){
	//	console.log("addTopicButton: " + topic)

		//create a button with theme classes, data-value = topic name, and button text = topic name.
		$button = $('<a href="#" class="btn btn-outline btn-xl page-scroll topic" data-value="'
		+ topic +'">' 
		+ topic + '</a>');

		//then append button to button-section div
		$("#button-section").append($button);

		//add topicClick as the onclick function for new button.
		$button.click(topicClick);
}