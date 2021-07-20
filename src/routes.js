import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SelectAll from './pages/selectAll/SelectAll';



const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={SelectAll}/>
        </Switch>
    </BrowserRouter>
)

export default Routes;