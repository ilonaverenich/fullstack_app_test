//mongodb+srv://ilonaverenich:CiCvsYz7KuoJKMan@cluster0.gkclzup.mongodb.net/mongoDB-test'
const express = require ('express');
const app = express();
const mongoose = require('mongoose')
const multer = require('multer');
const cors = require('cors');
const {userShema} = require('./User')
const jwt = require('jsonwebtoken');
app.use(express.urlencoded({ extended: true }));
const upload = multer({ dest: 'uploads/' });



const User = mongoose.model('User',userShema)
app.use(express.json())
app.use(cors());

mongoose.connect("mongodb+srv://ilonaverenich:CiCvsYz7KuoJKMan@cluster0.gkclzup.mongodb.net/mongoDB-test")
.then(()=>{
    try{
        console.log('База данных подключена')

    } catch(err){
        console.log('Ошибка с подключением к базе данных',err)
    }
    
})

function createToken(userId) {
  const secretKey = 'your-secret-key'; // Замените на свой секретный ключ
  const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' }); // Установите срок действия токена, например, 1 час
  return token;
}
app.post('/login', (req, res) => {
  // Проверка ваших условий аутентификации и авторизации
  // Если аутентификация успешна, создайте токен
  const userId = '1234'; // Замените на фактический идентификатор пользователя
  const token = createToken(userId);
  res.json({ token });
});

  app.post('/', (req, res) => {
    const { name, email } = req.body;
  
    User.findOne({ name })
      .then((user) => {
        if (user) {
          console.log('Такое имя уже есть');
        } else {
          User.create({
            name: name,
            email: email
          })
            .then(() => {
              console.log('Запись добавлена в телефонную книгу');
              User.find().then((users) => console.log(users));
            })
            .catch((error) => {
              console.error('Ошибка при создании записи', error);
            });
        }
      })
      .catch((error) => {
        console.error('Ошибка при поиске пользователя', error);
      });
  });  

 app.get('/data', (req, res) => {
    User.find()
      .then((users) => {
        res.send(users)
      })
      .catch((error) => {
        console.error('Ошибка при получении данных', error);
        res.status(500).json({ error: 'Ошибка при получении данных' });
      });
  });



app.use('/img',upload.single('img'),(req,res)=>{
    const {name, message} = req.body;
    const img = req.file;
    console.log(img)
    res.send('Успешно все отправлено')
    
})



app.listen(1000,()=>console.log('server has been started'))