import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import './styles/App.css';
import AddPlantForm from './components/AddPlantForm/AddPlantFormHelperFunctions.jsx'


function App() {
    return (
        <>
            <Nav />
            <Switch>
                <Route exact path='/'>
                    {/* sign in */}
                </Route>
                <Route exact path='/sign-up'>
                    {/* sign up */}
                </Route>
                <Route exact path='/my-plants'>
                    {/* my-plants */}
                </Route>
                <Route exact path='/add-plant'>
                    <AddPlantForm />
                </Route>
            </Switch>
            <section className="App-body">
                <p>
                    Sign-in form will be our landing page
                </p>
            </section>
        </>
    );
}

export default App;
