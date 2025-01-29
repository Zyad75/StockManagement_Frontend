import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState({});
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <>
      <section className="sectionAddProduct">
        <form
          className="formAddProduct"
          onSubmit={async (event) => {
            event.preventDefault();
            const formData = new FormData();
            formData.append("image", image);
            formData.append("name", name);
            formData.append("brand", brand);
            formData.append("price", price);
            formData.append("quantity", quantity);
            try {
              const response = await axios.post(
                "https://site--stockmanagementapp--cszclskmpcqr.code.run/create",
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
              if (
                error.response.data.error ===
                "This product is already repertoried in stock, you still can update the product quantity "
              ) {
                setErrorMessage(
                  "Error, this product is already repertoried, you still can update it"
                );
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
              if (error.response.data.error === "missing parameters") {
                setErrorMessage("Please fill in all fields");
              }
            }
          }}
        >
          <p>Product</p>
          <input
            type="text"
            placeholder="iPhone 15"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Apple"
            value={brand}
            onChange={(event) => {
              setBrand(event.target.value);
            }}
          />
          <input
            type="number"
            placeholder="800"
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
          <input type="submit" value="Create & add Product" />
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </form>
      </section>
    </>
  );
};
export default AddProduct;
