const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

// Middleware para permitir o recebimento de dados em JSON
app.use(express.json());

// Chave secreta para assinar o token JWT (você pode usar qualquer string)
const SECRET_KEY = 'sua_chave_secreta';

// Rota para gerar o token JWT
app.post('/generate-jwt', (req, res) => {
  const { email, password } = req.body;

  // Aqui você pode validar o usuário. Exemplo básico:
  if (email === 'usuario@exemplo.com' && password === 'senha123') {
    // Dados que vamos incluir no token (payload)
    const payload = {
      email: email,
    };

    // Gerar o token JWT com duração de 1 hora
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    // Retornar o token
    res.json({ token });
  } else {
    // Se o e-mail ou senha estiver errado, retornamos um erro
    res.status(401).json({ error: 'E-mail ou senha inválido' });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
