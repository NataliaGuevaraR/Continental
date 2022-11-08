import { Counter } from "./components/Counter";
import { GetMesa } from "./components/Mesa";
import { Reglas } from "./components/Reglas";
import { Redireccionar } from "./components/Home";
import { ModalNombre } from "./components/ModalNombre";
import { ModalReiniciar } from "./components/ModalReiniciar";
import { ModalPuntos } from "./components/ModalPuntos";
import { ModalManos } from "./components/ModalManos";
import { ModalReglas } from "./components/ModalReglas";


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
    element: <GetMesa />
   },
  {
    path: '/reglas',
    element: <Reglas />
    },
    {
    path: '/modalnombre',
    element:<ModalNombre />
    },
    {
    path: '/modalreiniciar',
    element: <ModalReiniciar />
    },
    {
    path: '/modalpuntos',
    element: <ModalPuntos />
    },
    {
    path: '/modalmanos',
    element: <ModalManos />
    },
    {
    path: '/modalreglas',
    element: <ModalReglas />
    }
];

export default AppRoutes;
