import classie from 'classie';
module.exports = viewpanelScroll;

function viewpanelScroll(window, add) {

  // detect if IE : from http://stackoverflow.com/a/16657946
  var ie = (function() {
    console.log("%c IE INVOKED", "background: #1c1c1c; color: limegreen", '');
    var undef, rv = -1; // Return value assumes failure.
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    var trident = ua.indexOf('Trident/');

    if (msie > 0) {
      // IE 10 or older => return version number
      rv = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    } else if (trident > 0) {
      // IE 11 (or newer) => return version number
      var rvNum = ua.indexOf('rv:');
      rv = parseInt(ua.substring(rvNum + 3, ua.indexOf('.', rvNum)), 10);
    }

    return ((rv > -1) ? rv : undef);
  }());


  // disable/enable scroll (mousewheel and keys) from http://stackoverflow.com/a/4770179
  // left: 37, up: 38, right: 39, down: 40,
  // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
  var keys = [32, 37, 38, 39, 40],
    wheelIter = 0;

  function preventDefault(e) {

    console.log("%c preventDefault invoked", "background: #1c1c1c; color: deeppink", '');
    e = e || window.event;
    if (e.preventDefault)
      e.preventDefault();
    e.returnValue = false;
  }

  function keydown(e) {
    console.log("%c keydown invoked", "background: #1c1c1c; color: deeppink", '');
    for (var i = keys.length; i--;) {
      if (e.keyCode === keys[i]) {
        preventDefault(e);
        return;
      }
    }
  }

  function touchmove(e) {
    console.log("%c touchmove invoked", "background: #1c1c1c; color: deeppink", '');
    preventDefault(e);
  }

  function wheel(e) {
    // for IE
    //if( ie ) {
    //preventDefault(e);
    //}
  }

  function disable_scroll() {
    window.onmousewheel = document.onmousewheel = wheel;
    document.onkeydown = keydown;
    document.body.ontouchmove = touchmove;
  }

  function enable_scroll() {
    window.onmousewheel = document.onmousewheel = document.onkeydown = document.body.ontouchmove = null;
  }

  var docElem = window.document.documentElement,
    scrollVal,
    isRevealed,
    noscroll,
    isAnimating,
    container = document.getElementById('syx-viewpanel'),
    trigger = container.querySelector('button.trigger');

  function scrollY() {
    console.log("%c scrollY invoked", "background: #1c1c1c; color: deepskyblue", window.pageYOffset, docElem.scrollTop);
    return window.pageYOffset || docElem.scrollTop;
  }

  function scrollPage() {
    console.log("%c scrollPage invoked", "background: #1c1c1c; color: limegreen", noscroll);
    scrollVal = scrollY();

    if (noscroll && !ie) {
      if (scrollVal < 0) return false;
      // keep it that way
      window.scrollTo(0, 0);
    }

    if (classie.has(container, 'notrans')) {
      classie.remove(container, 'notrans');
      return false;
    }

    if (isAnimating) {
      return false;
    }

    if (scrollVal <= 0 && isRevealed) {
      toggle(0);
    } else if (scrollVal > 0 && !isRevealed) {
      toggle(1);
    }
  }

  function toggle(reveal) {
    console.log("%c toggle invoked", "background: #1c1c1c; color: limegreen", '');
    isAnimating = true;

    if (reveal) {
      classie.add(container, 'modify');
    } else {
      noscroll = true;
      disable_scroll();
      classie.remove(container, 'modify');
    }

    // simulating the end of the transition:
    setTimeout(function() {
      isRevealed = !isRevealed;
      isAnimating = false;
      if (reveal) {
        noscroll = false;
        enable_scroll();
      }
    }, 600);
  }

  // refreshing the page...
  var pageScroll = scrollY();
  noscroll = pageScroll === 0;

  disable_scroll();

  if (pageScroll) {
    isRevealed = true;
    classie.add(container, 'notrans');
    classie.add(container, 'modify');
  }

  if (add === 'add') {
    window.addEventListener('scroll', scrollPage);
    // trigger.addEventListener('click', function() {
    //   toggle('reveal');
    // });
  } else {
    console.log("removed listener");
    window.removeEventListener('scroll', scrollPage);
  }


};
