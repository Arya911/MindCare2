import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const Survey = ({ navigation }) => {
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questions = [
    {
      id: 1,
      question: "Little interest or pleasure in doing things?",
      options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
    },
    {
      id: 2,
      question: "Feeling down, depressed, or hopeless?",
      options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
    },
    // More questions...
  ];

  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    console.log("Survey answers:", answers);
    alert("Submitted successfully!");
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    } else if (navigation) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black p-5">
      <View className="items-center mb-5">
        <Text className="text-purple-300 text-2xl font-extrabold tracking-wide">
          Mental Health Survey
        </Text>
      </View>

      <ScrollView>
        <View className="mb-6">
          <Text className="text-purple-200 text-lg font-bold mb-5">
            {currentQuestion + 1}. {questions[currentQuestion].question}
          </Text>
          {questions[currentQuestion].options.map((option) => (
            <TouchableOpacity
              key={option}
              className={`p-4 rounded-md mb-3 ${
                answers[questions[currentQuestion].id] === option
                  ? "bg-purple-200"
                  : "bg-purple-300"
              }`}
              onPress={() => handleAnswer(questions[currentQuestion].id, option)}
            >
              <Text className="text-center font-bold text-black">
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="items-center mb-5">
          <Text className="text-purple-200 font-bold">
            {currentQuestion + 1}/{questions.length}
          </Text>
        </View>

        {/* Navigation Buttons */}
        <View className="flex-row justify-between">
          <TouchableOpacity
            className="flex-1 bg-purple-200 rounded-lg py-3 items-center mr-2 flex-row justify-center"
            onPress={handleBack}
          >
            <Ionicons name="chevron-back" size={24} color="black" />
            <Text className="text-black font-bold ml-2">Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 bg-purple-200 rounded-lg py-3 items-center ml-2 flex-row justify-center"
            onPress={handleNext}
          >
            <Text className="text-black font-bold mr-2">
              {currentQuestion < questions.length - 1 ? "Next" : "Submit"}
            </Text>
            <Ionicons
              name={
                currentQuestion < questions.length - 1 ? "chevron-forward" : "checkmark"
              }
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Survey;
