const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../authMiddleware');

router.post('/', authMiddleware, async (req, res) => {//ROTA PRIVADA: Processamento de Pedido
    try {
        const { quantidade, preco_unitario, item_id, restaurante_id } = req.body;
        var val_bd = await db('itens_cardapio').where({ id: item_id }).select('preco').first();
        var val_bd = val_bd.preco

        var val_total_bd = val_bd * quantidade;//Total verdadeiro
        var val_total = preco_unitario * quantidade;//total informado

        console.log("val_total_bd = "+val_total_bd);
        console.log("val_total = "+val_total)

        console.log(val_total_bd == val_total);
        if (val_total_bd != val_total) {
            res.status(400).json({ mensagem: "Valor informado incompativel com valor real." });
            return;
        }

        const { id } = await db('usuarios').where({ id: req.usuario.id }).select('id').first();
        var usuario = Number(id);

        const [pedidoId] = await db('pedidos').insert({ status: 'Pendente', valor_total: val_total_bd, usuario_id: usuario, restaurante_id: restaurante_id });
        console.log('Venda cadastrada com sucesso.');

        const [pedido_itens_id] = await db('pedido_itens').insert({ quantidade: quantidade, preco_unitario: val_bd, pedido_id: pedidoId, item_id: item_id });
        console.log('Itens da venda cadastrados com sucesso')


        const pedido_res = await db('pedidos').select('*').where({ id: pedidoId });
        res.status(200).json(pedido_res);
    } catch (err) {
        res.status(500).json({ mensagem: "Erro ao cadastrar venda."+err });
    }
});


module.exports = router;