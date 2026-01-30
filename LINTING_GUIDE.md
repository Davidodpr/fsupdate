# Linting and Formatting Guide

## Overview
This project uses ESLint for code quality and Prettier for code formatting. Both tools are integrated into the development workflow through Git hooks.

## Setup

### Tools Used
- **ESLint**: Static code analysis to identify problematic patterns
- **Prettier**: Opinionated code formatter for consistent style
- **Husky**: Git hooks manager
- **lint-staged**: Run linters on staged files only

## Configuration

### Prettier Configuration (`.prettierrc`)
```json
{
  "endOfLine": "auto",        // Handle line endings cross-platform
  "semi": false,               // No semicolons
  "singleQuote": true,         // Use single quotes
  "printWidth": 180,           // Long lines for modern screens
  "trailingComma": "all",      // Trailing commas for cleaner diffs
  "arrowParens": "always",     // Always use parens around arrow function args
  "tabWidth": 2,               // 2 spaces for indentation
  "useTabs": false             // Use spaces, not tabs
}
```

### ESLint Configuration (`.eslintrc.json`)
- Extends Next.js recommended configs
- TypeScript support
- React hooks rules
- Prettier integration to avoid conflicts

### Key Rules
- **No unused variables**: Warning with _ prefix to ignore
- **No console.log**: Warning (console.warn/error allowed)
- **React Hooks**: Strict rules of hooks, deps warnings
- **TypeScript any**: Warning to encourage proper typing

## Git Hooks Workflow

### Pre-commit Hook
Runs automatically when you `git commit`:
1. **ESLint** - Checks and auto-fixes code quality issues
2. **Prettier** - Formats code for consistency

Only runs on staged files for efficiency.

### Pre-push Hook
Runs before pushing to remote:
1. **Build** - Ensures project builds without errors
2. **Tests** - Runs test suite with coverage

## Commands

### Manual Commands
```bash
# Run ESLint on entire project
yarn lint

# Run Prettier on entire project
yarn prettier --write .

# Run both ESLint and Prettier on specific files
yarn eslint --fix src/components/Button.tsx
yarn prettier --write src/components/Button.tsx

# Check without fixing
yarn eslint src/
yarn prettier --check src/
```

### Bypass Hooks (Emergency Only)
```bash
# Skip pre-commit hook
git commit --no-verify -m "Emergency fix"

# Skip pre-push hook
git push --no-verify
```

## Best Practices

### 1. Fix Issues Early
- Address linting errors as you code
- Use editor integrations (VS Code extensions)

### 2. Consistent Formatting
- Let Prettier handle formatting
- Don't fight the formatter
- Focus on code logic, not style

### 3. TypeScript Best Practices
- Avoid `any` type - use `unknown` or proper types
- Use `_` prefix for intentionally unused variables
- Enable strict mode gradually

### 4. React/Next.js Patterns
- Follow React Hooks rules
- Use proper dependency arrays
- Keep components pure when possible

## VS Code Setup (Recommended)

Install these extensions:
- ESLint (dbaeumer.vscode-eslint)
- Prettier (esbenp.prettier-vscode)

Add to `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}
```

## Troubleshooting

### Common Issues

1. **"ESLint couldn't find config"**
   - Run `yarn install`
   - Restart your editor

2. **"Prettier not formatting"**
   - Check file is not in `.prettierignore`
   - Ensure file has proper extension

3. **"Too many ESLint errors"**
   - Run `yarn eslint --fix .` to auto-fix
   - Address remaining issues manually

4. **"Pre-commit hook failed"**
   - Fix the reported issues
   - Stage the fixes: `git add .`
   - Commit again

### Getting Help
- Check existing code for patterns
- Consult team lead for style decisions
- Update this guide with new conventions

## Migration from Stitches
The project has been migrated from Stitches to Tailwind CSS. When updating components:
- Use Tailwind utility classes
- Follow existing CVA patterns for variants
- Keep theme variables in CSS custom properties