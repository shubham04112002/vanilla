import { getProduct, updateProduct, uploadProductImage } from "../api";
import {
  hideLoading,
  parseRequestUrl,
  showLoading,
  showMessage,
} from "../utils";

/* eslint-disable arrow-body-style */
const ProductEditScreen = {
  after_render: () => {
    const request = parseRequestUrl();
    document
      .getElementById("edit-product-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        showLoading();
        const data = await updateProduct({
          _id: request.id,
          name: document.getElementById("name").value,
          price: document.getElementById("price").value,
          image: document.getElementById("image").value,
          brand: document.getElementById("brand").value,
          countInStock: document.getElementById("countInStock").value,
          category: document.getElementById("category").value,
          description: document.getElementById("description").value,
        });
        hideLoading();
        if (data.error) {
          showMessage(data.error);
        } else {
          document.location.hash = "/productlist";
        }
      });
    document
      .getElementById("image-file")
      .addEventListener("change", async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image',file);
        showLoading();
        const data = await uploadProductImage(formData);
        console.log(data);
        hideLoading();
        if (data.error) {
          console.log("Error happened in ProductEditScreen");
          showMessage(data.error);
        } else {
          showMessage("Image Uploaded Successfully");
          document.getElementById("image").value = data.image;
        }
      });
  },
  render: async () => {
    const request = parseRequestUrl();
    const product = await getProduct(request.id);
    return `
      <div class="content">
         <div>
           <a href="/#/productlist">Back to products</a>
         </div>
         <div class="form-container">
           <form id="edit-product-form">
              <ul class="form-items">
                  <li>
                    <h1>Edit Product ${product._id.substr(0, 8)}</h1>
                  </li>
                  <li>
                     <label for="name">Name</label>
                     <input type="text" id="name" palceholder="Enter Product's Name" value=${
                       product.name
                     } name="name" />
                  </li>
                  <li>
                     <label for="price">Price</label>
                     <input type="number" id="price" palceholder="Enter Product's Price" value=${
                       product.price
                     } name="price" />
                  </li>
                  <li>
                     <label for="image">Image (680 x 830)</label>
                     <input type="text" id="image" palceholder="Enter Product's Image address" value=${
                       product.image
                     } name="image" />
                     <input type="file" id="image-file" name="image-file" />
                  </li>
                  <li>
                     <label for="brand">Brand</label>
                     <input type="text" id="brand" palceholder="Enter Product's Brand" value=${
                       product.brand
                     } name="brand" />
                  </li>
                  <li>
                     <label for="countInStock">Count In Stock</label>
                     <input type="text" id="countInStock" palceholder="Enter Product's No. Of Stock" value=${
                       product.countInStock
                     } name="countInStock" />
                  </li>
                  <li>
                     <label for="category">Category</label>
                     <input type="text" id="category" palceholder="Enter Product's Category" value=${
                       product.category
                     } name="category" />
                  </li>
                  <li>
                     <label for="description">Description</label>
                     <input type="text" id="description" palceholder="Enter Product's Description" value=${
                       product.description
                     } name="description" />
                  </li>
                  <li>
                    <button type="submit" class="primary">Update</button>
                  </li>
              </ul>
           </form>
         </div>
      </div>
    `;
  },
};
export default ProductEditScreen;
