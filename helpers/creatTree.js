let count =0;
const CreatTree=(arr,parentId="")=>{
    const tree=[];
    arr.forEach(item=> {
      if(item.parent_id==parentId){
        count++;
        const newitem=item;
        newitem.index=count;
        const child=CreatTree(arr,item.id);
        if(child.length>0){
          newitem.child=child;
   
        }
        tree.push(newitem);
      }
      
    });
  
    return tree;
  }

module.exports.Tree=(arr,parentId="")=>{
    count =0;
    const tree= CreatTree(arr,parentId="");
    return tree;
}