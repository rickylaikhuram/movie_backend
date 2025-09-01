import prisma from "../config/prisma.js";
import { AppError } from "../utils/error.class.js";
import { tr } from "zod/locales";
// get all movies
export const getAllMovies = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;
        // Query params
        const sort = req.query.sort || "latest"; // latest, rating, oldest
        const genre = req.query.genre;
        const year = req.query.year;
        const search = req.query.search;
        const type = req.query.type; // e.g., "featured", "best"
        // Where clause builder
        const where = {};
        if (genre) {
            where.genres = {
                has: genre, // because genres is String[]
            };
        }
        if (year) {
            where.releaseYear = year;
        }
        if (search) {
            where.OR = [
                { title: { contains: search, mode: "insensitive" } },
                { synopsis: { contains: search, mode: "insensitive" } },
                { director: { contains: search, mode: "insensitive" } },
                { releaseYear: { contains: search, mode: "insensitive" } },
                { cast: { has: search } }, // checks if search exists in cast array
            ];
        }
        // Special cases
        if (type === "featured") {
            where.averageRating = { gte: 4.5 };
        }
        else if (type === "best") {
            where.averageRating = { gte: 3.5 };
        }
        // Sorting
        let orderBy = { createdAt: "desc" };
        if (sort === "rating") {
            orderBy = { averageRating: "desc" };
        }
        else if (sort === "oldest") {
            orderBy = { createdAt: "asc" };
        }
        // Count total
        const totalMovies = await prisma.movies.count({ where });
        // Fetch
        const movies = await prisma.movies.findMany({
            skip,
            take: limit,
            where,
            orderBy,
            select: {
                id: true,
                title: true,
                synopsis: true,
                genres: true,
                releaseYear: true,
                director: true,
                cast: true,
                posterUrl: true,
                averageRating: true,
            },
        });
        res.status(200).json({
            message: "Fetched movies successfully",
            page,
            totalMovies,
            totalPages: Math.ceil(totalMovies / limit),
            movies,
        });
    }
    catch (error) {
        console.error("Error fetching movies:", error);
        res.status(500).json({ message: "Error fetching movies", error });
    }
};
// get specific movie details
export const getMovie = async (req, res) => {
    const moviesId = req.params.id;
    if (!moviesId) {
        throw new AppError(403, "Need Movie ID");
    }
    const movies = await prisma.movies.findUnique({
        where: { id: moviesId },
        select: {
            title: true,
            genres: true,
            releaseYear: true,
            director: true,
            posterUrl: true,
            averageRating: true,
            cast: true,
            synopsis: true,
            runtime: true,
            language: true,
            country: true,
            backdropUrl: true,
            trailerUrl: true,
            createdAt: true,
        },
    });
    if (!movies) {
        throw new AppError(404, "Movie not found");
    }
    res.status(200).json({
        message: "fetch movie successfully",
        movies,
    });
};
// get specific movie reviews
export const getMovieReview = async (req, res) => {
    const moviesId = req.params.id;
    if (!moviesId) {
        throw new AppError(403, "Need Movie ID");
    }
    const page = Number(req.query.page) || 1; // page number, default 1
    const limit = 5; // always fetch 5 reviews
    const skip = (page - 1) * limit;
    const movies = await prisma.movies.findUnique({
        where: { id: moviesId },
        select: {
            reviews: {
                skip: skip,
                take: limit,
                orderBy: {
                    createdAt: "desc",
                },
                select: {
                    reviewText: true,
                    rating: true,
                    createdAt: true,
                    user: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
            _count: {
                select: { reviews: true },
            },
        },
    });
    if (!movies) {
        throw new AppError(404, "Movie not found");
    }
    res.status(200).json({
        message: "Fetched reviews successfully",
        reviews: movies.reviews,
        page,
        totalReviews: movies._count.reviews,
        totalPages: Math.ceil(movies._count.reviews / limit),
        limit,
    });
};
//# sourceMappingURL=movie.controller.js.map