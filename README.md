# dotenv-oxy | Node.js Environment Variable Parser

Type-safe environment variable parser with validation and error handling for Node.js applications.

## Features

- **Type Safety**: Full TypeScript support with proper typing
- **Validation**: Built-in validation for string, number, boolean, and enum types
- **Error Handling**: Graceful error handling with descriptive messages
- **Lightweight**: Only requires `dotenv` as a peer dependency

## Installation

```bash
npm install dotenv-oxy
```

## Usage

```typescript
import { defineEnvVar } from 'dotenv-oxy';

// String variables
const dbHost = defineEnvVar('DB_HOST', 'string'); // Required by default
const apiKey = defineEnvVar('API_KEY', 'string', false); // Optional

// Number variables
const port = defineEnvVar('PORT', 'number');
const maxConnections = defineEnvVar('MAX_CONNECTIONS', 'number', false);

// Boolean variables
const enableLogging = defineEnvVar('ENABLE_LOGGING', 'boolean');
const debugMode = defineEnvVar('DEBUG_MODE', 'boolean', false);

// Enum variables
const environment = defineEnvVar('NODE_ENV', 'enum', ['development', 'production', 'test'] as const);
const logLevel = defineEnvVar('LOG_LEVEL', 'enum', ['debug', 'info', 'warn', 'error'] as const, false);
```

## API

### `defineEnvVar(name, type, required?)`

Parse and validate an environment variable.

#### Parameters

- `name`: The environment variable name
- `type`: The expected type (`'string'`, `'number'`, `'boolean'`, `'enum'`)
- `required`: Whether the variable is required (default: `true`)

For enum types, pass the allowed values as the third parameter and required as the fourth.

#### Returns

The parsed value with the correct TypeScript type, or `undefined` if optional and not set.

## License

ISC
