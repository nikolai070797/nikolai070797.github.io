import { Outlet } from "react-router";

export default function About() {
    return (
        <div>
            <h1>О нас</h1>
            <Outlet /> {/* Отображает вложенные маршруты */}
        </div>
    );
}