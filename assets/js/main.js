// Only load JavaScript once the rest of the page has loaded
window.onload = function() {
  // Hide navbar until the user scrolls up
  var prevScrollPos = window.pageYOffset;
  var navbar = document.getElementById("nav");

  // Upon scrolling down, the amount the navbar moves up is exactly equal to its
  // height. However, this is not sufficient to completely hide it, the reason
  // being a drop shadow. To avoid entering an ad-hoc pixel value to add on to
  // the calculated height, we simply transition to no shadow when the nav bar
  // hides.
  //
  // We save the shadow style set by SCSS here that so that we can restore it
  // later upon revealing the nav bar.
  var origShadow = navbar.style.boxShadow;

  window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollPos > currentScrollPos) {
      navbar.style.top = "0";
      navbar.style.boxShadow = origShadow;
    } else {
      navbar.style.top = "-" + navbar.offsetHeight + "px";
      navbar.style.boxShadow = "none";
    }
    prevScrollPos = currentScrollPos;
  }
}
