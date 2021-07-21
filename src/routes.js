import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SelectAll from './pages/selectAll/SelectAll';
import SelectById from './pages/selectById/SelectById';
import Insert from './pages/insert/Insert';
import Update from './pages/update/Update';



const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={SelectAll}/>
            <Route path="/produtos/:id" component={SelectById}/>
            <Route path="/CadastrarProduto" component={Insert}/>
            <Route path="/EditarProduto/:id" component={Update}/>
        </Switch>
    </BrowserRouter>
)

export default Routes;