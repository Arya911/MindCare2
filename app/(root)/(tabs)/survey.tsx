import { Text, View, TouchableOpacity, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const Survey = ({ navigation }) => {
    const [answers, setAnswers] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);

    const questions = [
        { id: 1, question: "Little interest or pleasure in doing things?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
        { id: 2, question: "Feeling down, depressed, or hopeless?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
        { id: 3, question: "Trouble falling or staying asleep, or sleeping too much?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
        { id: 4, question: "Feeling tired or having little energy?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
        { id: 5, question: "Poor appetite or overeating?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
        { id: 6, question: "Feeling bad about yourself, or that you are a failure or have let yourself or your family down?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
        { id: 7, question: "Trouble concentrating on things, such as reading the newspaper or watching television?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
        { id: 8, question: "Moving or speaking so slowly that other people could have noticed? Or the opposite: being so fidgety or restless that you have been moving around a lot more than usual?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
        { id: 9, question: "Thoughts that you would be better off dead, or of hurting yourself?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] }
    ];

    const answerPoints = {
        "Not at all": 0,
        "Several days": 1,
        "More than half the days": 2,
        "Nearly every day": 3
    };

    const handleAnswer = (questionId, answer) => {
        const newAnswers = { ...answers, [questionId]: answer };
        const calculatedScore = Object.entries(newAnswers).reduce((sum, [id, ans]) => {
            return sum + answerPoints[ans];
        }, 0);

        setAnswers(newAnswers);
        setScore(calculatedScore);
    };

    const handleSubmit = () => {
        if (Object.keys(answers).length < questions.length) {
            Alert.alert("Incomplete Survey", "Please answer all questions before submitting.");
            return;
        }
        Alert.alert("Survey Submitted", `Your score is: ${score}`);
        console.log("Survey answers:", answers);
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        } else if (navigation) {
            navigation.goBack();
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-black p-4">
            <View className="mb-7">
                <Text className="text-2xl font-bold text-white text-center">Mental Health Survey</Text>
            </View>

            <ScrollView>
                <View className="mb-6">
                    <View className="h-24 justify-center">
                        <Text className="text-lg text-white mb-4">{currentQuestion + 1}. {questions[currentQuestion].question}</Text>
                    </View>
                    {questions[currentQuestion].options.map(option => (
                        <TouchableOpacity
                            key={option}
                            className={`p-4 rounded-lg mb-2 border-b-2 border-purple-200 ${answers[questions[currentQuestion].id] === option ? 'bg-purple-200 text-black' : 'bg-black'}`}
                            onPress={() => handleAnswer(questions[currentQuestion].id, option)}
                        >
                            <Text className={`${answers[questions[currentQuestion].id] === option ? 'text-black' : 'text-white'}`}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View className="flex-row justify-between items-center mt-4">
                    <TouchableOpacity className="p-2 rounded-lg border-solid border-2 border-purple-200" onPress={handleBack}>
                        <Ionicons name={currentQuestion === 0 ? "arrow-back" : "chevron-back"} size={24} color="#e9d5ff" />
                    </TouchableOpacity>

                    <Text className="text-white">{currentQuestion + 1}/{questions.length}</Text>

                    <TouchableOpacity className="p-2 border-solid border-2 border-purple-200 bg-purple-200 rounded-lg" onPress={handleNext}>
                        <Ionicons name={currentQuestion < questions.length - 1 ? "chevron-forward" : "checkmark"} size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Survey;
