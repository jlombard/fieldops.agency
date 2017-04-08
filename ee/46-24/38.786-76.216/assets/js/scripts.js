(function ($, window, document, undefined) {

  'use strict';

  $(function () {
    // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
    if (!String.prototype.trim) {
      (function() {
        // Make sure we trim BOM and NBSP
        var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        String.prototype.trim = function() {
          return this.replace(rtrim, '');
        };
      })();
    }

    [].slice.call( document.querySelectorAll( 'input.input__field' ) ).forEach( function( inputEl ) {
      // in case the input is already filled..
      if( inputEl.value.trim() !== '' ) {
        classie.add( inputEl.parentNode, 'input--filled' );
      }

      // events:
      inputEl.addEventListener( 'focus', onInputFocus );
      inputEl.addEventListener( 'blur', onInputBlur );
    } );

    function onInputFocus( ev ) {
      classie.add( ev.target.parentNode, 'input--filled' );
    }

    function onInputBlur( ev ) {
      if( ev.target.value.trim() === '' ) {
        classie.remove( ev.target.parentNode, 'input--filled' );
      }
    }
  });

  var encryptionCharacters = ["░", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "_", "+", "-", ".", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")"];

  var encryptedMessageFirst = baffle('.encrypted-message--first', {
    characters: encryptionCharacters
  });

  var encryptedMessageSecond = baffle('.encrypted-message--second', {
    characters: encryptionCharacters
  });

  var encryptedKey = 'everything you want is on the other side of fear';

  $('input').on('keyup', function(event) {
    if((event.keyCode >= 48 && event.keyCode <= 90) || event.keyCode === 8) {
      if(this.value.toLowerCase() === encryptedKey.toLowerCase()) {
        encryptedMessageFirst.text(function() {
          return 'The next 4 events have been chosen.  Time and location details will be left at 38.990100, -77.097209';
        }).reveal(4000);
        encryptedMessageSecond.text(function() {
          return 'Our mark ">>" will be nearby.';
        }).reveal(4000);
      } else {
        encryptedMessageFirst.once('encryptionCharacters');
        encryptedMessageSecond.once('encryptionCharacters');
      }
    }
  });

})(jQuery, window, document);
