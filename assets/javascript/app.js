

// array to hold topic names
var topics = ["Stargate SG1", "A-Team", "Knight Rider", "MacGyver"];

// for loop to create initail set of buttons 
for (var i = 0; i < topics.length; i++) {

	// create a button for each topic with topic as data-value attribute; and then add the button-section div
	addTopicButton(topics[i]);

}

$(".topic").click(topicClick);
$(".gif").click(gifClick);
$("#submit").click(submitClick);

function topicClick(){
	
	// grab data-value attribute from the topic that was clicked,
	// then replace spaces with "+" using a regular expession and String.replace() function,
	// and add to query URL as q parameter, with limit=10 so only 10 gifs are returned
	queryURL = "http://api.giphy.com/v1/gifs/search?q=" + ($(this).attr("data-value")).replace(/\s/g, "+") + "&limit=10&api_key=dc6zaTOxFJmzC";

	console.log(queryURL);
	// gif section handle
	var $gifSection = $("#gif-section");

	$.ajax({ url:queryURL, method:"GET"})
	 .done(function(response){

	 	console.log(response);

	 	//iterate through gifs in response and add to page
	 	for (var i = 0; i < response.data.length; i++) {
	 		//console.log(response.data[i]);	

	 		//create img element with attributes to hold class, still image, animated image, state, and src
	 		var $img = $("<img>")
	 		$img.addClass("original gif");
	 		$img.attr("data-still", response.data[i].images.original_still.url );
	 		$img.attr("data-animate", response.data[i].images.original.url );
	 		$img.attr("data-state", "still-new" );
	 		$img.attr("src", response.data[i].images.original_still.url);
	 		$gifSection.prepend($img);

	 	}

	 	//add onclick function for new images
	 	$(".gif").click(gifClick);

	 });

}

function gifClick() {
	//console.log("Clicked on "+ $(this).attr("data-still"));

	//handle to gif 
	var $this = $(this);
	var state = $this.attr("data-state");

	if (state == "still-new") {
		$this.removeClass("original");
		$this.addClass("play");
		$this.attr("src", $this.attr("data-animate"));
		$this.attr("data-state", "animate");

	}
	else if (state == "still") {
		$this.removeClass("stop");
		$this.addClass("play");
		$this.attr("src", $this.attr("data-animate"));
		$this.attr("data-state", "animate");

	}
	else if (state == "animate") {
		$this.removeClass("play");
		$this.addClass("stop");
		$this.attr("src", $this.attr("data-still"));
		$this.attr("data-state", "still");

	}

}

function submitClick(){
	console.log("submitClick");
	event.preventDefault();

	addTopicButton($("#topic-name").val().trim());

}

function addTopicButton(topic){

		console.log("addTopicButton: " + topic)

		$("#button-section").append(
		'<a href="#" class="btn btn-outline btn-xl page-scroll topic" data-value="'
		+ topic +'">' 
		+ topic + '</a>');
		$(".topic").click(topicClick);
}