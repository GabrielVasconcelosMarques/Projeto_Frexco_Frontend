import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import './delete.css';

class DeletarProduto extends Component {
    constructor(props){
        super(props);

        this.state = {
            produto: {},
            redirect: false
        }
    }

    // mostrar ao usuário o usuário a ser deletado
    async componentDidMount(){
        const {id} = this.props.match.params;
        const response = await axios.get(`http://localhost:3005/sistema/produtos/${id}`);
        this.setState({produto: response.data});
    }

    render(){
        const {redirect} = this.state;

        if(redirect){
            return <Redirect to={"/"} />
        } else {
            return(
                <div>
                    <div className="delete-area">
                        <h1>Deletar produto</h1>
                        <span className="delete-title">Nome do produto</span>
                        <span>{this.state.produto.nome}</span>
                        <span className="delete-title">Código</span>
                        <span>{this.state.produto.codigo}</span>
                        <p>Você realmente deseja deletar esse produto? </p>
                    </div>
                    <div className="delete-botao-area">
                        <button onClick={this.handleClick}>Deletar</button>
                        <Link className="delete-button" to={"/"}>Voltar</Link>
                    </div>
                </div>
            )
        }
    }

    handleClick = event => {
        const {id} = this.props.match.params;

        fetch(`http://localhost:3005/sistema/produtos/${id}`, {
            method: "delete"
        })
        .then(data => {
            if(data.ok){
                this.setState({redirect: true})
            }
        })

        event.preventDefault();
    }
}

export default DeletarProduto;