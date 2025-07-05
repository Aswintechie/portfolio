# Development Guide

This document explains the development workflow, tools, and best practices for the Aswin Portfolio project.

## 🛠️ Development Environment Setup

### Prerequisites
- Node.js 18 or higher
- npm 9 or higher
- Git

### Initial Setup
```bash
# Clone the repository
git clone https://github.com/Aswintechie/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🔧 Available Scripts

### Development
- `npm run dev` - Start development server
- `npm run dev:all` - Start both frontend and backend servers
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Code Quality
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Testing
- `npm run test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run test:coverage` - Run tests with coverage
- `npm run test:ui` - Run tests with UI

### Security
- `npm run security:check` - Run custom security checks
- `npm run security:audit` - Run npm audit

### Quality Assurance
- `npm run quality:check` - Run all quality checks
- `npm run validate` - Run quality checks + build
- `npm run pre-commit` - Run pre-commit hooks

## 🚀 Pre-commit Hooks

This project uses Husky and lint-staged to ensure code quality before commits:

### What runs on pre-commit:
1. **ESLint** - Fixes linting issues
2. **Prettier** - Formats code
3. **Tests** - Runs tests for changed files
4. **Security Checks** - Scans for vulnerabilities

### Setup
Pre-commit hooks are automatically installed when you run `npm install`.

### Manual trigger:
```bash
npm run pre-commit
```

## 🧪 Testing

### Testing Framework
- **Vitest** - Fast unit testing
- **React Testing Library** - Component testing
- **Jest DOM** - DOM testing utilities

### Test Structure
```
src/
├── components/
│   ├── HeroSection.jsx
│   └── __tests__/
│       └── HeroSection.test.jsx
└── setupTests.js
```

### Writing Tests
```javascript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

### Running Tests
```bash
# Watch mode (development)
npm run test

# Run once
npm run test:run

# With coverage
npm run test:coverage
```

## 🔒 Security

### Security Checks Include:
1. **NPM Audit** - Dependency vulnerabilities
2. **Sensitive Files** - Checks for accidentally committed secrets
3. **Gitignore Validation** - Ensures important files are ignored
4. **Package.json Security** - Scans for dangerous scripts

### ESLint Security Rules:
- `security/detect-object-injection`
- `security/detect-non-literal-regexp`
- `security/detect-possible-timing-attacks`

### Running Security Checks:
```bash
npm run security:check
npm run security:audit
```

## 🎨 Code Formatting

### Prettier Configuration
- **Tab Width**: 2 spaces
- **Quotes**: Single quotes
- **Semicolons**: Yes
- **Trailing Commas**: ES5
- **Line Width**: 100 characters

### Formatting Commands:
```bash
# Format all files
npm run format

# Check formatting
npm run format:check
```

## 📋 Linting

### ESLint Configuration
- **Base**: ESLint recommended + Vite React
- **Plugins**: React, React Hooks, JSX A11y, Security
- **Rules**: Strict mode for React hooks and accessibility

### Linting Commands:
```bash
# Check linting
npm run lint

# Fix linting issues
npm run lint:fix
```

## 🔄 Git Workflow

### Branch Strategy
- `main` - Production branch
- `feature/` - Feature branches
- `hotfix/` - Emergency fixes

### Commit Process
1. **Stage changes**: `git add .`
2. **Commit**: `git commit -m "message"`
   - Pre-commit hooks run automatically
   - Code is linted, formatted, and tested
   - Security checks are performed
3. **Push**: `git push origin branch-name`

### Commit Message Format
```
type(scope): description

Example:
feat(auth): add login functionality
fix(ui): resolve button alignment issue
docs(readme): update installation instructions
```

## 🚀 CI/CD Pipeline

### GitHub Actions Workflow
1. **Quality Checks** (runs on all branches):
   - Install dependencies
   - Run linting
   - Check formatting
   - Run tests
   - Run security checks
   - Build project

2. **Deploy** (runs only on main branch):
   - Build React application
   - Deploy to Cloudflare Workers

### Deployment Requirements
- All quality checks must pass
- Only main branch is deployed
- Requires `CLOUDFLARE_API_TOKEN` secret

## 🐛 Troubleshooting

### Common Issues

#### Pre-commit hooks not running
```bash
# Reinstall husky
npm run prepare
```

#### Tests failing
```bash
# Clear test cache
npm run test:run -- --clearCache

# Run specific test
npm run test -- MyComponent.test.jsx
```

#### Linting errors
```bash
# Auto-fix most issues
npm run lint:fix

# Check specific file
npx eslint src/components/MyComponent.jsx
```

#### Security vulnerabilities
```bash
# Try automatic fix
npm audit fix

# Check specific vulnerability
npm audit
```

## 📊 Code Coverage

### Coverage Reports
- **Text**: Console output
- **HTML**: `coverage/index.html`
- **JSON**: `coverage/coverage-final.json`

### Coverage Thresholds
- **Statements**: 80%
- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%

## 🔧 IDE Configuration

### VS Code Settings
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### Recommended Extensions
- ESLint
- Prettier
- Vitest
- GitLens
- Auto Rename Tag

## 📚 Best Practices

### Code Style
- Use functional components with hooks
- Keep components small and focused
- Use TypeScript for type safety (future enhancement)
- Follow React best practices

### Testing
- Write tests for all components
- Test user interactions
- Mock external dependencies
- Aim for high test coverage

### Security
- Never commit sensitive data
- Regularly update dependencies
- Use environment variables for secrets
- Validate all inputs

### Performance
- Use lazy loading for large components
- Optimize images
- Minimize bundle size
- Use React.memo for expensive components

## 📖 Resources

- [React Documentation](https://reactjs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Documentation](https://testing-library.com/)
- [ESLint Documentation](https://eslint.org/)
- [Prettier Documentation](https://prettier.io/)

---

For questions or issues, please check the existing documentation or create an issue in the repository. 