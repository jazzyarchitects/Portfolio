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

jQuery(function($) {
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
