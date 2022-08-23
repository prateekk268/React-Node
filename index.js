const express = require('express');
const app = express();
const PORT = 3000;
const friendsRouter = require('./routes/friendsRoute');
const pic = require('./controllers/photo')


app.use((req,res,next)=>{
    const start = Date.now();
    next();
    const delta = Date.now() - start;
    console.log(`${req.method} ${req.baseUrl} ${req.url} ${delta}`);
});

app.use(express.json());

app.use('/', friendsRouter);
app.get('/', pic.getPic);

app.listen(PORT, ()=>{
    console.log(`Listening on ${PORT}....`);
});