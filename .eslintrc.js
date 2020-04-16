module.exports = {
    parser: "@typescript-eslint/parser", // Specifies the ESLint parser
    rules: {
        semi : [2, "always"]
    },
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: "module" // Allows for the use of imports
    }
};