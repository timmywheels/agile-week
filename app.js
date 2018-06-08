/*global $*/

document.addEventListener('DOMContentLoaded', function() {

  const list = document.querySelector('#client-list ul');

  //delete clients
  list.addEventListener('click', function(e) {
    if (e.target.className == 'delete') {
      if (confirm('Are you sure you want to delete this client?')) {

        const li = e.target.parentElement.parentElement.parentElement.parentElement;
        // Might not be the best solution, but works

        list.removeChild(li);
      };

    }
    else {
      return false;
    }

  });

  // Toggle Client Info
  // list.addEventListener('click', function(e) {
  //   if (e.target.className == 'seeMore') {
  //     e.target.parentElement.classList.remove('collapsed');
  //   }
  // })



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
      "<div class='consultant'><p>" + consultantInitials + "</p></div>" +
      "<div class='stock'>" + tickerValue.toUpperCase() + "</div>" +
      "<span class='firstName'>" + firstNameValue + "</span>" + ' ' +
      "<span class='lastName'>" + lastNameValue + "</span>" +

      "<a href='#clientInfo' data-toggle='collapse'><i class='seeMore fa fa-chevron-left'></i></a>" +
      "<!--<span class='delete'> X </span>-->" +

      "<div class='btn-group btn-group-toggle' data-toggle='buttons'>" +
      "<label class='btn btn-secondary'>" +
      "<input type='radio' name='options' id='option1' autocomplete='off' checked>" +
      "<i class='fas fa-eye'></i>" +
      "</label>" +
      "<label class='btn btn-secondary active'>" +
      "<input type='radio' name='options' id='option2' autocomplete='off'>" +
      "<i class='fas fa-check'></i>" +
      "</label>" +
      "<label class='btn btn-secondary'>" +
      "<input type='radio' name='options' id='option3' autocomplete='off'>" +
      "<i class='fas fa-times'></i>" +
      "</label>" +
      "</div>" +
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
  }

  // Return the formatted string
  return date.join("/") + " " + time.join(":") + " " + suffix;
}





// const clientName = document.createElement('span');
// const clientTicker = document.createElement('div');
// // const deleteBtn = document.createElement('span');
// const chevron = document.createElement('i');
// const buttons = document.createElement('div');
// const secondaryButton = document.createElement('label');
// const buttonRadio = document.createElement('input');
// const buttonIcon = document.createElement('i');


// //add content
// clientName.textContent = nameValue;
// clientTicker.textContent = tickerValue.toUpperCase();
// // deleteBtn.textContent = ' X ';

// //add classes
// clientName.classList.add('name');
// clientTicker.classList.add('stock');
// chevron.classList.add('seeMore', 'fa', 'fa-chevron-left');
// buttons.classList.add('btn-group', 'btn-group-toggle')
// buttons.attributes.d
// secondaryButton.classList.add('btn-group', 'btn-secondary');
// buttonRadio.typeof.add('radio');
// buttonRadio.attributes.setNamedItem('options');
// // deleteBtn.classList.add('delete');

// //append to DOM

// //append clientname to li
// li.appendChild(clientTicker);
// li.appendChild(clientName);
//append delete button to li
// li.appendChild(deleteBtn);

//append completed li to list
