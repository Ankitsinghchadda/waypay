interface Page {
  id: number;
  pageName: string;
  path: string;
}

export const pages: Array<Page> = [
  {
    id: 1,
    pageName: "Dashboard",
    path: "/",
  },
  {
    id: 2,
    pageName: "Account",
    path: "/account",
  },
  {
    id: 3,
    pageName: "Calculator",
    path: "/calculator",
  },

  {
    id: 4,
    pageName: "Swap",
    path: "/Swap",
  },
  // {
  //   id: 5,
  //   pageName: "Staking",
  //   path: "#",
  // },
  {
    id: 5,
    pageName: "Presale",
    path: "/presale",
  },
  {
    id: 6,
    pageName: "Docs",
    path: "#",
  },
];
