"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMap as useLeafletMap,
  LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useMap } from "../context";
import { Polygon } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import L from "leaflet";
import styled from "styled-components";
import { Dispatch, FC, SetStateAction } from "react";
import { IMapProject, IProjectById } from "@/app/actions/models";
import { breakPointsMd } from "@/constants/screen";
import { useMediaQuery } from "react-responsive";
import { fetchProjectById } from "../getData";

const iranCenter: [number, number] = [32.4279, 53.688]; // مرکز ایران

interface IProps {
  setProjectDetail: Dispatch<SetStateAction<IProjectById | undefined>>;
  setLoading?: Dispatch<SetStateAction<boolean>>;
}
const MapComponent: React.FC<IProps> = ({ setProjectDetail, setLoading }) => {
  const { mapProjectList } = useMap();
  const purpleOptions = { color: "purple" };

  const isMobile = !useMediaQuery({ minWidth: breakPointsMd });
  const onMarkerClick = async (id: string) => {
    try {
      if (setLoading) setLoading(true);
      const projectDetail = await fetchProjectById(id);
      if (projectDetail) setProjectDetail(projectDetail);
    } catch {
    } finally {
      if (setLoading) setLoading(false);
    }
  };
  return (
    <MapWrapper
      center={iranCenter}
      zoom={isMobile ? 4.4 : 5.3}
      touchZoom={"center"}
    >
      <LayersControl position="bottomleft">
        <LayersControl.BaseLayer checked name="Satellite">
          <TileLayer
            url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
            subdomains={["mt1", "mt2", "mt3"]}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Open street">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
      </LayersControl>
      {mapProjectList?.map((project, index) => {
        if (project.map && project.map.length > 1) {
          const positions: LatLngExpression[] = project.map.map((i) => [
            i.Pmap_Lat,
            i.Pmap_Long,
          ]);

          return (
            <Polygon
              positions={positions}
              key={index}
              pathOptions={purpleOptions}
            />
          );
        } else {
          if (project.map && project.map.length === 1) {
            return (
              <LocationMarker
                key={index}
                onMarkerClick={() => onMarkerClick(project.Prj_ID)}
                project={project}
              />
            );
          }
        }
      })}
    </MapWrapper>
  );
};

export default MapComponent;

interface IPropsLocation {
  project: IMapProject;
  onMarkerClick: () => void;
}
const LocationMarker: FC<IPropsLocation> = ({ project, onMarkerClick }) => {
  const map = useLeafletMap();
  const location: LatLngExpression = project.map
    ? [project.map[0].Pmap_Lat, project.map[0].Pmap_Long]
    : iranCenter;
  const handleMarkerClick = () => {
    onMarkerClick();
    map.flyTo(location, 9, {
      duration: 2, // مدت زمان انیمیشن به ثانیه
    });
  };
  const customIcon = new L.Icon({
    iconUrl: project.marker,
    iconSize: [32, 32], // اندازه‌ی آیکون
    iconAnchor: [16, 32], // نقطه‌ی لنگر آیکون
    popupAnchor: [0, -32], // موقعیت پاپ‌آپ نسبت به آیکون
    className: "rounded-[4px]",
  });
  return (
    <Marker
      position={location}
      eventHandlers={{ click: handleMarkerClick }}
      icon={customIcon}
    />
  );
};

const MapWrapper = styled(MapContainer)`
  border: 1px solid;
  border-color: ${({ theme: { colors } }) => colors.border.bor1};
  border-radius: 32px;
  width: 100%;
  height: 100%;
  @media only screen and (max-width: ${breakPointsMd}px) {
    height: ${() => window.innerWidth - 24 - 8}px;
  }
`;
