window.addEventListener('load', function(){

    var buttons = document.querySelectorAll('.mainButton');

    buttons.forEach(function(elem){
        elem.addEventListener('click', function() {
            event.preventDefault();
            console.log("shiet"); 
            goToPage(elem.getAttribute('data-url'));
        });
    });

    function goToPage(url) {
        /*
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            body: `name=${name}`,
        }).then(function(response){
            return response.text();
        }).catch(function(error) {
            console.error(error);
        }).then(function(message) {
            console.log(message);
        });
        */
        window.location.href = url;
    }
});