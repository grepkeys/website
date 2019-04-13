/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
 *
 * @returns {String}
 */
function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}


// Remove custom link formatting on Android because it breaks (i.e. the
// underlines just do not appear) on Chrome for Android
if (getMobileOperatingSystem() == 'Android') {
  var style = document.createElement('style');
  style.innerHTML =
    'main a:any-link {' +
      'background-image: none;' +
      'text-decoration: underline;' +
    '}';

  // Insert new styles before first script tag
  var ref = document.querySelector('script');
  ref.parentNode.insertBefore(style, ref);
}
