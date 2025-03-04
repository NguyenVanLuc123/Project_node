// change status

const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonChangeStatus.length>0){
    const formChangStatus=document.querySelector("#form-change-status");
    const path =formChangStatus.getAttribute("data-path");
    buttonChangeStatus.forEach(item=>{
        item.addEventListener('click',()=>{
            console.log(1);
            const Status=item.getAttribute('data-status');
            const ID=item.getAttribute('data-id');

           let Statuscurrent= Status=="true"?"false":"true";
        //    console.log(Statuscurrent)

            const action=path +`/${Statuscurrent}/${ID}?_method=PATCH` ;
            // console.log(action);
            formChangStatus.action=action;

            formChangStatus.submit();
        })
    })
}

// AND change status


// delete button

const Button_delete=document.querySelectorAll("[ button-delete]");

if(Button_delete.length >0){
    const form_delete_product=document.querySelector("#form-delete-product");
    const path =form_delete_product.getAttribute("data-path");
    Button_delete.forEach(item=>{
        item.addEventListener('click',()=>{
            const isconfirm=confirm ("bạn có chắc chắn muốn xóa không");
            if(isconfirm){
                const ID_delete=item.getAttribute("data-id");
                form_delete_product.action=path+`/${ID_delete}?_method=DELETE`;
                form_delete_product.submit();
            }
        })
    })
}


//AND delete button