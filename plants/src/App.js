import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import './styles/App.css';
import AddPlantForm from './components/AddPlantForm.js'
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

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
                    {/* my-plants */}
                </Route>
                <Route path='/add-plant'>
                    <AddPlantForm />
                </Route>
                <Route exact path='/'>
                    <SignIn/>
                </Route>
            </Switch>
        </section>
        </>
    );
}

export default App;
