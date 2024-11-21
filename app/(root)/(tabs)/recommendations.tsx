import React, { useState } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {FontAwesome} from "@expo/vector-icons";

const Recommendations = () => {
    const [userInput, setUserInput] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [aiResponse, setAiResponse] = useState("");
    const genAI = new GoogleGenerativeAI("AIzaSyAUqmCtc_VjNjhdBdXvy4FP3WtbZWTogSo");

    const toggleCategory = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    const convertMarkdownToPlainText = (markdown) => {
        return markdown
            .replace(/[*_~`>#+\[\]()\-!]/g, "") // Remove common Markdown symbols
            .replace(/(#+)\s/g, "") // Remove heading symbols
            .replace(/\n+/g, "\n") // Replace multiple newlines with a single newline
            .trim(); // Remove leading/trailing whitespace
    };

    const generateSuggestions = async () => {
        if (!userInput.trim()) {
            Alert.alert("Input Required", "Please type a message before proceeding.");
            return;
        }

        if (selectedCategories.length === 0) {
            Alert.alert(
                "Select Categories",
                "Please select at least one category before generating suggestions."
            );
            return;
        }

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

            // Generate prompt based on selected categories
            const categoryPrompts = {
                Diet: "Focus on a personalized diet plan to improve mental and physical health.",
                Lifestyle: "Provide lifestyle changes or habits to enhance mental and physical well-being.",
                Health: "Suggest general health tips and practices to improve overall wellness.",
                Philosophy: "Provide a philosophical perspective to look at the situation positively."
            };

            const selectedPrompts = selectedCategories
                .map((category) => categoryPrompts[category])
                .join(" ");

            const prompt = `Provide personalized suggestions based on the following input: 
    
      User Input: ${userInput}

      Categories: ${selectedCategories.join(", ")}

      Guidelines: ${selectedPrompts}
      
      Limit the answer to 10 sentences. Keep it easy to understand.`;

            const result = await model.generateContent(prompt);
            const plainTextResponse = convertMarkdownToPlainText(result.response.text());
            setAiResponse(plainTextResponse);
        } catch (error) {
            console.error("Error fetching AI response:", error);
            setAiResponse("Failed to generate suggestions. Please try again.");
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-black p-5">
            <ScrollView>
                {/* Title Section */}
                <View className="flex items-start mb-10">
                    <Text className="text-white text-2xl font-bold">Custom Tips</Text>
                </View>

                {/* Category Buttons in 2x2 Grid */}
                <Text className="text-white text-xl font-bold">Categories</Text>
                <View className="flex flex-row justify-between mb-3">
                    {["Diet", "Lifestyle"].map((category) => (
                        <TouchableOpacity
                            key={category}
                            onPress={() => toggleCategory(category)}
                            className={`${
                                selectedCategories.includes(category)
                                    ? "bg-purple-200"
                                    : "bg-gray-700"
                            } p-4 rounded-lg flex-1 mx-1`}
                            style={{ height: 54 }} // Fixed height for uniformity
                        >
                            <Text className={`text-base text-center ${
                                selectedCategories.includes(category)
                                    ? "text-black"
                                    : "text-white"
                            }`}>
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View className="flex flex-row justify-between mb-7">
                    {["Health", "Philosophy"].map((category) => (
                        <TouchableOpacity
                            key={category}
                            onPress={() => toggleCategory(category)}
                            className={`${
                                selectedCategories.includes(category)
                                    ? "bg-purple-200"
                                    : "bg-gray-700"
                            } p-4 rounded-lg flex-1 mx-1`}
                            style={{ height: 54 }} // Fixed height for uniformity
                        >
                            <Text className={`${
                                selectedCategories.includes(category)
                                    ? "text-black"
                                    : "text-white"
                            } text-base text-center`}>
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Input Field and Generate Button */}
                <View className="flex flex-row items-start mb-6">
                    <TextInput
                        value={userInput}
                        onChangeText={setUserInput}
                        placeholder="Message"
                        placeholderTextColor="white"
                        className="border-solid border-2 border-purple-200 text-white p-4 rounded-lg flex-1"
                        style={{ minHeight: 50, maxHeight: 150 }} // Grows vertically
                        multiline={true}
                    />
                    <TouchableOpacity
                        onPress={generateSuggestions}
                        className="bg-purple-200 p-4 rounded-lg ml-2 justify-center items-center"
                    >
                        <FontAwesome name="magic" size={24} color="black" />

                    </TouchableOpacity>
                </View>

                {/* Display AI Response */}
                {aiResponse && (
                    <View className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
                        <Text className="text-white text-xl font-bold mb-4">
                            Your Suggestions
                        </Text>
                        <Text className="text-white">
                            {aiResponse}
                        </Text>
                    </View>
                )}

            </ScrollView>
        </SafeAreaView>

    );
};

export default Recommendations;