import { check, validationResult } from "express-validator";

const signupInputs = [
    check("username", "username is required").not().isEmpty(),
    check("confirmPassword", "Confirm Password is required").not().isEmpty(),
]

const passwordInput = [
    check("password", "Password is required")
        .not().isEmpty()
        .isLength({ min: 6 })
        .withMessage("Password should be at least 6 characters long")
        .isStrongPassword()
        .withMessage(
            "Password should have both uppercase and lowercase letters, numbers, and special characters"
        ),
];


const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};


export { signupInputs, passwordInput, validate }
