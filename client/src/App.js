import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";


const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <div className="py-10 bg-gradient-to-br min-h-screen from-slate-900 via-slate-700 to-slate-500">
        <RouterProvider router={router} />    
    </div>
  );
}

export default App;