module.exports=(keyword,find)=>{
    if (keyword) {
        find.title = { $regex: keyword.trim(), $options: 'i' }; // Tìm kiếm chuỗi trong title, không phân biệt chữ hoa/thường
      }
}