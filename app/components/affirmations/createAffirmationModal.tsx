import {Text, TextInput, TouchableOpacity, View, Modal} from "react-native";
import React, {useContext, useState} from "react";
import {UserContext} from "@/app/UserContext";
import {createAffirmation} from "@/services/collectionService";

const CreateAffirmationModal = ({isModalVisible, setIsModalVisible, collection}) => {
    const[affirmationText, setAffirmationText] = useState('');
    const {user} = useContext(UserContext);

    const handleAddAffirmation = async () => {
        try{
            const response = await createAffirmation(collection.collectionId, affirmationText, user.username);
            if(response.success){
                const newAffirmation = {
                    id: response.data,
                    text: affirmationText
                }
                collection.affirmations.push(newAffirmation);
                setIsModalVisible(false);
                setAffirmationText('');
            }
            else{
                console.log("Error creating collection.");
            }
        }
        catch (error) {
            console.error("Error creating collection:", error);
        }
    }

    return(
        <Modal
            visible={isModalVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setIsModalVisible(false)}
        >
            <View className="flex-1 justify-center items-center bg-black/50">
                <View className="bg-black border-2 border-purple-200 rounded-lg p-6 w-4/5">
                    <Text className="text-white text-lg font-bold mb-4 text-center">
                        Enter Text
                    </Text>

                    {/* Input Field */}
                    <TextInput
                        value={affirmationText}
                        onChangeText={setAffirmationText}
                        placeholder="Enter text"
                        placeholderTextColor="white"
                        className="w-full text-white border-solid border-b-2 border-purple-200 rounded-lg p-4 text-base mb-6 h-12"
                    />

                    {/* Buttons */}
                    <View className="flex-row justify-between">
                        <TouchableOpacity
                            onPress={handleAddAffirmation}
                            className="bg-purple-200 rounded-full py-2 px-6"
                        >
                            <Text className="text-black font-bold">Add</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setIsModalVisible(false)}
                            className="border-solid border-2 border-purple-200 rounded-full py-2 px-6"
                        >
                            <Text className="text-purple-200 font-bold">Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export default CreateAffirmationModal;