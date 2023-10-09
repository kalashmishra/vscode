var express = require('express');
var router = express.Router();
var fs=require('fs');
/* GET home page. */

router.get('/', function(req, res) {
  var filedup=[];
fs.readdir("./uploads",{withFileTypes: true},function(err,files){
files.forEach(function(dirent){
  filedup.push({fname : dirent.name, isfolder:dirent.isDirectory() })
})
  res.render('index',{files:filedup});


})
 });

 router.get('/creatfile',function(req,res){
  fs.writeFile(`./uploads/${req.query.filename}`,"",function(err){
    if(err){
      console.log(err)
    }
    else{
      res.redirect("/")
    }
  })
 
 })
 router.get('/creatfolder',function(req,res){
  fs.mkdir(`./uploads/${req.query.foldername}`,function(err){
    if(err){
      console.log(err)
    }
    else{
      res.redirect("/")
    }
  })
 })
 router.get('/file/:filename',function(req,res){
var filename= req.params.filename
 var filedup=[];
fs.readdir("./uploads",{withFileTypes: true},function(err,files){
files.forEach(function(dirent){
  filedup.push({fname : dirent.name, isfolder:dirent.isDirectory() })
})
fs.readFile(`./uploads/${filename}`,"utf8",function(err,data){
     res.render('openfile',{files:filedup , filename:filename,filedata:data})
    
   })
  })
   })
   router.get('/deletefile/:filename',function(req,res){
    fs.unlink(`./uploads/${req.params.filename}`,function(err){
      if(err){
        console.log(err)
      }
      else{
        res.redirect("/")
      }
    })
    fs.rmdir(`./uploads/${req.params.filename}`,function(err){
      if(err){
        console.log(err)
      }
      else{
        res.redirect("/")
      }
    })
   
     })
 
module.exports = router;
