var mail = (function() {


    // Factory
    var factory = {};


    // Refresh Captcha
    factory.refresh = function() {

        this.createNewImage();
    };


    // Empty Input
    factory.emptyInput = function( e ) {

        if( e ) {

            e.removeAttribute('class');
            e.removeAttribute('placeholder');
        }
    };



    // Contact Form
    factory.contact = function( e ) {


        var xhttp = new XMLHttpRequest();

        var error   = document.getElementsByClassName('error')[0];
        var success = document.getElementsByClassName('success')[0];


        xhttp.onreadystatechange = function() {

            if( this.readyState == 4 && this.status == 200 ) {

                var result = this.responseText;



                for( var i = 0; i < 8; i++ ) {

                    if( e.target[i] ) {

                        var val  = e.target[i].value;

                        var attr = e.target[i].getAttribute('name');

                        var name = document.getElementById(attr);
                    }


                    if( result == 'Invald Email' || result == 'Empty' || result == 'Not Verified'  || result == 'Invalid email and Not Verified' ) {

                        /* If value is empty */
                        if( result == 'Empty' && val == '' ) {

                            name.setAttribute( 'class', 'error' );

                            name.setAttribute( 'placeholder', 'This Field is Required.' );

                        } else {


                            /* Check email address if valid */
                            if( attr == 'email' && !/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test( val ) ) {
                                
                                name.value = '';

                                name.setAttribute( 'class', 'error' );

                                name.setAttribute( 'placeholder', 'Invalid Email Address' );
                            }


                            /* If Not Verified */
                            if( attr == 'verify' && result == 'Not Verified' || attr == 'verify' && result == 'Invalid email and Not Verified' ) {

                                name.value = '';

                                name.setAttribute( 'class', 'error' );

                                name.setAttribute( 'placeholder', 'Verification Code Not Matched!' );
                            }
                        }

                        document.getElementsByClassName('success')[0].style.display = 'none';

                    } else {

                        if( result == 'Success' ) {

                            factory.createNewImage();

                            error.style.display = 'none';

                            success.style.display = 'block';

                        } else {

                            error.style.display = 'block';

                            success.style.display = 'none';
                        }
                    }
                }
            }
        };


        xhttp.open( 'POST', 'contact', true );

        xhttp.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );

        xhttp.send( script.getFormData( e ) );


        e.preventDefault();

    };



    // Create new Captcha
    factory.createNewImage = function() {

        var http = new XMLHttpRequest();

        http.onreadystatechange = function() {

            if( this.readyState == 4 && this.status == 200 ) {

                var key  = document.getElementById('key');

                var data = JSON.parse( this.responseText );

                var link = key.getAttribute('src').split('?i=');

                document.getElementById('security').setAttribute( 'value', data.hashed );

                key.setAttribute( 'src', link[0] + '?i=' + data.key + '&' + data.secret );
            }

        };


        http.open( 'POST', 'captcha?n=1', true );

        http.send();
    };



    return factory;

})();


