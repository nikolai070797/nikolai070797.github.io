import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import Header from '@widgets/Header';
import Footer from '@shared/ui/footer';
import { Box } from '@mui/material';
import { RequireAuth } from '@shared/lib/RequireAuth';

const MainLayout = () => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <Meta />
        <Links />
      </head>
      <body>
        <RequireAuth>
          <Header />

          <Box sx={{ mt: '64px', p: 2 }}>
            <Outlet />
            <Box sx={{ height: 1000 }} />
          </Box>
          <Footer />
        </RequireAuth>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

export default MainLayout;
