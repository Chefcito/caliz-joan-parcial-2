window.addEventListener('load', function(){

    var buttons = document.querySelectorAll('.mainButton');

    buttons.forEach(function(elem){
        elem.addEventListener('click', function() {
            event.preventDefault();
            goToPage(elem.getAttribute('data-url'));
        });
    });

    function goToPage(url) {
        window.location.href = url;
    }
});