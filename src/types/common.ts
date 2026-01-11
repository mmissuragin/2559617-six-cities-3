export type TLocationCoordinates = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type TCity = {
  name: string;
  location: TLocationCoordinates;
};
