import type { Response } from "express";
import prisma from "../config/prisma.js";
import type { AuthRequest } from "../types/request.types.js";

// get all movies
export const getAllMovies = async (req: AuthRequest, res: Response) => {
  const movies = await prisma.movies.findMany({
    select: {
      title: true,
      genres: true,
      releaseYear: true,
      director: true,
      posterUrl: true,
      averageRating: true,
    },
  });
  res.status(200).json({
    message: "fetch movies successfully",
    movies,
  });
};

// get specific movie details
export const getMovie = async (req: AuthRequest, res: Response) => {
  const moviesId = req.params.id;
  if (!moviesId) {
    throw {
      status: 403,
      message: "Need Movie ID",
    };
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
      createdAt: true,
    },
  });

  if (!movies) {
    throw {
      status: 404,
      message: "Movie not found",
    };
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
    throw {
      status: 403,
      message: "Need Movie ID",
    };
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
    throw {
      status: 404,
      message: "Movie not found",
    };
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
