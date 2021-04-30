import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/App.css';

import AddPlantForm from './components/AddPlantForm.js'
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ProtectedRoute from './utils/ProtectedRoute';
import ViewPlants from './components/ViewPlants';
import { EditPlant } from './components/editPlantForm';
import {Plants as Plantcard} from './components/Plantcard';

function App() {
    return (
        <Router>
        <div>
            <section className="App-body">
                <Switch>
                    <Route exact path='/' component={SignIn} />
                    <Route path='/sign-up' component={SignUp}/>
                    <ProtectedRoute 
                        exact path='/add-plant' 
                        component={AddPlantForm} >
                    </ProtectedRoute>
                    <Route 
                        exact path='/my-plants' 
                        component={ViewPlants}>
                    </Route>
                    {/* so we can view an individual plant based on its id*/}
                    <Route 
                        path='/my-plants/:id'
                        component={Plantcard} >
                    </Route>
                    <Route 
                        path='/edit-plant/:id'
                        component={EditPlant} >
                    </Route>
                </Switch>
            </section>
        </div>
        </Router>
    );
}

export default App;
