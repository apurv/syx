import classie from 'classie';
module.exports = viewpanelScroll;

function viewpanelScroll(add) {

  var docElem = window.document.documentElement,
      scrollVal,
      isRevealed,
      noscroll,
      isAnimating,
      container = document.getElementById('syx-viewpanel');

  console.log("container", container);

  if (container && add) {
    console.log("%c ADDED LISTENER", "background: #1c1c1c; color: deeppink");
    window.scrollTo(0, 0);
    document.onscroll = scrollPage;
  } else {
    console.log("%c REMOVED LISTENER", "background: #1c1c1c; color: deeppink");
    document.onscroll = null;
  }



  function disable_scroll() {
    console.log("%c disable_scroll invoked", "background: #1c1c1c; color: deepskyblue");
    window.onmousewheel = document.onmousewheel = null;
  }

  function enable_scroll() {
    console.log("%c enable_scroll invoked", "background: #1c1c1c; color: deeppink");
    window.onmousewheel = document.onmousewheel = document.onkeydown = document.body.ontouchmove = null;
  }

  function scrollY() {
    console.log("%c scrollY invoked", "background: #1c1c1c; color: deepskyblue", window.pageYOffset, docElem.scrollTop);
    return window.pageYOffset || docElem.scrollTop;
  }

  function scrollPage() {
    console.log("%c scrollPage invoked", "background: #1c1c1c; color: white");
    scrollVal = scrollY();

    if (noscroll) {
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
    console.log("%c toggle invoked", "background: #1c1c1c; color: yellow", '');
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
    console.log("%c pageScroll IF CONDITION invoked", "background: #1c1c1c; color: yellow");
    isRevealed = true;
    classie.add(container, 'notrans');
    classie.add(container, 'modify');
  }
};
