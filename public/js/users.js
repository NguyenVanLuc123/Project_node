

// Tạo hàm để thêm event listeners
function addEventButtons() {
    // Add Friend buttons
    const listButtonAddFriend = document.querySelectorAll("[btn-add-friend]");
    if(listButtonAddFriend.length>0){
        listButtonAddFriend.forEach(button=>{
            if(!button.hasListener) {  // Kiểm tra xem đã có listener chưa
                button.hasListener = true;
                button.addEventListener('click',()=>{
                    const user_id = button.getAttribute("btn-add-friend");
                    button.closest(".box-user").classList.add("add");
                    socket.emit("CLIENT_ADD_FRIEND",user_id);
                });
            }
        });
    }

    // Cancel Friend buttons
    const listButtonCancelFriend = document.querySelectorAll("[btn-cancel-friend]");
    if(listButtonCancelFriend.length>0){
        listButtonCancelFriend.forEach(button=>{
            if(!button.hasListener) {
                button.hasListener = true;
                button.addEventListener('click',()=>{
                    const user_id = button.getAttribute("btn-cancel-friend");
                    button.closest(".box-user").classList.remove("add");
                    socket.emit("CLIENT_CANCEL_FRIEND",user_id);
                });
            }
        });
    }

    // Refuse Friend buttons
    const listButtonRefuseFriend = document.querySelectorAll("[btn-refuse-friend]");
    if(listButtonRefuseFriend.length>0){
        listButtonRefuseFriend.forEach(button=>{
            if(!button.hasListener) {
                button.hasListener = true;
                button.addEventListener('click',()=>{
                    const user_id = button.getAttribute("btn-refuse-friend");
                    button.closest(".box-user").classList.add("refuse");
                    socket.emit("CLIENT_REFUSE_FRIEND",user_id);
                });
            }
        });
    }

    // Accept Friend buttons
    const listButtonAcceptFriend = document.querySelectorAll("[btn-accept-friend]");
    if(listButtonAcceptFriend.length>0){
        listButtonAcceptFriend.forEach(button=>{
            if(!button.hasListener) {
                button.hasListener = true;
                button.addEventListener('click',()=>{
                    const user_id = button.getAttribute("btn-accept-friend");
                    button.closest(".box-user").classList.add("accept");
                    socket.emit("CLIENT_ACCEPT_FRIEND",user_id);
                });
            }
        });
    }

    // Unfriend buttons
    const listButtonUnFriend = document.querySelectorAll("[btn-unfriend]");
    if(listButtonUnFriend.length>0){
        listButtonUnFriend.forEach(button=>{
            if(!button.hasListener) {
                button.hasListener = true;
                button.addEventListener('click',()=>{
                    const user_id = button.getAttribute("btn-unfriend");
                    button.closest(".box-user").classList.add("unfriend");
                    socket.emit("CLIENT_UN_FRIEND",user_id);
                });
            }
        });
    }
}

// Gọi hàm lần đầu khi trang được tải
addEventButtons();

//SERVER_RETURN_LENGTH_ACCEPT_FRIEND
socket.on("SERVER_RETURN_LENGTH_ACCEPT_FRIEND",(data)=>{
    const badge= document.querySelector("[badge-users-accept]");
    if(badge.getAttribute("badge-users-accept")==data.userId){
    badge.innerHTML=data.lengthAcceptFriend;
    };
});


//SERVER_RETURN_LENGTH_ACCEPT_FRIEND



//SERVER_RETURN_HUMAN_ACCEPT_FRIEND



socket.on("SERVER_RETURN_HUMAN_ACCEPT_FRIEND", (data) => {
    const userList = document.getElementById("user-list");
if(userList.getAttribute("accept_user_id")==data.userid){
        const newUserBox = document.createElement("div");
        newUserBox.innerHTML = `
            <div class="col-6" box_user-id=${data.infouser._id}>
                <div class="box-user">
                    <div class="inner-avartar">
                        <img src="${data.infouser.avatar ? data.avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU9aiLd1yNA54b4JMz0U7ORLGRDO3Z2T3fZg&s'}" alt="nguyen van a">
                    </div>
                    <div class="inner-info">
                        <div class="inner-name">${data.infouser.fullName}</div>
                        <div class="inner-buttons">
                            <button class="btn btn-sm btn-primary mr-1" btn-accept-friend="${data.infouser._id}">Chấp nhận</button>
                            <button class="btn btn-sm btn-secondary mr-1" btn-refuse-friend="${data.infouser._id}">Xóa</button>
                            <button class="btn btn-sm btn-secondary mr-1" btn-deleted-friend="${data.infouser._id}" disabled>Đã xóa</button>
                            <button class="btn btn-sm btn-primary mr-1" btn-success-friend="${data.infouser._id}" disabled>Đã chấp nhận</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        userList.insertBefore(newUserBox.firstElementChild, userList.firstChild);
        addEventButtons();
}
    
});



//SERVER_RETURN_HUMAN_ACCEPT_FRIEND

//SERVER_RETURN_DELETE_HUMAN_ACCEPT_FRIEND
socket.on("SERVER_RETURN_DELETE_HUMAN_ACCEPT_FRIEND", (data) => {
    const userList = document.getElementById("user-list");
    if (userList.getAttribute("accept_user_id")==data.userid) {
        const userBox = document.querySelectorAll(`[box_user-id]`);
        userBox.forEach(box=>{
            if (box.getAttribute("box_user-id")==data.infouser._id) {
                box.remove(); // Xóa phần tử khỏi DOM
            }
        })
       
    }
});


//SERVER_RETURN_DELETE_HUMAN_ACCEPT_FRIEND
 
//SERVER_RETURN_HUMAN_NOT_FRIEND
socket.on("SERVER_RETURN_HUMAN_NOT_FRIEND", (data) => {
    const userList = document.getElementById("user-list");
    
    if (userList.getAttribute("not_friend_user_id") == data.user_id) {
        const userBoxes = document.querySelectorAll(`[box_user-id]`);
        userBoxes.forEach((box) => {
            if (box.getAttribute("box_user-id") == data.infouser._id) {
                const colParent = box.closest(".col-6"); // Tìm phần tử cha `.col-6`
                if (colParent) {
                    colParent.remove(); // Xóa luôn `.col-6` để giữ bố cục đúng
                }
            }
        });
    }
});


//SERVER_RETURN_HUMAN_NOT_FRIEND


//SERVER_RETURN_CANCEL_HUMAN_NOT_FRIEND
socket.on("SERVER_RETURN_CANCEL_HUMAN_NOT_FRIEND", (data) => {
    const userList = document.getElementById("user-list");

    if (userList.getAttribute("not_friend_user_id") == data.user_id) {
        const newUserBox = document.createElement("div");
        newUserBox.innerHTML = `
            <div class="col-6" box_user-id=${data.infouser._id}>
                <div class="box-user">
                    <div class="inner-avartar">
                        <img src="${data.infouser.avatar ? data.avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU9aiLd1yNA54b4JMz0U7ORLGRDO3Z2T3fZg&s'}" alt="nguyen van a">
                    </div>
                    <div class="inner-info">
                        <div class="inner-name">${data.infouser.fullName}</div>
                        <div class="inner-buttons">
                            <button class="btn btn-sm btn-primary mr-1" btn-add-friend="${data.infouser._id}">Ket ban</button>
                            <button class="btn btn-sm btn-secondary mr-1" btn-cancel-friend="${data.infouser._id}">Huy</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        userList.insertBefore(newUserBox.firstElementChild, userList.firstChild);
        addEventButtons();
    }
});


// SERVER_RETURN_CANCEL_HUMAN_NOT_FRIEND

   
   


socket.on("SERVER_RETURN_CHECK_ONLINE",(data)=>{
    const userList = document.querySelector("[firend_user_id]");
    if (userList) {
        const userBoxes = document.querySelectorAll(`[box_user-id]`);
        userBoxes.forEach((box) => {
            if (box.getAttribute("box_user-id") == data.user_id) {
                
                const statusDiv = box.querySelector(".inner-status");
                statusDiv.classList.remove("checkoff");
                statusDiv.classList.add("checkone");
            }
        });
    }
   
    
})
////CLIENT_SUBMIT_CHECK_ONLINE

//SERVER_RETURN_CHECK_OFFLINE
socket.on("SERVER_RETURN_CHECK_OFFLINE",(data)=>{
    const userList = document.querySelector("[firend_user_id]");
    if (userList) {
        const userBoxes = document.querySelectorAll(`[box_user-id]`);
        userBoxes.forEach((box) => {
            if (box.getAttribute("box_user-id") == data.user_id) {
                
                const statusDiv = box.querySelector(".inner-status");
                statusDiv.classList.remove("checkone");
                statusDiv.classList.add("checkoff");
            }
        });
    }
   
    
});

//SERVER_RETURN_CHECK_OFFLINE