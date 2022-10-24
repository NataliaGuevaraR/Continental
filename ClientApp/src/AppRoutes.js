import { Counter } from "./components/Counter";
import { Mesa } from "./components/Mesa";
import { Reglas } from "./components/Reglas";
import {Redireccionar } from "./components/Home";
import { ModalNombre } from "./components/ModalNombre";

const AppRoutes = [
  {
    index: true,
    element: <Redireccionar />
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
    },
    {
    path: '/modalnombre',
    element:<ModalNombre />
    }
];

export default AppRoutes;
