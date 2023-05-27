import "./App.css";
import { Route } from "react-router-dom";
import Home from "./views/home/Home.jsx";
import Detail from "./views/detail/Detail.jsx";
import Create  from "./views/create/Create";

function App() {
  return (
    <>
      <Route exact path="/home" component={Home}></Route>
      <Route path="/home/:id" component={Detail}></Route>
      <Route path="/create" component={Create}></Route>
    </>
  );
}

export default App;
