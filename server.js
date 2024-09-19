const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors'); // Importar o CORS

const app = express();
const port = 3000;

// Habilitar CORS 
app.use(cors());

app.use(express.json());


const SECRET_KEY = 'sua_chave_secreta';

// Rota para gerar o token JWT
app.post('/generate-jwt', (req, res) => {
  const { email, password } = req.body;

  
  if (email === 'usuario@exemplo.com' && password === 'senha123') {
    const payload = { email };

    // Gerar o token JWT com validade de 1 hora
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'E-mail ou senha inválidos' });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
