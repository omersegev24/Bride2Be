import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./Header";
import Signup from "./Signup";
import Login from "./Login";
import HomePage from "./HomePage";
import CheckList from "./CheckList";
import Settings from "./Settings";
import Account from "./Account";
import Emergency from "./Emergency";
import Chat from "./Chat";
import TaskPath from "./TaskPath";
import UserProfile from "./UserProfile";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "./NotFound";

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  return (
    <Router>
      <div className="App">
        {user && <Header user={user} setUser={setUser} />}

        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Signup />} />

          <Route
            path="/"
            element={
              <ProtectedRoute user={user}>
                <HomePage user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checklist"
            element={
              <ProtectedRoute user={user}>
                <CheckList user={user} setUser={setUser} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute user={user}>
                <Settings user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute user={user}>
                <Account user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/emergency"
            element={
              <ProtectedRoute user={user}>
                <Emergency user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute user={user}>
                <UserProfile user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/taskPath"
            element={
              <ProtectedRoute user={user}>
                <TaskPath user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute user={user}>
                <Chat user={user} />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
