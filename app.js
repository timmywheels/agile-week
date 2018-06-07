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
    const li = document.createElement('li');
    const clientName = document.createElement('span');
    const clientTicker = document.createElement('div');
    const deleteBtn = document.createElement('span');

    //add content
    clientName.textContent = nameValue;
    clientTicker.textContent = tickerValue.toUpperCase();
    deleteBtn.textContent = ' X ';

    //add classes
    clientName.classList.add('name');
    clientTicker.classList.add('stock');
    deleteBtn.classList.add('delete');

    //append to DOM

    //append clientname to li
    li.appendChild(clientTicker);
    li.appendChild(clientName);
    //append delete button to li
    li.appendChild(deleteBtn);

    //append completed li to list
    list.appendChild(li);


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

  //filter clients
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

// $(document).ready(function() {

//   $("li").hover(
//     //on mouseover
//     function() {
//       $(this).animate({
//         height: '+=250' //adds 250px
//         }, 'slow' //sets animation speed to slow
//       );
//     },
//     //on mouseout
//     function() {
//       $(this).animate({
//         height: '-=250px' //substracts 250px
//         }, 'slow'
//       );
//     }
//   );

// });
