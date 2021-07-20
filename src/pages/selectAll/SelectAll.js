import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/services';
import axios from 'axios';


export default class Produtos extends Component {

    // Definindo estado
    state = {
        produtos: [],
        produtosInfo: {},
        page: 1
    };

    // exibir produtos na tela ao serem carregados
    componentDidMount(){
        this.loadProdutos();
    };

    loadProdutos = async (page = 1) => {
        const response = await axios.get(`http://localhost:3005/sistema/produtos?page=${page}`);
        const {docs, ...produtosInfo} = response.data;
        

        this.setState ({ produtos: docs, produtosInfo, page });
    }

    // renderizando todos os elementos retornados pelo backend
    render() {
        const { produtos, produtosInfo, page } = this.state;
        return (
            <div>
                {this.state.produtos.map(produto => (
                    <article key={produto._id}>
                        <strong>{produto.nome}</strong>
                        <p>{produto.valor}</p>
                    </article>
                ))}
            </div>
        )
    }
}