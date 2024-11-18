import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { postSignInDetailsTemp } from "@/services/authService";
import { useContext, useState } from "react";
import { useRouter } from "expo-router";
import { UserContext } from "@/app/UserContext";
import { Ionicons } from "@expo/vector-icons";

const SignIn = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [isUsernameFocused, setUsernameFocused] = useState(false);
  const [isPasswordFocused, setPasswordFocused] = useState(false);
  const { user, updateUser } = useContext(UserContext);

  const handleSignIn = async () => {
    console.log("Sign in button pressed");
    router.replace("/(tabs)/home");
    // Uncomment the following lines for actual sign-in logic
    // try {
    //   const response = await postSignInDetailsTemp({ username, password });
    //   if (response.success) {
    //     updateUser(response.user);
    //     router.replace("/(tabs)/home");
    //   } else {
    //     setErr(`${response.message}`);
    //   }
    // } catch (err) {
    //   setErr("Sign in failed due to unknown error.");
    // }
  };

  const handleSignUpRedirect = () => {
    router.replace("/(auth)/sign-up");
  };

  return (
    <SafeAreaView className="flex h-full bg-black items-center justify-center p-5">
      {/* Back Button */}
      <TouchableOpacity
        className="absolute top-10 left-5"
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="#E9D5FF" />
      </TouchableOpacity>

      {/* Sign-In Form Heading */}
      <View className="flex items-center justify-start w-full mb-10">
        <Text className="text-purple-200 text-3xl font-extrabold tracking-wider shadow-lg shadow-purple-700">
          Welcome Back
        </Text>
        <Text className="text-purple-200 text-4xl font-extrabold tracking-wide">
          Sign In
        </Text>
      </View>

      {/* Input Fields */}
      <View className="w-full space-y-4">
        {/* Username Input */}
        <TextInput
          className={`${
            isUsernameFocused
              ? "bg-purple-200 text-black"
              : "bg-purple-300 text-purple-200"
          } p-4 rounded-md`}
          placeholder="Username"
          placeholderTextColor="#E9D5FF"
          keyboardType="default"
          value={username}
          onChangeText={setUsername}
          onFocus={() => setUsernameFocused(true)}
          onBlur={() => setUsernameFocused(false)}
        />

        {/* Password Input */}
        <TextInput
          className={`${
            isPasswordFocused
              ? "bg-purple-200 text-black"
              : "bg-purple-300 text-purple-200"
          } p-4 rounded-md`}
          placeholder="Password"
          placeholderTextColor="#E9D5FF"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(false)}
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
        <Text className="text-purple-200">
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
