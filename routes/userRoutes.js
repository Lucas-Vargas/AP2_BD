const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../authMiddleware'); 

router.post('/cadastro', async (req, res) => {// ROTA PÚBLICA: Para criar novos clientes
    try {
        const { email, senha } = req.body;
        if (!email || !senha) {
            return res.status(400).json({ mensagem: 'Email e senha são obrigatórios.' });
        }
        const saltRounds = 10;
        const hashSenha = await bcrypt.hash(senha, saltRounds);
        const [novoUsuario] = await db('usuarios')
            .insert({ email: email, senha: hashSenha })
            .returning(['id', 'email']);
        res.status(201).json(novoUsuario);
    } catch (error) {
        if (error.code === '23505' || error.message.includes('UNIQUE constraint failed')) {
            return res.status(400).json({ mensagem: 'Este email já está em uso.' });
        }
        res.status(500).json({ mensagem: 'Erro no servidor: ' + error.message });
    }
});

router.post('/login', async (req, res) => {// ROTA PÚBLICA: Deve retornar um Token JWT válido
    try {
        const { email, senha } = req.body;
        if (!email || !senha) {
            return res.status(400).json({ mensagem: 'Email e senha são obrigatórios.' });
        }
        const usuario = await db('usuarios').where({ email }).first();
        if (!usuario) {
            return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
        }
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
        if (!senhaCorreta) {
            return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
        }
        // 1. Definimos o Payload (o que vai dentro do token)
        const payload = { id: usuario.id, email: usuario.email };
        // 2. Assinamos o token com nosso segredo
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET, // Nosso segredo do .env
            { expiresIn: '1h' } // Token expira em 1 hora
        );
        // 3. Retornamos o token para o cliente
        res.status(200).json({
            mensagem: 'Login bem-sucedido!',
            token: token // O cliente deve salvar este token
        });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro no servidor: ' + error.message });
    }
});

router.get('/meu-perfil', authMiddleware, async (req, res) => {// ROTA PRIVADA: Buscar Perfil do Usuário
    try {
        // Graças ao middleware, temos acesso ao 'req.usuario'
        const usuario = await db('usuarios')
            .where({ id: req.usuario.id })
            .select('id', 'email') // NUNCA retorne a senha!
            .first();
        if (!usuario) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro no servidor: ' + error.message });
    }
});

module.exports = router;