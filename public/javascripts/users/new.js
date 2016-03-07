$( document ).ready(function() {

  $('#inputUsername').on('focusout', function(e) {
    var $save = $(this);
    console.log($(this).attr("name"));
    var obj = {
      name: $(this).attr('name'),
      value: $(this).val()
    };
    console.log( obj );
    $.ajax({
      url: "/validate/user/new",
      type: 'GET',
      data: {
        obj: obj        
      },
      dataType: 'json',
      success: function(data, textStatus, jqXHR) {
        console.log( data );
        if( data.error.length ) {
          $save.popover({
            content: data.error,
            placement: "bottom",
            title: "Error"
          }).popover('show');
        }
        else {
          $save.popover('destroy');
        }
      },
      error: function(data, textStatus, jqXHR) {
        console.log(data.responseText);
      }
    });
  });
});