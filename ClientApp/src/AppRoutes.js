import { Counter } from "./components/Counter";
import { Mesa } from "./components/Mesa";
import { Reglas } from "./components/Reglas";
import { Name } from "./components/Name";

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
   },
  {
        path: '/name',
        element: <Name />
    }
];

export default AppRoutes;
