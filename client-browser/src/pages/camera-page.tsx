import { FC } from "react";
import { ModuleVideo } from "../components/camera/module-video";

export const CameraPage: FC = () => {
  return (
    <div className="mt-2">
      <h1 className="text-center mb-2">TEST</h1>
      <div className="row">
        <div className="col-lg-6">
          <ModuleVideo ip={"192.168.1.79"} module="test" />
        </div>
        <div className="col-lg-6">
          <ModuleVideo ip={"192.168.1.79"} module="test2" />
        </div>
      </div>
    </div>
  );
};
