import React, { Component } from 'react';
import './insert.css';
import { Redirect, Link } from 'react-router-dom';

class CriarProduto extends Component {
    constructor(){
        super();

        this.state = {
            produto : {
                codigo: 0,
                nome: "",
                categoria: "",
                valor: 0,
                quantidade: 0
            },
            redirect: false,
        }
    }

    render() {
        const {redirect} = this.state;

        //verificar se o redirect é verdadeiro
        if(redirect){
            return <Redirect to="/VerProduto" />
        } else {
            return(
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Cadastrar novo produto</legend>
                        <div className="field">
                            <label htmlFor="nome">Nome</label>
                            <input type="text" id="nome" name="nome" placeholder="Insira o nome do produto" minLength="3" maxLength="100" require value={this.state.produto.nome} onChange={this.handleInputChange}/>
                        </div>

                        <div className="field-group">
                            <div className="field">
                                <label htmlFor="codigo">Código</label>
                                <input type="number" id="codigo" name="codigo" min="1" max="99999999" require value={this.state.produto.codigo} onChange={this.handleInputChange}/>
                            </div>

                            <div className="field">
                                <label htmlFor="categoria">Categoria</label>
                                <input type="text" id="categoria" name="categoria" placeholder="Insira a categoria do produto" minLength="3" maxLength="100" require value={this.state.produto.categoria} onChange={this.handleInputChange}/>
                            </div>
                        </div>

                        <div className="field-group">
                            <div className="field">
                                <label htmlFor="valor">Valor</label>
                                <input type="number" id="valor" name="valor" min="0" max="99999999" step="0.01" require value={this.state.produto.valor} onChange={this.handleInputChange}/>
                            </div>

                            <div className="field">
                                <label htmlFor="quantidade">Quantidade</label>
                                <input type="number" id="quantidade" name="quantidade" min="1" max="99999999" require value={this.state.produto.quantidade} onChange={this.handleInputChange}/>
                            </div>
                        </div>
                    </fieldset>

                    <div className="back">
                        <button type="submit">Cadastrar</button>
                        <Link className="back-to-home"to={"/"}>Voltar</Link>
                    </div>

                </form>
            )
        }
    }

    handleInputChange = event => {
        const target = event.target;

        // pegando nome do campo digitado
        const name = target.name;

        // pegando valor do campo digitado
        const value = target.value;

        //setando para cada valor anterior o novo valor que corresponde aos nomes e valores pegos do formulario
        this.setState(prevState => ({
            produto: {...prevState.produto, [name]: value}
        }))

    };

    handleSubmit = event => {
        fetch("http://localhost:3005/sistema/produtos", {
            method: "post",
            body: JSON.stringify(this.state.produto),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(data => {
            if(data.ok) {
                this.setState({redirect: true})
            }
        })

        event.preventDefault();
    }

}

export default CriarProduto;