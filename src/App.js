import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";

//hoc
import WithAuth from "./hoc/withAuth";
import WithAdminAuth from "./hoc/withAdminAuth";

//layouts
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";
import AdminLayout from "./layouts/AdminLayout";
import DashBoardLayout from "./layouts/DashboardLayout";

import "./default.scss";

//pages
import Registration from "./pages/Registration";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Recovery from "./pages/Recovery";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";

//admin pages
import AdminSchools from "./pages/Admin/Schools";
import AdminSubjects from "./pages/Admin/Subjects";
import AdminProducts from "./pages/Admin/Products";
import AdminOrders from "./pages/Admin/Orders";
import AdminCustomers from "./pages/Admin/Customers";
import AdminChats from "./pages/Admin/Chats";
import AdminInvoices from "./pages/Admin/Invoices";
import AdminOrderDetails from "./pages/Admin/Orders/OrderDetails";

import Checkout from "./pages/Checkout";
import OrderComplete from "./pages/OrderComplete";

//components
import AdminToolbar from "./components/AdminToolbar";

import { checkUserSession } from "./redux/User/user.actions";

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <div className="App">
      <AdminToolbar />
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
          exact
          path="/search"
          element={
            <MainLayout>
              <Search />
            </MainLayout>
          }
        />
        <Route
          path="/search/:filterType"
          element={
            <MainLayout>
              <Search />
            </MainLayout>
          }
        />
        <Route
          path="/product/:productID"
          element={
            <MainLayout>
              <ProductDetails />
            </MainLayout>
          }
        />
        <Route
          path="/cart"
          element={
            <MainLayout>
              <Cart />
            </MainLayout>
          }
        />
        <Route
          path="/checkout"
          element={
            <MainLayout>
              <Checkout />
            </MainLayout>
          }
        />
        <Route
          path="/orderComplete"
          element={
            <MainLayout>
              <OrderComplete />
            </MainLayout>
          }
        />
        <Route
          path="/registration"
          element={
            <MainLayout>
              <Registration />
            </MainLayout>
          }
        />
        <Route
          path="/login"
          element={
            <MainLayout>
              <Login />
            </MainLayout>
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
              <DashBoardLayout>
                <Dashboard />
              </DashBoardLayout>
            </WithAuth>
          }
        />
        <Route
          exact
          path="/admin"
          element={
            <WithAdminAuth>
              <AdminLayout>
                <Admin />
              </AdminLayout>
            </WithAdminAuth>
          }
        />
        <Route
          path="/admin/schools"
          element={
            <WithAdminAuth>
              <AdminLayout>
                <AdminSchools />
              </AdminLayout>
            </WithAdminAuth>
          }
        />
        <Route
          path="/admin/subjects"
          element={
            <WithAdminAuth>
              <AdminLayout>
                <AdminSubjects />
              </AdminLayout>
            </WithAdminAuth>
          }
        />
        <Route
          path="/admin/products"
          element={
            <WithAdminAuth>
              <AdminLayout>
                <AdminProducts />
              </AdminLayout>
            </WithAdminAuth>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <WithAdminAuth>
              <AdminLayout>
                <AdminOrders />
              </AdminLayout>
            </WithAdminAuth>
          }
        />
        <Route
          path="/admin/orders/:orderID"
          element={
            <WithAdminAuth>
              <AdminLayout>
                <AdminOrderDetails />
              </AdminLayout>
            </WithAdminAuth>
          }
        />
        <Route
          path="/admin/customers"
          element={
            <WithAdminAuth>
              <AdminLayout>
                <AdminCustomers />
              </AdminLayout>
            </WithAdminAuth>
          }
        />
        <Route
          path="/admin/invoices"
          element={
            <WithAdminAuth>
              <AdminLayout>
                <AdminInvoices />
              </AdminLayout>
            </WithAdminAuth>
          }
        />
        <Route
          path="/admin/chats"
          element={
            <WithAdminAuth>
              <AdminLayout>
                <AdminChats />
              </AdminLayout>
            </WithAdminAuth>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
