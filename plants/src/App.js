import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import './styles/App.css';
import AddPlantForm from './components/AddPlantForm.js'
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ProtectedRoute from './utils/ProtectedRoute';

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
                <Route path='/my-plants'>
                    {/* my-plants should go in ProtectedRoute once built */}
                </Route>
                <Route path='/add-plant'>
                    <AddPlantForm />
                </Route>
                <Route exact path='/'>
                    <SignIn/>
                </Route>
                <ProtectedRoute exact path="/protected" component={AddPlantForm} />
            </Switch>
        </section>
        </>
    );
}

export default App;
