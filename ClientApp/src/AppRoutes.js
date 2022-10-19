import { Counter } from "./components/Counter";
import { Mesa } from "./components/Mesa";
import { Reglas } from "./components/Reglas";
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
   },
  {
    path: '/reglas',
    element: <Reglas />
    }
];

export default AppRoutes;
