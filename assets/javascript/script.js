  

  var topics=["cat", "dog", "turkey", "frog", "bird", "bunny", "camel", "dolphin", "monkey", "snail"]; 
     
	instantiateButtons();

	function instantiateButtons(){

 	 $("#array-display").empty(); 

 	 for(var i=0; i<topics.length; i++){

 	 	  var a = $("<button>");
          // Adding a class
          a.addClass("animals");
          // Added a data-attribute
          a.attr("id", topics[i]);
          // Provided the initial button text
          a.text(topics[i]);
          // Added the button to the HTML
          $("#array-display").append(a);
      }	
	}
	
	$("#submit-new").click(function(){

		  var value= $("#new-input").val().trim(); 

    	topics.push(value); 

    	instantiateButtons(); 

	}); 

  $(document).on("click", ".animals", function(){

		var  buttonId= this.id; 

		addGiphy(buttonId); 

	}); 

  function addGiphy(userInput) {
      var queryURL= "http://api.giphy.com/v1/gifs/search?q=" + userInput + "&limit=10&rating=pg-13&api_key=dc6zaTOxFJmzC";

      $.ajax({    
        url: queryURL,

        method: "GET"
      })
 
      .done(function(response) { // comes back as a JSON object 

      	$("#image-div").empty(); 

        for(var i=0; i< response.data.length; i++){

         var imageRating= "<span class='rating'>Rating " + response.data[i].rating + "</span> " + "<br>"; 

         var imageUrl = response.data[i].images.fixed_height_still.url; // still image 
         
         var animatedImage= response.data[i].images.fixed_height.url  // for animated

         var pTag= $("<p>"); 

         pTag.html(imageRating); 

         var imageLink= $("<a>"); 

         var setImages = $("<img>");

         setImages.attr("src", imageUrl);

         setImages.attr("non-animated", imageUrl); 

         setImages.attr("class", "still-images"); 

     	   setImages.attr("animated-version", animatedImage); // src 

     	   imageLink.append(setImages);

     	   pTag.append(imageLink); 

     	   $("#image-div").prepend(pTag);
         
         }	
 
      });
	}

 $(document).on("click", ".still-images", function(){

      var animated= $(this).attr("animated-version"); 

      var notAnimated = $(this).attr("non-animated"); 

      var currentSrc= $(this).attr("src"); 

      console.log(currentSrc); 
      console.log(animated); 
      console.log(notAnimated); 

      if(currentSrc==animated){
        $(this).attr("src", notAnimated); 

      }
      else {
        $(this).attr("src", animated); 
      } 
  
  }); 



