const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require('uuid');
// ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));  // for bootsrap use 


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.static(path.join(__dirname, "public")));


let posts = [
    {
        id: uuidv4(),
        title: "Post 1",
        username: "Anmol Mittal",
        content: "I love Coding.."
    },
    {
        id: uuidv4(),
        title: "Post 2",
        username: "Coder Army.",
        content: "Just here to express my views on coding"
    },
    {
        id: uuidv4(),
        title: "Post 3",
        username: "madhavi_mangal",
        content: "I like to  solve maths"
    },
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
})

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
})

app.post("/posts", (req, res) => {
    let { title, username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, title, username, content });
    res.redirect("/posts");
})

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find(post => post.id === id);
    console.log(post);
    res.render("show.ejs", { post });
})


app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find(post => post.id === id);
    post.content = newContent;

    console.log(post);
    // res.send("patch request sending..");
    res.redirect("/posts");

})

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((post) => post.id === id);
    res.render("edit.ejs", { post });
})

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})

app.listen(port, () => {
    console.log(`listening to the port : ${port}`);
})