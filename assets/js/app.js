var planitude = (function ($) {


	var photosGallery = '.photo-list',
			meta = '.article-meta',
			fluidClass = 'a.fluidbox',
			siteUrl = 'http://'+(document.location.hostname||document.location.host);

  // FastClick (require FastClick.js)
	fastclick = function () {
		FastClick.attach(document.body);
	},

	// Menu
	responiveMenu = function () {
		$(document).on('click', 'header .burger', function(event) {
			$('#responsive-menu').toggleClass('is-open');
			event.preventDefault();
		});
		$(document).on('click', '#responsive-menu a', function(event) {
			$('#responsive-menu a').removeClass('active');
			$(this).addClass('active');
			$('#responsive-menu').removeClass('is-open');
			event.preventDefault();
		});
	},

	//	Ajaxify
	ajaxify = function () {
		$(document).delegate('a[href^="/"]:not([rel~="external"]),a[href^="'+siteUrl+'"]:not([rel~="external"])', "click", function(e) {
			e.preventDefault();
			//$(document).scrollTop( 0 );
//console.log('ajax load');
			History.pushState({}, "", this.pathname);
		});

		History.Adapter.bind(window, 'statechange', function(){
			var State = History.getState();
			$.get(State.url, function(data){	// Use AJAX to get the new content.
				document.title = data.match(/<title>(.*?)<\/title>/)[1];
				var content = $(data).find('#site-body > article');
				$('#content').html($(data).find('#site-body'));
				//$('#site-header .top-bar').removeClass('navbar-shrink');
				Waypoint.destroyAll();
//console.log('---- contenu chargé');
				//_gaq.push(['_trackPageview', State.url]);
				window.onload = initAjaxify();
			});
		});
	},

	// Map (mapbox : https://www.mapbox.com/mapbox-gl-js/api/ - https://www.mapbox.com/mapbox-gl-js/examples/)
	// https://www.mapbox.com/mapbox-gl-js/example/language-switch/
	// https://www.mapbox.com/mapbox-gl-js/example/popup-on-click/
	// https://www.mapbox.com/mapbox-gl-js/example/geojson-markers/
	// https://www.mapbox.com/mapbox-gl-js/example/playback-locations/
	// https://www.mapbox.com/mapbox-gl-js/example/scroll-fly-to/
	displayMap = function () {

		// $(document).on('click', '.mod', function(event) {
		// 	event.preventDefault();
		// 	var popup = new Foundation.Reveal($('#exampleModal1'));
		// 	popup.open();
		// });


		$(document).on('click', '.display-map', function(event) {
			//console.log('click display map');
			//event.preventDefault();
			// var popup = new Foundation.Reveal($('#mapModal'));
			// popup.open();

			//$.featherlight($('#mapModal'));
			//$('#mapModal').addClass('is-open');
			if($('#map').is(':empty')) {

//console.log('début map');

				var coordonates = $(this).data('coordonates').split(',');
				var lng = parseFloat(coordonates[0]);
				var lat = parseFloat(coordonates[1]);
				var zoomc = $(this).data('zoom');
				var location = $(this).data('location');
				var token = "pk.eyJ1IjoicGxhbml0dWRlIiwiYSI6ImNpa21hcDJnbDAwN2t3OW00NHExNmJpZmsifQ.h19ybld8IuZGzPcx1Q84Yw";
//console.log(coordonates);
				if (!mapboxgl.supported()) {
				  console.log('Your browser does not support Mapbox GL');
					L.mapbox.accessToken = token;
    			var map = L.mapbox.map('map', 'mapbox.streets')
        		.setView([lng, lat], zoomc);
					// <iframe width='100%' height='500px' frameBorder='0' src='https://a.tiles.mapbox.com/v4/mapbox.run-bike-hike/attribution,zoompan,zoomwheel,geocoder,share.html?access_token=pk.eyJ1IjoicGxhbml0dWRlIiwiYSI6ImNpa21hcDJnbDAwN2t3OW00NHExNmJpZmsifQ.h19ybld8IuZGzPcx1Q84Yw#7/40/-75'></iframe>
				}
				else {
					mapboxgl.accessToken = token;
					var map = new mapboxgl.Map({
							container: 'map', // container id
							//style: 'mapbox://styles/mapbox/streets-v8', //stylesheet location
							style: 'mapbox://styles/planitude/cikpa3uzh00m6b5lwr5rr83sr',

							//style: 'mapbox://styles/planitude/cin52di7a00p4c9mayqulxivm',
							//style: 'mapbox://styles/planitude/cikpa3uzh00m6b5lwr5rr83sr',

							center: [lng, lat], // starting position
							zoom: zoomc, // starting zoom

					});
					// var markers = {
					//     "type": "FeatureCollection",
					//     "features": [{
					//         "type": "Feature",
					//         "properties": {
					//             "description": "<div class=\"marker-title\">"+location+"</div><p><a href=\"http://www.mtpleasantdc.com/makeitmtpleasant\" target=\"_blank\" title=\"Opens in a new window\">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>",
					//             "marker-symbol": "marker"
					//         },
					//         "geometry": {
					//             "type": "Point",
					// 						"coordinates": [lng, lat]
					//         }
					//     }]
					// };

// 					map.on('style.load', function() {
// console.log(markers);
// 						map.addSource("markers", {
// 				        "type": "geojson",
// 				        "data": markers
// 				    });
//
// 						map.addLayer({
// 				        "id": "markers",
// 				        "type": "symbol",
// 				        "source": "markers",
// 				        "layout": {
// 				            "icon-image": "{marker-symbol}-15",
// 				            "icon-allow-overlap": true
// 				        }
// 				    });
// 						map.addControl(new mapboxgl.Navigation());
// 					});



					map.on('load', function(){

					    // Add a new source from our GeoJSON data and set the
					    map.addSource("markers", {
					        type: "geojson",
									data: "/geoloc/inde.geojson",
					    });

					    map.addLayer({
					        "id": "etapes",
					        "type": "symbol",
					        "source": "markers",
					        "layout": {
					            //"icon-image": "marker-15"
//"icon-image": "flag"
											// "marker-color": "#3bb2d0",
					            // "icon-image": "1",
											// "marker-size": "large"
											//"icon-image": "{marker-symbol}-15",
											//"icon-allow-overlap": true

											//"icon-image": "{marker-symbol}-15",
										  //"marker-color": "#3bb2d0",
											"icon-image": "dot"
											//"marker-size": "large"
					            //"text-field": "{title}",
					            //"text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
					            //"text-offset": [0, 0.6],
					            //"text-anchor": "top"
					        }
					    });

							map.on('click', function (e) {
							    var features = map.queryRenderedFeatures(e.point, { layers: ['etapes'] });

							    if (!features.length) {
							        return;
							    }

							    var feature = features[0];

							    // Populate the popup and set its coordinates
							    // based on the feature found.
							    var popup = new mapboxgl.Popup()
							        .setLngLat(feature.geometry.coordinates)
							        .setHTML(feature.properties.description)
							        .addTo(map);
							});

					});

				}
			}

			$('.map-dyn').removeClass('invisible');
			$('.map-wrapper').addClass('invisible');
			map.resize();

		});
	},

	// Fluidbox (require Fluidbox.js)
  fluidbox = function () {
		if ($(fluidClass).length) {
			$(fluidClass).fluidbox();
		}
  },


	// Photo Gallery (require lightGallery.js)
  gallery = function () {
		if ($(photosGallery).length) {
			console.log('gallery présente');
			var $lg = $('.photo-list');
			//var $lg = $(photosGallery);
			$lg.lightGallery({
					mode: 'lg-fade',
					counter: true,
					download: false,
					enableSwipe: true,
					enableDrag: true,
					//useLeft: true,
					//appendSubHtmlTo: '.lg-sub-html' //or '.lg-item'
					//appendSubHtmlTo: '.lg-item',
					autoplay: true,
					speed: 500,
					selector: "a"
			});
			//if (typeof $lg.data !== 'undefined') {
				$(document).on('click', '.lg-on #site-header a', function(event) {
						console.log('gallerie destroy');
						$lg.data('lightGallery').destroy(true);
				});
			//}
		}
  },


	// Fluidbox (require Fluidbox.js)
  backTop = function () {
		if ($(fluidClass).length) {
			$(fluidClass).fluidbox();
		}
  },

// http://webdesign.tutsplus.com/articles/create-a-sticky-navigation-header-using-jquery-waypoints--webdesign-6408
// http://jsfiddle.net/harconst/4FNFW/
	// waypoint (require waypoint.js)
	tocPosition = function () {

		// Back to top
// 		var wpTopFixed = $('#site-body.post').waypoint({
// 			handler: function(direction) {
// console.log('direction top : '+direction);
// 				if (direction === 'up') {
// 					$('#page-top').addClass('is-visible');
// 					console.log('top up visible');
// 				}
// 				else {
// 					$('#page-top').removeClass('is-visible');
// 					console.log('top down non visible');
// 				}
//
// 			},
// 			offset: '100%'
// 		});
//
// 		var wpTopClassique = $('#site-body.post #share').waypoint({
// 		  handler: function(direction) {
// 				$('#page-top').removeClass('is-visible');
// 				console.log('top non visible');
// 		  },
// 			offset: '100%'
// 		});

		$(document).on('click', '#page-top', function(event) {
				$('.toc-title span').empty();
		});



		// Menu shrink
		var wpMenuShrinkOn = $('#site-body .content-main').waypoint({
		  handler: function(direction) {
				if (direction === 'down') {
					// $('#site-header .top-bar').addClass('navbar-shrink');
					// $('#table-of-contents').addClass('navbar-shrink');
					//console.log('wpMenuShrinkOn');
					$('body').addClass('navbar-shrink');
				}
				else {
					// $('#site-header .top-bar').removeClass('navbar-shrink');
					// $('#table-of-contents').removeClass('navbar-shrink');
					//console.log('wpMenuShrinkOff');
					$('body').removeClass('navbar-shrink');
				}
		  },
			offset: '80px'
		});

		// var wpMenuShrinkOff = $('#site-body > .section').waypoint({
		//   handler: function(direction) {
		// 		if (direction === 'up') {
		// 			$('#site-header .top-bar').removeClass('navbar-shrink');
		// 			console.log('wpMenuShrinkOff');
		// 		}
		//   },
		// 	offset: '0%'
		// });
		// $(window).scroll(function() {
	  //   if ($(document).scrollTop() > 50) {
	  //     $('#site-header .top-bar').addClass('navbar-shrink');
	  //   } else {
	  //     $('#site-header .top-bar').removeClass('navbar-shrink');
	  //   }
	  // });

		// Disqus
		var wpDisqus = $('#site-body.post #share').waypoint({
		  handler: function(direction) {
				loadDisqus();
				this.destroy();
		  },
			offset: '100%'
		});

		// Toc
		var wpToc = $('#site-body.post h3').waypoint({
		  handler: function(direction) {

				if (direction === 'down') {
					//console.log('direction : '+direction);
			    //console.log(this.element.id + ' hit - ' + direction + ' - Axis: ' + this.group.axis);
// console.log($(this.element));
					var breadcrumb = $(this.element).text();
					var idBreadcrumb = $(this.element).attr('id');
					var activeBreadcrumb = $('a[href="#'+ idBreadcrumb +'"]');
			    $('.toc-title span').empty();
					//console.log('id: '+$(this.element).attr('id')+' / text : '+$(this.element).text());
					//var exclu = $(this.element).attr('id')
					//if (exclu != 'comments') {
						console.log('breadcrumb : '+breadcrumb);
						$('.toc-title span').append(' > '+breadcrumb);
						$('.toc-list a').removeClass('active');
						activeBreadcrumb.addClass('active');
					//}
				}
				else {
					//console.log('direction : '+direction);
					if (this.previous() !== null) {
// console.log('previous présent');
// console.log($(this.previous().element));
						if (this.previous().element.nodeName == 'H3') {
						//if (this.previous() !== null || this.previous().element.nodeName == 'H3') {
							var previousBreadcrumb = $(this.previous().element).text();
// console.log(this.previous().key);
							var previousIdBreadcrumb = $(this.previous().element).attr('id');
							var previousActiveBreadcrumb = $('a[href="#'+ previousIdBreadcrumb +'"]');
// console.log('previousBreadcrumb : '+previousBreadcrumb);
							$('.toc-title span').empty();
							$('.toc-title span').append(' > '+previousBreadcrumb);
							$('.toc-list a').removeClass('active');
							previousActiveBreadcrumb.addClass('active');
						}
					}
				}
		  },
			offset: 180
		});

		var infinite = new Waypoint.Infinite({
		  element: $('.infinite-container')[0]
		})

	},


	// Waypoints (require waypoint.js)
	// var waypoints = $('.row-portfolio .portfolio-item').waypoint(function(direction) {
	//   $(this.element).addClass('animated fadeInUp').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
	//     $(this).removeClass('animated fadeInUp')
	//   });
	// }, {
	//   offset: '100%'
	// });

	// Load Disqus comments
	loadDisqus = function () {
		//$(document).on('click', '.show-comments', function(event) {
			var disqus_shortname = 'planitudefr'; // Replace this value with *your* username.
				if (typeof DISQUS !== 'undefined') {
					DISQUS.reset({
						reload: true
					});
				}
				else {
					$.ajax({
						type: "GET",
						url: "//" + disqus_shortname + ".disqus.com/embed.js",
						dataType: "script",
						cache: true
					});
				}
		//});
	},

	// Load Disqus comments
	actionEvents = function () {
		$(document).on('click', '.show-comments', function(event) {
			loadDisqus();
		});
	},


	// Contact form
	contactPost = function () {
		var contactForm = $('#contactForm');
		$(document).on('submit', contactForm, function(event) {
		//$contactForm.submit(function(event) {
			event.preventDefault();
			// console.log('post');
			// console.log($(this).serialize());
			$.ajax({
				url: "//formspree.io/julien@planitude.fr",
				method: "POST",
				data: $(this).serialize(),
				dataType: "json",
				success: function(data) {
					$('#success').html("<div class='alert alert-success'>");
					$('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
							.append("</button>");
					$('#success > .alert-success')
							.append("<strong>Votre message a bien été envoyé!</strong>");
					$('#success > .alert-success')
							.append('</div>');
					$contactForm.trigger("reset");
				},
				error: function(err) {
					$('#success').html("<div class='alert alert-danger'>");
					$('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
							.append("</button>");
					$('#success > .alert-danger').append("<strong>Un problème est survenu, merci d'essayer ultérieurement");
					$('#success > .alert-danger').append('</div>');
					$contactForm.trigger("reset");
				}
			});
		});
	},

	pageScroll = function () {
		$(document).on('click', 'a.page-scroll, #table-of-contents .toc-list a', function(event) {
			var $anchor = $(this);
			var top = 150;
			console.log('anchor : '+$anchor.attr('href'));
			if ( $anchor.attr('href') === '#intro') {
				top = 200;
			}
		  $('html, body').stop().animate({
		 		 scrollTop: $($anchor.attr('href')).offset().top-top
		  }, 1500, 'easeInOutExpo');
		  event.preventDefault();
		});
	},

	mainMenu = function () {

	},

	toc = function () {

		$(document).on('click', '#table-of-contents .toc-title', function(event) {
		    $('#table-of-contents .breadcrumb').addClass('is-open');
				event.preventDefault();
		});

		$(document).on('click', '#table-of-contents .is-open', function(event) {
				$('#table-of-contents .breadcrumb').removeClass('is-open');
				event.preventDefault();
		});

		$(document).on('click', '#table-of-contents .toc-list a', function(event) {
		    var breadcrumb = ' > '+$(this).text();
		    $('.toc-title span').empty();
		    $('.toc-title span').append(breadcrumb);
		    $('#table-of-contents .breadcrumb').removeClass('is-open');
		});

	},

	// Add DOM elements
	alterDom = function () {

		$( "#site-body .article-body h3" ).each(function( index ) {
		  $(this).wrapInner( "<span></span>")
		  //var slug = strinfToSlug($(this).text());
		});

		// Open external links in new window
		var localHost = "http://" + window.location.host;
		var flickrHost = "https://farm2.staticflickr.com";
		//$('a:not([href*=javascript]):not([href^=#])')
		//:not([rel!='']) , [rel!='']
		$('a[href]:not([href^="'+siteUrl+'"], [href^="'+flickrHost+'"], [href^="#"], [href^="/"])').attr('rel', 'external').attr( 'target', '_blank' );
		$('a[rel~="external"]').attr('target', '_blank');

		$('#content > main').addClass('page-loaded');
	},



	// Helper functions
	strinfToSlug = function (str) {
	  str = $.trim(str);
	  str = str.replace(/^\s+|\s+$/g, ''); // trim
	  str = str.toLowerCase();
	  // remove accents, swap ñ for n, etc
	  // var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
	  // var to   = "aaaaeeeeiiiioooouuuunc------";
	  // for (var i=0, l=from.length ; i<l ; i++) {
	  //   str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
	  // }
	  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
	    .replace(/\s+/g, '-') // collapse whitespace and replace by -
	    .replace(/-+/g, '-'); // collapse dashes
	  return str;
	},

	initAjaxify = function () {
		$(document).scrollTop( 0 );
		Waypoint.destroyAll();
		console.log('Waypoint destroy');
		$('body').removeClass('navbar-shrink');
		alterDom();
		fluidbox();
		gallery();
		toc();
		mainMenu();
		tocPosition();
	},

	init = function () {
		alterDom();
		fastclick();
		ajaxify();
		fluidbox();
		gallery();
		actionEvents();
		//loadDisqus();
		pageScroll();
		mainMenu();
		toc();
		contactPost();
		tocPosition();
		displayMap();
		responiveMenu();
	};

	return {
			init: init
	};

})(jQuery);

(function () {
    planitude.init();
		//$(document).foundation();
})();
