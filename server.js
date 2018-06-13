const express = require('express');
const app = express();
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');



const dbURI = require('./config/keys').mongoURI;
mongoose.connect(dbURI).then(() => {
    console.log('db connected');
}).catch((err) => console.log(err));
app.get('/', (req, res) => {
    res.send('Hello156756');
})


//api routes
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profile', profile);


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server running on ${port}`);
})