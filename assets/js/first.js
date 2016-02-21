/*! modernizr 3.3.1 (Custom Build) | MIT *
 * http://modernizr.com/download/?-inlinesvg-touchevents-setclasses !*/
!function(e,n,t){function o(e,n){return typeof e===n}function s(){var e,n,t,s,a,i,r;for(var l in d)if(d.hasOwnProperty(l)){if(e=[],n=d[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(s=o(n.fn,"function")?n.fn():n.fn,a=0;a<e.length;a++)i=e[a],r=i.split("."),1===r.length?Modernizr[r[0]]=s:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=s),f.push((s?"":"no-")+r.join("-"))}}function a(e){var n=u.className,t=Modernizr._config.classPrefix||"";if(p&&(n=n.baseVal),Modernizr._config.enableJSClass){var o=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(o,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),p?u.className.baseVal=n:u.className=n)}function i(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):p?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function r(){var e=n.body;return e||(e=i(p?"svg":"body"),e.fake=!0),e}function l(e,t,o,s){var a,l,f,d,c="modernizr",p=i("div"),h=r();if(parseInt(o,10))for(;o--;)f=i("div"),f.id=s?s[o]:c+(o+1),p.appendChild(f);return a=i("style"),a.type="text/css",a.id="s"+c,(h.fake?h:p).appendChild(a),h.appendChild(p),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(n.createTextNode(e)),p.id=c,h.fake&&(h.style.background="",h.style.overflow="hidden",d=u.style.overflow,u.style.overflow="hidden",u.appendChild(h)),l=t(p,e),h.fake?(h.parentNode.removeChild(h),u.style.overflow=d,u.offsetHeight):p.parentNode.removeChild(p),!!l}var f=[],d=[],c={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){d.push({name:e,fn:n,options:t})},addAsyncTest:function(e){d.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=c,Modernizr=new Modernizr;var u=n.documentElement,p="svg"===u.nodeName.toLowerCase(),h=c._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):[];c._prefixes=h,Modernizr.addTest("inlinesvg",function(){var e=i("div");return e.innerHTML="<svg/>","http://www.w3.org/2000/svg"==("undefined"!=typeof SVGRect&&e.firstChild&&e.firstChild.namespaceURI)});var v=c.testStyles=l;Modernizr.addTest("touchevents",function(){var t;if("ontouchstart"in e||e.DocumentTouch&&n instanceof DocumentTouch)t=!0;else{var o=["@media (",h.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");v(o,function(e){t=9===e.offsetTop})}return t}),s(),a(f),delete c.addTest,delete c.addAsyncTest;for(var m=0;m<Modernizr._q.length;m++)Modernizr._q[m]();e.Modernizr=Modernizr}(window,document);
/*! Webfonts */

  WebFontConfig = {
    google: { families: [ 'Montserrat:400,700:latin', 'Open+Sans:400,700:latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();

/*!
loadCSS: load a CSS file asynchronously.
[c]2015 @scottjehl, Filament Group, Inc.
Licensed MIT
*/
(function(w){
	"use strict";
	/* exported loadCSS */
	var loadCSS = function( href, before, media ){
		// Arguments explained:
		// `href` [REQUIRED] is the URL for your CSS file.
		// `before` [OPTIONAL] is the element the script should use as a reference for injecting our stylesheet <link> before
			// By default, loadCSS attempts to inject the link after the last stylesheet or script in the DOM. However, you might desire a more specific location in your document.
		// `media` [OPTIONAL] is the media type or query of the stylesheet. By default it will be 'all'
		var doc = w.document;
		var ss = doc.createElement( "link" );
		var ref;
		if( before ){
			ref = before;
		}
		else {
			var refs = ( doc.body || doc.getElementsByTagName( "head" )[ 0 ] ).childNodes;
			ref = refs[ refs.length - 1];
		}

		var sheets = doc.styleSheets;
		ss.rel = "stylesheet";
		ss.href = href;
		// temporarily set media to something inapplicable to ensure it'll fetch without blocking render
		ss.media = "only x";

		// Inject link
			// Note: the ternary preserves the existing behavior of "before" argument, but we could choose to change the argument to "after" in a later release and standardize on ref.nextSibling for all refs
			// Note: `insertBefore` is used instead of `appendChild`, for safety re: http://www.paulirish.com/2011/surefire-dom-element-insertion/
		ref.parentNode.insertBefore( ss, ( before ? ref : ref.nextSibling ) );
		// A method (exposed on return object for external use) that mimics onload by polling until document.styleSheets until it includes the new sheet.
		var onloadcssdefined = function( cb ){
			var resolvedHref = ss.href;
			var i = sheets.length;
			while( i-- ){
				if( sheets[ i ].href === resolvedHref ){
					return cb();
				}
			}
			setTimeout(function() {
				onloadcssdefined( cb );
			});
		};

		// once loaded, set link's media back to `all` so that the stylesheet applies once it loads
		ss.onloadcssdefined = onloadcssdefined;
		onloadcssdefined(function() {
			ss.media = media || "all";
		});
		return ss;
	};
	// commonjs
	if( typeof module !== "undefined" ){
		module.exports = loadCSS;
	}
	else {
		w.loadCSS = loadCSS;
	}
}( typeof global !== "undefined" ? global : this ));


(function(window, factory) {
	var lazySizes = factory(window, window.document);
	window.lazySizes = lazySizes;
	if(typeof module == 'object' && module.exports){
		module.exports = lazySizes;
	} else if (typeof define == 'function' && define.amd) {
		define(lazySizes);
	}
}(window, function(window, document) {
	'use strict';
	/*jshint eqnull:true */
	if(!document.getElementsByClassName){return;}

	var lazySizesConfig;

	var docElem = document.documentElement;

	var supportPicture = window.HTMLPictureElement && ('sizes' in document.createElement('img'));

	var _addEventListener = 'addEventListener';

	var _getAttribute = 'getAttribute';

	var addEventListener = window[_addEventListener];

	var setTimeout = window.setTimeout;

	var rAF = window.requestAnimationFrame || setTimeout;

	var regPicture = /^picture$/i;

	var loadEvents = ['load', 'error', 'lazyincluded', '_lazyloaded'];

	var regClassCache = {};

	var forEach = Array.prototype.forEach;

	var hasClass = function(ele, cls) {
		if(!regClassCache[cls]){
			regClassCache[cls] = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		}
		return regClassCache[cls].test(ele[_getAttribute]('class') || '') && regClassCache[cls];
	};

	var addClass = function(ele, cls) {
		if (!hasClass(ele, cls)){
			ele.setAttribute('class', (ele[_getAttribute]('class') || '').trim() + ' ' + cls);
		}
	};

	var removeClass = function(ele, cls) {
		var reg;
		if ((reg = hasClass(ele,cls))) {
			ele.setAttribute('class', (ele[_getAttribute]('class') || '').replace(reg, ' '));
		}
	};

	var addRemoveLoadEvents = function(dom, fn, add){
		var action = add ? _addEventListener : 'removeEventListener';
		if(add){
			addRemoveLoadEvents(dom, fn);
		}
		loadEvents.forEach(function(evt){
			dom[action](evt, fn);
		});
	};

	var triggerEvent = function(elem, name, detail, noBubbles, noCancelable){
		var event = document.createEvent('CustomEvent');

		event.initCustomEvent(name, !noBubbles, !noCancelable, detail || {});

		elem.dispatchEvent(event);
		return event;
	};

	var updatePolyfill = function (el, full){
		var polyfill;
		if( !supportPicture && ( polyfill = (window.picturefill || lazySizesConfig.pf) ) ){
			polyfill({reevaluate: true, elements: [el]});
		} else if(full && full.src){
			el.src = full.src;
		}
	};

	var getCSS = function (elem, style){
		return (getComputedStyle(elem, null) || {})[style];
	};

	var getWidth = function(elem, parent, width){
		width = width || elem.offsetWidth;

		while(width < lazySizesConfig.minSize && parent && !elem._lazysizesWidth){
			width =  parent.offsetWidth;
			parent = parent.parentNode;
		}

		return width;
	};

	var throttle = function(fn){
		var running;
		var lastTime = 0;
		var Date = window.Date;
		var run = function(){
			running = false;
			lastTime = Date.now();
			fn();
		};
		var afterAF = function(){
			setTimeout(run);
		};
		var getAF = function(){
			rAF(afterAF);
		};

		return function(){
			if(running){
				return;
			}
			var delay = 125 - (Date.now() - lastTime);

			running =  true;

			if(delay < 6){
				delay = 6;
			}
			setTimeout(getAF, delay);
		};
	};

	/*
	var throttle = function(fn){
		var running;
		var lastTime = 0;
		var Date = window.Date;
		var requestIdleCallback = window.requestIdleCallback;
		var gDelay = 125;
		var dTimeout = 999;
		var timeout = dTimeout;
		var fastCallThreshold = 0;
		var run = function(){
			running = false;
			lastTime = Date.now();
			fn();
		};
		var afterAF = function(){
			setTimeout(run);
		};
		var getAF = function(){
			rAF(afterAF);
		};

		if(requestIdleCallback){
			gDelay = 66;
			fastCallThreshold = 22;
			getAF = function(){
				requestIdleCallback(run, {timeout: timeout});
				if(timeout !== dTimeout){
					timeout = dTimeout;
				}
			};
		}

		return function(isPriority){
			var delay;
			if((isPriority = isPriority === true)){
				timeout = 40;
			}

			if(running){
				return;
			}

			running =  true;

			if(isPriority || (delay = gDelay - (Date.now() - lastTime)) < fastCallThreshold){
				getAF();
			} else {
				setTimeout(getAF, delay);
			}
		};
	};
	*/

	var loader = (function(){
		var lazyloadElems, preloadElems, isCompleted, resetPreloadingTimer, loadMode, started;

		var eLvW, elvH, eLtop, eLleft, eLright, eLbottom;

		var defaultExpand, preloadExpand, hFac;

		var regImg = /^img$/i;
		var regIframe = /^iframe$/i;

		var supportScroll = ('onscroll' in window) && !(/glebot/.test(navigator.userAgent));

		var shrinkExpand = 0;
		var currentExpand = 0;

		var isLoading = 0;
		var lowRuns = 0;

		var resetPreloading = function(e){
			isLoading--;
			if(e && e.target){
				addRemoveLoadEvents(e.target, resetPreloading);
			}

			if(!e || isLoading < 0 || !e.target){
				isLoading = 0;
			}
		};

		var isNestedVisible = function(elem, elemExpand){
			var outerRect;
			var parent = elem;
			var visible = getCSS(document.body, 'visibility') == 'hidden' || getCSS(elem, 'visibility') != 'hidden';

			eLtop -= elemExpand;
			eLbottom += elemExpand;
			eLleft -= elemExpand;
			eLright += elemExpand;

			while(visible && (parent = parent.offsetParent) && parent != document.body && parent != docElem){
				visible = ((getCSS(parent, 'opacity') || 1) > 0);

				if(visible && getCSS(parent, 'overflow') != 'visible'){
					outerRect = parent.getBoundingClientRect();
					visible = eLright > outerRect.left &&
					eLleft < outerRect.right &&
					eLbottom > outerRect.top - 1 &&
					eLtop < outerRect.bottom + 1
					;
				}
			}

			return visible;
		};

		var checkElements = function() {
			var eLlen, i, rect, autoLoadElem, loadedSomething, elemExpand, elemNegativeExpand, elemExpandVal, beforeExpandVal;

			if((loadMode = lazySizesConfig.loadMode) && isLoading < 8 && (eLlen = lazyloadElems.length)){

				i = 0;

				lowRuns++;

				if(preloadExpand == null){
					if(!('expand' in lazySizesConfig)){
						lazySizesConfig.expand = docElem.clientHeight > 600 ? docElem.clientWidth > 860 ? 500 : 410 : 359;
					}

					defaultExpand = lazySizesConfig.expand;
					preloadExpand = defaultExpand * lazySizesConfig.expFactor;
				}

				if(currentExpand < preloadExpand && isLoading < 1 && lowRuns > 3 && loadMode > 2){
					currentExpand = preloadExpand;
					lowRuns = 0;
				} else if(loadMode > 1 && lowRuns > 2 && isLoading < 6){
					currentExpand = defaultExpand;
				} else {
					currentExpand = shrinkExpand;
				}

				for(; i < eLlen; i++){

					if(!lazyloadElems[i] || lazyloadElems[i]._lazyRace){continue;}

					if(!supportScroll){unveilElement(lazyloadElems[i]);continue;}

					if(!(elemExpandVal = lazyloadElems[i][_getAttribute]('data-expand')) || !(elemExpand = elemExpandVal * 1)){
						elemExpand = currentExpand;
					}

					if(beforeExpandVal !== elemExpand){
						eLvW = innerWidth + (elemExpand * hFac);
						elvH = innerHeight + elemExpand;
						elemNegativeExpand = elemExpand * -1;
						beforeExpandVal = elemExpand;
					}

					rect = lazyloadElems[i].getBoundingClientRect();

					if ((eLbottom = rect.bottom) >= elemNegativeExpand &&
						(eLtop = rect.top) <= elvH &&
						(eLright = rect.right) >= elemNegativeExpand * hFac &&
						(eLleft = rect.left) <= eLvW &&
						(eLbottom || eLright || eLleft || eLtop) &&
						((isCompleted && isLoading < 3 && !elemExpandVal && (loadMode < 3 || lowRuns < 4)) || isNestedVisible(lazyloadElems[i], elemExpand))){
						unveilElement(lazyloadElems[i]);
						loadedSomething = true;
						if(isLoading > 9){break;}
					} else if(!loadedSomething && isCompleted && !autoLoadElem &&
						isLoading < 4 && lowRuns < 4 && loadMode > 2 &&
						(preloadElems[0] || lazySizesConfig.preloadAfterLoad) &&
						(preloadElems[0] || (!elemExpandVal && ((eLbottom || eLright || eLleft || eLtop) || lazyloadElems[i][_getAttribute](lazySizesConfig.sizesAttr) != 'auto')))){
						autoLoadElem = preloadElems[0] || lazyloadElems[i];
					}
				}

				if(autoLoadElem && !loadedSomething){
					unveilElement(autoLoadElem);
				}
			}
		};

		var throttledCheckElements = throttle(checkElements);

		var switchLoadingClass = function(e){
			addClass(e.target, lazySizesConfig.loadedClass);
			removeClass(e.target, lazySizesConfig.loadingClass);
			addRemoveLoadEvents(e.target, switchLoadingClass);
		};

		var changeIframeSrc = function(elem, src){
			try {
				elem.contentWindow.location.replace(src);
			} catch(e){
				elem.src = src;
			}
		};

		var handleSources = function(source){
			var customMedia, parent;

			var sourceSrcset = source[_getAttribute](lazySizesConfig.srcsetAttr);

			if( (customMedia = lazySizesConfig.customMedia[source[_getAttribute]('data-media') || source[_getAttribute]('media')]) ){
				source.setAttribute('media', customMedia);
			}

			if(sourceSrcset){
				source.setAttribute('srcset', sourceSrcset);
			}

			//https://bugzilla.mozilla.org/show_bug.cgi?id=1170572
			if(customMedia){
				parent = source.parentNode;
				parent.insertBefore(source.cloneNode(), source);
				parent.removeChild(source);
			}
		};

		var rafBatch = (function(){
			var isRunning;
			var batch = [];
			var runBatch = function(){
				while(batch.length){
					(batch.shift())();
				}
				isRunning = false;
			};
			return function(fn){
				batch.push(fn);
				if(!isRunning){
					isRunning = true;
					rAF(runBatch);
				}
			};
		})();

		var unveilElement = function (elem){
			var src, srcset, parent, isPicture, event, firesLoad, width;

			var isImg = regImg.test(elem.nodeName);

			//allow using sizes="auto", but don't use. it's invalid. Use data-sizes="auto" or a valid value for sizes instead (i.e.: sizes="80vw")
			var sizes = isImg && (elem[_getAttribute](lazySizesConfig.sizesAttr) || elem[_getAttribute]('sizes'));
			var isAuto = sizes == 'auto';

			if( (isAuto || !isCompleted) && isImg && (elem.src || elem.srcset) && !elem.complete && !hasClass(elem, lazySizesConfig.errorClass)){return;}

			if(isAuto){
				width = elem.offsetWidth;
			}

			elem._lazyRace = true;
			isLoading++;

			rafBatch(function lazyUnveil(){
				if(elem._lazyRace){
					delete elem._lazyRace;
				}

				if(!(event = triggerEvent(elem, 'lazybeforeunveil')).defaultPrevented){

					if(sizes){
						if(isAuto){
							autoSizer.updateElem(elem, true, width);
							addClass(elem, lazySizesConfig.autosizesClass);
						} else {
							elem.setAttribute('sizes', sizes);
						}
					}

					srcset = elem[_getAttribute](lazySizesConfig.srcsetAttr);
					src = elem[_getAttribute](lazySizesConfig.srcAttr);

					if(isImg) {
						parent = elem.parentNode;
						isPicture = parent && regPicture.test(parent.nodeName || '');
					}

					firesLoad = event.detail.firesLoad || (('src' in elem) && (srcset || src || isPicture));

					event = {target: elem};

					if(firesLoad){
						addRemoveLoadEvents(elem, resetPreloading, true);
						clearTimeout(resetPreloadingTimer);
						resetPreloadingTimer = setTimeout(resetPreloading, 2500);

						addClass(elem, lazySizesConfig.loadingClass);
						addRemoveLoadEvents(elem, switchLoadingClass, true);
					}

					if(isPicture){
						forEach.call(parent.getElementsByTagName('source'), handleSources);
					}

					if(srcset){
						elem.setAttribute('srcset', srcset);
					} else if(src && !isPicture){
						if(regIframe.test(elem.nodeName)){
							changeIframeSrc(elem, src);
						} else {
							elem.src = src;
						}
					}

					if(srcset || isPicture){
						updatePolyfill(elem, {src: src});
					}
				}

				removeClass(elem, lazySizesConfig.lazyClass);

				if( !firesLoad || elem.complete ){
					if(firesLoad){
						resetPreloading(event);
					} else {
						isLoading--;
					}
					switchLoadingClass(event);
				}
			});
		};

		var onload = function(){
			if(isCompleted){return;}
			if(Date.now() - started < 999){
				setTimeout(onload, 999);
				return;
			}
			var scrollTimer;
			var afterScroll = function(){
				lazySizesConfig.loadMode = 3;
				throttledCheckElements();
			};

			isCompleted = true;

			lazySizesConfig.loadMode = 3;

			if(!isLoading){
				if(lowRuns){
					throttledCheckElements();
				} else {
					setTimeout(checkElements);
				}
			}

			addEventListener('scroll', function(){
				if(lazySizesConfig.loadMode == 3){
					lazySizesConfig.loadMode = 2;
				}
				clearTimeout(scrollTimer);
				scrollTimer = setTimeout(afterScroll, 99);
			}, true);
		};

		/*
		var onload = function(){
			var scrollTimer, timestamp;
			var wait = 99;
			var afterScroll = function(){
				var last = (Date.now()) - timestamp;

				// if the latest call was less that the wait period ago
				// then we reset the timeout to wait for the difference
				if (last < wait) {
					scrollTimer = setTimeout(afterScroll, wait - last);

					// or if not we can null out the timer and run the latest
				} else {
					scrollTimer = null;
					lazySizesConfig.loadMode = 3;
					throttledCheckElements();
				}
			};

			isCompleted = true;
			lowRuns += 8;

			lazySizesConfig.loadMode = 3;

			addEventListener('scroll', function(){
				timestamp = Date.now();
				if(!scrollTimer){
					lazySizesConfig.loadMode = 2;
					scrollTimer = setTimeout(afterScroll, wait);
				}
			}, true);
		};
		*/

		return {
			_: function(){
				started = Date.now();

				lazyloadElems = document.getElementsByClassName(lazySizesConfig.lazyClass);
				preloadElems = document.getElementsByClassName(lazySizesConfig.lazyClass + ' ' + lazySizesConfig.preloadClass);
				hFac = lazySizesConfig.hFac;

				addEventListener('scroll', throttledCheckElements, true);

				addEventListener('resize', throttledCheckElements, true);

				if(window.MutationObserver){
					new MutationObserver( throttledCheckElements ).observe( docElem, {childList: true, subtree: true, attributes: true} );
				} else {
					docElem[_addEventListener]('DOMNodeInserted', throttledCheckElements, true);
					docElem[_addEventListener]('DOMAttrModified', throttledCheckElements, true);
					setInterval(throttledCheckElements, 999);
				}

				addEventListener('hashchange', throttledCheckElements, true);

				//, 'fullscreenchange'
				['focus', 'mouseover', 'click', 'load', 'transitionend', 'animationend', 'webkitAnimationEnd'].forEach(function(name){
					document[_addEventListener](name, throttledCheckElements, true);
				});

				if((/d$|^c/.test(document.readyState))){
					onload();
				} else {
					addEventListener('load', onload);
					document[_addEventListener]('DOMContentLoaded', throttledCheckElements);
					setTimeout(onload, 20000);
				}

				throttledCheckElements(lazyloadElems.length > 0);
			},
			checkElems: throttledCheckElements,
			unveil: unveilElement
		};
	})();


	var autoSizer = (function(){
		var autosizesElems;

		var sizeElement = function (elem, dataAttr, width){
			var sources, i, len, event;
			var parent = elem.parentNode;

			if(parent){
				width = getWidth(elem, parent, width);
				event = triggerEvent(elem, 'lazybeforesizes', {width: width, dataAttr: !!dataAttr});

				if(!event.defaultPrevented){
					width = event.detail.width;

					if(width && width !== elem._lazysizesWidth){
						elem._lazysizesWidth = width;
						width += 'px';
						elem.setAttribute('sizes', width);

						if(regPicture.test(parent.nodeName || '')){
							sources = parent.getElementsByTagName('source');
							for(i = 0, len = sources.length; i < len; i++){
								sources[i].setAttribute('sizes', width);
							}
						}

						if(!event.detail.dataAttr){
							updatePolyfill(elem, event.detail);
						}
					}
				}
			}
		};

		var updateElementsSizes = function(){
			var i;
			var len = autosizesElems.length;
			if(len){
				i = 0;

				for(; i < len; i++){
					sizeElement(autosizesElems[i]);
				}
			}
		};

		var throttledUpdateElementsSizes = throttle(updateElementsSizes);

		return {
			_: function(){
				autosizesElems = document.getElementsByClassName(lazySizesConfig.autosizesClass);
				addEventListener('resize', throttledUpdateElementsSizes);
			},
			checkElems: throttledUpdateElementsSizes,
			updateElem: sizeElement
		};
	})();

	var init = function(){
		if(!init.i){
			init.i = true;
			autoSizer._();
			loader._();
		}
	};

	(function(){
		var prop;

		var lazySizesDefaults = {
			lazyClass: 'lazyload',
			loadedClass: 'lazyloaded',
			loadingClass: 'lazyloading',
			preloadClass: 'lazypreload',
			errorClass: 'lazyerror',
			//strictClass: 'lazystrict',
			autosizesClass: 'lazyautosizes',
			srcAttr: 'data-src',
			srcsetAttr: 'data-srcset',
			sizesAttr: 'data-sizes',
			//preloadAfterLoad: false,
			minSize: 40,
			customMedia: {},
			init: true,
			expFactor: 1.7,
			hFac: 0.8,
			loadMode: 2
		};

		lazySizesConfig = window.lazySizesConfig || window.lazysizesConfig || {};

		for(prop in lazySizesDefaults){
			if(!(prop in lazySizesConfig)){
				lazySizesConfig[prop] = lazySizesDefaults[prop];
			}
		}

		window.lazySizesConfig = lazySizesConfig;

		setTimeout(function(){
			if(lazySizesConfig.init){
				init();
			}
		});
	})();

	return {
		cfg: lazySizesConfig,
		autoSizer: autoSizer,
		loader: loader,
		init: init,
		uP: updatePolyfill,
		aC: addClass,
		rC: removeClass,
		hC: hasClass,
		fire: triggerEvent,
		gW: getWidth
	};
}));

//document.getElementsByTagName('html')[0].className = document.getElementsByTagName('html')[0].className.replace('no-js', '') + ' js';
window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.preloadAfterLoad = true;
window.lazySizesConfig.expFactor = 1.7;
window.lazySizesConfig.loadMode = 3;
//window.lazySizesConfig.expand = 360-500;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGVybml6ci1jdXN0b20uanMiLCJmb250cy5qcyIsImxvYWRDU1MuanMiLCJsYXp5c2l6ZXMuanMiLCJjdXN0b20uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDenFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJmaXJzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qISBtb2Rlcm5penIgMy4zLjEgKEN1c3RvbSBCdWlsZCkgfCBNSVQgKlxuICogaHR0cDovL21vZGVybml6ci5jb20vZG93bmxvYWQvPy1pbmxpbmVzdmctdG91Y2hldmVudHMtc2V0Y2xhc3NlcyAhKi9cbiFmdW5jdGlvbihlLG4sdCl7ZnVuY3Rpb24gbyhlLG4pe3JldHVybiB0eXBlb2YgZT09PW59ZnVuY3Rpb24gcygpe3ZhciBlLG4sdCxzLGEsaSxyO2Zvcih2YXIgbCBpbiBkKWlmKGQuaGFzT3duUHJvcGVydHkobCkpe2lmKGU9W10sbj1kW2xdLG4ubmFtZSYmKGUucHVzaChuLm5hbWUudG9Mb3dlckNhc2UoKSksbi5vcHRpb25zJiZuLm9wdGlvbnMuYWxpYXNlcyYmbi5vcHRpb25zLmFsaWFzZXMubGVuZ3RoKSlmb3IodD0wO3Q8bi5vcHRpb25zLmFsaWFzZXMubGVuZ3RoO3QrKyllLnB1c2gobi5vcHRpb25zLmFsaWFzZXNbdF0udG9Mb3dlckNhc2UoKSk7Zm9yKHM9byhuLmZuLFwiZnVuY3Rpb25cIik/bi5mbigpOm4uZm4sYT0wO2E8ZS5sZW5ndGg7YSsrKWk9ZVthXSxyPWkuc3BsaXQoXCIuXCIpLDE9PT1yLmxlbmd0aD9Nb2Rlcm5penJbclswXV09czooIU1vZGVybml6cltyWzBdXXx8TW9kZXJuaXpyW3JbMF1daW5zdGFuY2VvZiBCb29sZWFufHwoTW9kZXJuaXpyW3JbMF1dPW5ldyBCb29sZWFuKE1vZGVybml6cltyWzBdXSkpLE1vZGVybml6cltyWzBdXVtyWzFdXT1zKSxmLnB1c2goKHM/XCJcIjpcIm5vLVwiKStyLmpvaW4oXCItXCIpKX19ZnVuY3Rpb24gYShlKXt2YXIgbj11LmNsYXNzTmFtZSx0PU1vZGVybml6ci5fY29uZmlnLmNsYXNzUHJlZml4fHxcIlwiO2lmKHAmJihuPW4uYmFzZVZhbCksTW9kZXJuaXpyLl9jb25maWcuZW5hYmxlSlNDbGFzcyl7dmFyIG89bmV3IFJlZ0V4cChcIihefFxcXFxzKVwiK3QrXCJuby1qcyhcXFxcc3wkKVwiKTtuPW4ucmVwbGFjZShvLFwiJDFcIit0K1wianMkMlwiKX1Nb2Rlcm5penIuX2NvbmZpZy5lbmFibGVDbGFzc2VzJiYobis9XCIgXCIrdCtlLmpvaW4oXCIgXCIrdCkscD91LmNsYXNzTmFtZS5iYXNlVmFsPW46dS5jbGFzc05hbWU9bil9ZnVuY3Rpb24gaSgpe3JldHVyblwiZnVuY3Rpb25cIiE9dHlwZW9mIG4uY3JlYXRlRWxlbWVudD9uLmNyZWF0ZUVsZW1lbnQoYXJndW1lbnRzWzBdKTpwP24uY3JlYXRlRWxlbWVudE5TLmNhbGwobixcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsYXJndW1lbnRzWzBdKTpuLmNyZWF0ZUVsZW1lbnQuYXBwbHkobixhcmd1bWVudHMpfWZ1bmN0aW9uIHIoKXt2YXIgZT1uLmJvZHk7cmV0dXJuIGV8fChlPWkocD9cInN2Z1wiOlwiYm9keVwiKSxlLmZha2U9ITApLGV9ZnVuY3Rpb24gbChlLHQsbyxzKXt2YXIgYSxsLGYsZCxjPVwibW9kZXJuaXpyXCIscD1pKFwiZGl2XCIpLGg9cigpO2lmKHBhcnNlSW50KG8sMTApKWZvcig7by0tOylmPWkoXCJkaXZcIiksZi5pZD1zP3Nbb106YysobysxKSxwLmFwcGVuZENoaWxkKGYpO3JldHVybiBhPWkoXCJzdHlsZVwiKSxhLnR5cGU9XCJ0ZXh0L2Nzc1wiLGEuaWQ9XCJzXCIrYywoaC5mYWtlP2g6cCkuYXBwZW5kQ2hpbGQoYSksaC5hcHBlbmRDaGlsZChwKSxhLnN0eWxlU2hlZXQ/YS5zdHlsZVNoZWV0LmNzc1RleHQ9ZTphLmFwcGVuZENoaWxkKG4uY3JlYXRlVGV4dE5vZGUoZSkpLHAuaWQ9YyxoLmZha2UmJihoLnN0eWxlLmJhY2tncm91bmQ9XCJcIixoLnN0eWxlLm92ZXJmbG93PVwiaGlkZGVuXCIsZD11LnN0eWxlLm92ZXJmbG93LHUuc3R5bGUub3ZlcmZsb3c9XCJoaWRkZW5cIix1LmFwcGVuZENoaWxkKGgpKSxsPXQocCxlKSxoLmZha2U/KGgucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChoKSx1LnN0eWxlLm92ZXJmbG93PWQsdS5vZmZzZXRIZWlnaHQpOnAucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChwKSwhIWx9dmFyIGY9W10sZD1bXSxjPXtfdmVyc2lvbjpcIjMuMy4xXCIsX2NvbmZpZzp7Y2xhc3NQcmVmaXg6XCJcIixlbmFibGVDbGFzc2VzOiEwLGVuYWJsZUpTQ2xhc3M6ITAsdXNlUHJlZml4ZXM6ITB9LF9xOltdLG9uOmZ1bmN0aW9uKGUsbil7dmFyIHQ9dGhpcztzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7bih0W2VdKX0sMCl9LGFkZFRlc3Q6ZnVuY3Rpb24oZSxuLHQpe2QucHVzaCh7bmFtZTplLGZuOm4sb3B0aW9uczp0fSl9LGFkZEFzeW5jVGVzdDpmdW5jdGlvbihlKXtkLnB1c2goe25hbWU6bnVsbCxmbjplfSl9fSxNb2Rlcm5penI9ZnVuY3Rpb24oKXt9O01vZGVybml6ci5wcm90b3R5cGU9YyxNb2Rlcm5penI9bmV3IE1vZGVybml6cjt2YXIgdT1uLmRvY3VtZW50RWxlbWVudCxwPVwic3ZnXCI9PT11Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCksaD1jLl9jb25maWcudXNlUHJlZml4ZXM/XCIgLXdlYmtpdC0gLW1vei0gLW8tIC1tcy0gXCIuc3BsaXQoXCIgXCIpOltdO2MuX3ByZWZpeGVzPWgsTW9kZXJuaXpyLmFkZFRlc3QoXCJpbmxpbmVzdmdcIixmdW5jdGlvbigpe3ZhciBlPWkoXCJkaXZcIik7cmV0dXJuIGUuaW5uZXJIVE1MPVwiPHN2Zy8+XCIsXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPT0oXCJ1bmRlZmluZWRcIiE9dHlwZW9mIFNWR1JlY3QmJmUuZmlyc3RDaGlsZCYmZS5maXJzdENoaWxkLm5hbWVzcGFjZVVSSSl9KTt2YXIgdj1jLnRlc3RTdHlsZXM9bDtNb2Rlcm5penIuYWRkVGVzdChcInRvdWNoZXZlbnRzXCIsZnVuY3Rpb24oKXt2YXIgdDtpZihcIm9udG91Y2hzdGFydFwiaW4gZXx8ZS5Eb2N1bWVudFRvdWNoJiZuIGluc3RhbmNlb2YgRG9jdW1lbnRUb3VjaCl0PSEwO2Vsc2V7dmFyIG89W1wiQG1lZGlhIChcIixoLmpvaW4oXCJ0b3VjaC1lbmFibGVkKSwoXCIpLFwiaGVhcnR6XCIsXCIpXCIsXCJ7I21vZGVybml6cnt0b3A6OXB4O3Bvc2l0aW9uOmFic29sdXRlfX1cIl0uam9pbihcIlwiKTt2KG8sZnVuY3Rpb24oZSl7dD05PT09ZS5vZmZzZXRUb3B9KX1yZXR1cm4gdH0pLHMoKSxhKGYpLGRlbGV0ZSBjLmFkZFRlc3QsZGVsZXRlIGMuYWRkQXN5bmNUZXN0O2Zvcih2YXIgbT0wO208TW9kZXJuaXpyLl9xLmxlbmd0aDttKyspTW9kZXJuaXpyLl9xW21dKCk7ZS5Nb2Rlcm5penI9TW9kZXJuaXpyfSh3aW5kb3csZG9jdW1lbnQpOyIsIi8qISBXZWJmb250cyAqL1xuXG4gIFdlYkZvbnRDb25maWcgPSB7XG4gICAgZ29vZ2xlOiB7IGZhbWlsaWVzOiBbICdNb250c2VycmF0OjQwMCw3MDA6bGF0aW4nLCAnT3BlbitTYW5zOjQwMCw3MDA6bGF0aW4nIF0gfVxuICB9O1xuICAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIHdmID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgd2Yuc3JjID0gKCdodHRwczonID09IGRvY3VtZW50LmxvY2F0aW9uLnByb3RvY29sID8gJ2h0dHBzJyA6ICdodHRwJykgK1xuICAgICAgJzovL2FqYXguZ29vZ2xlYXBpcy5jb20vYWpheC9saWJzL3dlYmZvbnQvMS93ZWJmb250LmpzJztcbiAgICB3Zi50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XG4gICAgd2YuYXN5bmMgPSAndHJ1ZSc7XG4gICAgdmFyIHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07XG4gICAgcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh3Ziwgcyk7XG4gIH0pKCk7XG4iLCIvKiFcbmxvYWRDU1M6IGxvYWQgYSBDU1MgZmlsZSBhc3luY2hyb25vdXNseS5cbltjXTIwMTUgQHNjb3R0amVobCwgRmlsYW1lbnQgR3JvdXAsIEluYy5cbkxpY2Vuc2VkIE1JVFxuKi9cbihmdW5jdGlvbih3KXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cdC8qIGV4cG9ydGVkIGxvYWRDU1MgKi9cblx0dmFyIGxvYWRDU1MgPSBmdW5jdGlvbiggaHJlZiwgYmVmb3JlLCBtZWRpYSApe1xuXHRcdC8vIEFyZ3VtZW50cyBleHBsYWluZWQ6XG5cdFx0Ly8gYGhyZWZgIFtSRVFVSVJFRF0gaXMgdGhlIFVSTCBmb3IgeW91ciBDU1MgZmlsZS5cblx0XHQvLyBgYmVmb3JlYCBbT1BUSU9OQUxdIGlzIHRoZSBlbGVtZW50IHRoZSBzY3JpcHQgc2hvdWxkIHVzZSBhcyBhIHJlZmVyZW5jZSBmb3IgaW5qZWN0aW5nIG91ciBzdHlsZXNoZWV0IDxsaW5rPiBiZWZvcmVcblx0XHRcdC8vIEJ5IGRlZmF1bHQsIGxvYWRDU1MgYXR0ZW1wdHMgdG8gaW5qZWN0IHRoZSBsaW5rIGFmdGVyIHRoZSBsYXN0IHN0eWxlc2hlZXQgb3Igc2NyaXB0IGluIHRoZSBET00uIEhvd2V2ZXIsIHlvdSBtaWdodCBkZXNpcmUgYSBtb3JlIHNwZWNpZmljIGxvY2F0aW9uIGluIHlvdXIgZG9jdW1lbnQuXG5cdFx0Ly8gYG1lZGlhYCBbT1BUSU9OQUxdIGlzIHRoZSBtZWRpYSB0eXBlIG9yIHF1ZXJ5IG9mIHRoZSBzdHlsZXNoZWV0LiBCeSBkZWZhdWx0IGl0IHdpbGwgYmUgJ2FsbCdcblx0XHR2YXIgZG9jID0gdy5kb2N1bWVudDtcblx0XHR2YXIgc3MgPSBkb2MuY3JlYXRlRWxlbWVudCggXCJsaW5rXCIgKTtcblx0XHR2YXIgcmVmO1xuXHRcdGlmKCBiZWZvcmUgKXtcblx0XHRcdHJlZiA9IGJlZm9yZTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR2YXIgcmVmcyA9ICggZG9jLmJvZHkgfHwgZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCBcImhlYWRcIiApWyAwIF0gKS5jaGlsZE5vZGVzO1xuXHRcdFx0cmVmID0gcmVmc1sgcmVmcy5sZW5ndGggLSAxXTtcblx0XHR9XG5cblx0XHR2YXIgc2hlZXRzID0gZG9jLnN0eWxlU2hlZXRzO1xuXHRcdHNzLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXHRcdHNzLmhyZWYgPSBocmVmO1xuXHRcdC8vIHRlbXBvcmFyaWx5IHNldCBtZWRpYSB0byBzb21ldGhpbmcgaW5hcHBsaWNhYmxlIHRvIGVuc3VyZSBpdCdsbCBmZXRjaCB3aXRob3V0IGJsb2NraW5nIHJlbmRlclxuXHRcdHNzLm1lZGlhID0gXCJvbmx5IHhcIjtcblxuXHRcdC8vIEluamVjdCBsaW5rXG5cdFx0XHQvLyBOb3RlOiB0aGUgdGVybmFyeSBwcmVzZXJ2ZXMgdGhlIGV4aXN0aW5nIGJlaGF2aW9yIG9mIFwiYmVmb3JlXCIgYXJndW1lbnQsIGJ1dCB3ZSBjb3VsZCBjaG9vc2UgdG8gY2hhbmdlIHRoZSBhcmd1bWVudCB0byBcImFmdGVyXCIgaW4gYSBsYXRlciByZWxlYXNlIGFuZCBzdGFuZGFyZGl6ZSBvbiByZWYubmV4dFNpYmxpbmcgZm9yIGFsbCByZWZzXG5cdFx0XHQvLyBOb3RlOiBgaW5zZXJ0QmVmb3JlYCBpcyB1c2VkIGluc3RlYWQgb2YgYGFwcGVuZENoaWxkYCwgZm9yIHNhZmV0eSByZTogaHR0cDovL3d3dy5wYXVsaXJpc2guY29tLzIwMTEvc3VyZWZpcmUtZG9tLWVsZW1lbnQtaW5zZXJ0aW9uL1xuXHRcdHJlZi5wYXJlbnROb2RlLmluc2VydEJlZm9yZSggc3MsICggYmVmb3JlID8gcmVmIDogcmVmLm5leHRTaWJsaW5nICkgKTtcblx0XHQvLyBBIG1ldGhvZCAoZXhwb3NlZCBvbiByZXR1cm4gb2JqZWN0IGZvciBleHRlcm5hbCB1c2UpIHRoYXQgbWltaWNzIG9ubG9hZCBieSBwb2xsaW5nIHVudGlsIGRvY3VtZW50LnN0eWxlU2hlZXRzIHVudGlsIGl0IGluY2x1ZGVzIHRoZSBuZXcgc2hlZXQuXG5cdFx0dmFyIG9ubG9hZGNzc2RlZmluZWQgPSBmdW5jdGlvbiggY2IgKXtcblx0XHRcdHZhciByZXNvbHZlZEhyZWYgPSBzcy5ocmVmO1xuXHRcdFx0dmFyIGkgPSBzaGVldHMubGVuZ3RoO1xuXHRcdFx0d2hpbGUoIGktLSApe1xuXHRcdFx0XHRpZiggc2hlZXRzWyBpIF0uaHJlZiA9PT0gcmVzb2x2ZWRIcmVmICl7XG5cdFx0XHRcdFx0cmV0dXJuIGNiKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdG9ubG9hZGNzc2RlZmluZWQoIGNiICk7XG5cdFx0XHR9KTtcblx0XHR9O1xuXG5cdFx0Ly8gb25jZSBsb2FkZWQsIHNldCBsaW5rJ3MgbWVkaWEgYmFjayB0byBgYWxsYCBzbyB0aGF0IHRoZSBzdHlsZXNoZWV0IGFwcGxpZXMgb25jZSBpdCBsb2Fkc1xuXHRcdHNzLm9ubG9hZGNzc2RlZmluZWQgPSBvbmxvYWRjc3NkZWZpbmVkO1xuXHRcdG9ubG9hZGNzc2RlZmluZWQoZnVuY3Rpb24oKSB7XG5cdFx0XHRzcy5tZWRpYSA9IG1lZGlhIHx8IFwiYWxsXCI7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHNzO1xuXHR9O1xuXHQvLyBjb21tb25qc1xuXHRpZiggdHlwZW9mIG1vZHVsZSAhPT0gXCJ1bmRlZmluZWRcIiApe1xuXHRcdG1vZHVsZS5leHBvcnRzID0gbG9hZENTUztcblx0fVxuXHRlbHNlIHtcblx0XHR3LmxvYWRDU1MgPSBsb2FkQ1NTO1xuXHR9XG59KCB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdGhpcyApKTtcblxuIiwiKGZ1bmN0aW9uKHdpbmRvdywgZmFjdG9yeSkge1xuXHR2YXIgbGF6eVNpemVzID0gZmFjdG9yeSh3aW5kb3csIHdpbmRvdy5kb2N1bWVudCk7XG5cdHdpbmRvdy5sYXp5U2l6ZXMgPSBsYXp5U2l6ZXM7XG5cdGlmKHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpe1xuXHRcdG1vZHVsZS5leHBvcnRzID0gbGF6eVNpemVzO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0ZGVmaW5lKGxhenlTaXplcyk7XG5cdH1cbn0od2luZG93LCBmdW5jdGlvbih3aW5kb3csIGRvY3VtZW50KSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0Lypqc2hpbnQgZXFudWxsOnRydWUgKi9cblx0aWYoIWRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUpe3JldHVybjt9XG5cblx0dmFyIGxhenlTaXplc0NvbmZpZztcblxuXHR2YXIgZG9jRWxlbSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuXHR2YXIgc3VwcG9ydFBpY3R1cmUgPSB3aW5kb3cuSFRNTFBpY3R1cmVFbGVtZW50ICYmICgnc2l6ZXMnIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpKTtcblxuXHR2YXIgX2FkZEV2ZW50TGlzdGVuZXIgPSAnYWRkRXZlbnRMaXN0ZW5lcic7XG5cblx0dmFyIF9nZXRBdHRyaWJ1dGUgPSAnZ2V0QXR0cmlidXRlJztcblxuXHR2YXIgYWRkRXZlbnRMaXN0ZW5lciA9IHdpbmRvd1tfYWRkRXZlbnRMaXN0ZW5lcl07XG5cblx0dmFyIHNldFRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dDtcblxuXHR2YXIgckFGID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCBzZXRUaW1lb3V0O1xuXG5cdHZhciByZWdQaWN0dXJlID0gL15waWN0dXJlJC9pO1xuXG5cdHZhciBsb2FkRXZlbnRzID0gWydsb2FkJywgJ2Vycm9yJywgJ2xhenlpbmNsdWRlZCcsICdfbGF6eWxvYWRlZCddO1xuXG5cdHZhciByZWdDbGFzc0NhY2hlID0ge307XG5cblx0dmFyIGZvckVhY2ggPSBBcnJheS5wcm90b3R5cGUuZm9yRWFjaDtcblxuXHR2YXIgaGFzQ2xhc3MgPSBmdW5jdGlvbihlbGUsIGNscykge1xuXHRcdGlmKCFyZWdDbGFzc0NhY2hlW2Nsc10pe1xuXHRcdFx0cmVnQ2xhc3NDYWNoZVtjbHNdID0gbmV3IFJlZ0V4cCgnKFxcXFxzfF4pJytjbHMrJyhcXFxcc3wkKScpO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVnQ2xhc3NDYWNoZVtjbHNdLnRlc3QoZWxlW19nZXRBdHRyaWJ1dGVdKCdjbGFzcycpIHx8ICcnKSAmJiByZWdDbGFzc0NhY2hlW2Nsc107XG5cdH07XG5cblx0dmFyIGFkZENsYXNzID0gZnVuY3Rpb24oZWxlLCBjbHMpIHtcblx0XHRpZiAoIWhhc0NsYXNzKGVsZSwgY2xzKSl7XG5cdFx0XHRlbGUuc2V0QXR0cmlidXRlKCdjbGFzcycsIChlbGVbX2dldEF0dHJpYnV0ZV0oJ2NsYXNzJykgfHwgJycpLnRyaW0oKSArICcgJyArIGNscyk7XG5cdFx0fVxuXHR9O1xuXG5cdHZhciByZW1vdmVDbGFzcyA9IGZ1bmN0aW9uKGVsZSwgY2xzKSB7XG5cdFx0dmFyIHJlZztcblx0XHRpZiAoKHJlZyA9IGhhc0NsYXNzKGVsZSxjbHMpKSkge1xuXHRcdFx0ZWxlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAoZWxlW19nZXRBdHRyaWJ1dGVdKCdjbGFzcycpIHx8ICcnKS5yZXBsYWNlKHJlZywgJyAnKSk7XG5cdFx0fVxuXHR9O1xuXG5cdHZhciBhZGRSZW1vdmVMb2FkRXZlbnRzID0gZnVuY3Rpb24oZG9tLCBmbiwgYWRkKXtcblx0XHR2YXIgYWN0aW9uID0gYWRkID8gX2FkZEV2ZW50TGlzdGVuZXIgOiAncmVtb3ZlRXZlbnRMaXN0ZW5lcic7XG5cdFx0aWYoYWRkKXtcblx0XHRcdGFkZFJlbW92ZUxvYWRFdmVudHMoZG9tLCBmbik7XG5cdFx0fVxuXHRcdGxvYWRFdmVudHMuZm9yRWFjaChmdW5jdGlvbihldnQpe1xuXHRcdFx0ZG9tW2FjdGlvbl0oZXZ0LCBmbik7XG5cdFx0fSk7XG5cdH07XG5cblx0dmFyIHRyaWdnZXJFdmVudCA9IGZ1bmN0aW9uKGVsZW0sIG5hbWUsIGRldGFpbCwgbm9CdWJibGVzLCBub0NhbmNlbGFibGUpe1xuXHRcdHZhciBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXG5cdFx0ZXZlbnQuaW5pdEN1c3RvbUV2ZW50KG5hbWUsICFub0J1YmJsZXMsICFub0NhbmNlbGFibGUsIGRldGFpbCB8fCB7fSk7XG5cblx0XHRlbGVtLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuXHRcdHJldHVybiBldmVudDtcblx0fTtcblxuXHR2YXIgdXBkYXRlUG9seWZpbGwgPSBmdW5jdGlvbiAoZWwsIGZ1bGwpe1xuXHRcdHZhciBwb2x5ZmlsbDtcblx0XHRpZiggIXN1cHBvcnRQaWN0dXJlICYmICggcG9seWZpbGwgPSAod2luZG93LnBpY3R1cmVmaWxsIHx8IGxhenlTaXplc0NvbmZpZy5wZikgKSApe1xuXHRcdFx0cG9seWZpbGwoe3JlZXZhbHVhdGU6IHRydWUsIGVsZW1lbnRzOiBbZWxdfSk7XG5cdFx0fSBlbHNlIGlmKGZ1bGwgJiYgZnVsbC5zcmMpe1xuXHRcdFx0ZWwuc3JjID0gZnVsbC5zcmM7XG5cdFx0fVxuXHR9O1xuXG5cdHZhciBnZXRDU1MgPSBmdW5jdGlvbiAoZWxlbSwgc3R5bGUpe1xuXHRcdHJldHVybiAoZ2V0Q29tcHV0ZWRTdHlsZShlbGVtLCBudWxsKSB8fCB7fSlbc3R5bGVdO1xuXHR9O1xuXG5cdHZhciBnZXRXaWR0aCA9IGZ1bmN0aW9uKGVsZW0sIHBhcmVudCwgd2lkdGgpe1xuXHRcdHdpZHRoID0gd2lkdGggfHwgZWxlbS5vZmZzZXRXaWR0aDtcblxuXHRcdHdoaWxlKHdpZHRoIDwgbGF6eVNpemVzQ29uZmlnLm1pblNpemUgJiYgcGFyZW50ICYmICFlbGVtLl9sYXp5c2l6ZXNXaWR0aCl7XG5cdFx0XHR3aWR0aCA9ICBwYXJlbnQub2Zmc2V0V2lkdGg7XG5cdFx0XHRwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gd2lkdGg7XG5cdH07XG5cblx0dmFyIHRocm90dGxlID0gZnVuY3Rpb24oZm4pe1xuXHRcdHZhciBydW5uaW5nO1xuXHRcdHZhciBsYXN0VGltZSA9IDA7XG5cdFx0dmFyIERhdGUgPSB3aW5kb3cuRGF0ZTtcblx0XHR2YXIgcnVuID0gZnVuY3Rpb24oKXtcblx0XHRcdHJ1bm5pbmcgPSBmYWxzZTtcblx0XHRcdGxhc3RUaW1lID0gRGF0ZS5ub3coKTtcblx0XHRcdGZuKCk7XG5cdFx0fTtcblx0XHR2YXIgYWZ0ZXJBRiA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRzZXRUaW1lb3V0KHJ1bik7XG5cdFx0fTtcblx0XHR2YXIgZ2V0QUYgPSBmdW5jdGlvbigpe1xuXHRcdFx0ckFGKGFmdGVyQUYpO1xuXHRcdH07XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24oKXtcblx0XHRcdGlmKHJ1bm5pbmcpe1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR2YXIgZGVsYXkgPSAxMjUgLSAoRGF0ZS5ub3coKSAtIGxhc3RUaW1lKTtcblxuXHRcdFx0cnVubmluZyA9ICB0cnVlO1xuXG5cdFx0XHRpZihkZWxheSA8IDYpe1xuXHRcdFx0XHRkZWxheSA9IDY7XG5cdFx0XHR9XG5cdFx0XHRzZXRUaW1lb3V0KGdldEFGLCBkZWxheSk7XG5cdFx0fTtcblx0fTtcblxuXHQvKlxuXHR2YXIgdGhyb3R0bGUgPSBmdW5jdGlvbihmbil7XG5cdFx0dmFyIHJ1bm5pbmc7XG5cdFx0dmFyIGxhc3RUaW1lID0gMDtcblx0XHR2YXIgRGF0ZSA9IHdpbmRvdy5EYXRlO1xuXHRcdHZhciByZXF1ZXN0SWRsZUNhbGxiYWNrID0gd2luZG93LnJlcXVlc3RJZGxlQ2FsbGJhY2s7XG5cdFx0dmFyIGdEZWxheSA9IDEyNTtcblx0XHR2YXIgZFRpbWVvdXQgPSA5OTk7XG5cdFx0dmFyIHRpbWVvdXQgPSBkVGltZW91dDtcblx0XHR2YXIgZmFzdENhbGxUaHJlc2hvbGQgPSAwO1xuXHRcdHZhciBydW4gPSBmdW5jdGlvbigpe1xuXHRcdFx0cnVubmluZyA9IGZhbHNlO1xuXHRcdFx0bGFzdFRpbWUgPSBEYXRlLm5vdygpO1xuXHRcdFx0Zm4oKTtcblx0XHR9O1xuXHRcdHZhciBhZnRlckFGID0gZnVuY3Rpb24oKXtcblx0XHRcdHNldFRpbWVvdXQocnVuKTtcblx0XHR9O1xuXHRcdHZhciBnZXRBRiA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRyQUYoYWZ0ZXJBRik7XG5cdFx0fTtcblxuXHRcdGlmKHJlcXVlc3RJZGxlQ2FsbGJhY2spe1xuXHRcdFx0Z0RlbGF5ID0gNjY7XG5cdFx0XHRmYXN0Q2FsbFRocmVzaG9sZCA9IDIyO1xuXHRcdFx0Z2V0QUYgPSBmdW5jdGlvbigpe1xuXHRcdFx0XHRyZXF1ZXN0SWRsZUNhbGxiYWNrKHJ1biwge3RpbWVvdXQ6IHRpbWVvdXR9KTtcblx0XHRcdFx0aWYodGltZW91dCAhPT0gZFRpbWVvdXQpe1xuXHRcdFx0XHRcdHRpbWVvdXQgPSBkVGltZW91dDtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24oaXNQcmlvcml0eSl7XG5cdFx0XHR2YXIgZGVsYXk7XG5cdFx0XHRpZigoaXNQcmlvcml0eSA9IGlzUHJpb3JpdHkgPT09IHRydWUpKXtcblx0XHRcdFx0dGltZW91dCA9IDQwO1xuXHRcdFx0fVxuXG5cdFx0XHRpZihydW5uaW5nKXtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRydW5uaW5nID0gIHRydWU7XG5cblx0XHRcdGlmKGlzUHJpb3JpdHkgfHwgKGRlbGF5ID0gZ0RlbGF5IC0gKERhdGUubm93KCkgLSBsYXN0VGltZSkpIDwgZmFzdENhbGxUaHJlc2hvbGQpe1xuXHRcdFx0XHRnZXRBRigpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c2V0VGltZW91dChnZXRBRiwgZGVsYXkpO1xuXHRcdFx0fVxuXHRcdH07XG5cdH07XG5cdCovXG5cblx0dmFyIGxvYWRlciA9IChmdW5jdGlvbigpe1xuXHRcdHZhciBsYXp5bG9hZEVsZW1zLCBwcmVsb2FkRWxlbXMsIGlzQ29tcGxldGVkLCByZXNldFByZWxvYWRpbmdUaW1lciwgbG9hZE1vZGUsIHN0YXJ0ZWQ7XG5cblx0XHR2YXIgZUx2VywgZWx2SCwgZUx0b3AsIGVMbGVmdCwgZUxyaWdodCwgZUxib3R0b207XG5cblx0XHR2YXIgZGVmYXVsdEV4cGFuZCwgcHJlbG9hZEV4cGFuZCwgaEZhYztcblxuXHRcdHZhciByZWdJbWcgPSAvXmltZyQvaTtcblx0XHR2YXIgcmVnSWZyYW1lID0gL15pZnJhbWUkL2k7XG5cblx0XHR2YXIgc3VwcG9ydFNjcm9sbCA9ICgnb25zY3JvbGwnIGluIHdpbmRvdykgJiYgISgvZ2xlYm90Ly50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKTtcblxuXHRcdHZhciBzaHJpbmtFeHBhbmQgPSAwO1xuXHRcdHZhciBjdXJyZW50RXhwYW5kID0gMDtcblxuXHRcdHZhciBpc0xvYWRpbmcgPSAwO1xuXHRcdHZhciBsb3dSdW5zID0gMDtcblxuXHRcdHZhciByZXNldFByZWxvYWRpbmcgPSBmdW5jdGlvbihlKXtcblx0XHRcdGlzTG9hZGluZy0tO1xuXHRcdFx0aWYoZSAmJiBlLnRhcmdldCl7XG5cdFx0XHRcdGFkZFJlbW92ZUxvYWRFdmVudHMoZS50YXJnZXQsIHJlc2V0UHJlbG9hZGluZyk7XG5cdFx0XHR9XG5cblx0XHRcdGlmKCFlIHx8IGlzTG9hZGluZyA8IDAgfHwgIWUudGFyZ2V0KXtcblx0XHRcdFx0aXNMb2FkaW5nID0gMDtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0dmFyIGlzTmVzdGVkVmlzaWJsZSA9IGZ1bmN0aW9uKGVsZW0sIGVsZW1FeHBhbmQpe1xuXHRcdFx0dmFyIG91dGVyUmVjdDtcblx0XHRcdHZhciBwYXJlbnQgPSBlbGVtO1xuXHRcdFx0dmFyIHZpc2libGUgPSBnZXRDU1MoZG9jdW1lbnQuYm9keSwgJ3Zpc2liaWxpdHknKSA9PSAnaGlkZGVuJyB8fCBnZXRDU1MoZWxlbSwgJ3Zpc2liaWxpdHknKSAhPSAnaGlkZGVuJztcblxuXHRcdFx0ZUx0b3AgLT0gZWxlbUV4cGFuZDtcblx0XHRcdGVMYm90dG9tICs9IGVsZW1FeHBhbmQ7XG5cdFx0XHRlTGxlZnQgLT0gZWxlbUV4cGFuZDtcblx0XHRcdGVMcmlnaHQgKz0gZWxlbUV4cGFuZDtcblxuXHRcdFx0d2hpbGUodmlzaWJsZSAmJiAocGFyZW50ID0gcGFyZW50Lm9mZnNldFBhcmVudCkgJiYgcGFyZW50ICE9IGRvY3VtZW50LmJvZHkgJiYgcGFyZW50ICE9IGRvY0VsZW0pe1xuXHRcdFx0XHR2aXNpYmxlID0gKChnZXRDU1MocGFyZW50LCAnb3BhY2l0eScpIHx8IDEpID4gMCk7XG5cblx0XHRcdFx0aWYodmlzaWJsZSAmJiBnZXRDU1MocGFyZW50LCAnb3ZlcmZsb3cnKSAhPSAndmlzaWJsZScpe1xuXHRcdFx0XHRcdG91dGVyUmVjdCA9IHBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRcdFx0XHR2aXNpYmxlID0gZUxyaWdodCA+IG91dGVyUmVjdC5sZWZ0ICYmXG5cdFx0XHRcdFx0ZUxsZWZ0IDwgb3V0ZXJSZWN0LnJpZ2h0ICYmXG5cdFx0XHRcdFx0ZUxib3R0b20gPiBvdXRlclJlY3QudG9wIC0gMSAmJlxuXHRcdFx0XHRcdGVMdG9wIDwgb3V0ZXJSZWN0LmJvdHRvbSArIDFcblx0XHRcdFx0XHQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHZpc2libGU7XG5cdFx0fTtcblxuXHRcdHZhciBjaGVja0VsZW1lbnRzID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgZUxsZW4sIGksIHJlY3QsIGF1dG9Mb2FkRWxlbSwgbG9hZGVkU29tZXRoaW5nLCBlbGVtRXhwYW5kLCBlbGVtTmVnYXRpdmVFeHBhbmQsIGVsZW1FeHBhbmRWYWwsIGJlZm9yZUV4cGFuZFZhbDtcblxuXHRcdFx0aWYoKGxvYWRNb2RlID0gbGF6eVNpemVzQ29uZmlnLmxvYWRNb2RlKSAmJiBpc0xvYWRpbmcgPCA4ICYmIChlTGxlbiA9IGxhenlsb2FkRWxlbXMubGVuZ3RoKSl7XG5cblx0XHRcdFx0aSA9IDA7XG5cblx0XHRcdFx0bG93UnVucysrO1xuXG5cdFx0XHRcdGlmKHByZWxvYWRFeHBhbmQgPT0gbnVsbCl7XG5cdFx0XHRcdFx0aWYoISgnZXhwYW5kJyBpbiBsYXp5U2l6ZXNDb25maWcpKXtcblx0XHRcdFx0XHRcdGxhenlTaXplc0NvbmZpZy5leHBhbmQgPSBkb2NFbGVtLmNsaWVudEhlaWdodCA+IDYwMCA/IGRvY0VsZW0uY2xpZW50V2lkdGggPiA4NjAgPyA1MDAgOiA0MTAgOiAzNTk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0ZGVmYXVsdEV4cGFuZCA9IGxhenlTaXplc0NvbmZpZy5leHBhbmQ7XG5cdFx0XHRcdFx0cHJlbG9hZEV4cGFuZCA9IGRlZmF1bHRFeHBhbmQgKiBsYXp5U2l6ZXNDb25maWcuZXhwRmFjdG9yO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYoY3VycmVudEV4cGFuZCA8IHByZWxvYWRFeHBhbmQgJiYgaXNMb2FkaW5nIDwgMSAmJiBsb3dSdW5zID4gMyAmJiBsb2FkTW9kZSA+IDIpe1xuXHRcdFx0XHRcdGN1cnJlbnRFeHBhbmQgPSBwcmVsb2FkRXhwYW5kO1xuXHRcdFx0XHRcdGxvd1J1bnMgPSAwO1xuXHRcdFx0XHR9IGVsc2UgaWYobG9hZE1vZGUgPiAxICYmIGxvd1J1bnMgPiAyICYmIGlzTG9hZGluZyA8IDYpe1xuXHRcdFx0XHRcdGN1cnJlbnRFeHBhbmQgPSBkZWZhdWx0RXhwYW5kO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGN1cnJlbnRFeHBhbmQgPSBzaHJpbmtFeHBhbmQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRmb3IoOyBpIDwgZUxsZW47IGkrKyl7XG5cblx0XHRcdFx0XHRpZighbGF6eWxvYWRFbGVtc1tpXSB8fCBsYXp5bG9hZEVsZW1zW2ldLl9sYXp5UmFjZSl7Y29udGludWU7fVxuXG5cdFx0XHRcdFx0aWYoIXN1cHBvcnRTY3JvbGwpe3VudmVpbEVsZW1lbnQobGF6eWxvYWRFbGVtc1tpXSk7Y29udGludWU7fVxuXG5cdFx0XHRcdFx0aWYoIShlbGVtRXhwYW5kVmFsID0gbGF6eWxvYWRFbGVtc1tpXVtfZ2V0QXR0cmlidXRlXSgnZGF0YS1leHBhbmQnKSkgfHwgIShlbGVtRXhwYW5kID0gZWxlbUV4cGFuZFZhbCAqIDEpKXtcblx0XHRcdFx0XHRcdGVsZW1FeHBhbmQgPSBjdXJyZW50RXhwYW5kO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmKGJlZm9yZUV4cGFuZFZhbCAhPT0gZWxlbUV4cGFuZCl7XG5cdFx0XHRcdFx0XHRlTHZXID0gaW5uZXJXaWR0aCArIChlbGVtRXhwYW5kICogaEZhYyk7XG5cdFx0XHRcdFx0XHRlbHZIID0gaW5uZXJIZWlnaHQgKyBlbGVtRXhwYW5kO1xuXHRcdFx0XHRcdFx0ZWxlbU5lZ2F0aXZlRXhwYW5kID0gZWxlbUV4cGFuZCAqIC0xO1xuXHRcdFx0XHRcdFx0YmVmb3JlRXhwYW5kVmFsID0gZWxlbUV4cGFuZDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZWN0ID0gbGF6eWxvYWRFbGVtc1tpXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuXHRcdFx0XHRcdGlmICgoZUxib3R0b20gPSByZWN0LmJvdHRvbSkgPj0gZWxlbU5lZ2F0aXZlRXhwYW5kICYmXG5cdFx0XHRcdFx0XHQoZUx0b3AgPSByZWN0LnRvcCkgPD0gZWx2SCAmJlxuXHRcdFx0XHRcdFx0KGVMcmlnaHQgPSByZWN0LnJpZ2h0KSA+PSBlbGVtTmVnYXRpdmVFeHBhbmQgKiBoRmFjICYmXG5cdFx0XHRcdFx0XHQoZUxsZWZ0ID0gcmVjdC5sZWZ0KSA8PSBlTHZXICYmXG5cdFx0XHRcdFx0XHQoZUxib3R0b20gfHwgZUxyaWdodCB8fCBlTGxlZnQgfHwgZUx0b3ApICYmXG5cdFx0XHRcdFx0XHQoKGlzQ29tcGxldGVkICYmIGlzTG9hZGluZyA8IDMgJiYgIWVsZW1FeHBhbmRWYWwgJiYgKGxvYWRNb2RlIDwgMyB8fCBsb3dSdW5zIDwgNCkpIHx8IGlzTmVzdGVkVmlzaWJsZShsYXp5bG9hZEVsZW1zW2ldLCBlbGVtRXhwYW5kKSkpe1xuXHRcdFx0XHRcdFx0dW52ZWlsRWxlbWVudChsYXp5bG9hZEVsZW1zW2ldKTtcblx0XHRcdFx0XHRcdGxvYWRlZFNvbWV0aGluZyA9IHRydWU7XG5cdFx0XHRcdFx0XHRpZihpc0xvYWRpbmcgPiA5KXticmVhazt9XG5cdFx0XHRcdFx0fSBlbHNlIGlmKCFsb2FkZWRTb21ldGhpbmcgJiYgaXNDb21wbGV0ZWQgJiYgIWF1dG9Mb2FkRWxlbSAmJlxuXHRcdFx0XHRcdFx0aXNMb2FkaW5nIDwgNCAmJiBsb3dSdW5zIDwgNCAmJiBsb2FkTW9kZSA+IDIgJiZcblx0XHRcdFx0XHRcdChwcmVsb2FkRWxlbXNbMF0gfHwgbGF6eVNpemVzQ29uZmlnLnByZWxvYWRBZnRlckxvYWQpICYmXG5cdFx0XHRcdFx0XHQocHJlbG9hZEVsZW1zWzBdIHx8ICghZWxlbUV4cGFuZFZhbCAmJiAoKGVMYm90dG9tIHx8IGVMcmlnaHQgfHwgZUxsZWZ0IHx8IGVMdG9wKSB8fCBsYXp5bG9hZEVsZW1zW2ldW19nZXRBdHRyaWJ1dGVdKGxhenlTaXplc0NvbmZpZy5zaXplc0F0dHIpICE9ICdhdXRvJykpKSl7XG5cdFx0XHRcdFx0XHRhdXRvTG9hZEVsZW0gPSBwcmVsb2FkRWxlbXNbMF0gfHwgbGF6eWxvYWRFbGVtc1tpXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihhdXRvTG9hZEVsZW0gJiYgIWxvYWRlZFNvbWV0aGluZyl7XG5cdFx0XHRcdFx0dW52ZWlsRWxlbWVudChhdXRvTG9hZEVsZW0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHZhciB0aHJvdHRsZWRDaGVja0VsZW1lbnRzID0gdGhyb3R0bGUoY2hlY2tFbGVtZW50cyk7XG5cblx0XHR2YXIgc3dpdGNoTG9hZGluZ0NsYXNzID0gZnVuY3Rpb24oZSl7XG5cdFx0XHRhZGRDbGFzcyhlLnRhcmdldCwgbGF6eVNpemVzQ29uZmlnLmxvYWRlZENsYXNzKTtcblx0XHRcdHJlbW92ZUNsYXNzKGUudGFyZ2V0LCBsYXp5U2l6ZXNDb25maWcubG9hZGluZ0NsYXNzKTtcblx0XHRcdGFkZFJlbW92ZUxvYWRFdmVudHMoZS50YXJnZXQsIHN3aXRjaExvYWRpbmdDbGFzcyk7XG5cdFx0fTtcblxuXHRcdHZhciBjaGFuZ2VJZnJhbWVTcmMgPSBmdW5jdGlvbihlbGVtLCBzcmMpe1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0ZWxlbS5jb250ZW50V2luZG93LmxvY2F0aW9uLnJlcGxhY2Uoc3JjKTtcblx0XHRcdH0gY2F0Y2goZSl7XG5cdFx0XHRcdGVsZW0uc3JjID0gc3JjO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR2YXIgaGFuZGxlU291cmNlcyA9IGZ1bmN0aW9uKHNvdXJjZSl7XG5cdFx0XHR2YXIgY3VzdG9tTWVkaWEsIHBhcmVudDtcblxuXHRcdFx0dmFyIHNvdXJjZVNyY3NldCA9IHNvdXJjZVtfZ2V0QXR0cmlidXRlXShsYXp5U2l6ZXNDb25maWcuc3Jjc2V0QXR0cik7XG5cblx0XHRcdGlmKCAoY3VzdG9tTWVkaWEgPSBsYXp5U2l6ZXNDb25maWcuY3VzdG9tTWVkaWFbc291cmNlW19nZXRBdHRyaWJ1dGVdKCdkYXRhLW1lZGlhJykgfHwgc291cmNlW19nZXRBdHRyaWJ1dGVdKCdtZWRpYScpXSkgKXtcblx0XHRcdFx0c291cmNlLnNldEF0dHJpYnV0ZSgnbWVkaWEnLCBjdXN0b21NZWRpYSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmKHNvdXJjZVNyY3NldCl7XG5cdFx0XHRcdHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ3NyY3NldCcsIHNvdXJjZVNyY3NldCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTE3MDU3MlxuXHRcdFx0aWYoY3VzdG9tTWVkaWEpe1xuXHRcdFx0XHRwYXJlbnQgPSBzb3VyY2UucGFyZW50Tm9kZTtcblx0XHRcdFx0cGFyZW50Lmluc2VydEJlZm9yZShzb3VyY2UuY2xvbmVOb2RlKCksIHNvdXJjZSk7XG5cdFx0XHRcdHBhcmVudC5yZW1vdmVDaGlsZChzb3VyY2UpO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR2YXIgcmFmQmF0Y2ggPSAoZnVuY3Rpb24oKXtcblx0XHRcdHZhciBpc1J1bm5pbmc7XG5cdFx0XHR2YXIgYmF0Y2ggPSBbXTtcblx0XHRcdHZhciBydW5CYXRjaCA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHdoaWxlKGJhdGNoLmxlbmd0aCl7XG5cdFx0XHRcdFx0KGJhdGNoLnNoaWZ0KCkpKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aXNSdW5uaW5nID0gZmFsc2U7XG5cdFx0XHR9O1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKGZuKXtcblx0XHRcdFx0YmF0Y2gucHVzaChmbik7XG5cdFx0XHRcdGlmKCFpc1J1bm5pbmcpe1xuXHRcdFx0XHRcdGlzUnVubmluZyA9IHRydWU7XG5cdFx0XHRcdFx0ckFGKHJ1bkJhdGNoKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9KSgpO1xuXG5cdFx0dmFyIHVudmVpbEVsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbSl7XG5cdFx0XHR2YXIgc3JjLCBzcmNzZXQsIHBhcmVudCwgaXNQaWN0dXJlLCBldmVudCwgZmlyZXNMb2FkLCB3aWR0aDtcblxuXHRcdFx0dmFyIGlzSW1nID0gcmVnSW1nLnRlc3QoZWxlbS5ub2RlTmFtZSk7XG5cblx0XHRcdC8vYWxsb3cgdXNpbmcgc2l6ZXM9XCJhdXRvXCIsIGJ1dCBkb24ndCB1c2UuIGl0J3MgaW52YWxpZC4gVXNlIGRhdGEtc2l6ZXM9XCJhdXRvXCIgb3IgYSB2YWxpZCB2YWx1ZSBmb3Igc2l6ZXMgaW5zdGVhZCAoaS5lLjogc2l6ZXM9XCI4MHZ3XCIpXG5cdFx0XHR2YXIgc2l6ZXMgPSBpc0ltZyAmJiAoZWxlbVtfZ2V0QXR0cmlidXRlXShsYXp5U2l6ZXNDb25maWcuc2l6ZXNBdHRyKSB8fCBlbGVtW19nZXRBdHRyaWJ1dGVdKCdzaXplcycpKTtcblx0XHRcdHZhciBpc0F1dG8gPSBzaXplcyA9PSAnYXV0byc7XG5cblx0XHRcdGlmKCAoaXNBdXRvIHx8ICFpc0NvbXBsZXRlZCkgJiYgaXNJbWcgJiYgKGVsZW0uc3JjIHx8IGVsZW0uc3Jjc2V0KSAmJiAhZWxlbS5jb21wbGV0ZSAmJiAhaGFzQ2xhc3MoZWxlbSwgbGF6eVNpemVzQ29uZmlnLmVycm9yQ2xhc3MpKXtyZXR1cm47fVxuXG5cdFx0XHRpZihpc0F1dG8pe1xuXHRcdFx0XHR3aWR0aCA9IGVsZW0ub2Zmc2V0V2lkdGg7XG5cdFx0XHR9XG5cblx0XHRcdGVsZW0uX2xhenlSYWNlID0gdHJ1ZTtcblx0XHRcdGlzTG9hZGluZysrO1xuXG5cdFx0XHRyYWZCYXRjaChmdW5jdGlvbiBsYXp5VW52ZWlsKCl7XG5cdFx0XHRcdGlmKGVsZW0uX2xhenlSYWNlKXtcblx0XHRcdFx0XHRkZWxldGUgZWxlbS5fbGF6eVJhY2U7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZighKGV2ZW50ID0gdHJpZ2dlckV2ZW50KGVsZW0sICdsYXp5YmVmb3JldW52ZWlsJykpLmRlZmF1bHRQcmV2ZW50ZWQpe1xuXG5cdFx0XHRcdFx0aWYoc2l6ZXMpe1xuXHRcdFx0XHRcdFx0aWYoaXNBdXRvKXtcblx0XHRcdFx0XHRcdFx0YXV0b1NpemVyLnVwZGF0ZUVsZW0oZWxlbSwgdHJ1ZSwgd2lkdGgpO1xuXHRcdFx0XHRcdFx0XHRhZGRDbGFzcyhlbGVtLCBsYXp5U2l6ZXNDb25maWcuYXV0b3NpemVzQ2xhc3MpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoJ3NpemVzJywgc2l6ZXMpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHNyY3NldCA9IGVsZW1bX2dldEF0dHJpYnV0ZV0obGF6eVNpemVzQ29uZmlnLnNyY3NldEF0dHIpO1xuXHRcdFx0XHRcdHNyYyA9IGVsZW1bX2dldEF0dHJpYnV0ZV0obGF6eVNpemVzQ29uZmlnLnNyY0F0dHIpO1xuXG5cdFx0XHRcdFx0aWYoaXNJbWcpIHtcblx0XHRcdFx0XHRcdHBhcmVudCA9IGVsZW0ucGFyZW50Tm9kZTtcblx0XHRcdFx0XHRcdGlzUGljdHVyZSA9IHBhcmVudCAmJiByZWdQaWN0dXJlLnRlc3QocGFyZW50Lm5vZGVOYW1lIHx8ICcnKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRmaXJlc0xvYWQgPSBldmVudC5kZXRhaWwuZmlyZXNMb2FkIHx8ICgoJ3NyYycgaW4gZWxlbSkgJiYgKHNyY3NldCB8fCBzcmMgfHwgaXNQaWN0dXJlKSk7XG5cblx0XHRcdFx0XHRldmVudCA9IHt0YXJnZXQ6IGVsZW19O1xuXG5cdFx0XHRcdFx0aWYoZmlyZXNMb2FkKXtcblx0XHRcdFx0XHRcdGFkZFJlbW92ZUxvYWRFdmVudHMoZWxlbSwgcmVzZXRQcmVsb2FkaW5nLCB0cnVlKTtcblx0XHRcdFx0XHRcdGNsZWFyVGltZW91dChyZXNldFByZWxvYWRpbmdUaW1lcik7XG5cdFx0XHRcdFx0XHRyZXNldFByZWxvYWRpbmdUaW1lciA9IHNldFRpbWVvdXQocmVzZXRQcmVsb2FkaW5nLCAyNTAwKTtcblxuXHRcdFx0XHRcdFx0YWRkQ2xhc3MoZWxlbSwgbGF6eVNpemVzQ29uZmlnLmxvYWRpbmdDbGFzcyk7XG5cdFx0XHRcdFx0XHRhZGRSZW1vdmVMb2FkRXZlbnRzKGVsZW0sIHN3aXRjaExvYWRpbmdDbGFzcywgdHJ1ZSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYoaXNQaWN0dXJlKXtcblx0XHRcdFx0XHRcdGZvckVhY2guY2FsbChwYXJlbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NvdXJjZScpLCBoYW5kbGVTb3VyY2VzKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZihzcmNzZXQpe1xuXHRcdFx0XHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoJ3NyY3NldCcsIHNyY3NldCk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmKHNyYyAmJiAhaXNQaWN0dXJlKXtcblx0XHRcdFx0XHRcdGlmKHJlZ0lmcmFtZS50ZXN0KGVsZW0ubm9kZU5hbWUpKXtcblx0XHRcdFx0XHRcdFx0Y2hhbmdlSWZyYW1lU3JjKGVsZW0sIHNyYyk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRlbGVtLnNyYyA9IHNyYztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZihzcmNzZXQgfHwgaXNQaWN0dXJlKXtcblx0XHRcdFx0XHRcdHVwZGF0ZVBvbHlmaWxsKGVsZW0sIHtzcmM6IHNyY30pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJlbW92ZUNsYXNzKGVsZW0sIGxhenlTaXplc0NvbmZpZy5sYXp5Q2xhc3MpO1xuXG5cdFx0XHRcdGlmKCAhZmlyZXNMb2FkIHx8IGVsZW0uY29tcGxldGUgKXtcblx0XHRcdFx0XHRpZihmaXJlc0xvYWQpe1xuXHRcdFx0XHRcdFx0cmVzZXRQcmVsb2FkaW5nKGV2ZW50KTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0aXNMb2FkaW5nLS07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHN3aXRjaExvYWRpbmdDbGFzcyhldmVudCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH07XG5cblx0XHR2YXIgb25sb2FkID0gZnVuY3Rpb24oKXtcblx0XHRcdGlmKGlzQ29tcGxldGVkKXtyZXR1cm47fVxuXHRcdFx0aWYoRGF0ZS5ub3coKSAtIHN0YXJ0ZWQgPCA5OTkpe1xuXHRcdFx0XHRzZXRUaW1lb3V0KG9ubG9hZCwgOTk5KTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0dmFyIHNjcm9sbFRpbWVyO1xuXHRcdFx0dmFyIGFmdGVyU2Nyb2xsID0gZnVuY3Rpb24oKXtcblx0XHRcdFx0bGF6eVNpemVzQ29uZmlnLmxvYWRNb2RlID0gMztcblx0XHRcdFx0dGhyb3R0bGVkQ2hlY2tFbGVtZW50cygpO1xuXHRcdFx0fTtcblxuXHRcdFx0aXNDb21wbGV0ZWQgPSB0cnVlO1xuXG5cdFx0XHRsYXp5U2l6ZXNDb25maWcubG9hZE1vZGUgPSAzO1xuXG5cdFx0XHRpZighaXNMb2FkaW5nKXtcblx0XHRcdFx0aWYobG93UnVucyl7XG5cdFx0XHRcdFx0dGhyb3R0bGVkQ2hlY2tFbGVtZW50cygpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoY2hlY2tFbGVtZW50cyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0YWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24oKXtcblx0XHRcdFx0aWYobGF6eVNpemVzQ29uZmlnLmxvYWRNb2RlID09IDMpe1xuXHRcdFx0XHRcdGxhenlTaXplc0NvbmZpZy5sb2FkTW9kZSA9IDI7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHNjcm9sbFRpbWVyKTtcblx0XHRcdFx0c2Nyb2xsVGltZXIgPSBzZXRUaW1lb3V0KGFmdGVyU2Nyb2xsLCA5OSk7XG5cdFx0XHR9LCB0cnVlKTtcblx0XHR9O1xuXG5cdFx0Lypcblx0XHR2YXIgb25sb2FkID0gZnVuY3Rpb24oKXtcblx0XHRcdHZhciBzY3JvbGxUaW1lciwgdGltZXN0YW1wO1xuXHRcdFx0dmFyIHdhaXQgPSA5OTtcblx0XHRcdHZhciBhZnRlclNjcm9sbCA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHZhciBsYXN0ID0gKERhdGUubm93KCkpIC0gdGltZXN0YW1wO1xuXG5cdFx0XHRcdC8vIGlmIHRoZSBsYXRlc3QgY2FsbCB3YXMgbGVzcyB0aGF0IHRoZSB3YWl0IHBlcmlvZCBhZ29cblx0XHRcdFx0Ly8gdGhlbiB3ZSByZXNldCB0aGUgdGltZW91dCB0byB3YWl0IGZvciB0aGUgZGlmZmVyZW5jZVxuXHRcdFx0XHRpZiAobGFzdCA8IHdhaXQpIHtcblx0XHRcdFx0XHRzY3JvbGxUaW1lciA9IHNldFRpbWVvdXQoYWZ0ZXJTY3JvbGwsIHdhaXQgLSBsYXN0KTtcblxuXHRcdFx0XHRcdC8vIG9yIGlmIG5vdCB3ZSBjYW4gbnVsbCBvdXQgdGhlIHRpbWVyIGFuZCBydW4gdGhlIGxhdGVzdFxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHNjcm9sbFRpbWVyID0gbnVsbDtcblx0XHRcdFx0XHRsYXp5U2l6ZXNDb25maWcubG9hZE1vZGUgPSAzO1xuXHRcdFx0XHRcdHRocm90dGxlZENoZWNrRWxlbWVudHMoKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0aXNDb21wbGV0ZWQgPSB0cnVlO1xuXHRcdFx0bG93UnVucyArPSA4O1xuXG5cdFx0XHRsYXp5U2l6ZXNDb25maWcubG9hZE1vZGUgPSAzO1xuXG5cdFx0XHRhZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbigpe1xuXHRcdFx0XHR0aW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuXHRcdFx0XHRpZighc2Nyb2xsVGltZXIpe1xuXHRcdFx0XHRcdGxhenlTaXplc0NvbmZpZy5sb2FkTW9kZSA9IDI7XG5cdFx0XHRcdFx0c2Nyb2xsVGltZXIgPSBzZXRUaW1lb3V0KGFmdGVyU2Nyb2xsLCB3YWl0KTtcblx0XHRcdFx0fVxuXHRcdFx0fSwgdHJ1ZSk7XG5cdFx0fTtcblx0XHQqL1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdF86IGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHN0YXJ0ZWQgPSBEYXRlLm5vdygpO1xuXG5cdFx0XHRcdGxhenlsb2FkRWxlbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGxhenlTaXplc0NvbmZpZy5sYXp5Q2xhc3MpO1xuXHRcdFx0XHRwcmVsb2FkRWxlbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGxhenlTaXplc0NvbmZpZy5sYXp5Q2xhc3MgKyAnICcgKyBsYXp5U2l6ZXNDb25maWcucHJlbG9hZENsYXNzKTtcblx0XHRcdFx0aEZhYyA9IGxhenlTaXplc0NvbmZpZy5oRmFjO1xuXG5cdFx0XHRcdGFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRocm90dGxlZENoZWNrRWxlbWVudHMsIHRydWUpO1xuXG5cdFx0XHRcdGFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRocm90dGxlZENoZWNrRWxlbWVudHMsIHRydWUpO1xuXG5cdFx0XHRcdGlmKHdpbmRvdy5NdXRhdGlvbk9ic2VydmVyKXtcblx0XHRcdFx0XHRuZXcgTXV0YXRpb25PYnNlcnZlciggdGhyb3R0bGVkQ2hlY2tFbGVtZW50cyApLm9ic2VydmUoIGRvY0VsZW0sIHtjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUsIGF0dHJpYnV0ZXM6IHRydWV9ICk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZG9jRWxlbVtfYWRkRXZlbnRMaXN0ZW5lcl0oJ0RPTU5vZGVJbnNlcnRlZCcsIHRocm90dGxlZENoZWNrRWxlbWVudHMsIHRydWUpO1xuXHRcdFx0XHRcdGRvY0VsZW1bX2FkZEV2ZW50TGlzdGVuZXJdKCdET01BdHRyTW9kaWZpZWQnLCB0aHJvdHRsZWRDaGVja0VsZW1lbnRzLCB0cnVlKTtcblx0XHRcdFx0XHRzZXRJbnRlcnZhbCh0aHJvdHRsZWRDaGVja0VsZW1lbnRzLCA5OTkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIHRocm90dGxlZENoZWNrRWxlbWVudHMsIHRydWUpO1xuXG5cdFx0XHRcdC8vLCAnZnVsbHNjcmVlbmNoYW5nZSdcblx0XHRcdFx0Wydmb2N1cycsICdtb3VzZW92ZXInLCAnY2xpY2snLCAnbG9hZCcsICd0cmFuc2l0aW9uZW5kJywgJ2FuaW1hdGlvbmVuZCcsICd3ZWJraXRBbmltYXRpb25FbmQnXS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpe1xuXHRcdFx0XHRcdGRvY3VtZW50W19hZGRFdmVudExpc3RlbmVyXShuYW1lLCB0aHJvdHRsZWRDaGVja0VsZW1lbnRzLCB0cnVlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0aWYoKC9kJHxeYy8udGVzdChkb2N1bWVudC5yZWFkeVN0YXRlKSkpe1xuXHRcdFx0XHRcdG9ubG9hZCgpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBvbmxvYWQpO1xuXHRcdFx0XHRcdGRvY3VtZW50W19hZGRFdmVudExpc3RlbmVyXSgnRE9NQ29udGVudExvYWRlZCcsIHRocm90dGxlZENoZWNrRWxlbWVudHMpO1xuXHRcdFx0XHRcdHNldFRpbWVvdXQob25sb2FkLCAyMDAwMCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aHJvdHRsZWRDaGVja0VsZW1lbnRzKGxhenlsb2FkRWxlbXMubGVuZ3RoID4gMCk7XG5cdFx0XHR9LFxuXHRcdFx0Y2hlY2tFbGVtczogdGhyb3R0bGVkQ2hlY2tFbGVtZW50cyxcblx0XHRcdHVudmVpbDogdW52ZWlsRWxlbWVudFxuXHRcdH07XG5cdH0pKCk7XG5cblxuXHR2YXIgYXV0b1NpemVyID0gKGZ1bmN0aW9uKCl7XG5cdFx0dmFyIGF1dG9zaXplc0VsZW1zO1xuXG5cdFx0dmFyIHNpemVFbGVtZW50ID0gZnVuY3Rpb24gKGVsZW0sIGRhdGFBdHRyLCB3aWR0aCl7XG5cdFx0XHR2YXIgc291cmNlcywgaSwgbGVuLCBldmVudDtcblx0XHRcdHZhciBwYXJlbnQgPSBlbGVtLnBhcmVudE5vZGU7XG5cblx0XHRcdGlmKHBhcmVudCl7XG5cdFx0XHRcdHdpZHRoID0gZ2V0V2lkdGgoZWxlbSwgcGFyZW50LCB3aWR0aCk7XG5cdFx0XHRcdGV2ZW50ID0gdHJpZ2dlckV2ZW50KGVsZW0sICdsYXp5YmVmb3Jlc2l6ZXMnLCB7d2lkdGg6IHdpZHRoLCBkYXRhQXR0cjogISFkYXRhQXR0cn0pO1xuXG5cdFx0XHRcdGlmKCFldmVudC5kZWZhdWx0UHJldmVudGVkKXtcblx0XHRcdFx0XHR3aWR0aCA9IGV2ZW50LmRldGFpbC53aWR0aDtcblxuXHRcdFx0XHRcdGlmKHdpZHRoICYmIHdpZHRoICE9PSBlbGVtLl9sYXp5c2l6ZXNXaWR0aCl7XG5cdFx0XHRcdFx0XHRlbGVtLl9sYXp5c2l6ZXNXaWR0aCA9IHdpZHRoO1xuXHRcdFx0XHRcdFx0d2lkdGggKz0gJ3B4Jztcblx0XHRcdFx0XHRcdGVsZW0uc2V0QXR0cmlidXRlKCdzaXplcycsIHdpZHRoKTtcblxuXHRcdFx0XHRcdFx0aWYocmVnUGljdHVyZS50ZXN0KHBhcmVudC5ub2RlTmFtZSB8fCAnJykpe1xuXHRcdFx0XHRcdFx0XHRzb3VyY2VzID0gcGFyZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzb3VyY2UnKTtcblx0XHRcdFx0XHRcdFx0Zm9yKGkgPSAwLCBsZW4gPSBzb3VyY2VzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKXtcblx0XHRcdFx0XHRcdFx0XHRzb3VyY2VzW2ldLnNldEF0dHJpYnV0ZSgnc2l6ZXMnLCB3aWR0aCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0aWYoIWV2ZW50LmRldGFpbC5kYXRhQXR0cil7XG5cdFx0XHRcdFx0XHRcdHVwZGF0ZVBvbHlmaWxsKGVsZW0sIGV2ZW50LmRldGFpbCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHZhciB1cGRhdGVFbGVtZW50c1NpemVzID0gZnVuY3Rpb24oKXtcblx0XHRcdHZhciBpO1xuXHRcdFx0dmFyIGxlbiA9IGF1dG9zaXplc0VsZW1zLmxlbmd0aDtcblx0XHRcdGlmKGxlbil7XG5cdFx0XHRcdGkgPSAwO1xuXG5cdFx0XHRcdGZvcig7IGkgPCBsZW47IGkrKyl7XG5cdFx0XHRcdFx0c2l6ZUVsZW1lbnQoYXV0b3NpemVzRWxlbXNbaV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHZhciB0aHJvdHRsZWRVcGRhdGVFbGVtZW50c1NpemVzID0gdGhyb3R0bGUodXBkYXRlRWxlbWVudHNTaXplcyk7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0XzogZnVuY3Rpb24oKXtcblx0XHRcdFx0YXV0b3NpemVzRWxlbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGxhenlTaXplc0NvbmZpZy5hdXRvc2l6ZXNDbGFzcyk7XG5cdFx0XHRcdGFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRocm90dGxlZFVwZGF0ZUVsZW1lbnRzU2l6ZXMpO1xuXHRcdFx0fSxcblx0XHRcdGNoZWNrRWxlbXM6IHRocm90dGxlZFVwZGF0ZUVsZW1lbnRzU2l6ZXMsXG5cdFx0XHR1cGRhdGVFbGVtOiBzaXplRWxlbWVudFxuXHRcdH07XG5cdH0pKCk7XG5cblx0dmFyIGluaXQgPSBmdW5jdGlvbigpe1xuXHRcdGlmKCFpbml0Lmkpe1xuXHRcdFx0aW5pdC5pID0gdHJ1ZTtcblx0XHRcdGF1dG9TaXplci5fKCk7XG5cdFx0XHRsb2FkZXIuXygpO1xuXHRcdH1cblx0fTtcblxuXHQoZnVuY3Rpb24oKXtcblx0XHR2YXIgcHJvcDtcblxuXHRcdHZhciBsYXp5U2l6ZXNEZWZhdWx0cyA9IHtcblx0XHRcdGxhenlDbGFzczogJ2xhenlsb2FkJyxcblx0XHRcdGxvYWRlZENsYXNzOiAnbGF6eWxvYWRlZCcsXG5cdFx0XHRsb2FkaW5nQ2xhc3M6ICdsYXp5bG9hZGluZycsXG5cdFx0XHRwcmVsb2FkQ2xhc3M6ICdsYXp5cHJlbG9hZCcsXG5cdFx0XHRlcnJvckNsYXNzOiAnbGF6eWVycm9yJyxcblx0XHRcdC8vc3RyaWN0Q2xhc3M6ICdsYXp5c3RyaWN0Jyxcblx0XHRcdGF1dG9zaXplc0NsYXNzOiAnbGF6eWF1dG9zaXplcycsXG5cdFx0XHRzcmNBdHRyOiAnZGF0YS1zcmMnLFxuXHRcdFx0c3Jjc2V0QXR0cjogJ2RhdGEtc3Jjc2V0Jyxcblx0XHRcdHNpemVzQXR0cjogJ2RhdGEtc2l6ZXMnLFxuXHRcdFx0Ly9wcmVsb2FkQWZ0ZXJMb2FkOiBmYWxzZSxcblx0XHRcdG1pblNpemU6IDQwLFxuXHRcdFx0Y3VzdG9tTWVkaWE6IHt9LFxuXHRcdFx0aW5pdDogdHJ1ZSxcblx0XHRcdGV4cEZhY3RvcjogMS43LFxuXHRcdFx0aEZhYzogMC44LFxuXHRcdFx0bG9hZE1vZGU6IDJcblx0XHR9O1xuXG5cdFx0bGF6eVNpemVzQ29uZmlnID0gd2luZG93LmxhenlTaXplc0NvbmZpZyB8fCB3aW5kb3cubGF6eXNpemVzQ29uZmlnIHx8IHt9O1xuXG5cdFx0Zm9yKHByb3AgaW4gbGF6eVNpemVzRGVmYXVsdHMpe1xuXHRcdFx0aWYoIShwcm9wIGluIGxhenlTaXplc0NvbmZpZykpe1xuXHRcdFx0XHRsYXp5U2l6ZXNDb25maWdbcHJvcF0gPSBsYXp5U2l6ZXNEZWZhdWx0c1twcm9wXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR3aW5kb3cubGF6eVNpemVzQ29uZmlnID0gbGF6eVNpemVzQ29uZmlnO1xuXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0aWYobGF6eVNpemVzQ29uZmlnLmluaXQpe1xuXHRcdFx0XHRpbml0KCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0pKCk7XG5cblx0cmV0dXJuIHtcblx0XHRjZmc6IGxhenlTaXplc0NvbmZpZyxcblx0XHRhdXRvU2l6ZXI6IGF1dG9TaXplcixcblx0XHRsb2FkZXI6IGxvYWRlcixcblx0XHRpbml0OiBpbml0LFxuXHRcdHVQOiB1cGRhdGVQb2x5ZmlsbCxcblx0XHRhQzogYWRkQ2xhc3MsXG5cdFx0ckM6IHJlbW92ZUNsYXNzLFxuXHRcdGhDOiBoYXNDbGFzcyxcblx0XHRmaXJlOiB0cmlnZ2VyRXZlbnQsXG5cdFx0Z1c6IGdldFdpZHRoXG5cdH07XG59KSk7XG4iLCIvL2RvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdodG1sJylbMF0uY2xhc3NOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2h0bWwnKVswXS5jbGFzc05hbWUucmVwbGFjZSgnbm8tanMnLCAnJykgKyAnIGpzJztcbndpbmRvdy5sYXp5U2l6ZXNDb25maWcgPSB3aW5kb3cubGF6eVNpemVzQ29uZmlnIHx8IHt9O1xud2luZG93LmxhenlTaXplc0NvbmZpZy5wcmVsb2FkQWZ0ZXJMb2FkID0gdHJ1ZTtcbndpbmRvdy5sYXp5U2l6ZXNDb25maWcuZXhwRmFjdG9yID0gMS43O1xud2luZG93LmxhenlTaXplc0NvbmZpZy5sb2FkTW9kZSA9IDM7XG4vL3dpbmRvdy5sYXp5U2l6ZXNDb25maWcuZXhwYW5kID0gMzYwLTUwMDtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
