

// array to hold topic names
var topics = ["Stargate SG1", "A-Team", "Knight Rider", "MacGyver"];

// for loop to create initail set of buttons 
for (var i = 0; i < topics.length; i++) {

	// create a button for each topic with topic as data-value attribute; and then add the button-section div
	$("#button-section").append(
		'<a href="#" class="btn btn-outline btn-xl page-scroll topic" data-value="'
		+ topics[i] +'">' 
		+ topics[i] + '</a>');

}

$(".topic").click(topicClick);

function topicClick(){
	
	// grab data-value attribute from the topic that was clicked,
	// then replace spaces with "+" using a regular expession and String.replace() function,
	// and add to query URL as q parameter, with limit=10 so only 10 gifs are returned
	queryURL = "http://api.giphy.com/v1/gifs/search?q=" + ($(this).attr("data-value")).replace(/\s/g, "+") + "&limit=10&api_key=dc6zaTOxFJmzC";

	console.log(queryURL);

	$.ajax({ url:queryURL, method:"GET"})
	 .done(function(response){

	 	console.log(response);

	 	//iterate through gifs in response and add to page
	 	for (var i = 0; i < response.data.length; i++) {
	 		//console.log(response.data[i]);
	 		$("#gif-section").append('<img class="gif" src="' + response.data[i].images.original.url + '" />');
	 	}
	 });

}