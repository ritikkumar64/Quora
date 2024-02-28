const express = require("express");
const app = express();
const port = 8000;
const path = require("path");
const {v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

app.use(express.urlencoded({extended: true }));
app.use(methodOverride('_method'));

app.set("views engine", "ejs");
app.set("views",path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username : "Spiderman",
        content : "Your friendly neighborhood Spider-Man.",
    },
    {
        id: uuidv4(),
        username : "Tony Stark's",
        content : "I am Iron Man",
    },
    {
        id: uuidv4(),
        username : " Captain America's ",
        content : " I can do this all day.",
    },
];




app.get("/posts", (req, res) =>{
    res.render("index.ejs", {posts} );
});

app.get("/posts/new", (req, res) =>{
   res.render("new.ejs");
});

app.post("/posts",(req, res) =>{
  let {username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content});
  res.redirect("/posts");
});

app.get("/posts/:id",(req, res) =>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res ) =>{
    let {id} = req.params;
    let newcontent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newcontent;
    console.log(post);
    res.redirect("/posts"); 
});

app.get("/posts/:id/edit",(req, res) =>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {posts});


}); 

app.delete("/posts/:id",(req, res) =>{
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts"); 
});
app.listen(port, () =>{
    console.log("listening to port : 8000" );
});