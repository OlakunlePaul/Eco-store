# Contributing to Cozy Corner

First off, thank you for considering contributing to Cozy Corner! It's people like you that make this project better.

## Code of Conduct

This project and everyone participating in it is governed by respect, kindness, and professionalism.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if possible**
- **Include your environment details** (OS, browser, Node version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior and expected behavior**
- **Explain why this enhancement would be useful**

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

## Development Process

### Setup

```bash
# Clone your fork
git clone https://github.com/your-username/cozy-corner.git

# Install dependencies
npm install

# Create a branch
git checkout -b feature/amazing-feature

# Start development server
npm run dev
```

### Code Style

- Use **2 spaces** for indentation
- Use **semicolons**
- Use **single quotes** for strings
- Use **meaningful variable names**
- Comment your code when necessary
- Follow existing code style

### Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

Examples:
```
Add shopping cart persistence
Fix navbar responsive layout
Update README with Docker instructions
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test
npm test ProductCard
```

### Documentation

- Keep README.md up to date
- Update relevant documentation in `/docs` folder
- Add JSDoc comments for new functions
- Include examples in documentation

## Project Structure

```
src/
├── components/   # Reusable UI components
├── pages/        # Page components
├── context/      # React Context providers
├── api/          # API utilities
└── __tests__/    # Test files
```

## Style Guidelines

### React

- Use **functional components** with hooks
- Keep components **small and focused**
- Use **meaningful prop names**
- Provide **PropTypes** or TypeScript types
- Handle **loading and error states**

### CSS/Tailwind

- Use **Tailwind utility classes** first
- Create **custom classes** in `index.css` for reusable patterns
- Follow **mobile-first** approach
- Maintain **consistent spacing**

### JavaScript

- Use **const** by default, **let** when reassignment is needed
- Avoid **var**
- Use **arrow functions** for callbacks
- Use **async/await** over promises
- Handle **errors** gracefully

## Review Process

The maintainers will review your PR and may:

- Request changes
- Approve and merge
- Close with explanation

Please be patient and respectful during the review process.

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project credits

Thank you for contributing! 🎉

