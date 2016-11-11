$( document ).ready(function() {

  $('.inputUserValidation').on('focusout', function(e) {
    var $save = $(this);
    var obj = {
      name: $(this).attr('name'),
      value: $(this).val()
    };
    switch(obj.name) {
      case "username":
        var error = checkUsername(obj.value);
        $save.popover({
            content: "",
            placement: "bottom",
            title: "",
            html: false
        });
        $save.popover('dispose');

        if( error.length ) {
          var content = "";
          $.each(error, function(key, val) {
            content += val + '<br>';
          });
          $save.popover({
            content: content,
            placement: "bottom",
            title: "Error",
            html: true
          }).popover('show');
        }
        return;
      case "email":
        var error = checkEmail(obj.value);
        $save.popover({
            content: "",
            placement: "bottom",
            title: "",
            html: false
        });
        $save.popover('dispose');
        if( error.length ) {
          var content = "";
          $.each(error, function(key, val) {
            content += val + '<br>';
          });
          $save.popover({
            content: content,
            placement: "bottom",
            title: "Error",
            html: true
          }).popover('show');
        }
        return;
      case "birthday":
        var error = checkDate(obj.value);
        $save.popover({
            content: "",
            placement: "bottom",
            title: "",
            html: false
        });
        $save.popover('dispose');
        if( error.length ) {
          var content = "";
          $.each(error, function(key, val) {
            content += val + '<br>';
          });
          $save.popover({
            content: content,
            placement: "bottom",
            title: "Error",
            html: true
          }).popover('show');
        }
        return;
      case "gender":
        var gender = parseInt(obj.value);
        if( gender !== 0 && gender !== 1 ) {
          $save.popover({
            content: "",
            placement: "bottom",
            title: "",
            html: false
          });
          $save.popover('dispose');
          if( error.length ) {
            var content = "";
            content += "Bad Gender should be Male or Female<br>";
            $save.popover({
              content: content,
              placement: "bottom",
              title: "Error",
              html: true
            }).popover('show');
          }
        }
        return;
      case "password":
        var error = checkPassword(obj.value);
        $save.popover({
            content: "",
            placement: "bottom",
            title: "",
            html: false
        });
        $save.popover('dispose');
        var confirm = $('#inputConfirmPassword').val();
        if( confirm != '' && obj.value != confirm )
          error.push("Password does not match !");
        if( error.length ) {
          var content = "";
          $.each(error, function(key, val) {
            content += val + '<br>';
          });

          $save.popover({
            content: content,
            placement: "bottom",
            title: "Error",
            html: true
          }).popover('show');
        }
        return;
      case "confirm_password":
        $save.popover({
            content: "",
            placement: "bottom",
            title: "",
            html: false
        });
        $save.popover('dispose');
        if( obj.value != $('#inputPassword').val() )
        {
          $save.popover({
            content: "Password does not match !",
            placement: "bottom",
            title: "Error",
            html: true
          }).popover('show');
        }
        return;
      default:
          return;
    }
  });

  $('#inputSubmit').on('click', function(e) {

    var error = [];
    var $save = $(this);

    $('.inputUserValidation').each(function(k,v) {
      if( $(v).val() == "" ) {
        error.push($(v).attr('name'));
      }
    });
    $save.popover({
        content: "",
        placement: "bottom",
        title: "",
        html: false
    });
    $save.popover('dispose');
    if( error.length ) {
      var content = "";
      $.each(error, function(key, val) {
        content += val + ' is empty<br>';
      });
      $save.popover({
        content: content,
        placement: "bottom",
        title: "Error",
        html: true
      }).popover('show');
      setTimeout(function () {
        $save.popover('hide');
      }, 2500);
      return;
    }

    var dataForm = {};
    $.each($('#registerForm').serializeArray(), function(i, field) {
        dataForm[field.name] = field.value;
    });
    $.ajax({
      url: "/users/new",
      type: 'POST',
      data: dataForm,
      dataType: 'json',
      success: function(data, textStatus, jqXHR) {
        console.log( data );     
      },
      error: function(data, textStatus, jqXHR) {
        console.log(data.responseText);
      }
    });
  });

});

function checkUsername(username) {

  var illegalChars = /\W/;
  var legalChars = /([-]|[_])/g;
  var tmp = username.replace(legalChars, '');
  console.log(tmp);
  var error = [];

  if( typeof tmp == "undefined" ) {
    error.push("Incorrect Username")
    return error;
  }
  if( tmp.length < 3 )
    error.push("The Username is too short (3 chars min).");
  else if ( tmp.length > 20 )
    error.push("The Username is too long (20 chars max).");
  if ( illegalChars.test(tmp) )
    error.push("The Username can only contains '-', '_', alpha-num.");
  return error;
}
function checkDate(date) {

  var error = [];
  // take today's date and substract 18 years
  var dinosaure = moment().subtract(142, 'years').format('YYYY-MM-DD');
  var legal = moment().subtract(18, 'years').format('YYYY-MM-DD');

  if( typeof date == "undefined" ) {
    error.push("Invalide date.");
    return error;
  }
  if( moment(date, 'YYYY-MM-DD', true).isValid() === false )
    error.push("Invalide Date.");
  else if( moment(date, 'YYYY-MM-DD').isAfter(legal) )
    error.push("You must reach 18 to sign up.")
  else if( moment(dinosaure, 'YYYY-MM-DD').isAfter(moment(date, 'YYYY-MM-DD')) && !moment(date, 'YYYY-MM-DD').isAfter(legal) )
    error.push("Are you Imortal ?")
  return error;
}
function checkPassword(password) {

  var illegalChars = /\W/;
  var error = [];
  var tmp = tmp;

  if( password.length < 3 )
    error.push("The password is too short (3 chars min).");
  else if ( password.length > 20 )
    error.push("The password is too long (20 chars max).");
  if ( illegalChars.test(password) )
    error.push("The Password can only contains '-', '_', alpha-num.");
  return error;
}
function checkEmail(email) {

  var error = [];
  var regex = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

  if( email.length == 0) {
    console.log(email.length);
    error.push("Email can't be empty");
    console.log("return");
  }
  else if( !regex.test(email) )
    error.push("Bad Email");

  return error;
}
