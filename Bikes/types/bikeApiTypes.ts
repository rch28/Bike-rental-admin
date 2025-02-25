import { LocationListResponse } from "@/settings/types/locationSchema";

// Define the features type
interface BikeFeatures {
  start: string;
  engine: string;
  distance: string;
}

// Define the individual bike type
export type Bike = {
  id: string;
  name: string;
  rating: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  price: number;
  isFeatured: boolean;
  isAvailable: boolean;
  description: string;
  image: string | null;
  start: string;
  engine: string;
  distance: string;
  date: string;
  locations: LocationListResponse[];
  status: string;
};

// Define the API response type
export type BikeListResponse = Bike[];
