import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import './styles/App.css';
import AddPlantForm from './components/AddPlantForm.js'
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ProtectedRoute from './utils/ProtectedRoute';
import ViewPlants from './components/ViewPlants';
import { EditPlant } from './components/editPlantForm';

function App() {
    const logout = () => {
        localStorage.removeItem('token');
    }

    return (
        <>
        {/* the nav will be removed when things get fixed, it'll be here for testing purposes */}
        <Nav logout={logout}/> 
        <section className="App-body">
            <Switch>
                <Route path='/sign-up'>
                    <SignUp />
                </Route>
                <Route exact path='/'>
                    <SignIn/>
                </Route>
                <ProtectedRoute>
                    <Route exact path='/add-plant' component={AddPlantForm} />
                    <Route exact path='/my-plants' component={ViewPlants} />
                    <Route exact path='/edit-plant' component={EditPlant} />
                </ProtectedRoute>
            </Switch>
        </section>
        </>
    );
}

export default App;
