$(document).ready(function() {
  $(".new-tweet textarea").keyup(function() {
    let charsLeft = 140 - ($(this).val().length);
    let counter = $(this).siblings(".counter")
    counter.html(charsLeft);
    if (charsLeft < 0) {
      counter.css('color', '#ff0000');
    }
  });
});