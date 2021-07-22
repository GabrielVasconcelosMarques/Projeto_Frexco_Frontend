import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './selectAll.css';


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

    async loadProdutos(page = 1) {
        const response = await axios.get(`http://localhost:3005/sistema/produtos?page=${page}`);
        const {docs, ...produtosInfo} = response.data;
        
        // setando os dados
        this.setState ({ produtos: docs, produtosInfo, page });
    };

    voltarPagina = () => {
        const {page} = this.state;
        if(page === 1) {
            return
        }

        const pageNumber = page - 1;
        this.loadProdutos(pageNumber);
    }

    avancarPagina = () => {
        const {page, produtosInfo} = this.state;
        if(page === produtosInfo.pages) {
            return
        }

        const pageNumber = page + 1;
        this.loadProdutos(pageNumber);
    }

    // renderizando todos os elementos retornados pelo backend
    render() {
        const { produtos, produtosInfo, page } = this.state;
        return (
            <div>
                <div className="main">
                    {this.state.produtos.map(produto => (
                        <article key={produto._id}>
                            <strong>{produto.nome}</strong>
                            <p>${produto.valor}</p>
                            <p>Qtde: {produto.quantidade}</p>
                            <p><Link to={`/produtos/${produto._id}`}>Ver produto</Link></p>
                        </article>
                    ))}
                </div>
                <div className="botoes">
                        <button disabled={page===1} onClick={this.voltarPagina}>Anterior</button>
                        <button disabled={page===produtosInfo.pages} onClick={this.avancarPagina}>Próxima</button>
                        <Link className="back-To-Home" to={"/"}>Home</Link>
                    </div>
            </div>
        )
    }
}