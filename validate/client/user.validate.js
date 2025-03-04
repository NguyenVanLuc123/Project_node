module.exports.registerPost=(req,res,next)=>{
    if(!req.body.fullName){
        req.flash('error', `vui long nhap ten!`);
        res.redirect("back");
        return;
      }
      if(!req.body.email){
        req.flash('error', `vui long nhap email!`);
        res.redirect("back");
        return;
      }
      if(!req.body.password){
        req.flash('error', `vui long nhap password!`);
        res.redirect("back");
        return;
      }
      next();
}

module.exports.loginPost=(req,res,next)=>{
    if(!req.body.email){
      req.flash('error', `vui long nhap email!`);
      res.redirect("back");
      return;
    }
    if(!req.body.password){
      req.flash('error', `vui long nhap password!`);
      res.redirect("back");
      return;
    }
    next();
}
module.exports.forgotPasswordPost=(req,res,next)=>{
  if(!req.body.email){
    req.flash('error', `vui long nhap email!`);
    res.redirect("back");
    return;
  }
 
  next();
}

module.exports.ResetPasswordPost=(req,res,next)=>{
  if(!req.body.Newpassword){
    req.flash('error', `vui long nhap mat khau moi!`);
    res.redirect("back");
    return;
  }
  if(!req.body.Confirmpassword){
    req.flash('error', `vui long nhap lai mat khau!`);
    res.redirect("back");
    return;
  }

  if(req.body.Confirmpassword!=req.body.Newpassword){
    req.flash('error', `Mat khau khong trung khop !`);
    res.redirect("back");
    return;
  }
 
  next();
}