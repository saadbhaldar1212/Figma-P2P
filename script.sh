#!/bin/bash

###############################################################################
# Deployment Script for CSS Unit Converter
# This script handles the setup and deployment of the application
# Usage: ./script.sh [command]
###############################################################################

set -e  # Exit on any error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="CSS Unit Converter"
NODE_VERSION_REQUIRED="18.0.0"
DEV_PORT=8080
BUILD_DIR="dist"

###############################################################################
# Helper Functions
###############################################################################

print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}================================${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

###############################################################################
# Check System Requirements
###############################################################################

check_node() {
    print_header "Checking Node.js Installation"
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed"
        echo "Please install Node.js ${NODE_VERSION_REQUIRED}+ from https://nodejs.org"
        exit 1
    fi
    
    local node_version=$(node -v)
    print_success "Node.js ${node_version} found"
    
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed"
        exit 1
    fi
    
    local npm_version=$(npm -v)
    print_success "npm ${npm_version} found"
}

check_dependencies() {
    print_header "Checking Project Dependencies"
    
    if [ ! -f "package.json" ]; then
        print_error "package.json not found. Are you in the project root?"
        exit 1
    fi
    
    print_success "package.json found"
}

###############################################################################
# Install Dependencies
###############################################################################

install_dependencies() {
    print_header "Installing Dependencies"
    
    if [ ! -d "node_modules" ]; then
        print_info "node_modules not found, installing dependencies..."
        
        # Check if Bun is available for faster installation
        if command -v bun &> /dev/null; then
            print_info "Installing with Bun (faster)"
            bun install
        else
            print_info "Installing with npm"
            npm install
        fi
        
        print_success "Dependencies installed"
    else
        print_info "Dependencies already installed"
        
        # Offer to update dependencies
        read -p "Update dependencies? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            npm install
            print_success "Dependencies updated"
        fi
    fi
}

###############################################################################
# Development Server
###############################################################################

start_dev() {
    print_header "Starting Development Server"
    print_info "Starting on http://localhost:${DEV_PORT}"
    print_info "Press Ctrl+C to stop"
    echo
    
    npm run dev
}

###############################################################################
# Build Application
###############################################################################

build_production() {
    print_header "Building for Production"
    
    if [ -d "${BUILD_DIR}" ]; then
        print_warning "Removing existing build directory..."
        rm -rf ${BUILD_DIR}
    fi
    
    print_info "Building application..."
    npm run build
    
    print_success "Build completed successfully"
    print_info "Output directory: ${BUILD_DIR}/"
    
    # Show build size
    if command -v du &> /dev/null; then
        local build_size=$(du -sh ${BUILD_DIR} | cut -f1)
        print_info "Build size: ${build_size}"
    fi
}

build_dev() {
    print_header "Building for Development"
    
    if [ -d "${BUILD_DIR}" ]; then
        print_warning "Removing existing build directory..."
        rm -rf ${BUILD_DIR}
    fi
    
    print_info "Building application (development mode)..."
    npm run build:dev
    
    print_success "Build completed successfully"
    print_info "Output directory: ${BUILD_DIR}/"
}

###############################################################################
# Preview Build
###############################################################################

preview_build() {
    print_header "Previewing Production Build"
    
    if [ ! -d "${BUILD_DIR}" ]; then
        print_error "${BUILD_DIR} directory not found"
        print_info "Run './script.sh build' first"
        exit 1
    fi
    
    print_info "Starting preview server..."
    npm run preview
}

###############################################################################
# Testing
###############################################################################

run_tests() {
    print_header "Running Tests"
    
    npm run test
    print_success "Tests completed"
}

run_tests_watch() {
    print_header "Running Tests (Watch Mode)"
    print_info "Press Ctrl+C to stop"
    echo
    
    npm run test:watch
}

###############################################################################
# Linting
###############################################################################

run_lint() {
    print_header "Running ESLint"
    
    npm run lint
    print_success "Linting completed"
}

###############################################################################
# Full Deployment Workflow
###############################################################################

deploy() {
    print_header "Starting Full Deployment Workflow"
    
    check_node
    check_dependencies
    install_dependencies
    
    print_info "Running linting..."
    npm run lint
    
    print_info "Running tests..."
    npm run test
    
    print_info "Building for production..."
    build_production
    
    echo
    print_success "Deployment workflow completed!"
    echo
    print_info "Next steps:"
    echo "  1. Review the build output in the ${BUILD_DIR}/ directory"
    echo "  2. Deploy ${BUILD_DIR}/ to your hosting provider"
    echo "  3. Verify the deployment"
}

###############################################################################
# Clean Up
###############################################################################

clean() {
    print_header "Cleaning Project"
    
    print_warning "This will remove build artifacts and cache..."
    read -p "Continue? (y/n) " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        rm -rf ${BUILD_DIR}
        rm -rf node_modules
        rm -f package-lock.json
        
        print_success "Project cleaned"
        print_info "Run './script.sh install' to reinstall dependencies"
    else
        print_info "Cleanup cancelled"
    fi
}

###############################################################################
# Help & Version Info
###############################################################################

show_help() {
    echo "${PROJECT_NAME}"
    echo "Deployment and Development Script"
    echo
    echo "Usage: $0 [command]"
    echo
    echo "Commands:"
    echo "  install          Install project dependencies"
    echo "  dev              Start development server"
    echo "  build            Build for production"
    echo "  build:dev        Build for development (with debugging)"
    echo "  preview          Preview production build"
    echo "  test             Run test suite once"
    echo "  test:watch       Run tests in watch mode"
    echo "  lint             Run ESLint code quality checks"
    echo "  deploy           Full deployment workflow (install → lint → test → build)"
    echo "  clean            Remove build artifacts and node_modules"
    echo "  help             Show this help message"
    echo
    echo "Examples:"
    echo "  ./script.sh dev              # Start development server"
    echo "  ./script.sh build            # Build for production"
    echo "  ./script.sh deploy           # Full deployment workflow"
    echo
    echo "Workflow Tips:"
    echo "  1. Development:  ./script.sh dev"
    echo "  2. Testing:      ./script.sh test"
    echo "  3. Deployment:   ./script.sh deploy"
    echo
}

show_version() {
    if [ -f "package.json" ]; then
        local version=$(grep '"version"' package.json | head -1 | cut -d'"' -f4)
        echo "${PROJECT_NAME} v${version}"
    else
        echo "${PROJECT_NAME}"
    fi
}

###############################################################################
# Main Script Logic
###############################################################################

main() {
    local command=${1:-help}
    
    case "$command" in
        install)
            check_node
            check_dependencies
            install_dependencies
            ;;
        dev)
            check_node
            check_dependencies
            [ ! -d "node_modules" ] && install_dependencies
            start_dev
            ;;
        build)
            check_node
            check_dependencies
            [ ! -d "node_modules" ] && install_dependencies
            build_production
            ;;
        build:dev)
            check_node
            check_dependencies
            [ ! -d "node_modules" ] && install_dependencies
            build_dev
            ;;
        preview)
            preview_build
            ;;
        test)
            check_node
            check_dependencies
            [ ! -d "node_modules" ] && install_dependencies
            run_tests
            ;;
        test:watch)
            check_node
            check_dependencies
            [ ! -d "node_modules" ] && install_dependencies
            run_tests_watch
            ;;
        lint)
            check_node
            check_dependencies
            [ ! -d "node_modules" ] && install_dependencies
            run_lint
            ;;
        deploy)
            check_node
            check_dependencies
            deploy
            ;;
        clean)
            clean
            ;;
        version)
            show_version
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            print_error "Unknown command: $command"
            echo
            show_help
            exit 1
            ;;
    esac
}

# Run main function
main "$@"
