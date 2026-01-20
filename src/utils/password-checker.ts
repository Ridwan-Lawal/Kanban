const PasswordRequirements = [
  {
    name: "minLength",
    regex: /.{8,}/, // At least 8 characters
    message: "Minimum 8 characters",
  },
  {
    name: "capital",
    regex: /[A-Z]/,
    message: "At least 1 capital letter",
  },
  {
    name: "lowercase",
    regex: /[a-z]/,
    message: "At least 1 lowercase letter",
  },
  {
    name: "number",
    regex: /\d/,
    message: "At least 1 number",
  },
];

export const checkPasswordStrength = (password: string) => {
  return PasswordRequirements.map((req) => ({
    ...req,
    met: req.regex.test(password),
  }));
};
