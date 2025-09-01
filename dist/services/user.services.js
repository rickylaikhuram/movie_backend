import prisma from "../config/prisma.js";
// services/user.service.ts
export async function getUserById(userId) {
    return prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            email: true,
            profileUrl: true,
            createdAt: true,
        },
    });
}
export async function getReviewsByUserId(userId) {
    return prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            review: {
                select: {
                    Movies: {
                        select: {
                            id: true,
                            title: true,
                        },
                    },
                    rating: true,
                    reviewText: true,
                    createdAt: true,
                },
            },
        },
    });
}
export async function getWatchListByUserId(userId) {
    return prisma.watchList.findMany({
        where: { userId },
        select: {
            id: true,
            movies: {
                select: {
                    id: true,
                    title: true,
                    synopsis: true,
                    genres: true,
                    director: true,
                    releaseYear: true,
                    posterUrl: true,
                },
            },
        },
    });
}
//# sourceMappingURL=user.services.js.map