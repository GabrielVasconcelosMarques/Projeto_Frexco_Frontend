import { Link } from 'react-router-dom';
import './home.css';

export function Home(){
    return(
        <div className="homepage">
            <Link to={"/CadastrarProduto"}>Cadastrar produto</Link>
            <Link to={"/VerProduto"}>Ver produto</Link>
        </div>
    )
}