import React, { Component } from "react";
import { Route, Routes} from "react-router-dom";

//layouts
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";


import { auth } from "./firebase/utils"
import './default.scss';

import Registration from "./pages/Registration";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";

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
    this.authListener = auth.onAuthStateChanged(userAuth => {
      if(!userAuth) return;

      this.setState({
        currentUser: userAuth
      });
    });
  }

  componentWillUnmount(){
    this.authListener();
  }

  render(){
    const { currentUser } = this.state;

    return (
      <div className="App">
          <Routes>
            <Route path="/" element={
              <HomepageLayout>
                <Homepage />
              </HomepageLayout>
            } />
            <Route path="/registration" element={
            <MainLayout>
              <Registration />
            </MainLayout>
            } />
            <Route path="/login" element={
            <MainLayout>
              <Login />
            </MainLayout>
            } />
          </Routes>
      </div>
    );
  }
}

export default App;
