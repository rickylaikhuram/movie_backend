import { v4 as uuidv4 } from "uuid";
import { generateToken } from "./tokens.js";
export const createUidForGuest = () => {
    return uuidv4();
};
export const createGuestTokens = () => {
    const guestUid = createUidForGuest();
    const guestToken = generateToken({ uid: guestUid, isAdmin: false, role: "guest" }, "1d");
    return guestToken;
};
//# sourceMappingURL=guest.js.map