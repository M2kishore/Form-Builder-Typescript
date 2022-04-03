import { useRoutes } from "raviger";
import App from "../App";
import AppContainer from "../AppContainer";
import About from "../components/About";
import { Form } from "../components/Form";
const routes = {
  "/": () => <App />,
  "/about": () => <About />,
  "/form/:id": ({ id }: { id: string }) => <Form formId={Number(id)} />,
};

export default function AppRouter() {
  let routeResult = useRoutes(routes);
  return <AppContainer>{routeResult}</AppContainer>;
}
function id(id: any) {
  throw new Error("Function not implemented.");
}
