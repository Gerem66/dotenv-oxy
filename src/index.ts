import 'dotenv/config';

type EnvVarType = 'string' | 'number' | 'boolean' | 'enum';
type EnvVarValue = string | number | boolean;

class EnvironmentError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'EnvironmentError';
    }
}

function validateEnumValue<T extends string>(value: string, enumValues: readonly T[]): T {
    if (!enumValues.includes(value as T)) {
        throw new EnvironmentError(`Value "${value}" must be one of: ${enumValues.join(', ')}`);
    }
    return value as T;
}

function parseBoolean(value: string): boolean {
    const lowercased = value.toLowerCase();
    if (['true', '1', 'yes', 'on'].includes(lowercased)) return true;
    if (['false', '0', 'no', 'off'].includes(lowercased)) return false;
    throw new EnvironmentError(`Invalid boolean value: "${value}"`);
}

function parseNumber(value: string): number {
    const num = Number(value);
    if (isNaN(num)) {
        throw new EnvironmentError(`Value "${value}" is not a valid number`);
    }
    return num;
}

// string
export function getEnvVar(name: string, type: 'string', required?: true): string;
export function getEnvVar(name: string, type: 'string', required: false): string | undefined;

// number
export function getEnvVar(name: string, type: 'number', required?: true): number;
export function getEnvVar(name: string, type: 'number', required: false): number | undefined;

// boolean
export function getEnvVar(name: string, type: 'boolean', required?: true): boolean;
export function getEnvVar(name: string, type: 'boolean', required: false): boolean | undefined;

// enum
export function getEnvVar<T extends string>(
    name: string,
    type: 'enum',
    enumValues: readonly T[],
    required?: true
): T;
export function getEnvVar<T extends string>(
    name: string,
    type: 'enum',
    enumValues: readonly T[],
    required: false
): T | undefined;

// Implementation
export function getEnvVar<T extends EnvVarValue>(
    name: string,
    type: EnvVarType,
    enumValuesOrRequired?: readonly string[] | boolean,
    requiredOrUndefined?: boolean
): T | undefined {
    // Validate the variable name
    if (!name || typeof name !== 'string' || name.trim() === '') {
        throw new EnvironmentError(`Invalid environment variable name: "${name}". Variable name must be a non-empty string.`);
    }

    // Determine if the variable is required
    const required = type === 'enum' ? (requiredOrUndefined ?? true) : (enumValuesOrRequired ?? true);

    // Get the environment variable
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
    } catch {
        throw new EnvironmentError(`Error processing environment variable "${name}" with value "${value}"`);
    }
}
