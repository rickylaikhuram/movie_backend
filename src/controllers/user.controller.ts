import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../types/request.types.js";
import prisma from "../config/prisma.js";
import {
  getReviewsByUserId,
  getUserById,
  getWatchListByUserId,
} from "../services/user.services.js";
import { success } from "zod";

// check if user exists by UID in token
export const queryExistingUserCheck = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const uid = req.user?.uid;

    if (!uid) {
      const error = new Error("Unauthorized") as any;
      error.statusCode = 401;
      throw error;
    }

    const user = await getUserById(uid);

    if (!user) {
      const error = new Error("User does not exist or is deleted") as any;
      error.statusCode = 401;
      throw error;
    }

    // Optional: attach full user to request
    req.userData = user;

    next();
  } catch (err) {
    next(err);
  }
};

// get existing user
export const getUserProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const uid = req.user?.uid;

    if (!uid) {
      throw {
        status: 400,
        message: "Uid is required",
      };
    }

    const user = await getUserById(uid);
    if (!user) {
      throw {
        status: 404,
        message: "User not found",
      };
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
      throw {
        status: 400,
        message: "Invalid name",
      };
    }

    const uid = req.user?.uid;
    if (!uid) {
      throw {
        status: 401,
        message: "Unauthorized",
      };
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
      throw {
        status: 403,
        message: "Need Movie ID",
      };
    }
    const uid = req.user?.uid;
    if (!uid) {
      throw {
        status: 401,
        message: "Unauthorized",
      };
    }

    const createdReview = await prisma.review.create({
      data: {
        userId: uid,
        moviesId: movieId,
        rating: reviewData.rating,
        reviewText: reviewData.reviewText,
      },
    });

    res.status(200).json({
      message: "Review Created successfully",
      review: createdReview,
    });
  } catch (err) {
    next(err);
  }
};

// get all reviews
export const getReview = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const uid = req.user?.uid;
    if (!uid) {
      throw {
        status: 401,
        message: "Unauthorized",
      };
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
export const createWatchlist = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const movieId = req.params.movieId;
    const uid = req.user?.uid;
    if (!movieId) {
      throw {
        status: 403,
        message: "Need Movie ID",
      };
    }
    if (!uid) {
      throw {
        status: 401,
        message: "Unauthorized",
      };
    }

    const createdWatchList = await prisma.watchList.create({
      data: {
        userId: uid,
        moviesId: movieId,
      },
    });

    res.status(200).json({
      message: "watchList Created successfully",
      watchList: createdWatchList,
    });
  } catch (err: any) {
    if (err.code === "P2002") {
      // Prisma unique constraint violation
      throw {
        status: 409,
        message: "This movie is already in your watchlist",
      };
    }
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
      throw {
        status: 401,
        message: "Unauthorized",
      };
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

// delete watchlist
export const deleteWatchlist = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const watchListId = req.params.watchListId;
  if (!watchListId) {
    throw {
      status: 403,
      message: "Need WatchList ID",
    };
  }
  const uid = req.user?.uid;
  if (!uid) {
    throw {
      status: 401,
      message: "Unauthorized",
    };
  }

  try {
    const deletedWatchList = await prisma.watchList.delete({
      where: {
        id: watchListId,
        userId: uid,
      },
    });

    res.status(200).json({
      message: "WatchList deleted successfully",
      watchList: deletedWatchList,
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      // Prisma Record not found error
      throw {
        status: 404,
        message: "WatchList not found",
      };
    }
    throw error;
  }
};
