import Dashboard from "../components/admin/Dashboard";
import Profile from "../components/admin/Profile";
import Category from "../components/admin/Category/Category";
import ViewCategory from "../components/admin/Category/ViewCategory";
import EditCategory from "../components/admin/Category/EditCategory";

const routes = [
    { path: '/admin', exact: true, name: "Admin" },
    { path: '/admin/dashboard', exact: true, name: "Dashboard", component: Dashboard },
    { path: '/admin/add-category', exact: true, name: "Category", component: Category },
    { path: '/admin/view-category', exact: true, name: "ViewCategory", component: ViewCategory },
    { path: '/admin/edit-category/:id', exact: true, name: "EditCategory", component: EditCategory },
    { path: '/admin/profile', exact: true, name: "Profile", component: Profile },
];

export default routes;
