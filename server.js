let express = require('express');
let app = express();
let port = process.env.port || 3000;

app.use(express.static(__dirname+'/'));
app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req,res)=>{
    res.render('index.html');
});

const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://dhash:DILU1234hashi@cluster0.c5mwu4v.mongodb.net/test';
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('MongoDB connection error:', error));

    const formDataSchema = new mongoose.Schema({
        first_name: String,
        last_name: String,
        password: String,
        email: String,
    });
    
    const FormDataModel = mongoose.model('FormData', formDataSchema);

    app.post('/submit-form', async (req, res) => {
        const formData = req.body;
    
        try {
            const savedFormData = await FormDataModel.create(formData);
            console.log("Form Data Submitted and Saved: ", savedFormData);
            res.status(201).json(savedFormData);
        } catch (error) {
            console.error("Error saving form data:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
    

app.listen(port, ()=>{
    console.log("Server Started");
}); // this is the logic that will fired upon server start

