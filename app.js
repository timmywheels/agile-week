/*global $*/

//ALPHA_VANTAGE_KEY=HNFC0VWAW5DIOLLW
var cookieArr = [];
var savedCookieArr = [];

var stock = {
  price: 0
};

function tickerApi() {

  var d = new Date();
  var month = d.getUTCMonth() + 1; //months from 1-12
  var day = d.getUTCDate() - 1;
  var year = d.getUTCFullYear();

  if (day < 10) {
    day = '0' + day;
  }
  if (month < 10) {
    month = '0' + month;
  }

  var currentDate = year + "-" + month + "-" + day;

  console.log('currentDate:', currentDate);

  var apiKey = 'HNFC0VWAW5DIOLLW';

  var tickerSymbol = document.getElementById('addClientTicker').value;

  var url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + tickerSymbol + "&apikey=" + apiKey;

  //Create a new object to interact with the server
  var xhr = new XMLHttpRequest();

  // Provide 3 arguments (GET/POST, The URL, Async True/False);
  xhr.open('GET', url, false);

  // Once request has loaded...
  xhr.onload = function() {
    // Parse the request into JSON
    var data = JSON.parse(this.response);

    // Log the data object
    console.log(data);

    stock.price = data['Time Series (Daily)'][currentDate]['1. open'];

    console.log('stock.price', stock.price);

  };
  // Send request to the server asynchronously
  xhr.send();
}

document.addEventListener('DOMContentLoaded', function() {
  
  
  const list = document.querySelector('#client-list ul');
  
  //Save Cookie
    if(cookieArr != 0){
      savedCookieArr.push(document.cookie.split(";"));
    } 
  
  // //Publish the cookie
  //   for (var i = 0; i < savedCookieArr.length; i++){
  //     if (savedCookieArr[i].includes("<li>")){
  //       $(list).append(savedCookieArr[i]);
  //     }
  //   }
  

  //delete clients
  list.addEventListener('click', function(e) {
    if (e.target.className == 'delete') {
      if (confirm('Are you sure you want to delete this client?')) {

        const li = e.target.parentElement.parentElement.parentElement.parentElement;
        // Might not be the best solution, but works
        list.removeChild(li);
        
      }
    }
    else {
      return false;
    }

  });

  // Set consultant value from toggle
  var addClientBtn = document.getElementById('addClientBtn');

  var consultantInitials = '';
  var consultantFullName = '';

  addClientBtn.addEventListener('click', function() {

    if (document.getElementById('arnell').parentElement.classList.contains('active')) {
      consultantInitials = 'AM';
      consultantFullName = 'Arnell Milhouse';
      console.log(consultantInitials);
    }

    else if (document.getElementById('reece').parentElement.classList.contains('active')) {
      consultantInitials = 'RF';
      consultantFullName = 'Reece Franklin';
      console.log(consultantInitials);
    }

    tickerApi();

  })

  //add client-list
  const addForm = document.forms['add-client'];

  addForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const firstNameValue = addForm.querySelector('#addClientFirstName').value;
    const lastNameValue = addForm.querySelector('#addClientLastName').value;
    const tickerValue = addForm.querySelector('#addClientTicker').value;

    //create li elements
    var li = "<li>" +
      "<div class='consultant'><p>" + consultantInitials + "</p></div>" + // Consultant
      "<div class='stock'>" + tickerValue.toUpperCase() + "</div>" + // Stock Ticker
      "<span class='firstName'>" + firstNameValue + "</span>" + ' ' + // First Name
      "<span class='lastName'>" + lastNameValue + "</span>" + // Last Name
      "<a href='#clientInfo' data-toggle='collapse'><i class='seeMore fa fa-chevron-left'></i></a>" + // Client info toggle
      "<div class='btn-group btn-group-toggle' data-toggle='buttons'>" +
      "<label class='btn btn-secondary'>" +
      "<input type='radio' name='options' id='option1' autocomplete='off' checked>" +
      "<i class='fas fa-eye'></i>" +
      "</label>" +
      "<label class='btn btn-secondary active'>" +
      "<input type='radio' name='options' id='option2' autocomplete='off'>" +
      "<i class='fas fa-plus'></i>" +
      "</label>" +
      "<label class='btn btn-secondary'>" +
      "<input type='radio' name='options' id='option3' autocomplete='off'>" +
      "<i class='fas fa-minus'></i>" +
      "</label>" +
      "</div>" +
      "<span class='stockPrice'>$" + parseFloat(stock.price).toFixed(2) + "</span>" + // Display stock with only 2 decimal points
      "<div class='collapse multi-collapse' id='clientInfo'>" +
      "<div class='card card-body'>" +
      "<div><i class='fas fa-user-tie'></i>" + ' ' +
      "<p id='consultant'>" + consultantFullName + "</p>" + "</div>" +
      "<div><i class='fas fa-phone'></i>" + ' ' + "<p>(978) 495-0992</p></div>" +
      "<div><i class='fas fa-envelope'></i>" + ' ' + "<p>jordana@yahoo.com</p></div>" +
      "<div><i class='fas fa-location-arrow'></i>" + ' ' + "<p>14 Champlain Dr., Hudson, MA 01749</p></div>" +
      "<div><span class='timeStamp'><p>Created: " + timeStamp() + "</p></span><span class='delete'> X </span></div>" +
      "</div>" +
      "</div>" +
      "</li>";

    $(list).append(li);
    cookieArr.push(li);
    document.cookie = ""+cookieArr+"; expires=Tue, 19 Jan 2038 03:14:07 UTC;";
  });

  //filter clients and tickers
  const searchBar = document.forms['search-clients'].querySelector('input');
  searchBar.addEventListener('keyup', function(e) {
    const term = e.target.value.toLowerCase();
    const clients = list.getElementsByTagName('li');

    Array.from(clients).forEach(function(client) {
      const title = client.innerText;
      if (title.toLowerCase().indexOf(term) != -1) {
        client.style.display = 'block';
      }
      else {
        client.style.display = 'none';
      }
    });
  });
});


// Create timestamp
function timeStamp() {
  // Create a date object with the current time
  var now = new Date();

  // Create an array with the current month, day and time
  var date = [now.getMonth() + 1, now.getDate(), now.getFullYear()];

  // Create an array with the current hour, minute and second
  var time = [now.getHours(), now.getMinutes(), now.getSeconds()];

  // Determine AM or PM suffix based on the hour
  var suffix = (time[0] < 12) ? "AM" : "PM";

  // Convert hour from military time
  time[0] = (time[0] < 12) ? time[0] : time[0] - 12;

  // If hour is 0, set it to 12
  time[0] = time[0] || 12;

  // If seconds and minutes are less than 10, add a zero
  for (var i = 1; i < 3; i++) {
    if (time[i] < 10) {
      time[i] = "0" + time[i];
    }
  } // Return the formatted string
  return date.join("/") + " " + time.join(":") + " " + suffix;
}


$("#client-list-ul li").each(function(i) {
    $(this).delay(400 * i).fadeIn(800);
});