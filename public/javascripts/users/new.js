$( document ).ready(function() {

  $('.inputUserValidation').on('focusout', function(e) {
    var $save = $(this);
    var obj = {
      name: $(this).attr('name'),
      value: $(this).val()
    };
    $.ajax({
      url: "/validate/user/new",
      type: 'GET',
      data: {
        obj: obj        
      },
      dataType: 'json',
      success: function(data, textStatus, jqXHR) {
        console.log( data );
        $save.popover({
            content: "",
            placement: "bottom",
            title: "",
            html: false
        });
        $save.popover('dispose');
        if( data.error.length ) {
          var content = "";
          $.each(data.error, function(key, val) {
            content += val + '<br>';
          });
          $save.popover({
            content: content,
            placement: "bottom",
            title: "Error",
            html: true
          }).popover('show');
        }
      },
      error: function(data, textStatus, jqXHR) {
        console.log(data.responseText);
      }
    });
  });
});