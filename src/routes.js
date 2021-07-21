import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SelectAll from './pages/selectAll/SelectAll';
import SelectById from './pages/selectById/SelectById';



const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={SelectAll}/>
            <Route path="/produtos/:id" component={SelectById}/>
        </Switch>
    </BrowserRouter>
)

export default Routes;