import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/styles.css";
import { Navbar } from "./components/navbar";
import { Sidenav } from "./components/sidenav";
import { Route, Switch } from "wouter";
import { FC } from "react";
import { ModulesPage } from "./pages/modules-page";
import { ModulePage } from "./pages/module-page";
import { CameraProvider } from "./providers/camera-providers";

const App: FC = () => {
  return (
    <CameraProvider>
      <Navbar />
      <div id="layoutSidenav">
        <Sidenav />
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
              <Switch>
                <Route path="/">
                  <ModulesPage />
                </Route>
                <Route path="/modules/:module">
                  <ModulePage />
                </Route>
              </Switch>
            </div>
          </main>
        </div>
      </div>
    </CameraProvider>
  );
};

export default App;
