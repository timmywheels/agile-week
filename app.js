document.addEventListener('DOMContentLoaded', function() {

  const list = document.querySelector('#client-list ul');

  //delete clients
  list.addEventListener('click', function(e) {
    if (e.target.className == 'delete') {
      if (confirm('Are you sure you want to delete this client?')) {
        const li = e.target.parentElement;
        list.removeChild(li);
      };

    }
    else {
      return false;
    }
  });

  //add client-list
  const addForm = document.forms['add-client'];

  addForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const nameValue = addForm.querySelector('#addClientName').value;
    const tickerValue = addForm.querySelector('#addClientTicker').value;

    //create elements
    var li = "<li>" +
      						"<div class='stock'>"+tickerValue.toUpperCase()+"</div>" +
      						"<span class='name'>"+nameValue+"</span>" +
      
      						"<i class='seeMore fa fa-chevron-left'></i>" +
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
						  "</li>";
						  
				$(list).append(li);
				
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
    
    
    


  });

  // //hide clients
  // const hideclients = document.querySelector('#hide');
  // hideclients.addEventListener('change', function(e) {
  //   if (hideclients.checked) {
  //     list.style.display = 'none';
  //   }
  //   else {
  //     list.style.display = 'initial';
  //   }
  // });

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

  //tabbed content
  const tabs = document.querySelector('.tabs');
  const panels = document.querySelectorAll('.panel');

  tabs.addEventListener('click', function(e) {
    if (e.target.tagName == 'LI') {
      const targetPanel = document.querySelector(e.target.dataset.target);
      Array.from(panels).forEach(function(panel) {
        if (panel == targetPanel) {
          panel.classList.add('active');
        }
        else {
          panel.classList.remove('active');
        }
      });

    }
  });
});


/* global $*/

// $().button('toggle');


// JQUERY CODE SNIPPER TO
// EXPAND LI'S ON HOVER

$(document).ready(function() {

  $('#client-list').click(function(e) {
    var seeMoreArr = $('.seeMore');
    var liArr = document.querySelectorAll('li');

    if (e.target.classList.contains('seeMore')) {
      console.log('si')
      e.target.parentElement.animate({
        height: '250' //adds 250px
      }, 'auto'); //sets animation speed to slow

    }
    //   else {

    //     function(){
    //       $('li').animate({
    //         height: '-=250px' //substracts 250px
    //       }, 'slow');
    //     };
    //   };
    // }

  });

});
// );
