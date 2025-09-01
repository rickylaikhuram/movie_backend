import { reviewSchema } from "../../utils/inputValidation.js";
import z from "zod";
import { AppError } from "../../utils/error.class.js";
export const reviewInputValidation = (req, res, next) => {
    const result = reviewSchema.safeParse(req.body.reviewData);
    if (!result.success) {
        throw new AppError(411, // HTTP status
        "Invalid input format", "INVALID_INPUT", // optional error code
        z.treeifyError(result.error) // details
        );
    }
    req.body.reviewData = result.data;
    next();
};
//# sourceMappingURL=user.middleware.js.map