#!/bin/bash

# Auto-generate changelog and create a new version
# Usage: ./scripts/release.sh [patch|minor|major]

set -e

VERSION_TYPE=${1:-patch}

echo "🚀 Starting release process..."

# Ensure we're on main branch
git checkout main
git pull origin main

# Run tests
echo "🧪 Running tests..."
npm run test -- --run
npm run test:e2e -- --reporter=dot

# Build project
echo "🏗️ Building project..."
npm run build

# Generate changelog (if git-chglog is available)
if command -v git-chglog &> /dev/null; then
    echo "📝 Updating changelog..."
    git-chglog --output CHANGELOG.md
    git add CHANGELOG.md
fi

# Commit any changes
if ! git diff --staged --quiet; then
    git commit -m "chore: update changelog and build artifacts"
fi

# Bump version and create tag
echo "📈 Bumping version ($VERSION_TYPE)..."
npm version $VERSION_TYPE

# Get the new version
NEW_VERSION=$(node -p "require('./package.json').version")

echo "✅ Released version v$NEW_VERSION"
echo "📦 To publish: git push && git push --tags"
