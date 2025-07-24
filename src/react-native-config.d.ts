// Types for react-native-config when not available
declare module 'react-native-config' {
    interface NativeConfig {
        [name: string]: string;
    }
    const Config: NativeConfig;
    export default Config;
}
