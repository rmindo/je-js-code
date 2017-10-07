var job = (function() {


    var factory = {};



    factory.selectTitle = function( el ) {

        el.parentElement['previousElementSibling'].value = el.innerHTML.replace( /(<([^>]+)>)/ig, '' );

        this.leaveAutocomplete( el );
    };



    factory.completeTitle = function( el ) {


        var http = new XMLHttpRequest();


        if( el.value == '' ) {

            this.leaveAutocomplete( el );

        } else {

            var items = document.createElement('div');


            http.onreadystatechange = function() {

                if( this.readyState == 4 && this.status == 200 ) {


                    var item = '';

                    var rows = JSON.parse( this.responseText ).slice( 0, 20);


                    if( rows.length > 0 ) {


                        items.id = 'autocomplete';

                        items.style.display = 'block';


                        for( var i = 0; i < rows.length;  i++ ) {

                            patt = new RegExp( el.value );

                            if( patt.test( rows[i] ) ) {

                                item += '<div class="item" id="'+ i +'" onclick="job.selectTitle(this)">' + rows[i].replace( el.value, '<strong>' + el.value + '</strong>' ) + '</div>';
                            }
                        }

                        items.innerHTML = item;


                        if( el.parentElement.children['autocomplete'] ) {
                            
                            el.parentElement.children['autocomplete'].innerHTML = items.innerHTML;

                        } else {

                            el.parentElement.appendChild( items );
                        }


                    } else {

                        factory.leaveAutocomplete( el );
                    }
                }
            };


            http.open( 'GET', 'http://www.jobexist.com/api/job?title=' + el.value, true );


            http.send();
        }
    };




    factory.leaveAutocomplete = function( el ) {

        if( el.children['autocomplete'] ) {

            el.children['autocomplete'].remove();

        } else {

            if( el.parentElement.id == 'autocomplete' ) {
                
                el.parentElement.remove();
            }
        }
    };


    return factory;

})();
