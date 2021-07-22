import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import './venda.css';

class VenderProduto extends Component {
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
                        <legend>Vender produto</legend>
                            <div className="field">
                                <label htmlFor="quantidade">Quantidade</label>
                                <input type="number" id="quantidade" name="quantidade" min="1" max="99999999" require value={this.state.produto.quantidade} onChange={this.handleInputChange}/>
                            </div>
                    
                    </fieldset>
                    <div className="article">
                        <button type="submit">Vender</button>
                        <Link className="back-To_product" to={"/VerProduto"}>Voltar</Link>
                    </div>
                </form>
            )
        }
    }

    
    handleInputChange = event => {
        const target = event.target;

        // pegando valor do campo digitado
        const value = target.value;
        

        //const valuenew = parseInt(this.state.produto.quantidade) - parseInt(value);

        //setando para cada valor anterior o novo valor que corresponde aos nomes e valores pegos do formulario
        this.setState({produto: {quantidade: value}})


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

export default VenderProduto;