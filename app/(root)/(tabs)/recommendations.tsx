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
      };

      const selectedPrompts = selectedCategories
        .map((category) => categoryPrompts[category])
        .join(" ");

      const prompt = `Provide personalized suggestions based on the following input: 
    
      User Input: ${userInput}

      Categories: ${selectedCategories.join(", ")}

      Guidelines: ${selectedPrompts}`;

      const result = await model.generateContent(prompt);
      const plainTextResponse = convertMarkdownToPlainText(result.response.text());
      setAiResponse(plainTextResponse);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setAiResponse("Failed to generate suggestions. Please try again.");
    }
  };

  return (
    <SafeAreaView className="flex h-full bg-black p-5">
      <ScrollView>
        <View className="flex items-start mb-6">
          <Text className="text-white text-2xl font-extrabold tracking-wide">
            Personalized Recommendations
          </Text>
          <Text className="text-gray-400 text-md mt-1">
            Choose categories and ask for suggestions to improve your mental and
            physical health.
          </Text>
        </View>

        {/* User Input Field */}
        <TextInput
          value={userInput}
          onChangeText={setUserInput}
          placeholder="Type your message here..."
          placeholderTextColor="gray"
          className="bg-gray-800 text-white p-4 mb-6 rounded-lg"
        />

        {/* Category Buttons */}
        <View className="flex flex-row justify-between mb-6">
          {["Diet", "Lifestyle", "Health"].map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => toggleCategory(category)}
              className={`${
                selectedCategories.includes(category)
                  ? "bg-green-700"
                  : "bg-gray-700"
              } p-3 rounded-lg shadow-md flex-1 mx-1`}
            >
              <Text className="text-white text-lg font-bold text-center">
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Generate Response Button */}
        <TouchableOpacity
          onPress={generateSuggestions}
          className="bg-blue-700 p-4 rounded-lg shadow-md mb-6"
        >
          <Text className="text-white text-lg font-bold text-center">
            Generate Suggestions
          </Text>
        </TouchableOpacity>

        {/* Display AI Response */}
        <View className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <Text className="text-white text-xl font-bold mb-2">
            Your Suggestions
          </Text>
          <Text className="text-gray-400">
            {aiResponse ||
              "Please select categories and type your input to get suggestions."}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Recommendations;
