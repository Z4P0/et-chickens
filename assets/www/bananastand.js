﻿var phase2 = (function () {
	// alert("there's always money in the banana stand..");


	// is there user data?
	if (localStorage.getItem('user') === null) userSetup(); // no user data. create it
	else parseData(); // user data exists. populate html

var test = 
{
	"chickens": {
		"0001" : {
			"name" : "Elaine",
			"total_eggs" : 190,
			"gender" : "female",
			"health" : "Good",
			"birthday" : "10/15/2006"
		},
		"0002" : {
			"name" : "Claire",
			"total_eggs" : 120
		}
	}
};

// console.log(test);

// localStorage.setItem('chickens', JSON.stringify(test));


// var CHICK = JSON.parse(localStorage.getItem('chickens'));
// console.log(CHICK);

// console.log(CHICK.chickens["0001"]);

	// user setup
	// userSetup();

	// hook up buttons
	var addChicken = document.getElementById('addChicken');
	// addChicken.addEventListener('click', alert('thing'));
	addListener(addChicken, 'click', _addChicken);

	// navigation
	var page = navigator();
})();

function _addChicken() {
	//alert('addChicken');

	if (localStorage.getItem('chickens') === null)
	{
		//alert('Chickens not found');
		var test = 
		{
			"chickens":
			{
				
			}
		};
		localStorage.setItem('chickens', JSON.stringify(test));

	}

	if (localStorage.getItem('count') === null)
	{
		localStorage.setItem('count',10);
	}
	
	var count = localStorage.getItem('count');
	count++;
	localStorage.setItem('count',count);
	
	collectionOfChickens = localStorage.getItem('chickens');
	var chickensObject = JSON.parse(collectionOfChickens);
	console.log(chickensObject.chickens);
	var newChicken = {
						"name" : "Susan",
						"total_eggs" : 220,
						"gender" : "female",
						"health" : "Good",
						"birthday" : "9/1/2010"
					}
	console.log(newChicken);
	chickensObject.chickens[count] = newChicken;
	console.log(chickensObject.chickens);
	localStorage.setItem('chickens', JSON.stringify(chickensObject));
}

function navigator() {
	var here = document.getElementsByTagName('body')[0].id;
	// console.log(here);

	// addClass('here') to matching <nav> li
	var nav = document.getElementsByTagName('header')[0].getElementsByTagName('nav')[0].getElementsByTagName('li');
	for (var i = 0; i < nav.length; i++) {
		if (nav[i].firstChild.firstChild.nodeValue === here) addClass('here', nav[i]);
	}

	return here;
}


function userSetup() {
	// show form
	var form = document.getElementById('user_form');
	// but hide it first
	// form.style.height = 0;
	// form.style.visibility = 'hidden';
	// now show it
	// form

	var _user = {}; // user profile to store
	_user.name = "Steve";
	_user.chickens = true;
	_user.coop = true;
	_user.totalChickens = 0;

	console.log(_user);
}


function gallery() {
	// set up the gallery page

	// 1. addeventlisteners
	// a. categories
	var categories = document.getElementsByClassName('categories')[0].getElementsByTagName('input');
	for (var i = 0; i < categories.length; i++) {
		addListener(categories[i], 'change', category_selection);
		if (categories[i].checked) addClass('selected', categories[i].parentNode);
	}
	// b. imgs
	var imgs = document.getElementsByClassName('gallery')[0].getElementsByTagName('img');
	for (var j = 0; j < imgs.length; j++) {
		addListener(imgs[j], 'click', showcase);
	}
	// hook stuff up
}

function category_selection(e) {
	// update UI
	document.getElementsByClassName('categories')[0].getElementsByClassName('selected')[0].className = '';
	e.target.parentNode.className += 'selected';

	console.log(e.target.value);
}
function showcase(e) {
	console.log('showcase\n'+e);
}










function element(_element, _text) {
	var ele;
	// check if _element has classes/IDs attached
	var classes = _element.split(/\W/i);
	if (classes.length > 1) {
		ele = document.createElement(classes[0]);
		var classString = "";
		for (var i = 1; i < classes.length; i++) { classString += classes[i]+" "; }
	}
	else {
		ele = document.createElement(_element);
	}

	// if we have a 2nd parameter
	if (_text !== undefined) {
		if (_element === "img") ele.setAttribute("src", _text);
		else {
			if (_element === "a") ele.setAttribute("href", _text);
			var text = document.createTextNode(_text);
			ele.appendChild(text);
		}
	}
	return ele;
}





// ======================================================================
// ======================================================================






/* addClass */
function addClass(_class, _element) {
	// variables
	var className = "", // string to hold className to add
			classExists = false; // boolean to check if the class already exists
	var classes = _element.className.split(" ");


	if (classes[0] === "") { /* element has no classes. add class name */ }
	else {
		/* element has existing classes */
		className += " "; // for appropriate spacing
		/* check if the class already exists */
		for (var i = 0; i < classes.length; i++) {
			if (classes[i] === _class) { classExists = true; } // class exists, do nothing
		}
	}

	// if className does not exist, add new className
	if (!classExists) {
		className += _class;
		_element.className += className;
	}
} // end addClass

/* removeClass */
function removeClass(_element, _class) {
	// variables
	var classExists = false, // boolean to check if the class already exists
			classRef; // will hold the array reference if the element exits
	var classes = _element.className.split(" ");


	if (classes[0] === "") { /* element has no classes. do nothing */ }
	else {
		/* element has existing classes, check if the class exists */
		for (var i = 0; i < classes.length; i++) {
			if (classes[i] === _class) {
				classExists = true;
				classRef = i;
			}
		}
	}

	// if className exists, remove the className
	if (classExists) {
		classes.splice(classRef);
		_element.className = classes;
	}
} // end removeClass


/* add event listener */
function addListener( _element, _event_string, _func ) {
	// Chrome, FF, O, Safari
	if( _element.addEventListener ) _element.addEventListener( _event_string, _func, false );
	// IE
	else if( _element.attachEvent ) _element.attachEvent( "on" + _event_string, _func );
	// credit to roxik, Masayuki Kido. roxik.com/cat
}

/* clear nodes */
function clear(_element) {
  while( _element.hasChildNodes() ) {
    _element.removeChild( _element.firstChild );
  }
}

/* AJAX */
// load
function load(_uri) {
  var currentRequest = null;

  // not IE
  if ( window.XMLHttpRequest ) {currentRequest = new XMLHttpRequest(); }
  // IE only
  else if ( window.ActiveXObject ) {currentRequest = new ActiveXObject( "Microsoft.XMLHTTP" ); }

  if ( currentRequest !== null ) {   // able to get a request object
    currentRequest.onreadystatechange = function() {
      checkLoadStatus(currentRequest);
    };
    currentRequest.open( "GET", _uri, true );  // true means non-blocking/asynchronous I/O
    currentRequest.send( "" );
  }
  else {
    console.log("error obtaining request object...");
  }
}

// check load status
function checkLoadStatus( _request ) {
  if ( _request.readyState == 4 ) { // if _request state is "loaded"
    if ( _request.status == 200 ) {  // if status code is "OK"
			// content loaded
			// parseData(_request.responseText);
			console.log('lol. AJAX');
    }
    else {
			console.log("something went wrong. checkLoadStatus()");
    }
  }
}