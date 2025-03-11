import { MapProvider } from "@/modules/Map/context";
import { ProjectMap } from "@/modules/Map";
import { FC } from "react";

const MapPage: FC = () => {
  return (
    <MapProvider>
      <ProjectMap />
    </MapProvider>
  );
};
export default MapPage;
