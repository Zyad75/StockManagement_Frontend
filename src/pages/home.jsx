import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");

        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <>
      <section className="productSection">
        <div className="divAllProducts">
          {data.map((elem, index) => {
            return (
              <>
                <div
                  className={
                    elem.quantity !== 0 ? "divProduct" : "divProductNoStock"
                  }
                >
                  <img
                    key={index}
                    src={elem.image.secure_url}
                    alt="productImage"
                    className="productImage"
                  />
                  <div className="divInfosProduct">
                    <div className="divNameAndUpdateButton">
                      <p className="nameProduct">{elem.name}</p>
                      <button
                        className="updateButton"
                        onClick={() => {
                          navigate(`/update/${elem._id}`);
                        }}
                      >
                        <FontAwesomeIcon icon="fa-solid fa-pencil" />
                      </button>
                    </div>
                    <p className="nameProduct">{elem.price} €</p>

                    {elem.quantity === 0 && (
                      <p className="noQuantity"> Out of stock !</p>
                    )}
                    {elem.quantity > 0 && elem.quantity < 3 && (
                      <p className="littleQuantity">
                        Hurry Up ! Only {elem.quantity} left
                      </p>
                    )}
                    {elem.quantity >= 3 && (
                      <p className="muchQuantity">Available In stock</p>
                    )}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </section>
    </>
  );
};
export default Home;
