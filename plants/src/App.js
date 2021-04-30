import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/App.css';

import AddPlantForm from './components/AddPlantForm.js'
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ProtectedRoute from './utils/ProtectedRoute';
import ViewPlants from './components/ViewPlants';
import { EditPlant } from './components/editPlantForm';

function App() {
    return (
        <Router>
        {/* the nav will be removed when things get fixed, it'll be here for testing purposes */}
        {/* <Nav logout={logout}/>  */}
        <div>
        <section className="App-body">
            <Switch>
                <Route exact path='/' component={SignIn} />
                <Route path='/sign-up' component={SignUp}/>
                <ProtectedRoute 
                    exact path='/add-plant' 
                    component={AddPlantForm} >
                </ProtectedRoute>
                <ProtectedRoute 
                    exact path='/my-plants' 
                    component={ViewPlants}>
                </ProtectedRoute>
                {/* so we can view an individual plant based on its id*/}
                <ProtectedRoute 
                    path='/my-plants/:id'
                    component={EditPlant} >
                </ProtectedRoute>
                <ProtectedRoute 
                    path='/edit-plant/'
                    component={EditPlant} >
                </ProtectedRoute>
                
            </Switch>
        </section>
        </div>
        </Router>
    );
}

export default App;
