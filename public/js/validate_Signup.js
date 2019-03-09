
function checkUsername(users) 
    {
        var name= SignUpForm.username.value;
        var check=true;
        
        if(name.length==0)
        {
            check=false;
          document.getElementById('username_error').innerHTML="this is invalid name";
          document.getElementById('username_error').style.color='red';
        // document.getElementById('username').setCustomValidity("This is invalid name");
        console.log("Invalid username");
        }
        else{
        users.forEach(function(user){
            if(String(user.username)==String(name)){
                document.getElementById('username_error').innerHTML="Username already exists";
                document.getElementById('username_error').style.color='red';
                check=false;
            }
        });
        }
        if(check){
            document.getElementById('username_error').innerHTML="Valid";
            document.getElementById('username_error').style.color='green';
        }
    }
    

  $(document).ready(function() {
    $('#SignUpForm').bootstrapValidator({
        framework: 'bootstrap',
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            FirstName: {
                validators: {
                        stringLength: {
                        min: 2,
                    },
                        notEmpty: {
                        message: 'Please enter your first name'
                    }
                }
            },
             LastName: {
                validators: {
                     stringLength: {
                        min: 2,
                    },
                    notEmpty: {
                        message: 'Please enter your last name'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'Please enter your email address'
                    },
                    emailAddress: {
                        message: 'Please enter a valid email address'
                    }
                }
            },
            phone: {
                validators: {
                    notEmpty: {
                        message: 'Please enter your phone number'
                    },
                    phone: {
                        country: 'US',
                        message: 'Please enter a valid phone number with area code'
                    }
                }
            },
            address: {
                validators: {
                     stringLength: {
                        min: 8,
                    },
                    notEmpty: {
                        message: 'Please enter your street address'
                    }
                }
            },
            city: {
                validators: {
                     stringLength: {
                        min: 4,
                    },
                    notEmpty: {
                        message: 'Please enter your city'
                    }
                }
            },
            state: {
                validators: {
                    notEmpty: {
                        message: 'Please select your state'
                    }
                }
            },
            pin: {
                validators: {
                    notEmpty: {
                        message: 'Please enter your pin code'
                    },
                    regexp: {
                        regexp: /^\d{6}$/,
                        message: 'Indian pincode must contain 6 digits'
                    }
                }
            },
            }
        })
        // .on('success.form.bv', function(e) {
        //     $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
        //         $('#SignUpForm').data('bootstrapValidator').resetForm();

        //     // Prevent form submission
        //     e.preventDefault();

        //     // Get the form instance
        //     var $form = $(e.target);

        //     // Get the BootstrapValidator instance
        //     var bv = $form.data('bootstrapValidator');

        //     // Use Ajax to submit form data
        //     $.post($form.attr('action'), $form.serialize(), function(result) {
        //         console.log(result);
        //     }, 'json');
        // });
});

