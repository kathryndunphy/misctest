function displayLogin() {
    $("#ani-signup").fadeOut(200);
    $("#ani-login").fadeIn(1000);
}

function displaySignup() {
    $("#ani-login").fadeOut(200);
    $("#ani-signup").fadeIn(1000);
}

// Stop a function from running too many times
function debounce(func, wait = 10, immediate = true) {
    let timeout;

    return function() {
        const context = this, args = arguments;

        function later() {
            timeout = null;

            if (!immediate) func.apply(context, args);
        };

        const callNow = immediate && !timeout;
        
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        
        if (callNow) func.apply(context, args);
    };
}

function detectDevice() {
    switch ($("#ani-device-detector").css("font-size")) {
        // Extra large, large
        case "4px":
        case "3px":
            $(".ani-index").addClass("ani-vertical-align-wrapper");
            $(".ani-index").css({"margin": "0"});

            break;

        // Medium, small
        case "2px":
        case "1px":
            $(".ani-index").removeClass("ani-vertical-align-wrapper");
            $(".ani-index").css({"margin": "2.5em 0"});

            break;

    }
}

// Check device size before page loads and when window is resized
detectDevice();

$(window).resize(debounce(detectDevice));

$(document).ready(function() {
    displaySignup();
    
    // Dropdown menu
    $(".dropdown-button").dropdown();

    // Navbar for mobile
    $(".button-collapse").sideNav({"closeOnClick": true});
});
