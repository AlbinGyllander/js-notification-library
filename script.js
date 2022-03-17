
import notification from "https://albingyllander.github.io/js-notification-library/notification.js"
document.querySelector("button").addEventListener("click", () => {
    
    const available_position = ['top-right','top-left','top-center','bottom-right','bottom-left','bottom-center']
    const available_priority= ['alert','standard','warning']
    const notificationItem = new notification({
        
        position: Math.floor(Math.random() * (6  - 1 + 1) + 1),
        autoClose:3000,
        text:'Incorrect login',
        close:true,
        priorityType: Math.floor(Math.random() * (3  - 1 + 1) + 1),

    })
})