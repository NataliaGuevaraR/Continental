import { Counter } from "./components/Counter";
import { Mesa } from "./components/Mesa";
import { Home } from "./components/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/mesa',
    element: <Mesa />
  }
];

export default AppRoutes;
