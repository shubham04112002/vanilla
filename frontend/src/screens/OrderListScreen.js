/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable no-unused-expressions */
import DashboardMenu from "../components/DashboardMenu";
import { getOrders, deleteOrder } from "../api";
import { hideLoading, rerender, showLoading, showMessage } from "../utils";
/* eslint-disable arrow-body-style */
const OrderListScreen = {
  render: async () => {
    const orders = await getOrders();
    console.log(orders);
    return `
    <div class="dashboard">
    ${DashboardMenu.render({ selected: "orderlist" })}
    <div class="dashboard-content">
      <h1>ORDERS</h1>
      <div class="order-list">
        <table>
           <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>USER</th>
                <th>PAID AT</th>
                <th>DELIVERED AT</th>
                <th class="tr-action">ACTION</th>
              </tr>
           </thead>
           <tbody>
             ${orders
               .map(
                 (order) => `
                 <tr>
                   <td>${order._id}</td>
                   <td>${order.createdAt}</td>
                   <td>${order.totalPrice}</td>
                   <td>${order.user.name}</td>
                   <td>${order.paidAt || "NO"}</td>
                   <td>${order.deliveredAt || "NO"}</td>
                   <td>
                     <button id="${order._id}" class="edit-button">Edit</button>
                     <button id="${
                       order._id
                     }" class="delete-button">Delete</button>
                   </td>
                   
                 </tr>
                 `
               )
               .join("\n")}
           </tbody>
        </table>
      </div>
    </div>
  </div>
    `;
  },
  after_render: () => {
    const deleteButtons = document.getElementsByClassName("delete-button");
    Array.from(deleteButtons).forEach((deleteButton) => {
      deleteButton.addEventListener("click", async () => {
        if (confirm("Are you sure to delete this order?")) {
          showLoading();
          const data = await deleteOrder(deleteButton.id);
          if (data.error) {
            showMessage(data.error);
          } else {
            rerender(OrderListScreen);
          }
          hideLoading();
        }
      });
    });

    const editButtons = document.getElementsByClassName("edit-button");
    Array.from(editButtons).forEach((editButton) => {
      editButton.addEventListener("click", async () => {
        document.location.hash = `/order/${editButton.id}`;
      });
    });
  },
};
export default OrderListScreen;
