import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "../pages/Home";
import Signup from '../pages/auth/Signup'
import Login from '../pages/auth/Login'
import PrivateRoute from '../pages/auth/PrivateRoute'
import PrivatePage from "../pages/PrivatePage";
import NavBar from "./Navbar"
import { AuthContextComponent } from "../contexts/authContext";
import CreateRoom from "../pages/rooms/CreateRoom";
import RoomDetails from "../pages/rooms/RoomDetails";


function App() {
  return (
    <BrowserRouter>
      <AuthContextComponent>
        <NavBar />
          <Routes>
            <Route exact path="/" element={ <Home />} />
            <Route path="/auth">
              <Route path='signup' element={<Signup />} />
              <Route path='login' element={<Login />} />
            </Route>
            <Route path="/rooms">
              <Route path='new' 
                element={
                        <PrivateRoute>
                          <CreateRoom />
                        </PrivateRoute>
                } 
              />
              <Route path=':id' 
                element={<RoomDetails />} 
              />
            </Route>
            <Route path='/test' element={
              <PrivateRoute>
                <PrivatePage />
              </PrivateRoute>
            } />
          </Routes>
      </AuthContextComponent>
    </BrowserRouter>
  );
}

export default App;
