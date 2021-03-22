    //import exppress,body-parser
    const express = require('express');
    const bodyParser = require('body-parser');
    const mongoose = require('mongoose');
    const accountRoutes = require('./routes/accountRoute')
    const bankRoutes = require ('./routes/bankRoutes')
    const userRoutes = require('./routes/userRoute')



    //instance express
    const server =express();

    //midleware
    server.use(bodyParser.json());

    //routes
    server.use(accountRoutes);
    server.use(bankRoutes);
    server.use(userRoutes);

    //start server
    mongoose.connect(
    'mongodb+srv://joel-alabi:alabi123456789@cluster0.fgdqd.mongodb.net/bank?retryWrites=true&w=majority', 
    {useNewUrlParser: true,useUnifiedTopology: true}).then(result => {
        server.listen(3000,()=> console.log('server is ready'))
    }).catch (err => console.log(err))  


