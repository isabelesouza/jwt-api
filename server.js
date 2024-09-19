const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const Parse = require('parse/node'); 

const app = express();
const port = process.env.PORT || 3000;

// Habilitar CORS 
app.use(cors({
  origin: 'https://comunidade-conectada-modificado.vercel.app' // Permitir apenas este domínio
}));

app.use(express.json());

// Configurar o Parse para se conectar ao Back4App
Parse.initialize("Q3pEcxf79nhzSsRYowq93HY4Eme1upKmQRraBniV", "4peCZEKDyphTZXz1XzvKk9xhHRw2G4KwPqZTEJoz");
Parse.serverURL = 'https://parseapi.back4app.com/';

// Rota para gerar o token JWT após autenticar com o Back4App
app.post('/generate-jwt', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Fazer login no Back4App para verificar o email e a senha
    const user = await Parse.User.logIn(email, password);

    // Se o login for bem-sucedido, gerar o token JWT
    const payload = { email: user.get('email') };
    const token = jwt.sign(payload, 'sua_chave_secreta', { expiresIn: '1h' });

    // Retornar o token JWT para o frontend
    res.json({ token });
  } catch (error) {
    
    res.status(401).json({ error: 'E-mail ou senha inválidos' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
