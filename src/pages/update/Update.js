import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import './update.css';

class EditarProduto extends Component {
    constructor(props) {
        super(props);

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

    // trazendo dados preenchidos nos campos
    async componentDidMount(){
        const {id} = this.props.match.params;
        const response = await axios.get(`http://localhost:3005/sistema/produtos/${id}`);

        // setando dados nos campos para edição
        this.setState({produto: response.data});
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
                        <legend>Editar produto</legend>
                        <div className="field">
                            <label htmlFor="nome">Nome</label>
                            <input type="text" id="nome" name="nome" minLength="3" maxLength="100" require value={this.state.produto.nome} onChange={this.handleInputChange}/>
                        </div>

                        <div className="field-group">
                            <div className="field">
                                <label htmlFor="codigo">Código</label>
                                <input type="number" id="codigo" name="codigo" min="1" max="99999999" require value={this.state.produto.codigo} onChange={this.handleInputChange}/>
                            </div>

                            <div className="field">
                                <label htmlFor="categoria">Categoria</label>
                                <input type="text" id="categoria" name="categoria" minLength="3" maxLength="100" require value={this.state.produto.categoria} onChange={this.handleInputChange}/>
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

                    <div className="baack">
                        <button type="submit">Atualizar</button>
                        <Link className="delete-button" to={"/VerProduto"}>Voltar</Link>
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
        const {id} = this.props.match.params;

        // ir no backend, e setar novos dados pelo put
        fetch(`http://localhost:3005/sistema/produtos/${id}`, {
            method: "put",
            id: id,
            body: JSON.stringify(this.state.produto),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(data => {
            if(data.ok){
                this.setState({redirect: true});
            }
        })

        event.preventDefault();
    }
}

export default EditarProduto;