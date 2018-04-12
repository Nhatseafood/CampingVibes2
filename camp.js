$( document ).ready( function() {
console.log("DOM is ready!")

    // $('.bigSlider').slick({
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     arrows: false,
    //     fade: true,
    //     asNavFor: '.slider'
    // });
    $('.slider').slick( {
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1
        // asNavFor: '.bigSlider',
        // dots: true,
        // centerMode: true,
        // focusOnSelect: true
    });  
    $('.campSlider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        
    });

    $('#rei').click(function() {
        window.location.href="https://www.rei.com/h/camping-and-hiking";
    });

    $('#aca').click(function() {
        window.location.href="https://www.academy.com/";
    });

    $('#cab').click(function() {
        window.location.href="https://www.cabelas.com/";
    });

    $('#campmor').click(function() {
        window.location.href="https://www.campmor.com/";
    });
    
});
