/*global $ config*/

var stock = {
  price: 0
};

var request = {
  result: '',
};

function tickerApi() {

  // Set the API key
  var apiKey = config.API;

  // Get the ticker symbol from the user
  var tickerSymbol = document.getElementById('addClientTicker').value;

  var url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + tickerSymbol + "&interval=1min&fastperiod=10&apikey=" + apiKey;

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

    // Set request.result to error if stock ticker is invalid
    if (data['Error Message'] === "Invalid API call. Please retry or visit the documentation (https://www.alphavantage.co/documentation/) for TIME_SERIES_INTRADAY.") {
      request.result = 'Error';
    }

    // Otherwise run the code
    else {

      // Get the most recent stock update
      var lastRefreshed = data['Meta Data']['3. Last Refreshed'];

      // Set stock.price to the latest ticker price that was reported
      stock.price = data['Time Series (1min)'][lastRefreshed]['4. close']

      // console.log('stock.price', stock.price);
    }

  };
  // Send request to the server asynchronously
  xhr.send();
}

document.addEventListener('DOMContentLoaded', function() {

  const list = document.querySelector('#client-list ul');


  //delete clients
  list.addEventListener('click', function(e) { // Alert user before deleting client
    if (e.target.className == 'delete') {
      if (confirm('Are you sure you want to delete this client?')) {

        const li = e.target.parentElement.parentElement.parentElement.parentElement;
        // Might not be the best solution, but it works
        list.removeChild(li);

      }
    }
    else {
      return false;
    }

  });

  // Add unique ID to each LI
  // Starts at 4 because of the 4 initial clients that are populated
  var clientId = 4;

  function uniqueClientId() {
    // Increment clientId everytime an LI is added to the list
    clientId += 1;
    return 'client-' + clientId;
  };

  var addClientBtn = document.getElementById('addClientBtn');

  var consultantInitials = ''; // Initialize consultant initials variable
  var consultantFullName = ''; // Initialize consultant full name variable

  // Set consultant value from toggle in add client section
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

    tickerApi(); // Run API call

  });

  // Add client-list
  const addForm = document.forms['add-client'];

  addForm.addEventListener('submit', function(e) {

    e.preventDefault();

    // Check if the stock ticker is valid
    if (request.result === 'Error') {
      $("#errorMsg").fadeIn().delay(2000).fadeOut(); // Otherwise display error
      console.log('There was an error.')
      request.result = ''; // Reset request.result
    }

    // Otherwise proceed with creating the LI
    else {

      const tickerValue = addForm.querySelector('#addClientTicker').value; // Add stock ticker
      const firstNameValue = addForm.querySelector('#addClientFirstName').value; // Add client first name
      const lastNameValue = addForm.querySelector('#addClientLastName').value; // Add client last name

      var UniqueID = consultantInitials + tickerValue + firstNameValue + lastNameValue;

      //create li elements
      var li = "<li id='" + UniqueID + "'>" +
        "<div class='consultant'><p>" + consultantInitials + "</p></div>" + // Consultant
        "<div class='stock'>" + tickerValue.toUpperCase() + "</div>" + // Stock Ticker
        "<span class='firstName'>" + firstNameValue + "</span>" + ' ' + // First Name
        "<span class='lastName'>" + lastNameValue + "</span>" + // Last Name
        "<a href='#' data-target='#" + uniqueClientId() + "' data-toggle='collapse' aria-controls='client-" + clientId + "'><i class='seeMore fa fa-chevron-left'></i></a>" + // Client info toggle
        "<div class='btn-group btn-group-toggle' data-toggle='buttons'>" +
        "<label class='btn btn-secondary'>" +
        "<input type='radio' name='options' autocomplete='off' checked>" +
        "<i class='fas fa-eye'></i>" + // Watching Button
        "</label>" +
        "<label class='btn btn-secondary active'>" +
        "<input type='radio' name='options' autocomplete='off'>" +
        "<i class='fas fa-plus'></i>" + // Purchased Button
        "</label>" +
        "<label class='btn btn-secondary'>" +
        "<input type='radio' name='options' autocomplete='off'>" +
        "<i class='fas fa-minus'></i>" + // Sold Button
        "</label>" +
        "</div>" +
        "<span class='stockPrice'>$" + parseFloat(stock.price).toFixed(2) + "</span>" + // Display stock with only 2 decimal points
        "<div class='collapse multi-collapse' id='client-" + clientId + "'>" +
        "<ul class='client-info-ul card card-body'>" +
        "<div><i class='fas fa-user-tie'></i>" + ' ' +
        "<p id='consultant'>" + consultantFullName + "</p>" + "</div>" +
        "<div><i class='fas fa-phone'></i>" + ' ' + "<li><em style='color:#ddd;'>Enter Phone</em></li></div>" +
        "<div><i class='fas fa-envelope'></i>" + ' ' + "<li><em style='color:#ddd;'>Enter Email</em></li></div>" +
        "<div><i class='fas fa-location-arrow'></i>" + ' ' + "<li><em style='color:#ddd;'>Enter Address</em></li></div>" +
        "<div><span class='timeStamp'><p>Created: " + timeStamp() + "</p></span><span class='delete'> X </span></div>" +
        "</ul>" +
        "</div>" +
        "</li>";

      $(list).append(li); // Append the li to client-list
      editClientInfo(); // Call editClientInfo to create the editable fields for each new li

      request.result = ''; // Reset request.result
      $("#addClientTicker, #addClientFirstName, #addClientLastName").val("");
    }

  });

  // /<.*?>$/gm


  // Filter clients and tickers in search bar
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



// Animate the LIs
$("#client-list-ul > li").each(function(i) {
  $(this).delay(400 * i).fadeIn(800);
});

// Create timestamp for Client Info section
function timeStamp() {
  var now = new Date();

  var date = [now.getMonth() + 1, now.getDate(), now.getFullYear()];

  var time = [now.getHours(), now.getMinutes(), now.getSeconds()];

  var suffix = (time[0] < 12) ? "AM" : "PM";

  time[0] = (time[0] < 12) ? time[0] : time[0] - 12;

  time[0] = time[0] || 12;

  for (var i = 1; i < 3; i++) {
    if (time[i] < 10) {
      time[i] = "0" + time[i];
    }
  }
  return date.join("/") + " " + time.join(":") + " " + suffix;
}



// Editable Client Info Fields

function editClientInfo() {
  var originalVal;
  $(".client-info-ul").on('dblclick', 'li', function() {
    originalVal = $(this).text();
    $(this).text("");
    $("<input type='text'>").appendTo(this).focus();
  });
  $(".client-info-ul").on('focusout', 'li > input', function() {
    var $this = $(this);
    $this.parent().text($this.val() || originalVal);
    $this.remove(); // Don't just hide, remove the element.
  });
}

editClientInfo();
