var script = (function() {

    // Factory
    var factory = {};


    // Trigger click event with id from the DOM if hash is called
    if( typeof location.hash !== 'undefined' ) {
        
        var hash = location.hash.split('#');

        if( element = document.getElementById( hash[1] ) ) {

            element.click();
        }
    }



    /* Pop Up */
    factory.pop = function( id, event ) {

        event.preventDefault();


        var owner = this;

        var xhttp = new XMLHttpRequest();


        xhttp.onreadystatechange = function() {

            if( this.readyState == 4 && this.status == 200 ) {

                var pop = document.createElement('div');
                var set = document.getElementById('settle');

                pop.id = id;
                pop.className = 'pop';
                pop.innerHTML = this.responseText;


                pop.setAttribute( 'data-pop', true );


                if( set.children[0]['dataset']['pop'] ) {

                    set.children[0].remove();
                }

                set.insertBefore( pop, set.children[0] );


                owner.animate( document.getElementById( id ) );
            }
        };



        if( event.target['href'] ) {

            var query = event.target['href'].split('?');


            if( query[1] ) {

                xhttp.open( 'GET', query[0] + '?pop='+ id +'&' + query[1], true );

            } else {

                xhttp.open( 'GET', query[0] + '?pop='+ id, true );
            }

        } else {
            
            xhttp.open( 'GET', event.currentTarget['dataset'].url + '?pop='+ id, true );
        }


        xhttp.send();
    };




    /* Facebook Load */
    factory.preload = function( heading ) {

        document.getElementById('log').innerHTML = '<h3 align="center">'+ heading +'</h3><div class="loader"></div>';
    };





    factory.animate = function( el ) {

        var mo = 0;
        var op = 0.1;
        var bo = document.getElementsByTagName('body')[0];


        if( el ) {


            el.style.display = 'block';
            bo.style.overflow = 'hidden';


            var mt = setInterval( function() {

                if( mo >= 50 ) {

                    clearInterval( mt );
                }

                el.children[0].style.marginTop = mo + 'px';

                mo += 1;

            }, 4 );



            var ft = setInterval( function() {

                if( op >= 1 ) {

                    clearInterval( ft );
                }

                el.style.opacity = op;

                el.style.filter  = 'alpha(opacity=' + op * 20 + ')';

                op += op * 0.1;


            }, 10 );


            el.children[0].lastElementChild.addEventListener( 'click', function() {

                bo.style.overflow = '';

                el.remove();
            });
        }
    };



    // Get Form Data
    factory.getFormData = function( e ) {

        var data = [];


        for( var i = 0; i <= e.target['children'].length; i++ ) {
            
            if( e.target[i] ) {

                data.push( e.target[i].getAttribute('name') + '=' + e.target[i].value );
            }
        }

        return data.join('&');
    };




    /* Select Country */
    factory.selectCountry = function( e ) {

        var figure = document.getElementsByTagName('figure');


        for( i = 0; i < figure.length; i++ ) {


            if( typeof figure[i].children['iso'] !== 'undefined' ) {
                
                figure[i].children['iso'].value = e.id;
            }

            figure[i].children['flag'].src = e.children[0].src;

            figure[i].children['name'].innerHTML = e.children[1].innerHTML;
        }

        document.getElementById('countries').remove();

        document.getElementById('location').value = '';

        document.getElementsByTagName('body')[0].style.overflow = '';
    };


    return factory;

})();


