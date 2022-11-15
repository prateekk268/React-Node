if (process.env.NODE_ENV != "production") {
    require("dotenv").config()
}

const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const app = express();

const initializePassport = require("./passport-config");

initializePassport(
    passport,
    (email) => users.find(users => users.email === email),
    (id) => users.find(users.id === id)
)



const users = [];

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.set("view-engine", "ejs")
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())


app.get("/", (req,res)=>{
    res.send("hello again ")
})

app.get("/home", checkAuthenticated ,(req, res) => {
    res.render("index.ejs", { name: "Prateek" });
});

app.get("/login", (req, res) => {
    res.render("login.ejs");
});

app.get("/register", (req, res) => {
    res.render("register.ejs");
});

app.post("/register", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        console.log(users);
        return res.redirect("/login")
    } catch (error) {
        return res.redirect("/register");
    }

});

app.post("/login", passport.authenticate("local", {
    successRedirect : "/home",
    failureRedirect : "/login",
    failureFlash : true
}
))

function checkAuthenticated(req,res,next){
    if(req.isAuthenticated()) return next();

    res.redirect("/login"); 
}

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Node is Running");
})