import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { UserContext } from "../UserContext";
import { postSignUpDetails } from "@/services/authService";
import { useContext, useState } from "react";
import { Ionicons } from "@expo/vector-icons"; // Import icons from Expo Vector Icons

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    email: "",
    birthdate: "",
    bloodgroup: "",
    gender: "",
    data: "",
  });
  const [err, setErr] = useState("");
  const { updateUser } = useContext(UserContext);
  const [step, setStep] = useState(1);

  const handleTextChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleNext = () => setStep((prevStep) => prevStep + 1);
  const handlePrevious = () => setStep((prevStep) => prevStep - 1);

  const handleSignUp = async () => {
    try {
      const response = await postSignUpDetails(formData);
      if (response.success) {
        updateUser(response.user);
        router.replace("/(tabs)/home");
      } else {
        setErr(response.message);
      }
    } catch (err) {
      console.error("Sign up failed", err);
      setErr("Sign up failed due to unknown error.");
    }
  };

  const handleSignInRedirect = () => {
    router.replace("/(auth)/sign-in");
  };

  return (
    <SafeAreaView className="flex h-full bg-black items-center justify-center p-5">
      {/* Sign-Up Form Heading */}
      <View className="flex items-center justify-start w-full mb-10">
        <Text className="text-purple-300 text-3xl font-extrabold tracking-wider shadow-lg shadow-purple-700">
          Create Account
        </Text>
      </View>

      {/* Input Fields for Each Step */}
      <View className="w-full space-y-4">
        {step === 1 && (
          <>
            <TextInput
              className="bg-purple-200 text-purple-800 p-4 rounded-md placeholder-purple-500"
              placeholder="Full Name"
              placeholderTextColor="#A78BFA"
              value={formData.name}
              onChangeText={(text) => handleTextChange("name", text)}
            />
            <TextInput
              className="bg-purple-200 text-purple-800 p-4 rounded-md placeholder-purple-500"
              placeholder="Username"
              placeholderTextColor="#A78BFA"
              value={formData.username}
              onChangeText={(text) => handleTextChange("username", text)}
            />
            <TextInput
              className="bg-purple-200 text-purple-800 p-4 rounded-md placeholder-purple-500"
              placeholder="Password"
              placeholderTextColor="#A78BFA"
              secureTextEntry
              value={formData.password}
              onChangeText={(text) => handleTextChange("password", text)}
            />
          </>
        )}

        {step === 2 && (
          <>
            <TextInput
              className="bg-purple-200 text-purple-800 p-4 rounded-md placeholder-purple-500"
              placeholder="Gmail"
              placeholderTextColor="#A78BFA"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(text) => handleTextChange("email", text)}
            />
            <TextInput
              className="bg-purple-200 text-purple-800 p-4 rounded-md placeholder-purple-500"
              placeholder="Gender"
              placeholderTextColor="#A78BFA"
              value={formData.gender}
              onChangeText={(text) => handleTextChange("gender", text)}
            />
            <TextInput
              className="bg-purple-200 text-purple-800 p-4 rounded-md placeholder-purple-500"
              placeholder="Blood Group"
              placeholderTextColor="#A78BFA"
              value={formData.bloodgroup}
              onChangeText={(text) => handleTextChange("bloodgroup", text)}
            />
          </>
        )}

        {step === 3 && (
          <>
            <TextInput
              className="bg-purple-200 text-purple-800 p-4 rounded-md placeholder-purple-500"
              placeholder="Birthdate"
              placeholderTextColor="#A78BFA"
              value={formData.birthdate}
              onChangeText={(text) => handleTextChange("birthdate", text)}
            />
            <TextInput
              className="bg-purple-200 text-purple-800 p-4 rounded-md placeholder-purple-500"
              placeholder="Data"
              placeholderTextColor="#A78BFA"
              value={formData.data}
              onChangeText={(text) => handleTextChange("data", text)}
            />
          </>
        )}
      </View>

      {/* Navigation Buttons */}
      <View className="w-full flex-row justify-between mt-10">
        {step > 1 && (
          <TouchableOpacity onPress={handlePrevious} className="flex-row items-center">
            <Ionicons name="chevron-back" size={20} color="#A78BFA" />
            <Text className="text-purple-300 font-bold ml-1">Previous</Text>
          </TouchableOpacity>
        )}
        {step < 3 ? (
          <TouchableOpacity onPress={handleNext} className="flex-row items-center">
            <Text className="text-purple-300 font-bold mr-1">Next</Text>
            <Ionicons name="chevron-forward" size={20} color="#A78BFA" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="bg-purple-600 py-3 px-7 rounded-full shadow-md shadow-purple-700"
            onPress={handleSignUp}
          >
            <Text className="text-white text-lg font-bold">Sign Up</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Already Have Account Link */}
      <View className="mt-6">
        <Text className="text-purple-500">
          Already have an account?{" "}
          <Text
            className="text-purple-300 font-bold"
            onPress={handleSignInRedirect}
          >
            Sign in
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
