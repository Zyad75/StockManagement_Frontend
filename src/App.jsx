//------------ Styles et autres -------------//
import { library } from "@fortawesome/fontawesome-svg-core";
import { faShop, faPlus, faPencil } from "@fortawesome/free-solid-svg-icons";
library.add(faShop, faPlus, faPencil);
import "./App.css";
//------------- Imports des pages/composants --------//
import Header from "./components/header";
import Home from "./pages/home";
import AddProduct from "./pages/addProduct";
import UpdateProduct from "./pages/updateProduct";
//---- Gestion des pages ------//
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/addProduct" element={<AddProduct />}></Route>
        <Route path="/update/:id" element={<UpdateProduct />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
