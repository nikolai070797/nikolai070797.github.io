import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("./pages/home/index.ts"), // Главная страница `/`
    route("cart", "pages/cart/index.ts"),
    route("modal", "pages/modal/index.ts"),
    route("product", "pages/product/index.ts"),
    // route("about", "pages/About.tsx", [
    //     route("team", "pages/Team.tsx"), // Вложенный маршрут `/about/team`
    // ]),
    route("*", "./pages/not-found/index.ts"), // Страница 404
] satisfies RouteConfig;
