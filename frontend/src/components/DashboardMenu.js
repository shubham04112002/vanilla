/* eslint-disable arrow-body-style */
const DashboardMenu = {
  render: (props) => {
    return `
         <div class="dashboard-menu">
            <ul>
               <li class="${props.selected==='dashboard'?'selected':''}"><a href="/#/dashboard">Dashboard</a></li>
               <li class="${props.selected==='orderlist'?'selected':''}"><a href="/#/orderlist">Orders</a></li>
               <li class="${props.selected==='productlist'?'selected':''}"><a href="/#/productlist">Products</a></li>
            </ul>
         </div>
        `;
  },
};
export default DashboardMenu;
