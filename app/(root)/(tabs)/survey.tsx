import { Text, View, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

const Survey = ({ navigation }) => {
    const [answers, setAnswers] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(0);
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

    const handleAnswer = (questionId, answer) => {
        setAnswers(prev => ({ ...prev, [questionId]: answer }));
    };

    const handleSubmit = () => {
        // Logic for form submission
        console.log("Survey answers:", answers);
        // You can redirect or show a confirmation message after submission
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
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.titleText}>
                    Mental Health Survey
                </Text>
            </View>

            <ScrollView>
                <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>
                        {currentQuestion + 1}. {questions[currentQuestion].question}
                    </Text>
                    {questions[currentQuestion].options.map(option => (
                        <TouchableOpacity
                            key={option}
                            style={[
                                styles.optionButton,
                                answers[questions[currentQuestion].id] === option && styles.selectedOption
                            ]}
                            onPress={() => handleAnswer(questions[currentQuestion].id, option)}
                        >
                            <Text style={styles.optionText}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.container}>
                    <Text style={styles.progressText}>
                        {currentQuestion + 1}/{questions.length}
                    </Text>
                </View>

                {/* Button Container for Back and Next Buttons */}
                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={handleBack}
                    >
                        <Text style={styles.buttonText}>
                            {currentQuestion === 0 ? "Back" : "Previous"}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.nextButton}
                        onPress={handleNext}
                    >
                        <Text style={styles.buttonText}>
                            {currentQuestion < questions.length - 1 ? "Next" : "Submit Survey"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Survey;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'black',
        padding: 20,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    questionContainer: {
        marginBottom: 20,
    },
    questionText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    optionButton: {
        backgroundColor: '#2d2d2d',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    selectedOption: {
        borderColor: '#7b61ff',
        borderWidth: 2,
    },
    optionText: {
        color: '#9a9a9a',
        fontSize:16,
    },
    progressText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    titleText: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '800',
        letterSpacing: 1,
        textAlign: 'center',
        marginTop: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    backButton: {
        flex: 1,
        backgroundColor: '#7b61ff',
        padding: 15,
        borderRadius: 10,
        marginRight: 10,
        alignItems: 'center',
    },
    nextButton: {
        flex: 1,
        backgroundColor: '#7b61ff',
        padding: 15,
        borderRadius: 10,
        marginLeft: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
