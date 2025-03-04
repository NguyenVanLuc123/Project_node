module.exports.PriceNew=(products)=>{
   const newProducts=products.map((item) => {
        item.newprice=((item.price *(100-item.discountPercentage))/100).toFixed(0)
        return item;

    });
    return newProducts;
  
}

module.exports.PriceNewOne=(products)=>{
  const newprice =(
    (products[0].price * (100 -products[0].discountPercentage))/100).toFixed(0)
   return newprice;
 }