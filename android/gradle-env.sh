#!/bin/bash

# Set environment variables for Gradle to find Node.js tools
export PATH="/opt/homebrew/bin:$PATH"
export NODE_BINARY="/opt/homebrew/bin/node"
export NPM_BINARY="/opt/homebrew/bin/npm"
export NPX_BINARY="/opt/homebrew/bin/npx"

# Run Gradle with the environment variables set
exec "$@"