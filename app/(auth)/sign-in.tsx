// import {SafeAreaView} from "react-native-safe-area-context";
// import {Text, TextInput, View, TouchableOpacity} from "react-native";
// import { postSignInDetailsTemp } from "@/services/authService";
// import {useContext, useState} from "react";
// import {useRouter} from "expo-router";
// import {UserContext} from "@/app/UserContext";
// import {getCollections} from "@/services/collectionService";
//
// const SignIn = () => {
//     const router = useRouter();
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [err, setErr] = useState('');
//     const { user, updateUser } = useContext(UserContext);
//
//     const handleSignIn = async () => {
//
//         console.log("Sign in button pressed");
//         try{
//             const response = await postSignInDetailsTemp({username, password});
//             if(response.success){
//                 const userData = response.user;
//                 console.log("Response.user: ", response.user);
//                 // updateUser(response.user);
//
//                 const collectionResponse = await getCollections(response.user.username);
//                 if(!collectionResponse.success){
//                     setErr(`${response.message}`);
//                     console.error(err);
//                 }
//                 else{
//                     console.log("Collection Response: ", JSON.stringify(collectionResponse.data, null, 2));
//                     userData['affirmationCollections'] = collectionResponse.data;
//
//                     const map = {};
//
//                     collectionResponse.data.forEach((collection) => {
//                         // Check if affirmations exist and are an array
//                         console.log("Inside outer loop.");
//                         if (Array.isArray(collection.affirmations)) {
//                             console.log("Inside inner loop.");
//                             collection.affirmations.forEach((affirmation) => {
//                                 if (!map[affirmation.id]) {
//                                     map[affirmation.id] = [];
//                                 }
//                                 map[affirmation.id].push(collection.collectionId);
//                             });
//                         } else {
//                             console.warn(`Collection ${collection.collectionId} has no affirmations or an invalid structure.`);
//                         }
//                     });
//
//                     console.log("Map: ", map);
//                     userData['affirmationToCollectionMap'] = map;
//                 }
//                 updateUser(userData);
//                 console.log("After updateUser: ", user);
//                 router.replace("/(tabs)/home"); // Redirect to home page after successful sign-in
//             }
//             else {
//                 setErr(`${response.message}`);
//                 console.error(err);
//             }
//         }
//         catch (err){
//             console.error("Sign in failed", err);
//             setErr("Sign in failed due to unknown error.");
//         }
//
//     };
//
//     const handleSignUpRedirect = () => {
//         router.replace("/(auth)/sign-up"); // Redirect to the sign-up page
//     };
//
//     return (
//         <SafeAreaView className="flex h-full bg-black items-center justify-center p-5">
//             {/* Sign-In Form Heading */}
//             <View className="flex items-center justify-start w-full mb-10">
//                 <Text className="text-white text-3xl font-extrabold tracking-wider shadow-lg shadow-purple-700">
//                     Welcome Back
//                 </Text>
//                 <Text className="text-purple-400 text-4xl font-extrabold tracking-wide">
//                     Sign In
//                 </Text>
//             </View>
//
//             {/* Input Fields */}
//             <View className="w-full space-y-4">
//                 {/* Username Input */}
//                 <TextInput
//                     className="bg-gray-800 text-white p-4 rounded-md placeholder-gray-400"
//                     placeholder="Username"
//                     placeholderTextColor="gray"
//                     keyboardType="default"
//                     value={username}
//                     onChangeText={setUsername}
//                 />
//
//                 {/* Password Input */}
//                 <TextInput
//                     className="bg-gray-800 text-white p-4 rounded-md placeholder-gray-400"
//                     placeholder="Password"
//                     placeholderTextColor="gray"
//                     secureTextEntry
//                     value={password}
//                     onChangeText={setPassword}
//                 />
//             </View>
//
//             {/* Sign In Button */}
//             <View className="w-full items-center mt-10">
//                 <TouchableOpacity
//                     className="bg-purple-600 py-3 px-7 rounded-full shadow-md shadow-purple-700"
//                     onPress={handleSignIn}
//                 >
//                     <Text className="text-white text-lg font-bold">
//                         Sign In
//                     </Text>
//                 </TouchableOpacity>
//             </View>
//
//             {/* Don't have an account link */}
//             <View className="mt-6">
//                 <Text className="text-gray-400">
//                     Don't have an account?{' '}
//                     <Text className="text-purple-400 font-bold" onPress={handleSignUpRedirect}>
//                         Sign Up
//                     </Text>
//                 </Text>
//             </View>
//         </SafeAreaView>
//     );
// };
//
// export default SignIn;

import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { postSignInDetailsTemp } from "@/services/authService";
import { useContext, useState } from "react";
import { useRouter } from "expo-router";
import { UserContext } from "@/app/UserContext";
import {getCollections} from "@/services/collectionService";

const SignIn = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const { user, updateUser } = useContext(UserContext);

    const handleSignIn = async () => {
        console.log("Sign in button pressed");
        try{
            const response = await postSignInDetailsTemp({username, password});
            if(response.success){
                const userData = response.user;
                console.log("Response.user: ", response.user);
                // updateUser(response.user);

                const collectionResponse = await getCollections(response.user.username);
                if(!collectionResponse.success){
                    setErr(`${response.message}`);
                    console.error(err);
                }
                else{
                    console.log("Collection Response: ", JSON.stringify(collectionResponse.data, null, 2));
                    userData['affirmationCollections'] = collectionResponse.data;

                    const map = {};

                    collectionResponse.data.forEach((collection) => {
                        // Check if affirmations exist and are an array
                        console.log("Inside outer loop.");
                        if (Array.isArray(collection.affirmations)) {
                            console.log("Inside inner loop.");
                            collection.affirmations.forEach((affirmation) => {
                                if (!map[affirmation.id]) {
                                    map[affirmation.id] = [];
                                }
                                map[affirmation.id].push(collection.collectionId);
                            });
                        } else {
                            console.warn(`Collection ${collection.collectionId} has no affirmations or an invalid structure.`);
                        }
                    });

                    console.log("Map: ", map);
                    userData['affirmationToCollectionMap'] = map;
                }
                updateUser(userData);
                console.log("After updateUser: ", user);
                router.replace("/(tabs)/home"); // Redirect to home page after successful sign-in
            }
            else {
                setErr(`${response.message}`);
                console.error(err);
            }
        }
        catch (err){
            console.error("Sign in failed", err);
            setErr("Sign in failed due to unknown error.");
        }
    };

    const handleSignUpRedirect = () => {
        router.replace("/(auth)/sign-up"); // Redirect to the sign-up page
    };

    return (
        <SafeAreaView className="flex h-full bg-black items-center justify-center p-5">
            {/* Sign-In Form Heading */}
            <View className="flex items-center justify-start w-full mb-10">
                <Text className="text-white text-3xl font-extrabold tracking-wider">
                    Welcome Back
                </Text>
                <Text className="text-purple-300 text-4xl font-extrabold tracking-wide">
                    Sign In
                </Text>
            </View>

            {/* Input Fields */}
            <View className="w-full space-y-4">
                {/* Username Input */}
                <TextInput
                    className="border-solid border-b-2 border-x-1 border-purple-200 p-4 rounded-md text-white"
                    placeholder="Username"
                    placeholderTextColor="white"
                    keyboardType="default"
                    value={username}
                    onChangeText={setUsername}
                />

                {/* Password Input */}
                <TextInput
                    className="border-solid border-b-2 border-x-1 border-purple-200 p-4 rounded-md text-white"
                    placeholder="Password"
                    placeholderTextColor="white"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
            </View>

            {/* Sign In Button */}
            <View className="w-full items-center mt-10">
                <TouchableOpacity
                    className="bg-purple-200 py-3 px-7 rounded-full"
                    onPress={handleSignIn}
                >
                    <Text className="text-black text-lg font-bold">Sign In</Text>
                </TouchableOpacity>
            </View>

            {/* Don't have an account link */}
            <View className="mt-6">
                <Text className="text-white">
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