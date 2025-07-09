import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/cart": {};
  "/modal": {};
  "/product": {};
  "/examples": {};
  "/login": {};
  "/*": {
    "*": string;
  };
};