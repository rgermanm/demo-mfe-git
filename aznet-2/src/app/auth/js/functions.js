$(document).ready(function() {
    /* HIDE/SHOW Password */
    $("#show_hide_password a").on('click', function(event) {
        event.preventDefault();
        if($('#show_hide_password input').attr("type") == "text"){
            $('#show_hide_password input').attr('type', 'password');
            $('#show_hide_password i').addClass( "fa-eye-slash" );
            $('#show_hide_password i').removeClass( "fa-eye" );
        }else if($('#show_hide_password input').attr("type") == "password"){
            $('#show_hide_password input').attr('type', 'text');
            $('#show_hide_password i').removeClass( "fa-eye-slash" );
            $('#show_hide_password i').addClass( "fa-eye" );
        }
    });
    
    $("#show_hide_password_validate_a a").on('click', function(event) {
        event.preventDefault();
        if($('#show_hide_password_validate_a input').attr("type") == "text"){
            $('#show_hide_password_validate_a input').attr('type', 'password');
            $('#show_hide_password_validate_a i').addClass( "fa-eye-slash" );
            $('#show_hide_password_validate_a i').removeClass( "fa-eye" );
        }else if($('#show_hide_password_validate_a input').attr("type") == "password"){
            $('#show_hide_password_validate_a input').attr('type', 'text');
            $('#show_hide_password_validate_a i').removeClass( "fa-eye-slash" );
            $('#show_hide_password_validate_a i').addClass( "fa-eye" );
        }
    });
    
    $("#show_hide_password_validate_b a").on('click', function(event) {
        event.preventDefault();
        if($('#show_hide_password_validate_b input').attr("type") == "text"){
            $('#show_hide_password_validate_b input').attr('type', 'password');
            $('#show_hide_password_validate_b i').addClass( "fa-eye-slash" );
            $('#show_hide_password_validate_b i').removeClass( "fa-eye" );
        }else if($('#show_hide_password_validate_b input').attr("type") == "password"){
            $('#show_hide_password_validate_b input').attr('type', 'text');
            $('#show_hide_password_validate_b i').removeClass( "fa-eye-slash" );
            $('#show_hide_password_validate_b i').addClass( "fa-eye" );
        }
    });
    
    $("#show_hide_password_validate_c a").on('click', function(event) {
        event.preventDefault();
        if($('#show_hide_password_validate_c input').attr("type") == "text"){
            $('#show_hide_password_validate_c input').attr('type', 'password');
            $('#show_hide_password_validate_c i').addClass( "fa-eye-slash" );
            $('#show_hide_password_validate_c i').removeClass( "fa-eye" );
        }else if($('#show_hide_password_validate_c input').attr("type") == "password"){
            $('#show_hide_password_validate_c input').attr('type', 'text');
            $('#show_hide_password_validate_c i').removeClass( "fa-eye-slash" );
            $('#show_hide_password_validate_c i').addClass( "fa-eye" );
        }
    });
    
});