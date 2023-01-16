import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Classes from "./pages/Classes";
import { AuthProvider } from "./context/AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Home />,
  },
  {
    path: "explore/:category",
    element: <Explore />,
  },
  {
    path: "classes/:classid",
    element: <Classes />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
