const express = require("express");
const bodyparser = require("body-parser");
const mongoose= require("mongoose");

const app = express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));

app.set("view engine","ejs");

// const posts=[];
mongoose.connect("mongodb://localhost:27017/TodoList");

const postSchema = {
    title:String ,
    content:String
}

const Post = mongoose.model("Post", postSchema);



app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server started on port 3000");
})

app.get("/",(req,res)=>{
    Post.find((err,posts)=>{
        if(!err)
            res.render("home",{todoItems:posts});
    })
    
})

app.get("/compose",(req,res)=>
{
    res.render("compose");
})

app.get("/contact",(req,res)=>
{
    res.render("contact")
})

app.get("/about",(req,res)=>
{
    res.render("about")
})

app.get('/posts/:postId', (req, res) => {
       Post.find({_id : req.params.postId},(err,found)=>{     
        if(found != undefined)
            res.render("post",{Post:found[0]});
        else
            res.render("error404");
       });

      
  })

 app.get('*', function(req, res){
    res.render('error404');
 });

app.post("/", (req,res)=>{
    
    let postTitle =req.body.title;
    let postContent = req.body.content;

    if(postContent !='' || postTitle !=''){
        // posts.push({title: postTitle, content:postContent});
        const post = new Post({title:postTitle , content:postContent });
        post.save((err)=>{
            if(!err)
                res.redirect("/");
        });
    }
})