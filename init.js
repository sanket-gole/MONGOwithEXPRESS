const mongoose = require("mongoose")
const Chat = require("./models/chat.js")

main().then((res) => {

        console.log("Coneection Suceesful")
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}

let allChats = [{
        from: "Sanket",
        to: "Raj",
        msg: "I am good",
        created_at: new Date()
    },
    {
        from: "Coco",
        to: "MOmo",
        msg: "I come today",
        created_at: new Date()
    },
    {
        from: "Ram",
        to: "Sham",
        msg: "Sham is good  boy",
        created_at: new Date()
    },
    {
        from: "Reena",
        to: "meena",
        msg: "Singing a song",
        created_at: new Date()
    },
    {
        from: "Varsh",
        to: "Harsh",
        msg: "Playing Cricket",
        created_at: new Date()
    },
]

Chat.insertMany(allChats);