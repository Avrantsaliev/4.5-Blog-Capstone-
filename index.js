import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const posts = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

/**
 * Render Routes
 */
app.get("/", (req, res) => {
    res.render("index.ejs", {posts: posts});
});

app.post("/add", (req, res) => {

    const postTitle = req.body.title;
    const postMessage = req.body.message;

    posts.push({
        "title" : postTitle, 
        "message" : postMessage
    });

    res.render("index.ejs", {posts: posts});
});

app.get("/delete", (req, res) => {

    const postid = req.query.id;
    const removedElement = posts.splice(postid, 1);

    res.render("index.ejs", {posts: posts});
});

app.get("/edit", (req, res) => {

    const postid = req.query.id;
    const currentPost = posts[postid];
    console.log(currentPost);

    // const title = currentPost.title;
    // const message = currentPost.message;

    res.render("index.ejs", {title: currentPost.title, message: currentPost.message});
});


/** 
 * Listen on port 3000 
 */
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});