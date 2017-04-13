var stForm = (function (glo, doc, undef) {
    function warn(msg) {
        $('.alert').hide();
        $('.alert-danger > strong').html(msg);
        $('.alert-danger').show();
    }

    function info(msg) {
        $('.alert').hide();
        $('.alert-success > strong').html(msg);
        $('.alert-success').show();
    }

    function validateEmail(email) {
        var regExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regExp.test(email);
    }

    function commonValidate() {
        var username = $('[name=username]').val().trim(),
            email = $('[name=email]').val().trim(),
            password = $('[name=password]').val();

        if (username.length === 0) {
            warn('User name can\'t be empty');
            return false;
        }
        if (email.length === 0) {
            warn('Email can\'t be empty');
            return false;
        }
        if (!validateEmail(email)) {
            warn('Invalid email');
            return false;
        }
        if(password.length < 6) {
            warn('Too short password');
            return false;
        }

        return true;
    }

    function signup() {
        if(!commonValidate()) return;

        var password = $('[name=password]').val(),
            confirmPassword = $('[name=confirmPassword]').val();

        if(password != confirmPassword) {
            warn('Un-matched password');
            return;
        }

        $.post('', $('form').serialize())
            .done(info)
            .fail(function (res) {
                warn(res.responseText);
            });
    }

    return {
        signup: signup
    };
}(this, document));
