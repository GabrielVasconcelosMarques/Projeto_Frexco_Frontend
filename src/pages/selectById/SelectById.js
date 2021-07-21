import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './selectById.css';

export default class Produto extends Component {
    state = {
        produto: {
            codigo: 0,
            nome: "",
            categoria: "",
            valor: 0,
            quantidade: 0,
            registro: ""
        }
    }

    // Chamando a população de registros
    async componentDidMount(){

        // pegando o id pelo parametro 
        const {id} = this.props.match.params;
        const response = await axios.get(`http://localhost:3005/sistema/produtos/${id}`);

        // preenchendo o estado produto
        this.setState({ produto: response.data });
    }

    render(){
        const { produto } = this.state;
        return (
            <div className="principal">
                <div className="dados">
                    <h1>Código: {produto.codigo}</h1>
                    <h1>Nome: {produto.nome}</h1>
                    <h1>Categoria: {produto.categoria}</h1>
                    <h1>R$: {produto.valor}</h1>
                    <h1>Quantidade: {produto.quantidade} </h1>
                    <h1>Data do registro: {produto.registro} </h1>
                </div>
                <div className="botoes">
                    <Link className="voltar" to={'/'}>Voltar</Link>
                    <Link className="editar" to={`/EditarProduto/${produto.id}`}>Editar</Link>
                    <Link className="excluir" to={`/DeletarProduto/${produto.id}`}>Excluir</Link>
                </div>
            </div>
        )
    }
}