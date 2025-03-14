"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import L from "leaflet";
import styled from "styled-components";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { IProjectById } from "@/app/actions/models";
import { breakPointsMd } from "@/constants/screen";
import { fetchMarker } from "../../getData";

const iranCenter: [number, number] = [32.4279, 53.688]; // مرکز ایران

interface IProps {
  project: IProjectById | undefined;
}
const MapProject: React.FC<IProps> = ({ project }) => {
  const [marker, setMarker] = useState<string>("");
  const getMarker = useCallback(async () => {
    if (project) {
      const marker = await fetchMarker(project.Prj_SubjectType.toString());
      setMarker(marker || "");
    }
  }, [project]);
  const location: LatLngExpression = useMemo(() => {
    let loc: LatLngExpression = iranCenter;
    if (project) {
      loc = [project.Pmap_Lat, project.Pmap_Long];
    }
    return loc;
  }, [project]);

  useEffect(() => {
    getMarker();
  }, [getMarker]);
  console.log({ marker, location });
  if (!marker || !project) return null;
  return (
    <MapWrapper center={location} zoom={10}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker location={location} marker={marker} />
    </MapWrapper>
  );
};

export default MapProject;

interface IPropsLocation {
  marker: string;
  location: LatLngExpression;
}
const LocationMarker: FC<IPropsLocation> = ({ marker, location }) => {
  const customIcon = new L.Icon({
    iconUrl: marker,
    iconSize: [32, 32], // اندازه‌ی آیکون
    iconAnchor: [16, 32], // نقطه‌ی لنگر آیکون
    popupAnchor: [0, -32], // موقعیت پاپ‌آپ نسبت به آیکون
    className: "rounded-[4px]",
  });
  return <Marker position={location} icon={customIcon} />;
};

const MapWrapper = styled(MapContainer)`
  border: 1px solid;
  border-color: ${({ theme: { colors } }) => colors.border.bor1};
  border-radius: 32px;
  width: 100%;
  height: 391px;
  @media only screen and (max-width: ${breakPointsMd}px) {
    height: ${() => window.innerWidth - 24 - 8}px;
  }
`;
