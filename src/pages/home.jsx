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
        const response = await axios.get(
          "https://site--stockmanagementapp--cszclskmpcqr.code.run/products"
        );

        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [data]);
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
                    <p className="brandProduct">{elem.brand}</p>
                    <p className="nameProduct">{elem.price} €</p>
                    <div className="divAvailabilityAndDeleteButton">
                      {elem.quantity === 0 && (
                        <p className="noQuantity"> Out of stock !</p>
                      )}
                      {elem.quantity > 0 && elem.quantity < 3 && (
                        <p className="littleQuantity">
                          Only {elem.quantity} left
                        </p>
                      )}
                      {elem.quantity >= 3 && (
                        <p className="muchQuantity">Available In stock</p>
                      )}
                      <button
                        className="deleteButton"
                        onClick={async () => {
                          const id = elem._id;
                          try {
                            const response = await axios.delete(
                              `https://site--stockmanagementapp--cszclskmpcqr.code.run/delete/${id}`
                            );
                            alert(JSON.stringify(response.data));
                            navigate("/");
                          } catch (error) {
                            console.log(error);
                          }
                        }}
                      >
                        <FontAwesomeIcon icon="fa-solid fa-trash" />
                      </button>
                    </div>
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
