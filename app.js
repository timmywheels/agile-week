document.addEventListener('DOMContentLoaded', function() {

  const list = document.querySelector('#book-list ul');

  //delete books
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

  //add book-list
  const addForm = document.forms['add-book'];

  addForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const value = addForm.querySelector('input[type="text"]').value;

    //create elements
    const li = document.createElement('li');
    const bookName = document.createElement('span');
    const deleteBtn = document.createElement('span');

    //add content
    bookName.textContent = value;
    deleteBtn.textContent = ' X ';

    //add classes
    bookName.classList.add('name');
    deleteBtn.classList.add('delete');

    //append to DOM

    //append bookname to li
    li.appendChild(bookName);
    //append delete button to li
    li.appendChild(deleteBtn);

    //append completed li to list
    list.appendChild(li);


  });

  //hide books
  const hideBooks = document.querySelector('#hide');
  hideBooks.addEventListener('change', function(e) {
    if (hideBooks.checked) {
      list.style.display = 'none';
    }
    else {
      list.style.display = 'initial';
    }
  });

  //filter books
  const searchBar = document.forms['search-books'].querySelector('input');
  searchBar.addEventListener('keyup', function(e) {
    const term = e.target.value.toLowerCase();
    const books = list.getElementsByTagName('li');

    Array.from(books).forEach(function(book) {
      const title = book.firstElementChild.textContent;
      if (title.toLowerCase().indexOf(term) != -1) {
        book.style.display = 'block';
      }
      else {
        book.style.display = 'none';
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
