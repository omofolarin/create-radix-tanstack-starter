# Technical References

## Server Functions

### TanStack Router

- [Server Functions Documentation](https://tanstack.com/router/latest/docs/framework/react/start/server-functions)
  - Key concepts for server function implementation
  - Validation patterns and examples
  - Error handling best practices
- [Build from Scratch Guide](https://tanstack.com/router/latest/docs/framework/react/start/build-from-scratch)
  - Project setup and configuration
  - Integration with React applications

### Project Patterns

1. **RPC Methods**

   - Using `GET` for read operations
   - Using `POST` for write operations
   - RESTful structure with RPC methods

2. **Request Structure**
   ```typescript
   z.object({
     body: {...},     // Request payload
     params: {...},   // URL parameters
     query: {...}     // Query parameters (where applicable)
   })
   ```
