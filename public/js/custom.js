"use strict";

/**
	* Template Name: MU Material
	* Version: 1.1
	* Template Scripts
	* Author: MarkUps
	* Author URI: http://www.markups.io/

	Custom JS

	1. MOBILE MENU
	2. EXPERIENCE SLIDER (Owl Carousel)
	3. EDUCATION SLIDER (Owl Carousel)
	4. LIGHTBOX ( FOR PORTFOLIO POPUP VIEW )
	5. COUNTER
	6. TESTIMONIAL SLIDER ( Owl Carousel )
	7. MENU SMOOTH SCROLLING
	8. PRELOADER
	9. CALL TO ABOUT
	10. BOTTOM TO UP
	11. PARALLAX HEADER
	12. HIRE ME SCROLL


  **/

var monthNames = [
  "Jan", "Feb", "Mar",
  "Apr", "May", "Jun", "Jul",
  "Aug", "Sep", "Oct",
  "Nov", "Dec"
];

  var usedRepositories = [
  "https://github.com/code-lucidal58/Haptiq",
  "https://github.com/jazzyarchitects/Haptiq-Extension",
  "https://github.com/jazzyarchitects/Haptiq-Server",
  "https://github.com/jazzyarchitects/FoodKart-App",
  "https://github.com/code-lucidal58/foodkartServer",
  "https://github.com/jazzyarchitects/jGen",
  "https://github.com/jazzyarchitects/java-inspired-node-logger",
  "https://github.com/jazzyarchitects/electron-music-player"
  ];

  jQuery(function($) {
    loadGithubData();
    /* ----------------------------------------------------------- */
	/*  1. Mobile MENU
	/* ----------------------------------------------------------- */

  jQuery(".button-collapse").sideNav();

  /* ----------------------------------------------------------- */
	/*  2. Experience SLider(Owl Carousel)
	/* ----------------------------------------------------------- */

	let owl = $("#owl-carousel");
  owl.owlCarousel({
    loop: true,
    margin: 10,
    responsive:{
      0:{
        items: 1
      },
      600:{
        items: 2
      },
      1000: {
        items: 2
      }
    }
  });
     // Slide Navigation
     jQuery(".next").click(function() {
      owl.trigger('next.owl.carousel');
    });

     jQuery(".prev").click(function() {
      owl.trigger('prev.owl.carousel');
    });

     /* ----------------------------------------------------------- */
	/*  3. EDUCATION SLIDER (Owl Carousel)
	/* ----------------------------------------------------------- */

	let owl1 = $("#owl-carousel1");
	owl1.owlCarousel({
    loop: true,
    margin: 10,
    responsive:{
      0:{
        items: 1
      },
      600:{
        items: 2
      },
      1000: {
        items: 3
      }
    }
  });
	 // Slide Navigation
   jQuery(".next1").click(function() {
    owl1.trigger('next.owl.carousel');
  });

   jQuery(".prev1").click(function() {
    owl1.trigger('prev.owl.carousel');
  });

   /* ----------------------------------------------------------- */
	/*  4. LIGHTBOX ( FOR PORTFOLIO POPUP VIEW )
	/* ----------------------------------------------------------- */

	$('body').append("<div id='portfolio-popup'><div class='portfolio-popup-area'><div class='portfolio-popup-inner'></div></div></div>");

	// WHEN CLICK PLAY BUTTON

  jQuery('.portfolio-thumbnill').on('click', function(event) {
    event.preventDefault();
    $('#portfolio-popup').addClass("portfolio-popup-show");
    $('#portfolio-popup').animate({
     "opacity": 1
   }, 500);
    let portfolio_detailscontent = $(this).parent(".mix").find(".portfolio-detail").html();
    $(".portfolio-popup-inner").html(portfolio_detailscontent);
  });

    // WHEN CLICK CLOSE BUTTON

    $(document).on('click', '.modal-close-btn', function(event) {
     event.preventDefault();
     $('#portfolio-popup').removeClass("portfolio-popup-show");
     $('#portfolio-popup').animate({
      "opacity": 0
    }, 500);
   });

    /* ----------------------------------------------------------- */
	/*  5. COUNTER
	/* ----------------------------------------------------------- */

	jQuery('.counter').counterUp({
    delay: 10,
    time: 750
  });

  /* ----------------------------------------------------------- */
  /*  5.5. Project SLIDER (Owl Carousel)
  /* ----------------------------------------------------------- */

  


  /* ----------------------------------------------------------- */
	/*  6. TESTIMONIAL SLIDER (Owl Carousel)
	/* ----------------------------------------------------------- */

	let owl2 = $("#owl-carousel2");
  owl2.owlCarousel({
    loop: false,
    margin: 10,
    responsive:{
      0:{
        items: 1
      },
      600:{
        items: 2
      },
      1000: {
        items: 2
      }
    }
  });

   // Slide Navigation
   jQuery(".next2").click(function() {
    owl2.trigger('next.owl.carousel');
  });

   jQuery(".prev2").click(function() {
    owl2.trigger('prev.owl.carousel');
  });

   /* ----------------------------------------------------------- */
  /*  6 b. SOCIAL SLIDER (Owl Carousel)
  /* ----------------------------------------------------------- */

  let owl3 = $("#owl-carousel3");
  owl3.owlCarousel({
    loop: true,
    margin: 10,
    responsive:{
      0:{
        items: 2
      },
      600:{
        items: 4
      },
      1000: {
        items: 6
      }
    }
  });

    // Slide Navigation
    jQuery(".next3").click(function() {
      owl3.trigger('next.owl.carousel');
    });

    jQuery(".prev3").click(function() {
      owl3.trigger('prev.owl.carousel');
    });


    /* ----------------------------------------------------------- */
	/*  7. MENU SMOOTH SCROLLING
	/* ----------------------------------------------------------- */

	// MENU SCROLLING WITH ACTIVE ITEM SELECTED

	// Cache selectors
	let lastId,
	topMenu = $(".menu-scroll"),
	topMenuHeight = topMenu.outerHeight()+13,
	// All list items
	menuItems = topMenu.find('a[href^=\\#]'),
	// Anchors corresponding to menu items
	scrollItems = menuItems.map(function() {
   let item = $($(this).attr("href"));
   if (item.length) {
     return item;
   }
 });

	// Bind click handler to menu items
	// so we can get a fancy scroll animation
	menuItems.click(function(e) {
   let href = $(this).attr("href"),
   offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+15;
   jQuery('html, body').stop().animate({
     scrollTop: offsetTop
   }, 900);
   e.preventDefault();
 });

	// Bind to scroll
	jQuery(window).scroll(function() {
	   // Get container scroll position
	   let fromTop = $(this).scrollTop()+topMenuHeight;

	   // Get id of current scroll item
	   let cur = scrollItems.map(function() {
      if ($(this).offset().top < fromTop)
        return this;
    });
	   // Get the id of the current element
	   cur = cur[cur.length-1];
	   let id = cur && cur.length ? cur[0].id : "";

	   if (lastId !== id) {
      lastId = id;
	       // Set/remove active class
	       menuItems
         .parent().removeClass("active")
         .end().filter("[href=\\#"+id+"]").parent().addClass("active");
       }
     })

	/* ----------------------------------------------------------- */
	/*  8. PRELOADER
	/* ----------------------------------------------------------- */

	jQuery(window).load(function() { // makes sure the whole site is loaded
      $('.progress').fadeOut(); // will first fade out the loading animation
      $('#preloader').delay(100).fadeOut('slow'); // will fade out the white DIV that covers the website.
      $('body').delay(100).css({'overflow': 'visible'});
    })

	/* ----------------------------------------------------------- */
	/* 9. CALL TO ABOUT
	/* ----------------------------------------------------------- */

	jQuery(".call-to-about").click(function() {
    jQuery('html,body').animate({
      scrollTop: $("#about").offset().top},
      'slow');
  });

	/* ----------------------------------------------------------- */
	/* 10. BOTTOM TO UP
	/* ----------------------------------------------------------- */

	jQuery(".up-btn").click(function() {
    jQuery('html,body').animate({
      scrollTop: $("#header").offset().top},
      'slow');
  });

	/* ----------------------------------------------------------- */
	/* 11. PARALLAX HEADER
	/* ----------------------------------------------------------- */

	jQuery('.parallax').parallax();

	/* ----------------------------------------------------------- */
	/* 12. HIRE ME SCROLL
	/* ----------------------------------------------------------- */

	jQuery(".hire-me-btn").click(function(e) {
		e.preventDefault();
    jQuery('html,body').animate({
      scrollTop: $("#footer").offset().top},
      'slow');
  });

  $("#contact_me_send_message").click(function(e) {
    e.preventDefault();
    let data = {
      name: $("input[name='contactName']").val(),
      email: $("input[name='contactEmail']").val(),
      subject: $("input[name='contactSubject']").val(),
      message: $("textarea[name='contactMessage']").val()
    }
    let url = window.location.protocol+"//"+window.location.host+"/api/contact";
    $.post(url, data, function(response) {
      if(response.success) {
        $("#contact_me_send_message").html('Thank You. I will revert back soon. :)')
      }
      // alert(JSON.stringifyO(response));
    });
  });
});


function loadGithubData(){
  var URL = "https://api.github.com/users/jazzyarchitects/repos";
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     // document.getElementById("demo").innerHTML = this.responseText;
     // console.log(this.responseText);
     var response = JSON.parse(this.responseText);
     var projectList = [];
     for(let i=0;i<response.length;i++){
      if(usedRepositories.indexOf(response[i].html_url)!==-1){
        continue;
      }
      projectList.push({
        name: response[i].name,
        url: response[i].html_url,
        description: response[i].description,
        language: response[i].language,
        updatedAt: new Date(response[i].created_at)
      });
    }

    projectList.sort(function(a,b){
      var aDate = a.updatedAt;
      var bDate = b.updatedAt;
      if(aDate > bDate) return -1;
      if(aDate < bDate) return 1;
      return 0;
    });

    let rootElement = document.getElementById("owl-carousel4");
    for(let i = 0;i<projectList.length;i++){
      rootElement.appendChild(getRepositoryTemplate(projectList[i]));
    }
    // console.log(projectList);
    let owl4 = $("#owl-carousel4");
    owl4.owlCarousel({
      loop: true,
      margin: 10,
      responsive:{
        0:{
          items: 1
        },
        600:{
          items: 2
        },
        1000: {
          items: 4
        }
      }
    });

   // Slide Navigation
   jQuery(".next4").click(function() {
    owl4.trigger('next.owl.carousel');
  });

   jQuery(".prev4").click(function() {
    owl4.trigger('prev.owl.carousel');
  });

 }
};
xhttp.open("GET", URL, true);
xhttp.send();
}

function getRepositoryTemplate(repo){
  let string = `<div class="github-content">`;
  let heading = `<h3 style="width:100%;">`+repo.name+`</h3>`;
  if(repo.name.length>18){
    heading = `<marquee speed="10">`+repo.name+`</marquee>`;
  }
  string += heading;

  let description =  `<span>`+repo.description+`</span>`;
  if(repo.description!==null && repo.description!==undefined){
    string += description;
  }

  // string += `<br /><a class="chip">`+repo.language+`</a>`;
  string += `<br /><b>Created on:</b> `+repo.updatedAt.getDate()+`-`+monthNames[repo.updatedAt.getMonth()]+`-`+repo.updatedAt.getFullYear()+`</a>`;

  string += `<br /><a href="`+repo.url+`" class="repository-button" target="_blank">Visit Repository</a>`;

  string += `</div>`;

  var node = document.createElement('div');
  node.className = "col s12 item";
  node.innerHTML = string;
  return node;
}