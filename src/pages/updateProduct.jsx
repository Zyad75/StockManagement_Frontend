import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState({});
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [updatePen, setUpdatePen] = useState(false);

  //ici on stocke dans des states les infos déjà enregistrés sur le produit à modifier
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--stockmanagementapp--cszclskmpcqr.code.run/product/${id}`
        );

        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <p>Chargement...</p>
  ) : (
    <>
      <section className="sectionUpdatePage">
        <p className="titleUpdatePage">Update this product :</p>
        <div className="divProductInfosUpdatePage">
          <img
            className="productImageInUpdatePage"
            src={data.image.secure_url}
            alt="productImage"
          />
          <p>{data.name}</p>
          <p>{data.price} €</p>
          <p>Quantity : {data.quantity}</p>
        </div>
        <button
          onClick={() => {
            setUpdatePen(!updatePen);
          }}
        >
          {" "}
          <FontAwesomeIcon icon="fa-solid fa-pencil" />
        </button>
        {updatePen && (
          <>
            <form
              className="formUpdateProduct"
              onSubmit={async (event) => {
                event.preventDefault();
                const formData = new FormData();
                formData.append("image", image);
                formData.append("price", price);
                formData.append("quantity", quantity);
                try {
                  const response = await axios.put(
                    `https://site--stockmanagementapp--cszclskmpcqr.code.run/update/${id}`,
                    formData,
                    {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    }
                  );
                  alert(JSON.stringify(response.data));
                  navigate("/");
                } catch (error) {
                  console.log(error);
                  if (error.response.data.message === "Missing parameter") {
                    setErrorMessage("Please fill in all fields before submit");
                  }
                  if (
                    error.response.data.message ===
                    "Warning, please enter a valid quantity number"
                  ) {
                    setErrorMessage("Error, set a valid quantity number");
                  }
                  if (
                    error.response.data.message ===
                    "Warning, please enter a valid price"
                  ) {
                    setErrorMessage("Error, set a valid price");
                  }
                }
              }}
            >
              <input
                type="number"
                placeholder="price"
                value={price}
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
              <input
                type="number"
                placeholder="quantity"
                value={quantity}
                onChange={(event) => {
                  setQuantity(event.target.value);
                }}
              />
              <div>
                <p>Product Image</p>
                <input
                  type="file"
                  onChange={(event) => {
                    setImage(event.target.files[0]);
                  }}
                />
              </div>
              <input type="submit" value="Update Product" />
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </form>
          </>
        )}
      </section>
    </>
  );
};
export default UpdateProduct;
