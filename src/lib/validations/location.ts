import { z } from "zod";

export const locationSchema = z.object({
  name: z
    .string()
    .min(2, "Location name must be at least 2 characters")
    .max(50, "Location name should not exceed 50 characters"),
  city: z
    .string()
    .min(2, "City name must be at least 2 characters")
    .max(50, "City name should not exceed 50 characters"),
  state: z
    .string()
    .min(2, "State name must be at least 2 characters")
    .max(50, "State name should not exceed 50 characters"),
  stationCode: z
    .string()
    .min(2, "Station code must be at least 2 characters")
    .max(50, "Station code should not exceed 10 characters"),
  latitude: z
    .string()
    .min(2, "Enter a valid latitude")
    .optional(),
  longitude: z
    .string()
    .min(2, "Enter a valid longitude")
    .optional(),
  locationImage: z
    .any()
    .transform((files) => (files instanceof FileList ? files[0] : files))
    .refine((file) => !file || file instanceof File, "Please upload a valid image file")
    .optional(),
});

export type LocationData = z.infer<typeof locationSchema>;
