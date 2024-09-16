const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

// Middleware para receber JSON no corpo da requisição
app.use(express.json());

// Chave secreta para assinar o JWT
const SECRET_KEY = 'sua_chave_secreta';

// Definir a rota /generate-jwt para gerar o token JWT
app.post('/generate-jwt', (req, res) => {
  const { email, password } = req.body;

  // Exemplo básico de validação de usuário
  if (email === 'usuario@exemplo.com' && password === 'senha123') {
    const payload = { email: email };

    // Gerar o token JWT com validade de 1 hora
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    // Retornar o token JWT como resposta
    res.json({ token });
  } else {
    // Retornar erro 401 se as credenciais estiverem incorretas
    res.status(401).json({ error: 'E-mail ou senha inválidos' });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
