// create camera context provider

import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getNetworkDevices } from "../api/get-network-devices";

export type Camera = { ip: string; mac: string };

export type CameraContextType = {
  cameras: Camera[];
  loading: boolean;
  refresh: () => void;
};

const CameraContext = createContext<CameraContextType | undefined>(undefined);

export const CameraProvider: FC<PropsWithChildren> = ({ children }) => {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [loading, setLoading] = useState(true);

  const getCameras = async () => {
    setLoading(true);
    getNetworkDevices()
      .then((data) => {
        setCameras(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getCameras();
  }, []);

  return (
    <CameraContext.Provider value={{ cameras, loading, refresh: getCameras }}>
      {children}
    </CameraContext.Provider>
  );
};

export const useCamera = () => {
  const context = useContext(CameraContext);
  if (!context) {
    throw new Error("useCamera must be used within a CameraProvider");
  }
  return context;
};
