import { Link } from 'react-router';

const NotFound = () => {
  return (
    <>
      <h1>404 - Страница не найдена</h1>
      <Link to="/">Вернуться на главную</Link>
    </>
  );
};

export default NotFound;
