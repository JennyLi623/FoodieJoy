import React, { useState, useEffect, createContext, useContext } from 'react';
import {auth} from '../../service/firebase.js';
import { Route, Redirect } from 'react-router-dom';

//***************** Fire base Initialization ************************

const AuthContext = createContext();

export const AuthProvider = props => {

    const auth = Auth();
    return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);

//***************** Redirect review item to signIn ************************
export const PrivateRoute = ({ children, ...rest }) => {
    const auth = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.user ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/signup",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}


const getUser = user => {
    const { email, displayName, photoURL } = user;
    return { email, name: displayName, photo: photoURL };
}

const Auth = () => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged(function (user) {
            if (user) {
                const currentUser = user;
                setUser(currentUser);
            }
        })

    }, [])

    //***************** sign in with popup Start ************************
    const signInWithGoogle = () => {
        const provider = new auth.GoogleAuthProvider();

        return auth().signInWithPopup(provider)
            .then(result => {
                const signedInUser = getUser(result.user);
                setUser(signedInUser);
                window.history.back();
                return result.user;
            })
            .catch(error => {
                setUser(null);
                return error.message;
            })

    }

    const signIn = (email, password) => {
        return auth().signInWithEmailAndPassword(email, password)
            .then(result => {
                setUser(result.user);
                window.history.back();
            })
            .catch(error => {
                setUser(null);
                return error.message;
            })
    }

    const signUp = (email, password, name) => {
        return auth().createUserWithEmailAndPassword(email, password)
            .then(result => {
                auth().currentUser.updateProfile({
                    displayName: name
                })
                    .then(() => {
                        setUser(result.user);
                        window.history.back();
                    })
            })
            .catch(error => {
                setUser(null);
                return error.message;
            })
    }

    const signOut = () => {
        return auth().signOut()
            .then(result => {
                setUser(null);
                return true;
            })
            .catch(error => {
                console.log(error);
                return error.message;
            })
    }

    return {
        user,
        signIn,
        signUp,
        signOut,
        signInWithGoogle
    }
}

export default Auth;