import 'dotenv/config';
import { EnvVarType, EnvVarValue, EnvironmentError, validateEnumValue, parseBoolean, parseNumber, GetEnvVarInterface } from './shared';

// Implementation
export const getEnvVar: GetEnvVarInterface = <T extends EnvVarValue>(
    name: string,
    type: EnvVarType,
    enumValuesOrRequired?: readonly string[] | boolean,
    requiredOrUndefined?: boolean
): T | undefined => {
    // Validate the variable name
    if (!name || typeof name !== 'string' || name.trim() === '') {
        throw new EnvironmentError(`Invalid environment variable name: "${name}". Variable name must be a non-empty string.`);
    }

    // Determine if the variable is required
    const required = type === 'enum' ? (requiredOrUndefined ?? true) : (enumValuesOrRequired ?? true);

    // Get the environment variable from Node.js process.env
    const value = process.env[name];

    // Handle undefined/empty values
    if (!value) {
        if (required) {
            throw new EnvironmentError(`Missing required environment variable: ${name}`);
        }
        return undefined;
    }

    try {
        let enumValues: readonly string[] | undefined;
        switch (type) {
            case 'string':
                return value as T;

            case 'number':
                return parseNumber(value) as T;

            case 'boolean':
                return parseBoolean(value) as T;

            case 'enum':
                enumValues = enumValuesOrRequired as readonly string[];
                return validateEnumValue(value, enumValues) as T;

            default:
                throw new EnvironmentError(`Unknown type "${type}" for environment variable ${name}`);
        }
    } catch (error) {
        // Re-throw EnvironmentError as-is (preserves detailed messages for enums, booleans, etc.)
        if (error instanceof EnvironmentError) {
            throw error;
        }
        // Catch any other unexpected errors
        throw new EnvironmentError(`Error processing environment variable "${name}" with value "${value}"`);
    }
};

export { EnvironmentError };
