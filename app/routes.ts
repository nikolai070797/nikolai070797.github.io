import { type RouteConfig, index, route } from "@react-router/dev/routes";


export default [
    index("pages/Home.tsx"), // Главная страница `/`
    route("about", "pages/About.tsx", [
        route("team", "pages/Team.tsx"), // Вложенный маршрут `/about/team`
    ]),
    route("*", "pages/NotFound.tsx"), // Страница 404
] satisfies RouteConfig;
