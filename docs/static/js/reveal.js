/*
 * File: reveal.js
 * Creation: Sunday July 5th 2020
 * Author: Arthur Dujardin
 * Contact: arthur.dujardin@ensg.eu
 *          arthurd@ifi.uio.no
 * --------
 * Copyright (c) 2020 Arthur Dujardin
 */


ScrollReveal().reveal('.reveal', {
    delay: 100,
    duration: 1000,
    distance: '70px' 
});


// Title
TweenMax.to("#home h1.anim-intro", 2, {
    delay: 0,
    opacity: 1,
    ease: Expo.easeInOut
});
TweenMax.from("#home h1.anim-intro", 1.8, {
    delay: 0,
    y: 80,
    ease: Expo.easeInOut
});

// Subtitle
TweenMax.to("#home h2.anim-intro", 1.7, {
    delay: .4,
    opacity: 1,
    ease: Expo.easeInOut
});
TweenMax.from("#home h2.anim-intro", 1.5, {
    delay: .4,
    y: 40,
    ease: Expo.easeInOut
});

// Description
TweenMax.to("#home p.anim-intro.resume", 1.7, {
    delay: .9,
    opacity: 1,
    ease: Expo.easeInOut
});
// Short Infolist
TweenMax.to("#home p.anim-intro .when", 1.2, {
    delay: 1.3,
    opacity: 1,
    ease: Expo.easeInOut
});
TweenMax.to("#home p.anim-intro .where", 1.2, {
    delay: 1.4,
    opacity: 1,
    ease: Expo.easeInOut
});
TweenMax.to("#home p.anim-intro .duration", 1.2, {
    delay: 1.5,
    opacity: 1,
    ease: Expo.easeInOut
});
TweenMax.to("#home p.anim-intro .team", 1.2, {
    delay: 1.6,
    opacity: 1,
    ease: Expo.easeInOut
});

// Logo
// 1
TweenMax.to("#home .logo.num1.anim-intro", .4, {
    delay: 1.6,
    opacity: 1,
    ease: Expo.easeInOut
});

// 2
TweenMax.to("#home .logo.num2.anim-intro", .4, {
    delay: 1.7,
    opacity: 1,
    ease: Expo.easeInOut
});

// 3
TweenMax.to("#home .logo.num3.anim-intro", .4, {
    delay: 1.8,
    opacity: 1,
    ease: Expo.easeInOut
});

// 4
TweenMax.to("#home .logo.num4.anim-intro", .4, {
    delay: 1.9,
    opacity: 1,
    ease: Expo.easeInOut
});


// Arrow
TweenMax.to("#home .arrow.white.anim-intro", 2.2, {
    delay: 1,
    opacity: 1,
    ease: Expo.easeInOut
});
TweenMax.to("#home .arrow.dark-grey.anim-intro", 2.2, {
    delay: 2.1,
    opacity: 1,
    ease: Expo.easeInOut
});