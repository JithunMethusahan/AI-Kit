# Contributing to AI Chatbot Kit

Thank you for your interest in contributing to the AI Chatbot Kit! We welcome contributions from the community.

## How to Contribute

### Reporting Issues
- Use the GitHub issue tracker to report bugs or request features
- Provide detailed steps to reproduce bugs
- Include your environment (OS, Node.js version, browser)

### Code Contributions

1. **Fork the repository** and create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our coding standards

3. **Test your changes**:
   - Run the build: `npm run build`
   - Test with `debug.html` and `test.html`
   - Ensure no breaking changes

4. **Submit a Pull Request**:
   - Provide a clear description of your changes
   - Reference any related issues
   - Ensure CI checks pass

### Development Setup

```bash
git clone https://github.com/yourusername/ai-chatbot-kit.git
cd ai-chatbot-kit
npm install
cp config.yaml.example config.yaml
# Edit config.yaml with your API key for testing
npm run build
```

### Coding Standards

- Use modern JavaScript (ES6+)
- Follow consistent naming conventions
- Add comments for complex logic
- Keep the bundle size minimal

### Areas for Contribution

- **New Features**: Model support, UI improvements, accessibility
- **Bug Fixes**: API handling, cross-browser compatibility
- **Documentation**: Improve README, add examples
- **Testing**: Add automated tests

## Code of Conduct

Please be respectful and constructive in all interactions. We follow a code of conduct to ensure a positive community.

## License

By contributing, you agree that your contributions will be licensed under the same MIT License as the project.