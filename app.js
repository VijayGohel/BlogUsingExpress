const express = require("express");
const bodyparser = require("body-parser");
const _ = require('lodash');

const app = express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));

app.set("view engine","ejs");

const posts=[];

app.listen(3000, ()=>{
    console.log("Server started on port 3000");
})

app.get("/",(req,res)=>{
    res.render("home",{todoItems:posts}
    );
})

app.get("/compose",(req,res)=>
{
    res.render("compose",{})
})

app.get("/contact",(req,res)=>
{
    res.render("contact",{})
})

app.get("/about",(req,res)=>
{
    res.render("about",{})
})

app.get('/posts/:postTitle', (req, res) => {
    function findPost(post) {
        return _.kebabCase(post.title) === _.kebabCase(req.params.postTitle);
      }
      const found = posts.find(findPost);

      if(found != undefined)
        res.render("post",{Post:found});
      else
        res.send("ERROR 404! post not found");
  })

app.post("/", (req,res)=>{
    
    let postTitle =req.body.title;
    let postContent = req.body.content;
    postTitle = postTitle;

    if(postContent !='' || postTitle !='')
        posts.push({title: postTitle, content:postContent});

    console.log(posts);

    res.redirect("/");
})