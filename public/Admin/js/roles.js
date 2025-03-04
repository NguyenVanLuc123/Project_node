//permission

const table_permission = document.querySelector("[table-permission]")
if (table_permission) {
    const button_submit = document.querySelector("[button-submit]");

    button_submit.addEventListener('click', () => {
        let permission = [];

        const rows = table_permission.querySelectorAll("[data-name]");
        rows.forEach(row => {
            const name = row.getAttribute("data-name");
            const inputs = row.querySelectorAll("input");
            if (name == "id") {
                inputs.forEach(input => {
                    const id = input.value;
                    permission.push({
                        id: id,
                        permision: []
                    })
                })
            }
            else{
                inputs.forEach((input,index) => {
                    const check= input.checked;
                    if(check){
                    permission[index].permision.push(name);
                    }
                })
            }

        })
        if(permission.length>0){
            const form_change_permission=document.querySelector("#form-change-permissions");

            const inputPermission=form_change_permission.querySelector("input[name='permission']");
            inputPermission.value=JSON.stringify(permission);

            form_change_permission.submit();
        }
    });
}

//end permision

// permission_checed
const data_record=document.querySelector("[data-permission]");
if(data_record){
    const records= JSON.parse(data_record.getAttribute("data-permission"))
    
    const tablePermissions=document.querySelector("[table-permission]");

    records.forEach((record,index)=>{
        const permisions =record.permissions;

        permisions.forEach(permision=>{
            const  row =tablePermissions.querySelector(`[data-name='${permision}']`);

            const input =row.querySelectorAll("input")[index];

            input.checked=true;
        });
    })
}

// END permission_checed