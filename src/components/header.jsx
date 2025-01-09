import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <header>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="buttonShopIcon"
        >
          <FontAwesomeIcon icon="fa-solid fa-shop" className="shopIcon" />
        </button>
        <p className="titleHeader">Stock - Management</p>
        <Link to={"/addProduct"} className="buttonAddProduct">
          <FontAwesomeIcon icon="fa-solid fa-plus" className="iconAddProduct" />
          <p className="textAddProduct">add Product</p>{" "}
        </Link>
      </header>
    </>
  );
};
export default Header;
