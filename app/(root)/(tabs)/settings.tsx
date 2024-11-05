import { Text, View, TouchableOpacity, ScrollView, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { FontAwesome5 } from '@expo/vector-icons';
import { useState } from "react";

const Settings = () => {
    const router = useRouter();
    const [isDarkTheme, setIsDarkTheme] = useState(true);

    const handleProfileRedirect = () => {
        router.push("/(tabs)/profile");
    };

    const handleLogout = () => {
    router.push("//(auth)/sign-in")

    };

    const toggleTheme = () => {
        setIsDarkTheme(previousState => !previousState);
    };

    return (
        <SafeAreaView className={`flex h-full ${isDarkTheme ? 'bg-black' : 'bg-white'} p-5`}>
            <ScrollView>
                {/* Header */}
                <View className="flex flex-row justify-between items-center mb-6">
                    <Text className={`text-center text-2xl font-extrabold tracking-wide ${isDarkTheme ? 'text-white' : 'text-black'}`}>
                        MindCare
                    </Text>
                </View>


                <TouchableOpacity onPress={handleProfileRedirect} className="flex flex-row items-center mb-6 space-x-3">
                    <FontAwesome5 name="user-circle" size={30} color={isDarkTheme ? "white" : "black"} />
                    <Text className={`text-2xl font-extrabold ${isDarkTheme ? 'text-white' : 'text-black'}`}>
                        Profile
                    </Text>
                </TouchableOpacity>


                <TouchableOpacity onPress={handleLogout} className="flex flex-row items-center mb-6 space-x-3">
                    <FontAwesome5 name="sign-out-alt" size={30} color={isDarkTheme ? "white" : "black"} />
                    <Text className={`text-2xl font-extrabold ${isDarkTheme ? 'text-white' : 'text-black'}`}>
                        Logout
                    </Text>
                </TouchableOpacity>


                <View className="flex flex-row justify-between items-center mb-6">
                    <Text className={`text-xl font-bold ${isDarkTheme ? 'text-white' : 'text-black'}`}>
                        Dark Theme
                    </Text>
                    <Switch
                        value={isDarkTheme}
                        onValueChange={toggleTheme}
                        thumbColor={isDarkTheme ? "#f5dd4b" : "#f4f3f4"}
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Settings;
