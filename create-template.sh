#!/bin/bash

# React TypeScript Boilerplate Template Generator
# This script creates a clean copy of the boilerplate without git history

set -e

PROJECT_NAME=${1:-"boilerplate-vtph"}
CURRENT_DIR=$(pwd)
TEMPLATE_DIR="$CURRENT_DIR"

echo "🚀 Creating React TypeScript project: $PROJECT_NAME"
echo "📂 Using template from: $TEMPLATE_DIR"

# Validate project name
if [[ ! "$PROJECT_NAME" =~ ^[a-zA-Z0-9_-]+$ ]]; then
    echo "❌ Error: Project name can only contain letters, numbers, hyphens, and underscores"
    exit 1
fi

# Check if directory already exists
if [ -d "$PROJECT_NAME" ]; then
    echo "❌ Error: Directory '$PROJECT_NAME' already exists"
    exit 1
fi

# Create new project directory
echo "📁 Creating project directory..."
mkdir "$PROJECT_NAME"
cd "$PROJECT_NAME"

# Copy all files except git-related and personal configs
echo "📋 Copying template files..."
rsync -av \
    --exclude='.git/' \
    --exclude='.DS_Store' \
    --exclude='node_modules/' \
    --exclude='dist/' \
    --exclude='coverage/' \
    --exclude='playwright-report/' \
    --exclude='test-results/' \
    --exclude='create-template.sh' \
    --exclude='template.json' \
    "$TEMPLATE_DIR/" ./

# Initialize new git repository
echo "🔧 Initializing git repository..."
git init
git add .
git commit -m "Initial commit: React TypeScript starter

- Modern React 19 with TypeScript
- Vite for fast development and building
- Biome for linting and formatting
- Vitest for unit testing
- Playwright for E2E testing
- Styled Components for styling
- React Router for navigation
- Zustand for state management
- Apollo Client for GraphQL
- Complete testing setup"

# Update package.json with new project name
echo "📦 Updating package.json..."
if [ -f "package.json" ]; then
    # Use Node.js to update package.json safely
    node -e "
        const fs = require('fs');
        const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        pkg.name = '$PROJECT_NAME';
        pkg.description = 'A modern React TypeScript application';
        delete pkg.version;
        fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
    "
fi

# Install dependencies
echo "📥 Installing dependencies..."
if command -v pnpm &> /dev/null; then
    pnpm install
elif command -v yarn &> /dev/null; then
    yarn install
else
    npm install
fi

echo ""
echo "✅ Project '$PROJECT_NAME' created successfully!"
echo ""
echo "🎯 Next steps:"
echo "   cd $PROJECT_NAME"
echo ""
echo "🏃 Development commands:"
echo "   pnpm dev      # Start development server"
echo "   pnpm build    # Build for production"
echo "   pnpm test     # Run unit tests"
echo "   pnpm test:e2e # Run E2E tests"
echo "   pnpm lint     # Check code quality"
echo "   pnpm format   # Format code"
echo ""
echo "📚 Check README.md for detailed documentation"
echo ""
echo "Happy coding! 🎉"
