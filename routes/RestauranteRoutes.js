const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../authMiddleware');

router.get('/', async (req, res) => {//// ROTA PÚBLICA: Lista os restaurantes disponíveis.
    try {
        const restaurantes = await db('restaurantes').select('*');
        res.status(200).json(restaurantes);
    } catch (err) {
        res.status(500).json({ mensagem: "Erro ao buscar restaurantes." });
    }
});

router.get('/:id/cardapio', async (req, res) => {// ROTA PÚBLICA: Lista os itens de um restaurante específico.
    var id_restaurante = req.params.id;
    
    try {
        var answ = await db('itens_cardapio').where({restaurante_id: req.params.id})
        res.status(200).json(answ);
    } catch (err) {
        res.status(500).json({ mensagem: "Erro ao buscar restaurantes."});
    }
});

module.exports = router;