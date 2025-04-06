import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { Footer, Header } from '@shared/ui';
import { Container } from '@mui/material';
import "./Layout.module.scss"
import { NavbarContent10 } from '../navbar/navbar-content';

const navbar = {
  customization: true,
  secondaryBtn: {
    // children: <SvgIcon name="tabler-brand-github" color="primary.main" size={18} />,
    // href: FREEBIES_URL,
    // ...linkProps,
    sx: { minWidth: 40, width: 40, height: 40, p: 0 }
  },
  primaryBtn: { children: 'Buy Now', 
    // href: BUY_NOW_URL, ...linkProps 
  },
  navItems: [
    { id: 'home', title: 'Home', link: '/' },
    // landingMegamenu,
    { id: 'components', title: 'Blocks', 
      // link: SECTION_PATH 
    },
    { id: 'dashboard', title: 'Dashboard', 
      // link: ADMIN_PATH, ...linkProps 
    },
    // pagesMegamenu,
    { id: 'docs', title: 'Docs', 
      // link: DOCS_URL, ...linkProps, 
      icon: 'tabler-pin-invoke' }
  ]
};



const Layout = () => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {/* <Header /> */}
        <NavbarContent10 {...navbar} />
        <Container>
          <Outlet />
        </Container>

        <Footer />

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

export default Layout;
