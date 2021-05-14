const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/errorHandler');

app.use(cors());
app.options('*', cors());

//middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'))
app.use(errorHandler);

//Routes
const categoriesRoutes = require('./routers/categories');
const productsRoutes = require('./routers/products');
const userRoutes = require('./routers/users');
const orderRoutes = require('./routers/orders');

const api = process.env.API_URL;

app.use(`${api}/products`, productsRoutes)
app.use(`${api}/categories`, categoriesRoutes)
app.use(`${api}/users`, userRoutes)
app.use(`${api}/orders`, orderRoutes)


//database connection
mongoose.connect(process.env.CONNECT_STRING, {
    dbName : 'eshop-database', 
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(()=>{
    console.log('Database Connection is ready...');
})
.catch((err)=>{
    console.log(err);
})

//development
//app.listen(3000);

//production

var server = app.listen(process.env.PORT || 3000, function (){
    var port = server.address().port;
    console.log('Express is working on port' + port);
});
