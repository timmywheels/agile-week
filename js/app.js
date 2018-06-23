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
  }
  
  var faplusID = 4;
  function plusID(){
    faplusID +=1;
    return 'faplus-'+ faplusID;
  }
  
  var faminusID = 4;
  function minusID(){
    faminusID +=1;
    return 'faminus-'+ faminusID;
  }
  
  var quantity = 4;
  function totQuant(){
    quantity += 1;
    return 'quant-'+quantity;
  }
  

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
        "<label class='btn btn-secondary'>"+
        "<input type='radio' name='options' autocomplete='off'>"+
        "<i id='#"+totQuant()+"'class= 'quantity'>1</i>"+
        "</label>"+
        "<label class='btn btn-secondary'>" +
        "<input type='radio' name='options' autocomplete='off' checked>" +
        "<i class='fas fa-eye'></i>" + // Watching Button
        "</label>" +
        "<label class='btn btn-secondary active'>" +
        "<input type='radio' name='options' autocomplete='off'>" +
        "<i id='#"+plusID()+"' class='fas fa-plus'></i>" + // Purchased Button
        "</label>" +
        "<label class='btn btn-secondary'>" +
        "<input type='radio' name='options' autocomplete='off'>" +
        "<i id='#"+minusID()+"'class='fas fa-minus'></i>" + // Sold Button
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
        "<div><i class='fas fa-chart-line'></i>"+''+"<li class='stockTot'>"+" $"+parseFloat(stock.price).toFixed(2)  +"</li></div>"+
        "<div><span class='timeStamp'><p>Created: " + timeStamp() + "</p></span><span class='delete'> X </span></div>" +
        "</ul>" +
        "</div>" +
        "</li>";

      $(list).append(li); // Append the li to client-list
      editClientInfo(); // Call editClientInfo to create the editable fields for each new li

      request.result = ''; // Reset request.result
      
      const yes = document.querySelector('#client-list-ul');
      //var qa = document.querySelector("#client-list-ul").lastElementChild.lastElementChild.previousElementSibling.previousElementSibling.firstElementChild.firstElementChild.nextSibling
      var qa = document.getElementById("#quant-"+(quantity));
      var addID= document.querySelector("#client-list-ul").lastElementChild.lastElementChild.previousElementSibling.previousElementSibling.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.getAttribute('id')
      console.log(addID);
      console.log(typeof qa);
      console.log(qa);



yes.addEventListener('click', function(e){
  //e.preventDefault();
  var where = e.target.parentElement.parentElement.previousElementSibling.getAttribute('data-target');
  console.log(where);
  console.log(clientId);
  if(where === "#client-"+clientId){
  if(e.target.getAttribute('id') === "#faplus-"+(faplusID)){
    var change = parseInt(qa.textContent);
    if(qa.getAttribute('id') === "#quant-"+(quantity) ){
      console.log(qa.textContent);
      console.log(typeof change);
      console.log(change);
      var add = change + 1;
      console.log(add);
      var quotes = ""+add+"";
      console.log(quotes);
      qa.textContent = add ;
      
      
      var stockTot = document.querySelector("#client-"+clientId+" "+"ul .stockTot");
      console.log(stockTot.textContent);
      console.log(typeof stockTot.textContent);
      var commas = stockTot.textContent.replace(",","");
      var dollas = commas.replace("$","");
      var period = dollas.replace(".","");
      console.log(period);
      var stockPrix = parseInt(period);
      console.log(stockPrix);
      
      if(add <= 2){
      var times = stockPrix + (stockPrix);
      console.log(times);
      var addQuotes = ""+times+"";
      console.log(addQuotes);
      var final = "$"+addQuotes.slice(0,-2)+"."+addQuotes.slice(-2,addQuotes.length);
      console.log(final);
      stockTot.textContent = final;
      }
      else {
      times = (stockPrix) + (stockPrix/(add-1));
      console.log(times);
      addQuotes = ""+times+"";
      console.log(addQuotes);
      final = "$"+addQuotes.slice(0,-2)+"."+addQuotes.slice(-2,addQuotes.length);
      console.log(final);
      stockTot.textContent = final;
      }
    }
      }
      
     if(e.target.getAttribute('id') === "#faminus-"+(faminusID)){
      var change = parseInt(qa.textContent);
       if(change > 1){
      console.log('yes');
      var subtract = change - 1;
      var quotes = ""+ subtract +"";
      qa.textContent = subtract;
      
      
      var stockTot2 = document.querySelector("#client-"+clientId+" "+"ul .stockTot");
      console.log(stockTot2.textContent);
      //console.log(typeof stockTot.textContent);
      var commas2 = stockTot2.textContent.replace(",","");
      var dollas2 = commas2.replace("$","");
      var period2 = dollas2.replace(".","");
      console.log(period2);
      var stockPrix2 = parseInt(period2);
      console.log(stockPrix2);
      console.log(subtract);
      //console.log(typeof stockPrix);
      if(subtract === 1){
      var deduct = stockPrix2 / 2;
      console.log(deduct);
      var addQuotes2 = ""+deduct+"";
      var final2 = "$"+addQuotes2.slice(0,-2)+"."+addQuotes2.slice(-2,addQuotes2.length);
      console.log(final2);
      stockTot2.textContent = final2;
      }
      else{
      var takeAway = stockPrix2 - (stockPrix2/(subtract+1));
      console.log(takeAway);
      var addQuotes3 = ""+takeAway+"";
      var final3 = "$"+addQuotes3.slice(0,-2)+"."+addQuotes3.slice(-2,addQuotes3.length);
      console.log(final3);
      stockTot2.textContent = final3;
      }
      }
       }  
  }
     
});
    }
    

  });




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





