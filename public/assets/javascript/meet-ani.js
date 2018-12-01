$("#button_home").click(event => {
    window.location = "/";
});

$("#button_compose").click(event => {
    window.location = "/upload-photos";
});

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
            $("#ani-about-ani").addClass("ani-vertical-align-wrapper");
            $("#ani-about-ani").css({"margin": "0"});

            break;

        // Medium, small
        case "2px":
        case "1px":
            $("#ani-about-ani").removeClass("ani-vertical-align-wrapper");
            $("#ani-about-ani").css({"margin": "2.5em 0"});

            break;

    }
}

// Check device size before page loads and when window is resized
detectDevice();

$(window).resize(debounce(detectDevice));

$(document).ready(function() {
    // Dropdown menu
    $(".dropdown-button").dropdown();

    // Navbar for mobile
    $(".button-collapse").sideNav({"closeOnClick": true});
});