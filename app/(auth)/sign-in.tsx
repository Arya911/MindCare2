import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { postSignInDetailsTemp } from "@/services/authService";
import { useContext, useState } from "react";
import { useRouter } from "expo-router";
import { UserContext } from "@/app/UserContext";

const SignIn = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { user, updateUser } = useContext(UserContext);

  const handleSignIn = async () => {
    console.log("Sign in button pressed");
    router.replace("/(tabs)/home");
    // Uncomment below for actual API call
    // try {
    //   const response = await postSignInDetailsTemp({ username, password });
    //   if (response.success) {
    //     console.log("Response.user: ", response.user);
    //     updateUser(response.user);
    //     router.replace("/(tabs)/home"); // Redirect to home page after successful sign-in
    //   } else {
    //     setErr(`${response.message}`);
    //     console.error(err);
    //   }
    // } catch (err) {
    //   console.error("Sign in failed", err);
    //   setErr("Sign in failed due to unknown error.");
    // }
  };

  const handleSignUpRedirect = () => {
    router.replace("/(auth)/sign-up"); // Redirect to the sign-up page
  };

  return (
    <SafeAreaView className="flex h-full bg-black items-center justify-center p-5">
      {/* Sign-In Form Heading */}
      <View className="flex items-center justify-start w-full mb-10">
        <Text className="text-purple-300 text-3xl font-extrabold tracking-wider shadow-lg shadow-purple-700">
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
          className="bg-purple-200 text-purple-800 p-4 rounded-md placeholder-purple-500"
          placeholder="Username"
          placeholderTextColor="#A78BFA"
          keyboardType="default"
          value={username}
          onChangeText={setUsername}
        />

        {/* Password Input */}
        <TextInput
          className="bg-purple-200 text-purple-800 p-4 rounded-md placeholder-purple-500"
          placeholder="Password"
          placeholderTextColor="#A78BFA"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Sign In Button */}
      <View className="w-full items-center mt-10">
        <TouchableOpacity
          className="bg-purple-600 py-3 px-7 rounded-full shadow-md shadow-purple-700"
          onPress={handleSignIn}
        >
          <Text className="text-white text-lg font-bold">Sign In</Text>
        </TouchableOpacity>
      </View>

      {/* Don't have an account link */}
      <View className="mt-6">
        <Text className="text-purple-500">
          Don't have an account?{" "}
          <Text
            className="text-purple-300 font-bold"
            onPress={handleSignUpRedirect}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
