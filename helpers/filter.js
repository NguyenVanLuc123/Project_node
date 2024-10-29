module.exports=(Query)=>{
    let filterStatus=[
        {
           name:"Tat ca",
           status:"",
           class:""
        },
        {
          name:"Hoat dong",
          status:"true",
          class:""
       },
       {
        name:"dung hoat dong",
        status:"false",
        class:""
     },
      
      ]
    
     if(Query.status){
        const index= filterStatus.findIndex(item=>{
          return item.status==Query.status
        });
        filterStatus[index].class="active";
     }
     else{
      const index= filterStatus.findIndex(item=>{
        return item.status==""
      });
      filterStatus[index].class="active";
     }

     return filterStatus;
}