# js-notification-library

The HTML document is just to preview how the library will work. You can customize things like priority, text message, auto close duration and more.

You can import the module with a script tag like: <script type="module" src="https://albingyllander.github.io/js-notification-library/script.js"></script>

You also need to import my css file or make your own.

Then you create a new notification like this:
    
    const notificationItem = new notification({
        position: "top-right",
        autoClose:3000,
        text:'incorrect login',
        close:true,
        priorityType: 'alert',

    })

Inspired by WebDevSimplified's version: https://github.com/WebDevSimplified/live-toast-notification-library
