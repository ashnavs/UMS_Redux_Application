const express = require('express');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware');
const connectDB = require('./config/db')
const port = process.env.PORT || 5000; 

connectDB()


const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/user', require('./routes/userRoutes'))
app.use('/api/goal', require('./routes/goalRoute'))
app.use('/api/admin', require('./routes/adminRoutes'))



app.use(errorHandler)

app.listen(port, () => console.log(`server running on port http://localhost:${port}`));
 