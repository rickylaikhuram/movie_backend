import type { Response } from "express";
import type { AuthRequest } from "../types/request.types.js";
import prisma from "../config/prisma.js";
import { getUserById } from "../services/user.services.js";

// add movie
export const handleAddMovie = async (req: AuthRequest, res: Response) => {
  // `movieData` is already validated by middleware
  const movieData = req.body.movieData;

  // Check if movie already exists (by tmdbId or title + releaseYear)
  const existingMovie = await prisma.movies.findFirst({
    where: {
      OR: [
        movieData.tmdbId ? { tmdbId: movieData.tmdbId } : undefined,
        movieData.releaseYear
          ? { title: movieData.title, releaseYear: movieData.releaseYear }
          : { title: movieData.title },
      ].filter(Boolean) as any,
    },
  });

  if (existingMovie) {
    throw {
      statusCode: 409,
      message: "Movie already exists",
    };
  }

  // Create new movie
  const newMovie = await prisma.movies.create({
    data: movieData,
  });

  res.status(201).json({
    message: "Movie added successfully",
    movie: newMovie,
  });
};

// update movie
export const handleUpdateMovie = async (req: AuthRequest, res: Response) => {
  const moviesId = req.params.id;
  if (!moviesId) {
    throw {
      status: 403,
      message: "Need Movie ID",
    };
  }
  // `movieData` is already validated by middleware
  const movieData = req.body.movieData;

  // Check if movie already exists (by tmdbId or title + releaseYear)
  const existingMovie = await prisma.movies.findUnique({
    where: {
      id: moviesId,
    },
  });

  if (!existingMovie) {
    throw {
      statusCode: 400,
      message: "Movie not found",
    };
  }

  // Update movie
  const updatedMovie = await prisma.movies.update({
    where: { id: existingMovie.id },
    data: movieData,
  });

  res.status(200).json({
    message: "Movie updated successfully",
    movie: updatedMovie,
  });
};

// delete movie
export const handleDeleteMovie = async (req: AuthRequest, res: Response) => {
  const moviesId = req.params.id;

  if (!moviesId) {
    throw {
      status: 403,
      message: "Need Movie ID",
    };
  }

  try {
    const deletedMovie = await prisma.movies.delete({
      where: { id: moviesId },
    });

    res.status(200).json({
      message: "Movie deleted successfully",
      movie: deletedMovie,
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      // Prisma Record not found error
      throw {
        status: 404,
        message: "Movie not found",
      };
    }
    throw error;
  }
};

// get all user
export const getAllUser = async (req: AuthRequest, res: Response) => {
  const allUsers = await prisma.user.findMany({});
  res.status(200).json({
    message: "Fetched all user successfully",
    user: allUsers,
  });
};

// get user details
export const getUserDetails = async (req: AuthRequest, res: Response) => {
  const userId = req.params.userId;

  if (!userId) {
    throw {
      status: 403,
      message: "Need User ID",
    };
  }

  try {
    const userData = await getUserById(userId);

    res.status(200).json({
      message: "Fetched user details successfully",
      user: userData,
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      // Prisma Record not found error
      throw {
        status: 404,
        message: "User not found",
      };
    }
    throw error;
  }
};
