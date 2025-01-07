import axios from "axios";
import { useState, useEffect } from "react";

const Home = () => {
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
                <div className="divProduct">
                  <img
                    key={index}
                    src={elem.image.secure_url}
                    alt="productImage"
                    className="productImage"
                  />
                  <p className="nameProduct">{elem.name}</p>
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
