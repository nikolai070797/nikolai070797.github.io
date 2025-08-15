import '@testing-library/jest-dom';
import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Мокаем React Router для тестов
// vi.mock('react-router', () => ({
//   useParams: () => ({}),
//   useNavigate: () => vi.fn(),
//   useLocation: () => ({}),
//   Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
//     <a href={to}>{children}</a>
//   ),
//   Outlet: () => <div data-testid="outlet" />,
//   RouterProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
// }));

// vi.mock('react-router/dom', () => ({
//   ...vi.importActual('react-router/dom'),
//   Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
//     <a href={to}>{children}</a>
//   ),
// }));

// vi.mock('react-router/server', () => ({
//   ...vi.importActual('react-router/server'),
// }));