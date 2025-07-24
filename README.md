# dotenv-oxy | Node.js Environment Variable Parser

Type-safe environment variable parser with validation and error handling for Node.js and React Native applications.

## Features

- **Type Safety**: Full TypeScript support with proper typing
- **Validation**: Built-in validation for string, number, boolean, and enum types
- **Error Handling**: Graceful error handling with descriptive messages
- **Lightweight**: Only requires `dotenv` as a peer dependency
- **Cross-Platform**: Works with Node.js and React Native

## Installation

```bash
npm install dotenv-oxy
```

### Additional dependencies:

- Node.js: `npm install dotenv`
- React Native: `npm install react-native-config`

## Usage

Practical example of using `Dotenv-oxy` to recover, validate and centralize environmental variables in applications based on Node.JS.

```typescript
// env.ts

// Node.js
import { getEnvVar } from 'dotenv-oxy';

// React Native
import { getEnvVar } from 'dotenv-oxy/react-native';

// Environment variable declaration
export const env = {
    ENVIRONMENT:    getEnvVar('ENVIRONMENT', 'enum', ['prod', 'dev']),
    DISCORD_TOKEN:  getEnvVar('DISCORD_TOKEN', 'string'),
    OPENAI_API_KEY: getEnvVar('OPENAI_API_KEY', 'string', false),
    PORT:           getEnvVar('PORT', 'number', false) || 3000
};
```

```typescript
// index.ts

import { env } from './env';

env.ENVIRONMENT     // 'prod' | 'dev'
env.DISCORD_TOKEN   // string
env.OPENAI_API_KEY  // string | undefined
env.PORT            // number
```

### Explanation

- `ENVIRONMENT` is an **string (enum)** variable that can only be `prod` or `dev`, otherwise an error will be thrown **at runtime**.
- `DISCORD_TOKEN` is a **required string** variable, if not set an error will be thrown.
- `OPENAI_API_KEY` is an **optional string** variable, if not set it will return `undefined` without throwing an error.
- `PORT` is an **optional number** variable, if not set it will **default** to `3000`. If set to a non-numeric value, an error will be thrown.

## License

[ISC](./LICENSE)
