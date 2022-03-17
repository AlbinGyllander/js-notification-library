const DEFAULT_OPTIONS = {
    position: "top-right",
    text:'default text',
    timeToShow: 5000,
    autoClose: 3000,
    onClose:true,
    priorityType: 'standard',
}
const ALERT_COLORS = {
    standard:'blue',
    alert:'red',
    warning:'red',
}
class notification{
    #notificationElement
    #animFrame
    #text
    #textElement
    #removeBinded 
    #priorityType
    
    constructor(options){
        this.#notificationElement = document.createElement("div")
        this.#notificationElement.classList.add('notification')
        
        requestAnimationFrame(() =>  {
            this.#notificationElement.classList.add('show') 
        })
        this.#textElement = document.createElement('p')
        this.#notificationElement.append(this.#textElement)
        
        this.#removeBinded = this.delete.bind(this)
        this.update({...DEFAULT_OPTIONS,...options})
        
    }
    
    set position(value){
        const currentContainer = this.#notificationElement.parentElement
        const selector = `.notification-container[data-position="${value}"]`
        const container = document.querySelector(selector) || createContainer(value)
        container.append(this.#notificationElement)
        if (currentContainer == null || currentContainer.hasChildNodes()) return
        currentContainer.remove()
    }

    set text(value){
        this.#text = value
        this.#textElement.innerHTML = this.#text
    }

    set onClose(value){
        if(value){
            this.#notificationElement.addEventListener("click", this.#removeBinded)
        }else{
            this.#notificationElement.removeEventListener("click",this.#removeBinded)
        }
    }

    set priorityType(value){
        this.#priorityType = value
        this.#notificationElement.classList.add(`notification-priority-${this.#priorityType}`)
        var r = document.querySelector(':root');
        r.style.setProperty('--priorityLevel', ALERT_COLORS[this.#priorityType]); 
    }

    set autoClose(value){
        if(value === false)return
        let startTime = 0
        const repeat = time =>{
            startTime += 15
            if(startTime >= value){
                cancelAnimationFrame(this.#animFrame)
                this.delete()
                return
            }
            this.#animFrame = requestAnimationFrame(repeat);
        }
        this.#animFrame = requestAnimationFrame(repeat)
    }
    
    delete(){
        const container = this.#notificationElement.parentElement
        this.#notificationElement.classList.remove('show')
        this.#notificationElement.addEventListener('transitionend', () => {
            this.#notificationElement.remove()
        })
        
        if(container!= null && container.hasChildNodes() == false) container.remove()  
    }

    update(options) {
        Object.entries(options).forEach(([key, value]) => {
          this[key] = value
        })
        return options
    }
    
    
}


function createContainer(position) {
    const container = document.createElement("div")
    container.classList.add("notification-container")
    container.dataset.position = position
    document.body.append(container)
    return container
}

document.querySelector("button").addEventListener("click", () => {
    const toast = new notification({
        position: "top-right",
        autoClose:3000,
        text:'incorrect login',
        onClose:true,
        priorityType: 'alert',

    })
})

