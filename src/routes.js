import Home from "./components/views/Home.vue";
import Documentation from "./components/views/Documentation.vue";
import Contacts from "./components/views/Contacts.vue";
export const routes = [
    { path: "", component: Home },
    { path: "/documentation", component: Documentation },
    { path: "/contacts", component: Contacts }
];
