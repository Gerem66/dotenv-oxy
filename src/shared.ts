type EnvVarType = 'string' | 'number' | 'boolean' | 'enum';
type EnvVarValue = string | number | boolean;

export class EnvironmentError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'EnvironmentError';
    }
}

export function validateEnumValue<T extends string>(value: string, enumValues: readonly T[]): T {
    if (!enumValues.includes(value as T)) {
        throw new EnvironmentError(`Value "${value}" must be one of: ${enumValues.join(', ')}`);
    }
    return value as T;
}

export function parseBoolean(value: string): boolean {
    const lowercased = value.toLowerCase();
    if (['true', '1', 'yes', 'on'].includes(lowercased)) return true;
    if (['false', '0', 'no', 'off'].includes(lowercased)) return false;
    throw new EnvironmentError(`Invalid boolean value: "${value}"`);
}

export function parseNumber(value: string): number {
    const num = Number(value);
    if (isNaN(num)) {
        throw new EnvironmentError(`Value "${value}" is not a valid number`);
    }
    return num;
}

// Type overloads for getEnvVar function
export interface GetEnvVarInterface {
    // string
    (name: string, type: 'string', required?: true): string;
    (name: string, type: 'string', required: false): string | undefined;
    
    // number
    (name: string, type: 'number', required?: true): number;
    (name: string, type: 'number', required: false): number | undefined;
    
    // boolean
    (name: string, type: 'boolean', required?: true): boolean;
    (name: string, type: 'boolean', required: false): boolean | undefined;
    
    // enum
    <T extends string>(
        name: string,
        type: 'enum',
        enumValues: readonly T[],
        required?: true
    ): T;
    <T extends string>(
        name: string,
        type: 'enum',
        enumValues: readonly T[],
        required: false
    ): T | undefined;
}

export type { EnvVarType, EnvVarValue };
