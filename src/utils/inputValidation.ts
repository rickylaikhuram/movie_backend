import { z } from "zod";

export const emailSchema = z.email({ message: "Invalid email address format" });

const passwordSchema = z
  .string()
  .min(6, { message: "Password must be at least 6 characters long" })
  .max(30, { message: "Password must be at most 30 characters long" });

export const signUp = z.object({
  name: z.string().min(2),
  email: emailSchema,
  password: passwordSchema,
  profileUrl: z.string().optional(),
});

export const signIn = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const movieSchema = z.object({
  tmdbId: z.number().nullable().optional(),
  title: z.string().min(1, "Title is required"),
  synopsis: z.string().min(10, "Synopsis should be at least 10 characters"),
  genres: z.array(z.string()).nonempty("At least one genre is required"),
  releaseYear: z
    .string()
    .regex(/^\d{4}$/, "Release year must be a 4-digit year"),
  runtime: z.number().positive("Runtime must be positive"),
  language: z.string(),
  country: z.string(),

  director: z.string().optional(),
  cast: z.array(z.string()).optional(),

  posterUrl: z.url("Poster URL must be valid").optional(),
  backdropUrl: z.url("Backdrop URL must be valid").optional(),
  trailerUrl: z.url("Trailer URL must be valid").optional(),
});

export const RatingEnum = z.enum([
  "ZERO",
  "ONE",
  "TWO",
  "THREE",
  "FOUR",
  "FIVE",
]);

// Review schema
export const reviewSchema = z.object({
  rating: RatingEnum.default("ZERO"),
  reviewText: z.string().min(1, "Review text cannot be empty"),
});
