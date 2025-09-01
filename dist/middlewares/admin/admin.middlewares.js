import z from "zod";
import { movieSchema } from "../../utils/inputValidation.js";
import { AppError } from "../../utils/error.class.js";
export const movieInputValidation = (req, res, next) => {
    const result = movieSchema.safeParse(req.body.movieData);
    console.log(req.body.movieData);
    if (!result.success) {
        throw new AppError(411, // HTTP status
        "Invalid input format", "INVALID_INPUT", // optional error code
        z.treeifyError(result.error) // details
        );
    }
    req.body.movieData = result.data;
    next();
};
//# sourceMappingURL=admin.middlewares.js.map