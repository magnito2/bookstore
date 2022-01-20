import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { onSnapshot, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

//layouts
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";


import { auth, handleUserProfile, firestore} from "./firebase/utils";
import './default.scss';

import Registration from "./pages/Registration";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Recovery from "./pages/Recovery";

import { connect } from 'react-redux';
import { setCurrentUser } from "./redux/User/user.actions";

class App extends Component {

  authListener = null;

  componentDidMount(){

    const { setCurrentUser } = this.props;

    onAuthStateChanged(auth, async userAuth => {
      if(userAuth){
        const userRef = await handleUserProfile(userAuth);

        this.authListener = onSnapshot(userRef, snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount(){
    this.authListener && this.authListener();
  }

  render(){
    const { currentUser } = this.props;

    return (
      <div className="App">
          <Routes>
            <Route path="/" element={
              <HomepageLayout>
                <Homepage />
              </HomepageLayout>
            } />
            <Route path="/registration" element={
              currentUser ? <Navigate to="/" />
              :
              <MainLayout>
                <Registration />
              </MainLayout>
            } />
            <Route path="/login" element={
              currentUser ? <Navigate to="/" />
              : 
              (<MainLayout>
                <Login />
              </MainLayout>)
            } />
            <Route path="/recovery" element={
              currentUser ? <Navigate to="/" />
              : 
              (<MainLayout>
                <Recovery />
              </MainLayout>)
            } />
          </Routes>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch =>({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
