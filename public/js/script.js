
//show-alert

const show_alert=document.querySelector("[show-alert]");

if(show_alert){
    const time=parseInt(show_alert.getAttribute("data-time"));
    const close_alert=show_alert.querySelector("[close-alert]");

    close_alert.addEventListener('click',()=>{
        show_alert.classList.add("alert-hidden");
    })
    setTimeout(()=>{
        show_alert.classList.add("alert-hidden");
    },time);
}

// and show-alert

//gio hang them , bot product 

document.querySelectorAll(".quantity-input").forEach(input => {
    input.addEventListener("input", function (event) {
        const quantity = event.target.value; // Giá trị số lượng
        const productId = event.target.getAttribute("data-product-id"); // Lấy product ID từ data attribute
        
        if (quantity && productId) {
            // Tìm form ẩn
            const form = document.getElementById("hiddenForm");
            
            // Cập nhật giá trị vào form ẩn
            document.getElementById("hiddenQuantity").value = quantity;
            document.getElementById("hiddenProductId").value = productId;
            
            // Thiết lập action URL
            form.action = `/cart/${quantity}/${productId}?_method=PATCH`;
            
            // Gửi form
            form.submit();
        }
    });
});

// checkbox multi

const checkboxmulti=document.querySelector("[checkbox-multi]")

// console.log(checkboxmulti)

if(checkboxmulti){
    const inputCheckAll=checkboxmulti.querySelector("input[name='checkAll']");
    
    const inputID=checkboxmulti.querySelectorAll("input[name='id']")
    
    inputCheckAll.addEventListener('click',()=>{
        if(inputCheckAll.checked){
            inputID.forEach(input=>{
                input.checked=true;
            })
        }
        else{
            inputID.forEach(input=>{
                input.checked=false;
            })
        }
    });
   
    inputID.forEach(input =>{
        input.addEventListener('click',()=>{
            const countChecked=checkboxmulti.querySelectorAll("input[name='id']:checked").length;
            if(countChecked==inputID.length){
                inputCheckAll.checked=true;
            }else{
                inputCheckAll.checked=false;
            }
        })
    })

}

// END checkbox multi

// change-Mutil 

const formCheckMulti=document.querySelector("[form-checkout]")

if(formCheckMulti){
    formCheckMulti.addEventListener('submit',(e)=>{
       
        e.preventDefault();
        const checkboxmulti=document.querySelector("[checkbox-multi]")
        const inputChecked=checkboxmulti.querySelectorAll("input[name='id']:checked");
        if(inputChecked.length>0){
            let ids=[];
            const inputControl=formCheckMulti.querySelector("input[name='ids']");
    

            inputChecked.forEach(input=>{
                
                const id= input.value; 
                ids.push(`${id}`);
          
            });

          
            inputControl.value=ids.join(", ");
          
            formCheckMulti.submit();
           
        
        }else{
            alert("voi long chon it nhat mot ban ghi")
        }
    })
}

// click-image
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    const closeBtn = document.querySelector(".close-btn");

    document.querySelectorAll(".chat-img").forEach(img => {
        img.addEventListener("click", function () {
            modal.style.display = "flex"; // Hiển thị modal
            modalImg.src = this.src; // Gán ảnh vào modal
        });
    });

    closeBtn.addEventListener("click", function () {
        modal.style.display = "none"; // Đóng modal
    });

    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.style.display = "none"; // Đóng khi click ra ngoài
        }
    });
});


//end click image

