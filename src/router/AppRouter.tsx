
import { useRoutes } from "raviger";
import App from "../App";
import AppContainer from "../AppContainer";
import ApiFormList from "../components/ApiFormList";
import CreateApiForm from "../components/CreateApiForm";
import Preview from "../components/Preview";
const routes = {
  "/": () => <App />,
  "/preview/:id": ({ id }: { id: string }) => <Preview formId={Number(id)} />,
  "/apiform":()=><ApiFormList/>,
  "/createapiform":()=><CreateApiForm/>
};

export default function AppRouter() {
  let routeResult = useRoutes(routes);
  return <AppContainer>{routeResult}</AppContainer>;
}