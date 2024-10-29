module.exports=  (query,objectPaginayion,totalProducts)=> { 
    
    const totalPage=  Math.ceil(totalProducts/objectPaginayion.limitItem);
   objectPaginayion.totalPage=parseInt(totalPage);

    if(query.page){
        objectPaginayion.current_page=parseInt(query.page);
        objectPaginayion.skip_page=(query.page-1)*objectPaginayion.limitItem;
    }
    return objectPaginayion
}