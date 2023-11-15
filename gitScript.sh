#!/bin/bash

# Access the variable passed from Node.js as a command-line argument
textVar=$1

# Git add
git add .

# Git commit
git commit -m "Commit for $myVariable"