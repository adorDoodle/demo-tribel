const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
const fs = require("fs");


app.use(express.static(
    path.resolve(__dirname, '..', 'build')
));

app.listen(PORT, (error) => {
    if (error) {
        return console.log('Error during app startup', error);
    }
    console.log("listening on " + PORT + "...");
    console.log("ddd", express.static(path.resolve(__dirname, '..', 'build')));
    console.log("ddd eee", path.resolve(__dirname, '..', 'build'))
});

const indexPath = path.resolve(__dirname, '..', 'build', 'index.html');


// app.get('^/posts/:id', (req, res, next) => {
//     // app.get('/*', (req, res, next) => {
//     fs.readFile(indexPath, 'utf8', (err, htmlData) => {
//         if (err) {
//             console.error('Error during file reading', err);
//             return res.status(404).end()
//         }

//         console.log("=== posts")
//         // get post info
//         const postId = req?.params?.id;
//         console.log('postId', postId)
//         // const postId = req.params.id;
//         // const postId = req.params.id;
//         // const post = getPostById(postId);
//         // if (!post) return res.status(404).send("Post not found");

//         // inject meta tags
//         htmlData = htmlData.replace(
//             "<title>Ador Ador</title>"
//         )
//             .replace('__META_OG_TITLE__', "Ador Ador")
//             .replace('__META_OG_DESCRIPTION__', "Ador Ador")
//             .replace('__META_DESCRIPTION__', "Ador Ador")
//             .replace('__META_OG_IMAGE__', "Ador Ador")
//         return res.send(htmlData);
//     });
// });


app.get('^/*', (req, res, next) => {
    fs.readFile(indexPath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('Error during file reading', err);
            return res.status(404).end()
        }
        console.log('===REQ', req)

            // var fetchedData= await fetch('https://jsonplaceholder.typicode.com/todos/1')
            // .then(response => response.json())
            // .then(json => console.log(json))

            // var fetchedData = ''

            (async () => {
                const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
                const body = await response.json();
                console.log("===body", body);
                // inject meta tags
                htmlData = htmlData.replace(
                    "<title>React App</title>",
                    `<title>${body.title}</title>`
                )
                    .replace('__META_OG_TITLE__', `${body.title}`)
                    .replace('__META_OG_DESCRIPTION__', "Join Tribel social network today. It’s free and always will be.")
                    .replace('__META_DESCRIPTION__', "Join Tribel social network today. It’s free and always will be.")
                    .replace('__META_OG_IMAGE__', "https://tribelcdn.com/public/uploads/post_images/Tribel_logo.png")
                return res.send(htmlData);
            })();


        // // inject meta tags
        // htmlData = htmlData.replace(
        //     "<title>React App</title>",
        //     `<title>Tribel Dynamic Meta</title>`
        // )
        //     .replace('__META_OG_TITLE__', "I recommend Tribel, a new pro-democracy alternative to Facebook and Twitter.")
        //     .replace('__META_OG_DESCRIPTION__', "Join Tribel social network today. It’s free and always will be.")
        //     .replace('__META_DESCRIPTION__', "Join Tribel social network today. It’s free and always will be.")
        //     .replace('__META_OG_IMAGE__', "https://tribelcdn.com/public/uploads/post_images/Tribel_logo.png")
        // return res.send(htmlData);
    });
});

