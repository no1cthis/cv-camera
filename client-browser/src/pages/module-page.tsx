import { FC, useEffect, useState } from "react";
import { useParams } from "wouter";
import Markdown from "react-markdown";
import { getModule } from "../api/get-module";
import { Spinner } from "react-bootstrap";

export const ModulePage: FC = () => {
  const params = useParams();
  const [module, setModule] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(params);
    getModule(params.module!)
      .then((data) => {
        setModule(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [params.module]);

  if (loading) return <Spinner className="m-auto" />;

  return (
    <div className="mt-2">
      <h1 className="text-center mb-2">{module.name}</h1>
      <Markdown>{module.description}</Markdown>
    </div>
  );
};
