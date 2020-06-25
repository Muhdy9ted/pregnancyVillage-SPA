
  alert("testing");
//   debugger;
  window.onscroll = function() {myFunction()}
  let nav = document.getElementById("nav");
  let backgroundChange = nav.offsetTop;

  function myFunction() {
    if (window.pageYOffset > backgroundChange) {
        nav.classList.add("bgChange");
    } else {
        nav.classList.remove("bgChange");
    }
  } 