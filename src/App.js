import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { onSnapshot, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

//hoc
import WithAuth from "./hoc/withAuth";

//layouts
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";

import { auth, handleUserProfile, firestore } from "./firebase/utils";
import "./default.scss";

import Registration from "./pages/Registration";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Recovery from "./pages/Recovery";
import Dashboard from "./pages/Dashboard";

import { connect } from "react-redux";
import { setCurrentUser } from "./redux/User/user.actions";

const App = (props) => {
  const { setCurrentUser, currentUser } = props;

  useEffect(() => {
    let authListener;
    onAuthStateChanged(auth, async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        authListener = onSnapshot(userRef, (snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });

    return () => {
      authListener && authListener();
    };
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>
          }
        />
        <Route
          path="/registration"
          element={
            (
              <MainLayout>
                <Registration />
              </MainLayout>
            )
          }
        />
        <Route
          path="/login"
          element={
            (
              <MainLayout>
                <Login />
              </MainLayout>
            )
          }
        />
        <Route
          path="/recovery"
          element={
            <MainLayout>
              <Recovery />
            </MainLayout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <WithAuth>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </WithAuth>
          }
        />
      </Routes>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
