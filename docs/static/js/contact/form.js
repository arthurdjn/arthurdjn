/*
 * File: form.js
 * Creation: Sunday July 5th 2020
 * Author: Arthur Dujardin
 * Contact: arthur.dujardin@ensg.eu
 *          arthurd@ifi.uio.no
 * --------
 * Copyright (c) 2020 Arthur Dujardin
 */


$(document).ready(function () {
    $('.submit').click(function (event){
        var name  = $('.name').val()
        var email = $('.email').val()
        //var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
        var subject = $('.subject').val()
        var message = $('.message').val()

        var statusName = $('.status-name')
        statusName.empty()
        var statusEmail = $('.status-email')
        statusEmail.empty()
        var statusSubject = $('.status-subject')
        statusSubject.empty()
        var statusMessage = $('.status-message')
        statusMessage.empty()

        // NAME
        if (name.length>=2){
        }
        else{
            statusName.append('<div>Name is not valid.</div>')
            event.preventDefault()
        }
        // EMAIL
        if (email.length > 5 && email.includes('@') && email.includes('.')){
        }
        else{
            statusEmail.append('<div>Email is not valid.</div>')
            event.preventDefault()        }
        // SUBJECT
        if (subject.length > 3){
        }
        else{
            statusSubject.append('<div>Subject is not valid.</div>')
            event.preventDefault()        }
        // MESSAGE
        if (message.length > 10){     
        }
        else{
            statusMessage.append('<div>Message is not valid.</div>')
            event.preventDefault()        
        }
    })
})