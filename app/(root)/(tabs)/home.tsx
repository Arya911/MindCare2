import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { LineChart } from "react-native-chart-kit";
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Dashboard = ({ scores }) => {
  const MINIMAL_RANGE = [1, 4];
  const MILD_RANGE = [5, 9];
  const MODERATE_RANGE = [10, 14];
  const MODERATELY_SEVERE_RANGE = [15, 19];
  const SEVERE_RANGE = [20, 30];

  const getDepressionCategory = (score) => {
    if (score >= MINIMAL_RANGE[0] && score <= MINIMAL_RANGE[1]) return "Minimal depression";
    if (score >= MILD_RANGE[0] && score <= MILD_RANGE[1]) return "Mild depression";
    if (score >= MODERATE_RANGE[0] && score <= MODERATE_RANGE[1]) return "Moderate depression";
    if (score >= MODERATELY_SEVERE_RANGE[0] && score <= MODERATELY_SEVERE_RANGE[1]) return "Moderately severe depression";
    if (score >= SEVERE_RANGE[0] && score <= SEVERE_RANGE[1]) return "Severe depression";
    if (score > SEVERE_RANGE[1]) return "Beyond severe depression";
    return "Unknown";
  };

  const checkForDistress = () => {
    if (scores.length < 3) return false;
    const recentThree = scores.slice(-3);
    return recentThree.every(score => score >= 20);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission not granted for notifications');
      }
    })();
  }, []);

  useEffect(() => {
    if (checkForDistress()) {
      sendPushNotification();
    }
  }, [scores]);

  const sendPushNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Heightened Distress Detected",
        body: "We noticed that your recent survey scores indicate a high level of distress. Please consider reaching out for help or speak with a professional.",
      },
      trigger: null,
    });
  };

  const chartData = {
    labels: scores.map((_, index) => (index + 1).toString()),
    datasets: [
      {
        data: scores,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View className="mt-8 p-4 bg-white rounded-lg">
      <Text className="text-xl font-bold mb-4 text-black">Mental Health Trends</Text>
      <LineChart
        data={chartData}
        width={Dimensions.get("window").width - 40}
        height={220}
        fromZero
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(75, 0, 130, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: "#4B0082",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <Text className="text-center text-black mt-2">
        {checkForDistress()
          ? "Recent surveys indicate high distress. Please consider seeking help."
          : "Your recent survey trends look stable."}
      </Text>
    </View>
  );
};

const Home = () => {
  const router = useRouter();
  const [surveyScores, setSurveyScores] = useState([5, 6, 8, 7, 9, 8]);

  const handleSurveyRedirect = () => {
    router.push("/(tabs)/survey");
  };

  const handleSettingsRedirect = () => {
    router.push("/(tabs)/settings");
  };

  const handleRecommendationsRedirect = () => {
    router.push("/(tabs)/recommendations");
  };

  const handleAffirmationsRedirect = () => {
    router.push("/(tabs)/affirmations");
  };

  const handleProfessionalsRedirect = () => {
    router.push("/(tabs)/findProfessionals");
  };

  return (
    <SafeAreaView className="flex h-full bg-black p-5">
      <ScrollView>
        <View className="flex flex-row justify-between items-center mb-6">
          <Text className="text-white text-center text-2xl font-extrabold tracking-wide">
            MindCare
          </Text>
          <TouchableOpacity onPress={handleSettingsRedirect}>
            <FontAwesome5 name="cog" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <Dashboard scores={surveyScores} />
        <View className="space-y-4 mt-8">
          <View className="flex flex-row justify-between">
            <TouchableOpacity
              onPress={handleRecommendationsRedirect}
              className="flex-1 bg-purple-200 p-5 rounded-lg mr-2 items-center"
            >
              <FontAwesome5 name="compass" size={70} color="black" className="mb-2" />
              <Text className="mt-4 text-black text-sm text-center">Custom Tips</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSurveyRedirect}
              className="flex-1 bg-purple-200 p-5 rounded-lg items-center"
            >
              <FontAwesome5 name="clipboard-list" size={70} color="black" className="mb-2" />
              <Text className="mt-4 text-black text-sm text-center">Health Survey</Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-row justify-between">
            <TouchableOpacity
              onPress={handleAffirmationsRedirect}
              className="flex-1 bg-purple-200 p-5 rounded-lg mr-2 items-center"
            >
              <Ionicons name="sparkles" size={70} color="black" className="mb-2" />
              <Text className="mt-4 text-black text-sm text-center">Affirmations</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleProfessionalsRedirect}
              className="flex-1 bg-purple-200 p-5 rounded-lg items-center"
            >
              <FontAwesome5 name="user-md" size={70} color="black" className="mb-2" />
              <Text className="mt-4 text-black text-sm text-center">Find Professionals</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
