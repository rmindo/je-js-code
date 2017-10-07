(function() {

    // Factory
    var factory = {};


    // initialize
    factory.init = function() {

        /* Mobile */
        if( screen.width <= 1024 ) {


            var su = 0;

            setInterval( function() {

                if( su >= 3 ) {

                    factory.subscribe();
                }

                su += 1;

            }, 1000 );


        } else {

            if( !document.querySelector('[data-subscribed="true"]') ) {

                var topValue = 0;

                if( !document.querySelector('[data-closed="true"]') ) {

                    window.addEventListener( 'mouseout', function( e ) {


                        if( e.clientY < topValue ) {

                            factory.subscribe();
                        }
                    });
                }
            }


            factory.subscribeFrom( 'jobalert-form' );
            factory.subscribeFrom( 'signup-form' );
        }
    };


    // Get Content
    factory.content = function( url, callback ) {

        var http = new XMLHttpRequest();

        http.onreadystatechange = function() {

            if( this.readyState == 4 && this.status == 200 ) {

                callback( this.responseText );
            }
        };

        http.open( 'GET', url, true );

        http.send();
    };



    // Subscribe
    factory.subscribe = function() {

        var subs = document.getElementById('subscribe');


        if( subs ) {

            var body = document.getElementsByTagName('body')[0];


            if( !document.querySelector('[data-leaving="true"]') ) {


                script.animate( subs );

                this.subscribeFrom( 'subscribe-form' );


                body.setAttribute('data-leaving', 'true');
            }


            subs.children[0].lastElementChild.addEventListener( 'click', function() {

                body.setAttribute('data-closed', 'true');
            });
        }
    };




    // Subscribe Form
    factory.subscribeFrom = function( id ) {


        var setError = function( el, message ) {

            el.value = '';

            el.setAttribute( 'class', 'error' );
            el.setAttribute( 'placeholder', message  );
        };



        if( form = document.getElementById( id ) ) {


            form.addEventListener( 'submit', function( e ) {

                e.preventDefault();


                for( var i = 0; i <= e.target['children'].length; i++ ) {


                    if( e.target[i] ) {


                        if( e.target[i].value == '' ) {

                            if( e.target[i]['tagName'] !== 'BUTTON' ) {
                                
                                setError( e.target[i], 'This Field is Required' );
                            }
                        }


                        e.target[i].addEventListener( 'click', function(e) {

                            if( e.target['className'] == 'error' ) {
                                
                                e.target.removeAttribute('class');
                                e.target.removeAttribute( 'placeholder' );
                            }
                        });
                    }
                }



                if( e.target[0].value !== '' && e.target[1].value !== '' ) {


                    var http = new XMLHttpRequest();

                    http.onreadystatechange = function() {


                        if( this.readyState == 4 && this.status == 200 ) {

                            var res = this.responseText;

                            var uri = window.location['origin'] + '/signup/response?status=';


                            /* Check email address if valid */
                            if( res == 'Invalid Email' ) {

                                setError( e.target[0], 'Invalid Email Address' );

                            } else {

                                if( res == 'Exist' ) {

                                    if( e.target[1].id == 'title' ) {

                                        setError( e.target[1], 'You aleady added ' + e.target[1].value );

                                    } else {

                                        factory.content( uri + 'exist', function( data ) {

                                            e.target['parentElement'].innerHTML = data;
                                        });
                                    }

                                } else {

                                    if( res == 'Success' ) {

                                        factory.content( uri + 'success', function( data ) {

                                            e.target['parentElement'].innerHTML = data;
                                        });

                                        e.target['ownerDocument']['body'].setAttribute('data-subscribed', 'true');
                                    }
                                }
                            }
                        }
                    };

                    http.open( 'POST', e.target['action'].split('?')[0] + '?subscribe=true', true );


                    http.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );

                    http.send( script.getFormData( e ) );
                }

            });
        }

    };


    // Initialize
    factory.init();



    return factory;

})();


