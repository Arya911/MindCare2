import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { FontAwesome5, Ionicons } from '@expo/vector-icons'; // Import additional icons
import { useFonts } from 'expo-font';

const Home = () => {
    const router = useRouter();

    const handleSurveyRedirect = () => {
        router.push("/(tabs)/survey");
    };

    const handleProfileRedirect = () => {
        router.push("/(tabs)/profile");
    };

    const handleRecommendationsRedirect = () => {
        router.push("/(tabs)/recommendations");
    };

    const handleAffirmationsRedirect = () => {
        router.push("/(tabs)/affirmations");
    };

    // const [fontsLoaded] = useFonts({
    //     'FontAwesome5': FontAwesome5.font, // Load FontAwesome5 fonts
    //     // Add any other icon fonts you are using, e.g., MaterialIcons, Feather, etc.
    // });
    //
    // if (!fontsLoaded) {
    //     return <AppLoading />; // Display a loading screen until fonts are loaded
    // }

    return (
        <SafeAreaView className="flex h-full bg-black p-5">
            <ScrollView>
                {/* Header with Profile Icon */}
                <View className="flex flex-row justify-between items-center mb-6">
                    <Text className="text-white text-center text-2xl font-extrabold tracking-wide">
                       MindCare
                    </Text>
                    <TouchableOpacity onPress={handleProfileRedirect}>
                        <FontAwesome5 name="user-circle" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                <View className="space-y-4">
                    {/* First Row: Personalized Suggestions & Survey */}
                    <View className="flex flex-row justify-between">
                        {/* Personalized Suggestions Card */}
                        <TouchableOpacity
                            onPress={handleRecommendationsRedirect}
                            className="flex-1 bg-purple-200 p-5 rounded-lg mr-2 items-center"
                        >
                            <FontAwesome5 name="compass" size={70} color="black" className="mb-2" />
                            <Text className="mt-4 text-black text-sm text-center">Custom Tips</Text>
                        </TouchableOpacity>

                        {/* Take Survey Card */}
                        <TouchableOpacity
                            onPress={handleSurveyRedirect}
                            className="flex-1 bg-purple-200 p-5 rounded-lg items-center"
                        >
                            <FontAwesome5 name="clipboard-list" size={70} color="black" className="mb-2" />
                            <Text className="mt-4 text-black text-sm text-center">Survey</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Second Row: Positive Affirmations & Find Professionals */}
                    <View className="flex flex-row justify-between">
                        {/* Positive Affirmations Section */}
                        <TouchableOpacity
                            onPress={handleAffirmationsRedirect}
                            className="flex-1 bg-purple-200 p-5 rounded-lg mr-2 items-center"
                        >
                            <Ionicons name="sparkles" size={70} color="black" className="mb-2" />
                            <Text className="mt-4 text-black text-sm text-center">Affirmations</Text>
                        </TouchableOpacity>

                        {/* Find Professionals Section */}
                        <View className="flex-1 bg-purple-200 p-5 rounded-lg items-center">
                            <FontAwesome5 name="user-md" size={70} color="black" className="mb-2" />
                            <Text className="mt-4 text-black text-sm text-center">Find Professionals</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

    );
};

export default Home;
