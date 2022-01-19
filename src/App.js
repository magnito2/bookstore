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

const initialState = {
  currentUser: null
}
class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      ...initialState
    }
  }

  authListener = null;

  componentDidMount(){
    onAuthStateChanged(auth, async userAuth => {
      if(userAuth){
        const userRef = await handleUserProfile(userAuth);

        this.authListener = onSnapshot(userRef, snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        });
      } else {
        this.setState({
          ...initialState
        })
      }
    });
  }

  componentWillUnmount(){
    this.authListener && this.authListener();
  }

  render(){
    const { currentUser } = this.state;

    return (
      <div className="App">
          <Routes>
            <Route path="/" element={
              <HomepageLayout currentUser={ currentUser }>
                <Homepage />
              </HomepageLayout>
            } />
            <Route path="/registration" element={
              currentUser ? <Navigate to="/" />
              :
              <MainLayout currentUser={ currentUser }>
                <Registration />
              </MainLayout>
            } />
            <Route path="/login" element={
              currentUser ? <Navigate to="/" />
              : 
              (<MainLayout currentUser={ currentUser }>
                <Login />
              </MainLayout>)
            } />
            <Route path="/recovery" element={
              currentUser ? <Navigate to="/" />
              : 
              (<MainLayout currentUser={ currentUser }>
                <Recovery />
              </MainLayout>)
            } />
          </Routes>
      </div>
    );
  }
}

export default App;
