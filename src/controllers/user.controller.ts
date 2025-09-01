import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../types/request.types.js";
import prisma from "../config/prisma.js";
import {
  getReviewsByUserId,
  getUserById,
  getWatchListByUserId,
} from "../services/user.services.js";
import { AppError } from "../utils/error.class.js";
import { ratingMap } from "../types/user.types.js";
import { emailSchema } from "../utils/inputValidation.js";
import z from "zod";

// get existing user
export const getUserProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const uid = req.user?.uid;

    if (!uid) {
      throw new AppError(400, "Uid is required");
    }

    const user = await getUserById(uid);
    if (!user) {
      throw new AppError(404, "User not found");
    }

    res.status(200).json({
      message: "Get User Sucessfully",
      user,
    });
  } catch (err) {
    next(err);
  }
};

// update userName
export const updateUserName = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;

    if (!name || typeof name !== "string" || name.trim().length < 3) {
      throw new AppError(400, "Invalid name");
    }

    const uid = req.user?.uid;
    if (!uid) {
      throw new AppError(401, "Unauthorized");
    }

    const updatedUser = await prisma.user.update({
      where: { id: uid },
      data: { name },
      select: {
        name: true,
        email: true,
        createdAt: true,
      },
    });

    res.status(200).json({
      message: "Name changed successfully",
      user: updatedUser,
    });
  } catch (err) {
    next(err);
  }
};

// update userEmail
export const updateUserEmail = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new AppError(400, "Need Email");
    }
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      throw new AppError(
        411, // HTTP status
        "Invalid email format",
        "INVALID_EMAIL_FORMAT", // optional error code
        z.treeifyError(result.error) // details
      );
    }
    const uid = req.user?.uid;
    if (!uid) {
      throw new AppError(401, "Unauthorized");
    }

    const updatedUser = await prisma.user.update({
      where: { id: uid },
      data: { email: result.data },
      select: {
        name: true,
        email: true,
        createdAt: true,
      },
    });

    res.status(200).json({
      message: "Email changed successfully",
      user: updatedUser,
    });
  } catch (err) {
    next(err);
  }
};

// create review
export const createReview = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const reviewData = req.body.reviewData;
    const movieId = req.params.movieId;

    if (!movieId) {
      throw new AppError(403, "Need Movie ID");
    }

    const uid = req.user?.uid;
    if (!uid) {
      throw new AppError(401, "Unauthorized");
    }

    // Create review
    const createdReview = await prisma.review.create({
      data: {
        userId: uid,
        moviesId: movieId,
        rating: reviewData.rating,
        reviewText: reviewData.reviewText,
      },
    });

    // Fetch all reviews for this movie
    const allReviews = await prisma.review.findMany({
      where: { moviesId: movieId },
      select: { rating: true },
    });

    // Convert ratings to numbers
    const numericRatings = allReviews.map(
      (r) => ratingMap[r.rating.toLowerCase()] ?? 0
    );

    // Reduce with initial value = 0
    const sum = numericRatings.reduce((acc, val) => acc + val, 0);
    const avg = numericRatings.length > 0 ? sum / numericRatings.length : 0;

    // Update movie with new average rating
    await prisma.movies.update({
      where: { id: movieId },
      data: { averageRating: avg },
    });

    res.status(200).json({
      message: "Review created successfully",
      review: createdReview,
      newAverageRating: avg,
    });
  } catch (err) {
    next(err);
  }
};

// get user reviews
export const getReview = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const uid = req.user?.uid;
    if (!uid) {
      throw new AppError(401, "Unauthorized");
    }

    const review = await getReviewsByUserId(uid);
    res.status(200).json({
      message: "Fetched Reviews successfully",
      review,
    });
  } catch (err) {
    next(err);
  }
};

// create watchlist
export const handleToggleWatchlist = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { moviesId } = req.params;
    const uid = req.user?.uid;

    if (!uid) {
      throw new AppError(401, "Unauthorized");
    }
    if (!moviesId) {
      throw new AppError(403, "Need Movie ID");
    }

    const existing = await prisma.watchList.findFirst({
      where: { userId: uid, moviesId },
    });

    if (existing) {
      // Remove from wishlist
      await prisma.watchList.delete({
        where: { id: existing.id },
      });

      res
        .status(200)
        .json({ message: "Removed from watchlist", removed: true });
      return;
    } else {
      // Add to wishlist
      const watchlist = await prisma.watchList.create({
        data: { userId: uid, moviesId },
      });

      res
        .status(200)
        .json({ message: "Added to Watchlist", watchlist, removed: false });
      return;
    }
  } catch (err) {
    next(err);
  }
};

// get watchlist
export const getWatchlist = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const uid = req.user?.uid;
    if (!uid) {
      throw new AppError(401, "Unauthorized");
    }

    const watchList = await getWatchListByUserId(uid);
    res.status(200).json({
      message: "Fetched Watchlist successfully",
      watchList,
    });
  } catch (err) {
    next(err);
  }
};

// get watchlist ids
export const getWatchlistIds = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const uid = req.user!.uid;

    const items = await prisma.watchList.findMany({
      where: { userId: uid },
      select: { moviesId: true },
    });

    const watchListIds = items.map((item) => item.moviesId);

    res.status(200).json({ watchListIds });
  } catch (error) {
    next(error);
  }
};
