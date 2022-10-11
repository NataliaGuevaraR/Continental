import { Counter } from "./components/Counter";
import { Mesa } from "./components/Mesa";
import { Reglas } from "./components/Reglas";

const AppRoutes = [
  {
    index: true,
    element: <Reglas />
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
