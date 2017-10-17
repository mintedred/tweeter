$(document).ready(function() {
  $(".new-tweet textarea").keyup(function() {
    let charsLeft = 140 - $(this).val().length;
    let $counter = $(this).siblings(".counter")
    $counter.text(charsLeft);
    if (charsLeft < 0) {
      $counter.addClass('negative');
    } else {
      $counter.removeClass('negative');
    }
  });
});