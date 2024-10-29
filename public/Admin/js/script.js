// button status

const buttonstatus=document.querySelectorAll("[button-status]")
if(buttonstatus.length>0){
    let url= new URL(window.location.href);
    buttonstatus.forEach(button =>{
        button.addEventListener('click',()=>{

            const status=button.getAttribute("button-status")
            if(status){
                url.searchParams.set("status",status)
            }
            else{
                url.searchParams.delete("status")
            }
            // console.log(url.href)
            window.location.href=url.href;
        });
    })
}
// button status

//search button

const formSearch=document.querySelector("#form-search")

if(formSearch){
    let url= new URL(window.location.href)

    formSearch.addEventListener('submit',(e)=>{
        e.preventDefault();

       const keyValue=e.target.elements.keyword.value;

       if(keyValue){
        url.searchParams.set("keyword",keyValue)
        }
       else{
            url.searchParams.delete("keyword")
        }
        window.location.href=url.href;
    })
}


//search button
const page_number=document.querySelectorAll("[page-number]")
const previous_button=document.querySelector(".previous")
const next_button=document.querySelector(".next")

if(page_number.length>0){
    let url= new URL(window.location.href);
page_number.forEach(page =>{
    page.addEventListener('click',(e)=>{
        const number=page.getAttribute("page-number");

        if(number){
            url.searchParams.set("page",number)
        }
        else{
            url.searchParams.delete("page")
        }
        // console.log(url.href)
        window.location.href=url.href;
       
    })
})
}

//pagination



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

const formCheckMulti=document.querySelector("[form-change-multi]")

if(formCheckMulti){
    formCheckMulti.addEventListener('submit',(e)=>{
       
        e.preventDefault();
        const checkboxmulti=document.querySelector("[checkbox-multi]")
        const inputChecked=checkboxmulti.querySelectorAll("input[name='id']:checked");
        const type_change=e.target.elements.type.value;

        if(type_change=="delete"){
            const isconfirm = confirm("Bạn có chắc chắn muốn xóa các sản phẩm đã chọn");
            if(!isconfirm){
                return;
            }
        }
        if(inputChecked.length>0){
            let ids=[];
            const inputControl=formCheckMulti.querySelector("input[name='ids']");
    

            inputChecked.forEach(input=>{
                
                const id= input.value; 

                  
            if(type_change=="change-position"){
                const position=input.closest("tr").querySelector("input[name='position']").value;
                ids.push(`${id}-${position}`);
            }
            else{
                ids.push(id);
            }
            })

          
            inputControl.value=ids.join(", ");

            formCheckMulti.submit();
        
        }else{
            alert("voi long chon it nhat mot ban ghi")
        }
    })
}

// AND change-Mutil 


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

// preview_image

const upload_image=document.querySelector("[upload-image]");

if(upload_image){
    const input_imge=document.querySelector("[upload-image-input]");
    const preview_image=document.querySelector("[upload-image-preview]");

    input_imge.addEventListener("change",(e)=>{
        const file=e.target.files[0];
        if(file){
            preview_image.src=URL.createObjectURL(file);
        }
    })
}


//AND preview_image


