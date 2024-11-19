import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { UserContext } from '../UserContext';
import { postSignUpDetails } from "@/services/authService";
import { useContext, useState } from "react";

const SignUp = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        email: '',
        birthdate: '',
        bloodgroup: '',
        gender: '',
        data: ''
    });
    const [err, setErr] = useState('');
    const { updateUser } = useContext(UserContext);
    const [step, setStep] = useState(1);

    const handleTextChange = (field, value) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const handleNext = () => setStep(prevStep => prevStep + 1);
    const handlePrevious = () => setStep(prevStep => prevStep - 1);

    const handleSignUp = async () => {
        try {
            const response = await postSignUpDetails(formData);
            if(response.success){
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
                <Text className="text-white text-3xl font-extrabold tracking-wider shadow-lg shadow-purple-700">
                    Create Account
                </Text>
            </View>

            {/* Input Fields for Each Step */}
            <View className="w-full space-y-4">
                {step === 1 && (
                    <>
                     <TextInput
                         className="mb-4 border-solid border-b-2 border-purple-300 text-white p-4 rounded-md"
                         placeholder="Full Name"
                         placeholderTextColor="white"
                         value={formData.name}
                         onChangeText={(text) => handleTextChange('name', text)}
                     />

                        <TextInput
                            className="mb-4 border-solid border-b-2 border-purple-300 text-white p-4 rounded-md"
                            placeholder="Username"
                            placeholderTextColor="white"
                            value={formData.username}
                            onChangeText={(text) => handleTextChange('username', text)}
                        />
                        <TextInput
                            className="mb-4 border-solid border-b-2 border-purple-300 text-white p-4 rounded-md"
                            placeholder="Password"
                            placeholderTextColor="white"
                            secureTextEntry
                            value={formData.password}
                            onChangeText={(text) => handleTextChange('password', text)}
                        />
                    </>
                )}

                {step === 2 && (
                    <>
                        <TextInput
                            className="mb-4 border-solid border-b-2 border-purple-300 text-white p-4 rounded-md"
                            placeholder="Gmail"
                            placeholderTextColor="white"
                            keyboardType="email-address"
                            value={formData.email}
                            onChangeText={(text) => handleTextChange('email', text)}
                        />
                        <TextInput
                            className="mb-4 border-solid border-b-2 border-purple-300 text-white p-4 rounded-md"
                            placeholder="Gender"
                            placeholderTextColor="white"
                            value={formData.gender}
                            onChangeText={(text) => handleTextChange('gender', text)}
                        />
                        <TextInput
                            className="mb-4 border-solid border-b-2 border-purple-300 text-white p-4 rounded-md"
                            placeholder="Blood Group"
                            placeholderTextColor="white"
                            value={formData.bloodgroup}
                            onChangeText={(text) => handleTextChange('bloodgroup', text)}
                        />
                    </>
                )}

                {step === 3 && (
                    <>
                        <TextInput
                            className="mb-4 border-solid border-b-2 border-purple-300 text-white p-4 rounded-md"
                            placeholder="Birthdate"
                            placeholderTextColor="white"
                            value={formData.birthdate}
                            onChangeText={(text) => handleTextChange('birthdate', text)}
                        />
                        <TextInput
                            className="mb-4 border-solid border-b-2 border-purple-300 text-white p-4 rounded-md"
                            placeholder="Data"
                            placeholderTextColor="white"
                            value={formData.data}
                            onChangeText={(text) => handleTextChange('data', text)}
                        />
                    </>
                )}
            </View>

            {/* Navigation Buttons */}
            <View className="w-full flex-row justify-between mt-10">
                {step > 1 && (
                    <TouchableOpacity onPress={handlePrevious}>
                        <Text className="text-purple-300 font-bold">Previous</Text>
                    </TouchableOpacity>
                )}
                {step < 3 ? (
                    <TouchableOpacity onPress={handleNext}>
                        <Text className="text-purple-300 font-bold">Next</Text>
                    </TouchableOpacity>
                ) : (


                    <TouchableOpacity
                        className="bg-purple-200 py-3 px-7 rounded-full"
                        onPress={handleSignUp}
                    >
                        <Text className="text-black text-lg font-bold ">Sign Up</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Already Have Account Link */}
            <View className="mt-6">
                <Text className="text-gray-400">
                    Already have an account?{' '}
                    <Text className="text-purple-400 font-bold" onPress={handleSignInRedirect}>
                        Sign in
                    </Text>
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default SignUp;
