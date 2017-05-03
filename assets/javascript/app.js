//alert("Connected");

var topics = ["Stargate SG1", "A-Team", "Knight Rider", "MacGyver"];

for (var i = 0; i < topics.length; i++) {

	$("#button-section").append('<a href="#" class="btn btn-outline btn-xl page-scroll topic" data-value="'+topics[i] +'">' + topics[i] + '</a>');

}

$(".topic").click(topicClick);

function topicClick(){
	//alert(($(this).attr("data-value")).replace(/\s/g, "+"));

	queryURL = "http://api.giphy.com/v1/gifs/search?q=" + ($(this).attr("data-value")).replace(/\s/g, "+") + "&limit=10&api_key=dc6zaTOxFJmzC";

	console.log(queryURL);

	$.ajax({ url:queryURL, method:"GET"})
	 .done(function(response){
	 	console.log(response);

	 	//$("")
	 });

}