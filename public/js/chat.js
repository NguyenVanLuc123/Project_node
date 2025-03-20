
//client send message
import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'

       
const upload = new FileUploadWithPreview.FileUploadWithPreview('upload-img',{
    multiple:true,
    maxfileCount:6
});
    



//end FileUploadWithPreview
const formsenData = document.querySelector(".chat .inner-form");
if (formsenData) {
    formsenData.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const content = e.target.elements.content.value;
        const images= upload.cachedFileArray ||[];
        console.log(images);
        if (content|| images.length>0) {
            
            socket.emit("CLIENT_SEND_MESSAGE", {
                content:content,
                images:images
            });
            formsenData.reset(); 
            upload.resetPreviewPanel();
            socket.emit("CLENT_SEND_TYPING", "hidden");
           
        }
    })
}

//end client send message

//server return message
socket.on("SERVER_RETURN_MESSGAE", (data) => {
    const body = document.querySelector(".chat .inner-body");
    const div = document.createElement("div");
    const id_user = document.querySelector("[my-id]").getAttribute("my-id")
    const boxTyping=document.querySelector(".inner-list-typing");
    let fullName = "";
    let htmlcontent="";
    let htmlimages="";
    if (id_user != data.userId) {
        div.classList.add("inner-incoming");
        fullName = `<div class="inner-name">${data.fullName}</div>`
    }
    else {
        div.classList.add("inner-outgoing");
    }
    if(data.content){
        htmlcontent=`
   <div class="inner-content">${data.content}</div>
    `;
    }
    if(data.images){
        htmlimages +=`<div class="inner-images">`;
        for(const image of data.images){
        htmlimages+=`<img src="${image}">`
        };

        htmlimages+=`</div>`
    }
    div.innerHTML = `
    ${fullName}
    ${htmlcontent}
    ${htmlimages}
    `;


    body.insertBefore(div,boxTyping);

    scrollToBottom()// Gọi khi tải trang
})

//end server return message
// AND change-Mutil 
function scrollToBottom() {
    let chatBox = document.getElementById("chatBox");
    chatBox.scrollTop = chatBox.scrollHeight; // Cuộn xuống cuối cùng
}
window.onload = scrollToBottom; // Gọi khi tải trang

// Nếu bạn thêm tin nhắn mới vào .chat, hãy gọi lại scrollToBottom()

//emoji-picker
//show popup
const button = document.querySelector('.button-icon')
if (button) {
    const tooltip = document.querySelector('.tooltip');
    Popper.createPopper(button, tooltip);
    button.onclick = () => {
        tooltip.classList.toggle('shown')
    }
}

const upload_button = document.querySelector('.upload')
if(upload_button){
    const custom_file_container =document.querySelector('.custom-file-container');
    upload_button.onclick=()=>{   
            if (custom_file_container.classList.contains('upload-show')) {
                custom_file_container.classList.remove('upload-show');
                custom_file_container.classList.add('upload-hidden');
            } else {
                custom_file_container.classList.remove('upload-hidden');
                custom_file_container.classList.add('upload-show');
            }
    }
}
//show popup
var timeout;
function showtyping(){
    socket.emit("CLENT_SEND_TYPING", "show");
    clearTimeout(timeout);

    timeout= setTimeout(() => {
     socket.emit("CLENT_SEND_TYPING", "hidden");
    }, 3000);
};
const emoji_picker = document.querySelector("emoji-picker");
if (emoji_picker) {
    const inputChat = document.querySelector(".chat .inner-form input[name='content']");
    emoji_picker.addEventListener("emoji-click", (event) => {
        const icon = event.detail.unicode;
        inputChat.value = inputChat.value + icon;
        inputChat.setSelectionRange(inputChat.value.length,inputChat.value.length);
        inputChat.focus();
        showtyping()
    })

    inputChat.addEventListener("keyup", () => {
        showtyping()
    })
}

//end emoji-picker


//SERVER_RETURN_TYPING
const elementsListTyping = document.querySelector(".chat .inner-list-typing");
if (elementsListTyping) {
    socket.on("SERVER_RETURN_TYPING", (data) => {
        if(data.type=="show"){
        const exitsTyping =elementsListTyping.querySelector(`[user_id="${data.userId}"]`);
        if(!exitsTyping){
        const boxTyping = document.createElement("div");
        boxTyping.classList.add("box-typing");
        boxTyping.setAttribute("user_id",data.userId)
        boxTyping.innerHTML = `
            
                <div class="inner-name">${data.fullName}</div> 
                <div class="ineer-dots">
                    <span></span>
                    <span></span>   
                    <span></span>
                </div>
            
            `;
        elementsListTyping.appendChild(boxTyping);
        scrollToBottom();
        }
    }
    else{
        
        const boxTypingRemove= elementsListTyping.querySelector(`[user_id="${data.userId}"]`);
        if(boxTypingRemove){
            elementsListTyping.removeChild(boxTypingRemove)
            console.log(elementsListTyping);
        }
    }
    });
}

// End SERVER_RETURN_TYPING
//

