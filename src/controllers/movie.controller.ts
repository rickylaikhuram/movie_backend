import type { Response } from "express";
import prisma from "../config/prisma.js";
import type { AuthRequest } from "../types/request.types.js";
import { AppError } from "../utils/error.class.js";

// get all movies
export const getAllMovies = async (req: AuthRequest, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    // Query params
    const sort = (req.query.sort as string) || "latest"; // latest, rating, oldest
    const genre = req.query.genre as string | undefined;
    const year = req.query.year as string | undefined;
    const search = req.query.search as string | undefined;
    const type = req.query.type as string | undefined; // e.g., "featured", "best"

    // Where clause builder
    const where: any = {};

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
    } else if (type === "best") {
      where.averageRating = { gte: 3.5 };
    }

    // Sorting
    let orderBy: any = { createdAt: "desc" };
    if (sort === "rating") {
      orderBy = { averageRating: "desc" };
    } else if (sort === "oldest") {
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
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ message: "Error fetching movies", error });
  }
};

// get specific movie details
export const getMovie = async (req: AuthRequest, res: Response) => {
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
export const getMovieReview = async (req: AuthRequest, res: Response) => {
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
    pagination: {
      total: movies._count.reviews,
      page,
      limit,
      totalPages: Math.ceil(movies._count.reviews / limit),
      hasMore: page * limit < movies._count.reviews,
    },
  });
};
