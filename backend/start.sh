#!/bin/bash

# Kill any process running on port 3001
echo "Killing process on port 3001..."
lsof -ti:3001 | xargs kill -9 2>/dev/null || echo "No process found on port 3001"

# Start the server
echo "Starting server..."
npm start 