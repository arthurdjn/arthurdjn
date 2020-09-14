/*
 * File: scroll.js
 * Creation: Sunday July 5th 2020
 * Author: Arthur Dujardin
 * Contact: arthur.dujardin@ensg.eu
 *          arthurd@ifi.uio.no
 * --------
 * Copyright (c) 2020 Arthur Dujardin
 */


/*
Change colors with layers
*/

function change_opacity(color1, color2) {
    // Change element class_change when hovered by class_fix
    $(document).ready(function () {
        $(window).scroll(function () {
            var elements_change = $(".change-opacity");
            var elements_fix = $(".mask");

            for (let i = 0; i < elements_change.length; i++) {
                var class_change = elements_change[i];
                // Get the nearest fix element
                var nearest_fix = null;

                for (let j = 0; j < elements_fix.length; j++) {
                    var class_fix = elements_fix[j];
                    // Check the position of the current fix element
                    var class_fix_pos = $(class_fix).offset().top;
                    var class_fix_height = $(class_fix).height();
                    var class_change_pos = $(class_change).offset().top;
                    var class_change_height = $(class_change).height();
                    var margin = 50;

                    // If the current element is the nearest AND overlay class_element, save it
                    if (
                        class_change_pos + class_change_height + margin >
                            class_fix_pos &&
                        class_change_pos <
                            class_fix_pos + class_fix_height + margin
                    ) {
                        nearest_fix = class_fix;
                    }
                }
                // change the classes / add /remove
                if (nearest_fix != null) {
                    $(class_change).addClass(color2);
                    $(class_change).removeClass(color1);
                } else {
                    $(class_change).removeClass(color2);
                    $(class_change).addClass(color1);
                }
            }
        });
    });
}

function change_color(color1, color2) {
    // Change element class_change when hovered by class_fix
    $(document).ready(function () {
        $(window).scroll(function () {
            var elements_change = $(".change-color");
            var elements_fix = $(".mask-color");

            for (let i = 0; i < elements_change.length; i++) {
                var class_change = elements_change[i];
                // Get the nearest fix element
                var nearest_fix = null;

                for (let j = 0; j < elements_fix.length; j++) {
                    var class_fix = elements_fix[j];
                    // Check the position of the current fix element
                    var class_fix_pos = $(class_fix).offset().top;
                    var class_fix_height = $(class_fix).height();
                    var class_change_pos = $(class_change).offset().top;
                    var class_change_height = $(class_change).height();
                    var margin = 0;

                    // If the current element is the nearest AND overlay class_element, save it
                    if (
                        class_change_pos + class_change_height + margin >
                            class_fix_pos &&
                        class_change_pos <
                            class_fix_pos + class_fix_height + margin
                    ) {
                        nearest_fix = class_fix;
                    }
                }
                // change the classes / add /remove
                if (nearest_fix != null) {
                    $(class_change).addClass(color2);
                    $(class_change).removeClass(color1);
                } else {
                    $(class_change).removeClass(color2);
                    $(class_change).addClass(color1);
                }
            }
        });
    });
}

change_opacity("full-opacity", "null-opacity");
change_color("light-grey", "white");

/*
Change project page style (absolute - relative)
regarding screen ratio
*/

function landing_project_ratio() {
    var width = $(window).width();
    var height = $(window).height();
    var ratio = width / height;
    if (ratio > 2.1) {
        $("#home.main").addClass("home-relative");
        $("#home.main .landing").addClass("landing-relative");
    } else {
        $("#home").removeClass("home-relative");
        $("#home .landing").removeClass("landing-relative");
    }

    // Projects breackpoints
    if (
        (height < 900 && width > 1500) ||
        (height < 700 && width > 992) ||
        (height < 720 && width > 576) ||
        (height < 700 && width < 576)
    ) {
        $("#home.project").addClass("home-relative");
        $("#home.project .landing").addClass("landing-relative");
    } else {
        $("#home").removeClass("home-relative");
        $("#home .landing").removeClass("landing-relative");
    }
}

landing_project_ratio();

// Update when the screen size changes
$(window).resize(function () {
    //resize just happened, pixels changed
    landing_project_ratio();
});
