import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import NavBar from "~/components/NavBar";
import SideBar, { links as SideBarLinks } from '~/components/SideBar';

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

// export const links: LinksFunction = () => [
//   ...(styles ? [{ rel: "stylesheet", href: styles }] : []),
// ];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body >
        <header>
        <NavBar></NavBar>
        </header>
        <main className="main-container">
        <SideBar></SideBar>
        <Outlet/>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
