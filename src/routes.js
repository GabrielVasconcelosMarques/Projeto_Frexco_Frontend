import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SelectAll from './pages/selectAll/SelectAll';
import SelectById from './pages/selectById/SelectById';
import Insert from './pages/insert/Insert';
import Update from './pages/update/Update';
import Delete from './pages/delete/Delete';
import { Home } from './pages/home/Home';



const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/VerProduto" component={SelectAll}/>
            <Route path="/produtos/:id" component={SelectById}/>
            <Route path="/CadastrarProduto" component={Insert}/>
            <Route path="/EditarProduto/:id" component={Update}/>
            <Route path="/DeletarProduto/:id" component={Delete}/>
        </Switch>
    </BrowserRouter>
)

export default Routes;