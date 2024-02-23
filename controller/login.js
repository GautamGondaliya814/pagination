var registermodel = require("../model/register");
var jwt = require('jsonwebtoken');

exports.register = async(req,res) => {
     var data = await registermodel.create(req.body)

     res.status(200).json({
          data
     })
}

exports.login = async(req,res) => {
     var data = await registermodel.find({email:req.body.email})

     if(data.length == 1){

          if(data[0].password == req.body.password){

               var token = jwt.sign({id:data[0].id},"user");

               res.status(200).json({
                    status:"login",
                    token
               })
          }
          else{
               res.status(200).json({
                    status:"check your email and password"
               })
          }
     }
     else{
          res.status(200).json({
               status:"check your email and password"
          })
     }
}
exports.get_data = async(req,res) =>{
     var page_no = req.query.page_no;
     var limit = 2;
     if(page_no == undefined){
          page_no = 1;
     }
     var start =(page_no-1)*limit;

     var data = await registermodel.find().skip(start).limit(limit);
     var data_count = await registermodel.find().count();
     
     var total_page = Math.ceil(data_count/limit);

     res.status(200).json({
          data,
          total_page,
          page_no
     })
}
