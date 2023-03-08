import {
  Signup,
  Login,
  Profile,
  EmployeeList,
  ForgotPassword,
  EmployeeRegister,
} from "../pages/index";
import { Dashboard } from "../components";

export const publicRoutes = [
  { path: "/login", component: Login },
  { path: "/registro", component: Signup },
  { path: "/esqueci-minha-senha", component: ForgotPassword },
];

export const privateRoutes = [
  { path: "/inicio", component: Dashboard },
  { path: "/cadastrar", component: EmployeeRegister },
  { path: "/funcionarios", component: EmployeeList },
  { path: "/perfil", component: Profile },
];
