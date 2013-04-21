var phase2 = (function () {
	// alert("there's always money in the banana stand..");


	// is there user data?
	if (localStorage.getItem('user') === null) userSetup(); // no user data. create it
	 // user data exists. populate html

	parseChickens();
	
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

	// hook up buttons
	addListener(document.getElementById('addChicken'), 'click', addChicken);

	// navigation
	// var page = navigator();
})();


function addChicken() {
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
	//console.log(chickensObject.chickens);
	var newChicken = {
						"name" : "Susan",
						"total_eggs" : 220,
						"gender" : "female",
						"health" : "Good",
						"birthday" : "9/1/2010"
					}
	console.log(newChicken);
	chickensObject.chickens[count] = newChicken;
	//console.log(chickensObject.chickens);
	localStorage.setItem('chickens', JSON.stringify(chickensObject));

	listChicken(newChicken);
	
}

function parseChickens()
{
	if (localStorage.getItem('chickens') === null)
	{
		console.log('no chickens');
	}
	else
	{
		collectionOfChickens = localStorage.getItem('chickens');
		var chickensObject = JSON.parse(collectionOfChickens);
		var chickList = chickensObject.chickens
		//console.log(chickList);
		
		for(var k in chickList)
		{
		   //console.log(chickList[k]);
		   listChicken(chickList[k]);
		}
	}
}

function listChicken(newChicken)
{
	var listElement = document.getElementsByClassName('chickens')[0];
	var li = document.createElement("li");
	var article = document.createElement("article");
	li.appendChild(article);
	var img = document.createElement("img");
	img.src = "http://lorempixel.com/50/50";
	article.appendChild(img);
	var h3 = document.createElement("h3");
	h3.innerHTML = newChicken.name;
	article.appendChild(h3);
	var p = document.createElement("p");
	p.className = "last_fed";
	p.innerHTML = "Last fed: April 21, 2013";
	article.appendChild(p);
	var aside = document.createElement("aside");
	aside.className = "stats";
	li.appendChild(aside);
	var span = document.createElement("span");
	span.className = "eggs_today";
	span.innerHTML = "1";
	aside.appendChild(span);
	var span2 = document.createElement("span");
	span2.className = "eggs_total";
	span2.innerHTML = newChicken.total_eggs;
	aside.appendChild(span2);
	var p2 = document.createElement("p");
	p2.className = "health_status";
	p2.innerHTML = "Health: ";
	aside.appendChild(p2);
	var span2 = document.createElement("span");
	span2.className = "health_status";
	span2.innerHTML = "Good"
	p2.appendChild(span2);

	listElement.appendChild(li);
	console.log(listElement);
}

// function navigator() {
// 	var here = document.getElementsByTagName('body')[0].id;
// 	// console.log(here);

// 	// addClass('here') to matching <nav> li
// 	var nav = document.getElementsByTagName('header')[0].getElementsByTagName('nav')[0].getElementsByTagName('li');
// 	for (var i = 0; i < nav.length; i++) {
// 		if (nav[i].firstChild.firstChild.nodeValue === here) addClass('here', nav[i]);
// 	}

// 	return here;
// }


function userSetup() {
	// show form
	var form = document.getElementById('user_form');
	// i know.. innerHTML is gross
	form.innerHTML = '<div> <p>Do you have chickens?</p> <ul class="inline"> <li class="button">Yes</li> <li class="button"><a href="guide/1.html">No</a></li> </ul> </div>';

	//var firstQuestion = form.document.getElementsByClassName('button')[0];
	//addListener(firstQuestion, "click", question2);
}

function question2(e) {
	console.log(e);

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