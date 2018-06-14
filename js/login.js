 /*global location $*/

 var loginBtn = document.getElementById("loginBtn");
 var usernameInput = document.getElementById('usernameInput');
 var passwordInput = document.getElementById('passwordInput');

 loginBtn.addEventListener('click', function(e) {
     e.preventDefault();

     console.log(usernameInput.value);
     console.log(passwordInput.value);

     if (usernameInput.value === 'admin' && passwordInput.value === 'careerdevs') { // Validate username and password combos
         location.href = "index.html";
     }

     else if (usernameInput.value === 'arnell' && passwordInput.value === 'milhouse') {
         location.href = "index.html";
     }

     else if (usernameInput.value === 'reece' && passwordInput.value === 'franklin') {
         location.href = "index.html";
     }

     else if (usernameInput.value === 'tim' && passwordInput.value === 'wheeler') {
         location.href = "index.html";
     }

     else if (usernameInput.value === 'funmi' && passwordInput.value === 'olowookere') {
         location.href = "index.html";
     }

     else if (usernameInput.value === 'andres' && passwordInput.value === 'flores') {
         location.href = "index.html";
     }

     else if (usernameInput.value === 'urbenson' && passwordInput.value === 'laurent') {
         location.href = "index.html";
     }

     else if (usernameInput.value === 'charlotte' && passwordInput.value === 'powning') {
         location.href = "index.html";
     }

     else {
         $("#errorMsg").fadeIn().delay(2000).fadeOut(); // Otherwise display error
     }

 });
 