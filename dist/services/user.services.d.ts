export declare function getUserById(userId: string): Promise<{
    email: string;
    name: string;
    profileUrl: string | null;
    id: string;
    createdAt: Date;
} | null>;
export declare function getReviewsByUserId(userId: string): Promise<{
    name: string;
    id: string;
    review: {
        rating: import("@prisma/client").$Enums.RATING;
        reviewText: string;
        createdAt: Date;
        Movies: {
            title: string;
            id: string;
        } | null;
    }[];
} | null>;
export declare function getWatchListByUserId(userId: string): Promise<{
    id: string;
    movies: {
        title: string;
        synopsis: string;
        genres: string[];
        releaseYear: string | null;
        director: string | null;
        posterUrl: string | null;
        id: string;
    };
}[]>;
//# sourceMappingURL=user.services.d.ts.map