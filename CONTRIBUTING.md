# Contributing to FoodPreneur Academy Website

Thanks for contributing (even if it's just you and the AI!) to making the FoodPreneur Academy website awesome. Following these guidelines helps keep the codebase consistent, maintainable, and high-quality.

## Code Style & Formatting

*   **Prettier:** This project uses Prettier for automatic code formatting. Please ensure Prettier is run on your code before committing. Most code editors (including Cursor/VS Code) can be configured to format on save using the `.prettierrc.js` config file in this project.
*   **ESLint:** We use ESLint to enforce JavaScript code quality and catch potential errors. Please address any ESLint warnings or errors before committing. Refer to the `.eslintrc.js` configuration file.
*   **Cursor Rules:** Consult the `.cursorrules` file for project-specific context, constraints (like the "faceless" brand), and AI guidance.

## Development Process

1.  **Understand the Goal:** Make sure you understand the requirement or the bug you are addressing.
2.  **Write Code:** Use Cursor's AI features to assist, but always review and understand the generated code. Adhere to the style guides and `.cursorrules`.
3.  **Test:** Manually test your changes in different browsers (Chrome, Firefox, Edge) and screen sizes (use browser developer tools for responsive checks).
4.  **Format & Lint:** Run Prettier and ESLint to ensure code conforms to standards.
5.  **Commit:** Write clear and concise commit messages.

## Commit Messages

Please follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. This makes the commit history easier to read and helps automate potential future processes (like generating changelogs).

**Format:** `<type>[optional scope]: <description>`

**Common Types:**

*   `feat`: A new feature
*   `fix`: A bug fix
*   `docs`: Documentation only changes
*   `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
*   `refactor`: A code change that neither fixes a bug nor adds a feature
*   `perf`: A code change that improves performance
*   `test`: Adding missing tests or correcting existing tests
*   `build`: Changes that affect the build system or external dependencies
*   `ci`: Changes to our CI configuration files and scripts
*   `chore`: Other changes that don't modify src or test files

**Example:**
```
feat: add basic structure for about page
fix: correct navigation link on mobile view
style: format code according to prettier rules
docs: update README with setup instructions
```

## Asking Questions

If using Cursor and unsure about generated code or the best approach, try these prompts:

*   "Explain this code to me."
*   "Are there alternative ways to implement this?"
*   "Does this code follow the project's conventions defined in `.cursorrules`?"
*   "Check this code for potential accessibility issues."

Thank you for helping build a great resource for restaurant owners! 