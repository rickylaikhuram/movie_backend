export declare const generateSalt: (rounds?: number) => Promise<string>;
export declare const hashPassword: (password: string, salt: string) => Promise<string>;
export declare const comparePassword: (password: string, hash: string) => Promise<boolean>;
//# sourceMappingURL=hash.d.ts.map