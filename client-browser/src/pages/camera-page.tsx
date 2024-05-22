import { FC, useEffect, useState } from "react";
import { ModuleVideo } from "../components/camera/module-video";
import { useParams } from "wouter";
import { getClient } from "../proto-client";
import { InstalledModules } from "../../protobuf/camera_service";
import { Button, Form, Spinner } from "react-bootstrap";

const doNotShowThisModules = new Set<string>();

export const CameraPage: FC = () => {
  const params = useParams<{ ip: string }>();
  const [loading, setLoading] = useState(true);
  const [modules, setModules] = useState<InstalledModules["modules"]>([]);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);

  const { ip } = params;

  useEffect(() => {
    setLoading(true);
    getClient(ip)
      .getInstalledModules({})
      .then(({ response }) => {
        // Sort modules by name
        const sortedModules = response.modules.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setModules(sortedModules);
        setLoading(false);
      });
  }, [ip]);

  if (loading) return <Spinner animation="border" className="d-flex m-auto" />;

  const moduleVideos = modules
    .map((module) => {
      const { name, packageName, options } = module;
      if (options?.show === false || doNotShowThisModules.has(packageName))
        return null;
      return (
        <div className="col-lg-6">
          <ModuleVideo ip={ip} module={name} />
        </div>
      );
    })
    .filter(Boolean);

  const moduleList = modules
    .filter(
      (module) =>
        !doNotShowThisModules.has(module.packageName) &&
        module.packageName !== "internal"
    )
    .map((module) => (
      <Form.Check
        key={module.name}
        type="checkbox"
        label={module.name}
        id={module.name}
        inline
        onChange={(e) => {
          setSelectedModules({
            ...selectedModules,
            [module.name]: e.target.checked,
          });
        }}
      />
    ));

  const deleteModules = () => {
    const modulesToDelete = Object.entries(selectedModules)
      .filter(([, selected]) => selected)
      .map(([module]) => module);

    console.log(modulesToDelete);

    getClient(ip)
      .uninstallModules({ modules: modulesToDelete })
      .then(() => {
        setModules((modules) =>
          modules.filter((module) => !modulesToDelete.includes(module.name))
        );
      });

    modulesToDelete.forEach((module) => doNotShowThisModules.add(module));
  };

  const disabledButton = !Object.values(selectedModules).some(
    (selected) => selected === true
  );

  return (
    <div className="mt-2">
      <h1 className="text-center mb-2">{ip}</h1>
      <div className="row">
        <Form className="w-75">{moduleList}</Form>
        <div className="w-25">
          <Button
            className="w-100"
            variant="danger"
            disabled={disabledButton}
            onClick={deleteModules}
          >
            Delete Modules
          </Button>
        </div>
      </div>
      <div className="row mt-4">{moduleVideos}</div>
    </div>
  );
};
