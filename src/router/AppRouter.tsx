
import { useRoutes } from "raviger";
import App from "../App";
import AppContainer from "../AppContainer";
import Preview from "../components/Preview";
const routes = {
  "/": () => <App />,
  "/preview/:id": ({ id }: { id: string }) => <Preview formId={Number(id)} />,
};

export default function AppRouter() {
  let routeResult = useRoutes(routes);
  return <AppContainer>{routeResult}</AppContainer>;
}