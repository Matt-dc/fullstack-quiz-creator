const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const multer = require('multer');
const cors = require('cors');


PORT = process.env.PORT || 5000

DB_URL = process.env.NODE_ENV === 'production' ? 
    process.env.DB_URL : 
    'mongodb://localhost/quizzes'

mongoose.connect(DB_URL)
const db = mongoose.connection;

db.once('open', () => console.log('successful connection'));
db.on('error', console.error.bind(console, 'connection error'));


const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './uploads')
    },
    filename: function(req, file, callback) {
        callback(null, new Date().toISOString() + file.originalname)
    }
})


const fileFilter = (req, file, callback) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callback(null, true)
    } else {
        callback(null, false)
    }
}

const upload = multer({ storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));  

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.use('/uploads', express.static('uploads'))

app.use(express.static(path.join(__dirname, "client", "build")))

app.use(cors());

const QuizSchema = new mongoose.Schema({
    quizName: {type: String },
    quizImage: String,
    creator: {type: String },
    topic: {type: String},
    difficulty: String,
    completed: { type: Boolean, default: false },
    quiz: Array,
})

const Quiz = mongoose.model('Quiz', QuizSchema)

// ##########################
// ######## ROUTES #########
// #########################


app.get('/', async (req, res) => {
    const quizzes = await Quiz.find({})

    res.send(quizzes)

})

app.get('/search/:topic', async (req, res) => {
    const quizzes = await Quiz.find({topic: req.params.topic})
        res.send(quizzes)
})

app.get('/:id', (req, res) => {
    const id = req.params.id;
    Quiz.findById(id)
    .then(quiz => {
        res.send(quiz)
    })
})

app.put('/edit/:id', upload.array('images'), (req, res) => {

    const parsed = JSON.parse(req.body.quiz)

    req.body.quiz = parsed

    const updatedQuiz = req.body;
    const id = req.params.id;
    const files = req.files

    if (files.length > 0) {   
        
        if(req.body.quizImage === req.files[0].originalname) {
            req.body.quizImage = req.files[0].path
        } 
        
        req.body.quiz.map(q => {
            for( file in req.files) {
                if (q.imageName === req.files[file].originalname){
                    q.imageName = req.files[file].path
                }
            }
        })

    } else if (req.files && req.files.length === 1) {

        if(req.body.quizName == req.files[0].originalname) {
            req.body.quizImage = req.files[0].path
        } 
        else {

            req.body.quiz.map(q => {
                for( file in req.files) {
                    if (q.imageName === req.files[file].originalname){
                        q.imageName = req.files[file].path
                    }
                }
            })
        }
    }

    Quiz.findOneAndUpdate({ _id: id }, updatedQuiz, {new: true}, (err, doc) => {
        if(err) {
            return res.send(err)
        } else {
            res.send(doc)
        }
        })
        console.log(req.body.quizImage)
    })

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    Quiz.findByIdAndRemove(id, (err, user) => {
        const response = {
            message: "Quiz successfullly deleted",
            id: req.params.id
        }
        res.send(response)
    })
})
  

app.post('/create', upload.array('images', 20), (req, res) => {
    
    const parsed = JSON.parse(req.body.quiz) 

    req.body.quiz = parsed

    // check if user has uploaded a quiz image, if not, keep the default
    const arr = req.body.quizImage.split("-")

    if(arr[0] !== "topic") {
        req.body.quizImage = req.files[0].path
    } 

    req.body.quiz.map(q => {
       for( file in req.files) {
           if (q.imageName === req.files[file].originalname){
                q.imageName = req.files[file].path
           }
       }
    })

   var newQuiz = new Quiz(req.body);
   newQuiz.save()
    .then(response =>{
        res.send(response)
    })
    .catch(err => {
        res.send(response)
    })
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });  


app.listen(PORT, () => console.log('running on 5000'))
