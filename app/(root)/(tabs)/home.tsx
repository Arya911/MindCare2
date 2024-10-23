import { Text, View, TouchableOpacity, ScrollView,Image,ImageProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

const Home = () => {
    const router = useRouter();

    const handleSurveyRedirect = () => {
        router.push("/(tabs)/survey"); // Redirects to the survey page in the tabs
    };

    const handleProfileRedirect = () => {
        router.push("/(tabs)/profile"); // Redirects to the profile page
    };

    const handleRecommendationsRedirect = () => {
        router.push("/(tabs)/recommendations"); // Redirects to the recommendations page
    };

    return (
        <SafeAreaView className="flex h-full bg-black p-5">
            <ScrollView>
                {/* Header with Profile Icon */}
                <View className="flex flex-row justify-between items-center mb-6">
                    <Text className="text-white text-2xl font-extrabold tracking-wide">
                        Welcome to MindCare
                    </Text>
                    <TouchableOpacity onPress={handleProfileRedirect}>
                        <Icon name="user" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Welcome Section */}
                <View className="mb-6">
                    <Text className="text-gray-400 text-md mt-1">
                        Your mental health is important to us!
                    </Text>
                </View>

                <View style={{ padding: 10 }}>
            {/* First Row: Take Survey & Reminders */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                {/* Take Survey Card */}
                <TouchableOpacity
                    onPress={handleSurveyRedirect}
                    style={{ flex: 1, backgroundColor: '#1F2937', padding: 16, borderRadius: 10, marginRight: 10, alignItems: 'center' }}
                >
                    <Image
                        source={{ uri: 'https://www.example.com/survey-icon.png' }} // Replace with your image URL
                        style={{ width: 100, height: 100, marginBottom: 10, backgroundColor: 'black' }}
                    />
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Take Survey</Text>
                </TouchableOpacity>

                {/* Reminder Section */}
                <View style={{ flex: 1, backgroundColor: '#1F2937', padding: 16, borderRadius: 10, alignItems: 'center' }}>
                    <Image
                        source={{ uri: 'https://www.example.com/reminder-icon.png' }} // Replace with your image URL
                        style={{ width: 100, height: 100, marginBottom: 10, backgroundColor: 'black' }}
                    />
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Today's Reminders</Text>
                </View>
            </View>

            {/* Second Row: Mindfulness Tips & Daily Check-In */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                {/* Mindfulness Tips Section */}
                <View style={{ flex: 1, backgroundColor: '#1F2937', padding: 16, borderRadius: 10, marginRight: 10, alignItems: 'center' }}>
                    <Image
                        source={{ uri: 'https://www.example.com/mindfulness-icon.png' }} // Replace with your image URL
                        style={{ width: 100, height: 100, marginBottom: 10, backgroundColor: 'black' }}
                    />
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Mindfulness Tips</Text>
                </View>

                {/* Daily Check-In Section */}
                <View style={{ flex: 1, backgroundColor: '#1F2937', padding: 16, borderRadius: 10, alignItems: 'center' }}>
                    <Image
                        source={{ uri: 'https://www.example.com/checkin-icon.png' }} // Replace with your image URL
                        style={{ width: 100, height: 100, marginBottom: 10, backgroundColor: 'black' }}
                    />
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Daily Check-In</Text>
                </View>
            </View>

            {/* Third Row: Customized Recommendations */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {/* Customized Recommendations Card */}
                <TouchableOpacity
                    onPress={handleRecommendationsRedirect}
                    style={{ flex: 1, backgroundColor: '#1F2937', padding: 16, borderRadius: 10, alignItems: 'center' }}
                >
                    <Image
                        source={{ uri: 'https://www.example.com/recommendations-icon.png' }} // Replace with your image URL
                        style={{ width: 100, height: 100, marginBottom: 10, backgroundColor: 'black' }}
                    />
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Customized Recommendations</Text>
                </TouchableOpacity>
            </View>
        </View>
                   
               
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;