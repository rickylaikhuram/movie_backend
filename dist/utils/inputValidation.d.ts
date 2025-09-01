import { z } from "zod";
export declare const emailSchema: z.ZodEmail;
export declare const signUp: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
    profileUrl: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const signIn: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export declare const movieSchema: z.ZodObject<{
    tmdbId: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    title: z.ZodString;
    synopsis: z.ZodString;
    genres: z.ZodArray<z.ZodString>;
    releaseYear: z.ZodString;
    runtime: z.ZodNumber;
    language: z.ZodString;
    country: z.ZodString;
    director: z.ZodOptional<z.ZodString>;
    cast: z.ZodOptional<z.ZodArray<z.ZodString>>;
    posterUrl: z.ZodOptional<z.ZodURL>;
    backdropUrl: z.ZodOptional<z.ZodURL>;
    trailerUrl: z.ZodOptional<z.ZodURL>;
}, z.core.$strip>;
export declare const RatingEnum: z.ZodEnum<{
    ZERO: "ZERO";
    ONE: "ONE";
    TWO: "TWO";
    THREE: "THREE";
    FOUR: "FOUR";
    FIVE: "FIVE";
}>;
export declare const reviewSchema: z.ZodObject<{
    rating: z.ZodDefault<z.ZodEnum<{
        ZERO: "ZERO";
        ONE: "ONE";
        TWO: "TWO";
        THREE: "THREE";
        FOUR: "FOUR";
        FIVE: "FIVE";
    }>>;
    reviewText: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=inputValidation.d.ts.map