const express = require("express");
const app = express();

const mongoose = require("mongoose")
const path = require("path")
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }));
const methodoverride = require("method-override");
app.use(methodoverride("_method"));

const Chat = require("./models/chat.js")

main().then((res) => {

        console.log("Coneection Suceesful")
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}


// let chat1 = new Chat({
//     from: "Sanket",
//     to: "Raj",
//     msg: "I am good",
//     created_at: new Date()
// });

// chat1.save().then((res) => {
//     console.log(res)
// }).catch((err) => {
//     console.log(err)
// })



app.get("/chats", async(req, res) => {
    let chats = await Chat.find();
    // console.log(chats);
    res.render("index.ejs", {
        chats
    });
});

app.get("/chats/new", (req, res) => {
    res.render("new.ejs")

})

app.post("/chats", (req, res) => {
    let { from, to, msg } = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()

    })
    newChat.save().then(res => { console.log("Chat was saved") }).catch(err => {
        console.log(err)
    })
    res.redirect("/chats")
});

app.get("/chats/:id/edit", async(req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", { chat });
})

app.put("/chats/:id", async(req, res) => {
    let { id } = req.params;
    let { msg: newMsg } = req.body;
    let Updatechat = await Chat.findByIdAndUpdate(id, { msg: newMsg }, {
        runValidators: true,
        new: true
    });
    res.redirect("/chats")
});

app.delete("/chats/:id", async(req, res) => {
    let { id } = req.params;
    let deletedchat = await Chat.findByIdAndDelete(id);
    res.redirect("/chats")
})

app.get("/", (req, res) => {
    res.send("Working")
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listen 3000 port`)
})