/*
 * File: navbar.js
 * Creation: Sunday July 5th 2020
 * Author: Arthur Dujardin
 * Contact: arthur.dujardin@ensg.eu
 *          arthurd@ifi.uio.no
 * --------
 * Copyright (c) 2020 Arthur Dujardin
 */

(function () {
    var hamburger = {
        navToggle: document.querySelector("#nav-toggle"),
        nav: document.querySelector("#nav-menu"),

        doToggle: function (e) {
            e.preventDefault();
            this.navToggle.classList.toggle("expanded");
            this.navToggle.classList.toggle("fixed-nav");
            this.nav.classList.toggle("expanded");
        },
    };

    hamburger.navToggle.addEventListener("click", function (e) {
        hamburger.doToggle(e);
    });
})();

/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
    } else {
        document.getElementById("navbar").style.top = "-50px";
    }
    prevScrollpos = currentScrollPos;
};

function change_color_header(
    bg1,
    bg2,
    color_font1,
    color_font2,
    bg_menu1,
    bg_menu2
) {
    /* Handles changing color of the header / navbar

    bg1: string
        The default background color of the header
    bg2: string
        The background color of the header when it overlaps `mask-color` element
    color_font1: string
        Idem
    colot_font2: string
        Idem
    bg_menu1: string
        Idem
    bg_menu2: string
        Idem
    */

    // Change element header when hovered by class_fix
    $(document).ready(function () {
        $(window).scroll(function () {
            var header = $("header.change-color");
            var header_font = $("header ul li a");
            var header_bar1 = $("header .nav-toggle-bar1");
            var header_bar2 = $("header .nav-toggle-bar2");
            var header_bar3 = $("header .nav-toggle-bar3");
            var elements_fix = $(".mask-color");
            var nearest_fix = null;

            // Only if the header.change-color exists
            if (header.length) {
                for (let j = 0; j < elements_fix.length; j++) {
                    var class_fix = elements_fix[j];
                    // Check the position of the current fix element
                    var class_fix_pos = $(class_fix).offset().top;
                    var class_fix_height = $(class_fix).height();
                    var header_pos = $(header).offset().top;
                    var header_height = $(header).height();
                    var margin = 0;

                    // If the current element is the nearest AND overlay class_element, save it
                    if (
                        header_pos + header_height + margin > class_fix_pos &&
                        header_pos < class_fix_pos + class_fix_height + margin
                    ) {
                        nearest_fix = class_fix;
                    }
                }
                // change the classes / add /remove
                if (nearest_fix != null) {
                    $(header).addClass(bg2);
                    $(header).removeClass(bg1);
                    $(header_font).addClass(color_font2);
                    $(header_font).removeClass(color_font1);
                    $(header_bar1).addClass(bg_menu2);
                    $(header_bar1).removeClass(bg_menu1);
                    $(header_bar2).addClass(bg_menu2);
                    $(header_bar2).removeClass(bg_menu1);
                    $(header_bar3).addClass(bg_menu2);
                    $(header_bar3).removeClass(bg_menu1);
                } else {
                    $(header).removeClass(bg2);
                    $(header).addClass(bg1);
                    $(header_font).removeClass(color_font2);
                    $(header_font).addClass(color_font1);
                    $(header_bar1).removeClass(bg_menu2);
                    $(header_bar1).addClass(bg_menu1);
                    $(header_bar2).removeClass(bg_menu2);
                    $(header_bar2).addClass(bg_menu1);
                    $(header_bar3).removeClass(bg_menu2);
                    $(header_bar3).addClass(bg_menu1);
                }
            }
        });
    });
}

change_color_header(
    "bg-bluegreen",
    "bg-white",
    "white",
    "dark-grey",
    "bg-white",
    "bg-dark-grey"
);
