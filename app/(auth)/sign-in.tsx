import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router"; // Assuming you're using Expo Router

const SignIn = () => {
    const router = useRouter();

    const handleSignIn = () => {
        // Logic to handle sign-in (e.g., API call, form validation)
        console.log("Sign in button pressed");
        router.replace("/(tabs)/home"); // Redirect to home page after successful sign-in
    };

    const handleSignUpRedirect = () => {
        router.replace("/(auth)/sign-up"); // Redirect to the sign-up page
    };

    return (
        <SafeAreaView className="flex h-full bg-black items-center justify-center p-5">
            {/* Sign-In Form Heading */}
            <View className="flex items-center justify-start w-full mb-10">
                <Text className="text-white text-3xl font-extrabold tracking-wider shadow-lg shadow-purple-700">
                    Welcome Back
                </Text>
                <Text className="text-purple-400 text-4xl font-extrabold tracking-wide">
                    Sign In
                </Text>
            </View>

            {/* Input Fields */}
            <View className="w-full space-y-4">
                {/* Username Input */}
                <TextInput
                    className="bg-gray-800 text-white p-4 rounded-md placeholder-gray-400"
                    placeholder="Username"
                    placeholderTextColor="gray"
                    keyboardType="default"
                />

                {/* Password Input */}
                <TextInput
                    className="bg-gray-800 text-white p-4 rounded-md placeholder-gray-400"
                    placeholder="Password"
                    placeholderTextColor="gray"
                    secureTextEntry
                />
            </View>

            {/* Sign In Button */}
            <View className="w-full items-center mt-10">
                <TouchableOpacity
                    className="bg-purple-600 py-3 px-7 rounded-full shadow-md shadow-purple-700"
                    onPress={handleSignIn}
                >
                    <Text className="text-white text-lg font-bold">
                        Sign In
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Don't have an account link */}
            <View className="mt-6">
                <Text className="text-gray-400">
                    Don't have an account?{' '}
                    <Text className="text-purple-400 font-bold" onPress={handleSignUpRedirect}>
                        Sign Up
                    </Text>
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default SignIn;
