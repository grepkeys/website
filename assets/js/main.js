window.onload = function() {
  //
  // Switch navbar
  //

  // Switch navbar to a titlebar once the title has been scrolled out of the
  // viewport

  var navbar      = document.querySelector('nav');
  var navpageinfo = document.querySelector('.navpageinfo');
  var navlinks    = document.querySelector('.navlinks');
  var topSection  = document.querySelector('.topsection');

  // The title is the first element on the page (excluding the navbar), and the
  // space above and below its container, topSection, is dynamic based on the
  // viewport's height. As we want to switch from navbar to titlebar the moment
  // the title inside topSection has been scrolled offscreen, we need to get the
  // calculated height and top margin of topSection, which we do here. As this
  // amount can change on resize, we calculate again on resize.
  //
  // As 'scrolled away' means scrolled under the navbar, we take away the height
  // of the navbar from the height of topSection to account for this.

  // Create vars here to make sure they are scoped to the rest of file.
  var topSectionStyles;
  var topSectionHeight;
  function gettopSectionHeight() {
    topSectionStyles = window.getComputedStyle(topSection);
    topSectionHeight =
      topSection.offsetHeight +
      parseFloat(topSectionStyles['marginTop']) -
      navbar.offsetHeight;
  }

  gettopSectionHeight();
  window.onresize = function() {
    gettopSectionHeight();
  }

  function switchNavbar() {
    if (window.scrollY > topSectionHeight) {
      navlinks.style.visibility = 'hidden';
      navlinks.style.opacity = 0;
      navpageinfo.style.visibility = 'visible';
      navpageinfo.style.opacity = 1;
    } else {
      navlinks.style.visibility = 'visible';
      navlinks.style.opacity = 1;
      navpageinfo.style.visibility = 'hidden';
      navpageinfo.style.opacity = 0;
    }
  }

  //
  // Auto-hide navbar
  //

  // Hide navbar on scroll down, and show again on scroll up
  var prevScrollPos = window.pageYOffset;
  var navbar = document.querySelector('nav');

  // Upon scrolling down, the amount the navbar moves up is exactly equal to its
  // height. However, this is not sufficient to completely hide it, the reason
  // being a drop shadow. To avoid entering an ad-hoc pixel value to add on to
  // the calculated height, we simply transition to no shadow when the navbar
  // hides.
  //
  // We save the shadow style set by SCSS here that so that we can restore it
  // later upon revealing the navbar.
  var origShadow = navbar.style.boxShadow;

  function showNavbar() {
    navbar.style.top = 0;
    navbar.style.boxShadow = origShadow;
  }

  function hideNavbar() {
    navbar.style.top = '-' + navbar.offsetHeight + 'px';
    navbar.style.boxShadow = 'none';
  }

  function autohideNavbar() {
    var currentScrollPos = window.pageYOffset;
    var scrollPosDiff = currentScrollPos - prevScrollPos;

    // Always show navbar in the changing zone to prevent user confusion when
    // the navbar changes to a titlebar when it's out of view
    if (currentScrollPos < 300) {
      showNavbar();
      return;
    }

    // Make the navbar hide almost instantly once scrolling down has begun, but
    // require a little speed to get the navbar back
    if (scrollPosDiff > 1) {
      hideNavbar();
    } else if (scrollPosDiff < -1) {
      showNavbar();
    }

    prevScrollPos = currentScrollPos;
  }


  window.onscroll = function() {
    switchNavbar();
    autohideNavbar();
  }
}
