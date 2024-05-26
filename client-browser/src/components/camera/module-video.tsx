import { FC, useEffect, useState } from "react";
import { getClient } from "../../proto-client";
import { arrayBufferToBase64 } from "../../utils/array-buffer-to-base-64";
import { Spinner } from "react-bootstrap";

export type ModuleVideoProps = {
  module: string;
  ip: string;
};

export const ModuleVideo: FC<ModuleVideoProps> = (props) => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { ip, module } = props;

  useEffect(() => {
    const fetchImage = async () => {
      const client = getClient(ip);

      const { response } = await client.getLastFrame({ module });

      const uint8Array = new Uint8Array(response.frame);
      const base64String = arrayBufferToBase64(uint8Array);
      const image = `data:image/jpeg;base64,${base64String}`;
      setImage(image);
      if (loading) setLoading(false);
    };

    const intervalId = setInterval(fetchImage, 1000 / 60); // Target 60 FPS

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if (loading) return <Spinner className="d-flex m-auto" />;

  if (!image) return null;

  return (
    <div className="card mb-4">
      <div className="card-header">
        <i className="fas fa-chart-pie me-1"></i>
        {module}
      </div>
      <div className="card-body p-0">
        <img src={image} alt="test" className="w-100 h-100" />
      </div>
      {/* <div className="card-footer small text-muted">
        Updated yesterday at 11:59 PM
      </div> */}
    </div>
  );
};
