import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, Animated, Alert, TextInput, Modal} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {FontAwesome6, MaterialIcons} from '@expo/vector-icons';
import { UserContext } from '@/app/UserContext';
import FlatList = Animated.FlatList;
import AntDesign from "@expo/vector-icons/AntDesign";
import {createCollection, deleteCollection, removeAffirmationFromCollection} from "@/services/collectionService"; // Adjust path as needed
import DropdownWithActions from "@/app/components/affirmations/colDropdownAddDeleteRename";
// import {Input, Modal} from "@ui-kitten/components";
import CreateAffirmationModal from "@/app/components/affirmations/createAffirmationModal";

function MyLibrary() {
    const gradientColors = [
        ['#bfdbfe', '#dbeafe'],
        ['#fda4af', '#ffe4e6'],
        ['#fde047', '#fef9c3'],
    ];


    const { user } = useContext(UserContext);
    const [selectedCollection, setSelectedCollection] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [collectionName, setCollectionName] = useState('');
    const [isAffirmationModalVisible, setIsAffirmationModalVisible] = useState(false);

    // @ts-ignore
    const handleCollectionClick = (collectionId) => {
        const collection = user.affirmationCollections.find(c => c.collectionId === collectionId);
        setSelectedCollection(collection);
    };

    const handleRemoveAffirmation = async (collectionId, affirmationId) => {
        // Call API to remove affirmation from collection
        try {
            const response = await removeAffirmationFromCollection(collectionId, affirmationId);
            if(response.success){
                // Remove locally after successful API call
                // @ts-ignore
                setSelectedCollection(prev => ({
                    ...prev,
                    affirmations: prev.affirmations.filter(a => a.id !== affirmationId)
                }));

                user.affirmationCollections = user.affirmationCollections.map((collection) => {
                    if (collection.collectionId === collectionId) {
                        return {
                            ...collection,
                            affirmations: collection.affirmations.filter((a) => a.id !== affirmationId),
                        };
                    }
                    return collection;
                });

                console.log("AffirmationCollections: ", JSON.stringify(user.affirmationCollections, null, 2));
            }
            else Alert.alert("Error");
        } catch (error) {
            console.error("Failed to remove affirmation:", error);
        }
    };

    const handleDeleteCollection = (collectionId) => {
        Alert.alert(
            "Delete collection?",
            "Are you sure you want to delete this collection?",
            [
                {
                    text: "No", // No button action (closes the alert)
                    onPress: () => console.log("Delete canceled"),
                    style: "cancel",
                },
                {
                    text: "Yes", // Yes button action (deletes the collection)
                    onPress: async () => {
                        try {
                            const response = await deleteCollection(collectionId);
                            if (response.success) {
                                // Remove the deleted collection from user.affirmationCollections
                                user.affirmationCollections = user.affirmationCollections.filter(
                                    (c) => c.collectionId !== collectionId
                                );
                                setSelectedCollection(null); // Clear the selected collection
                            }
                        } catch (error) {
                            console.error("Error deleting collection:", error);
                        }
                    },
                },
            ],
            { cancelable: false } // Prevent the alert from being closed by tapping outside
        );
    };

    const handleAddCollection = async () => {
        try{
            const response = await createCollection(collectionName, user.username);
            if(response.success){
                const newCollection = {
                    collectionId: response.data,
                    collectionName: collectionName,
                    affirmations: []
                }
                user.affirmationCollections.push(newCollection);
                setIsModalVisible(false);
                setCollectionName('');
            }
            else{
                console.log("Error creating collection.");
            }
        }
        catch (error) {
            console.error("Error creating collection:", error);
        }
    }

    return (
        <View style={{ flex: 1, padding: 20 }}>
            {selectedCollection ? (
                <>
                    {/* Back Button */}
                    <View className="flex flex-row items-center mb-5">
                        <TouchableOpacity onPress={() => setSelectedCollection(null)} className="mr-2">
                            <AntDesign name="back" size={24} color="white" />
                        </TouchableOpacity>
                        <Text className="text-white text-lg font-bold flex-1 mr-10 ml-2">
                            {selectedCollection.collectionName}
                        </Text>
                        {/* Delete Button with Garbage Icon */}
                        <DropdownWithActions
                            selectedCollection={selectedCollection}
                            setIsModalVisible={setIsAffirmationModalVisible}
                            setSelectedCollection={setSelectedCollection}
                        />
                    </View>

                    <CreateAffirmationModal
                        isModalVisible={isAffirmationModalVisible}
                        setIsModalVisible={setIsAffirmationModalVisible}
                        collection={selectedCollection}
                        />
                    {/* Affirmations List */}
                    <FlatList
                        data={selectedCollection.affirmations}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View className="bg-purple-200 p-4 rounded-lg mb-3 flex-row justify-between items-center">
                                <Text className="text-black text-base">{item.text}</Text>
                                <TouchableOpacity
                                    onPress={() => handleRemoveAffirmation(selectedCollection.collectionId, item.id)}
                                    className="ml-2 mr-2"
                                >
                                    <MaterialIcons name="remove-circle-outline" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        )}
                    />

                </>
            ) : (
                <>

                    <View className="flex flex-row items-center justify-between mb-4">
                        <Text className="text-white text-lg font-bold">Collections</Text>
                        {/* Button with Plus Icon */}
                        <TouchableOpacity
                            className="p-4 rounded-lg bg-purple-200"
                            onPress={()=>{setIsModalVisible(true)}}
                        >
                            <FontAwesome6 name="add" size={24} color="black" />
                        </TouchableOpacity>
                    </View>

                    {/*<CreateCollectionModal isModalVisible={isModalVisible}*/}
                    {/*                       setIsModalVisible={setIsModalVisible}*/}
                    {/*                       collectionName={collectionName}*/}
                    {/*                       setCollectionName={setCollectionName}*/}
                    {/*                       handleAddCollection={handleAddCollection}*/}
                    {/*/>*/}
                    {/*<Modal*/}
                    {/*    visible={isModalVisible}*/}
                    {/*    backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} // Slight transparency for the backdrop*/}
                    {/*    onBackdropPress={() => setIsModalVisible(false)}*/}
                    {/*>*/}
                    {/*    <View className="p-5 border-2 border-purple-300 bg-black rounded-lg w-4/5 self-center">*/}
                    {/*        <Text className="text-white text-lg font-bold mb-4 text-center">*/}
                    {/*            Enter Name*/}
                    {/*        </Text>*/}
                    {/*        /!* Input with Custom Style *!/*/}
                    {/*        <Input*/}
                    {/*            value={collectionName}*/}
                    {/*            onChangeText={setCollectionName}*/}
                    {/*            placeholder="Name"*/}
                    {/*            style={{*/}
                    {/*                marginBottom: 20, // Space between input and buttons*/}
                    {/*                color: '#D8B4FE', // Text color matches purple-300*/}
                    {/*                backgroundColor: '#1F1F1F', // Darker background for input*/}
                    {/*                borderWidth: 1,*/}
                    {/*                borderColor: '#D8B4FE',*/}
                    {/*                borderRadius: 8,*/}
                    {/*                padding: 10,*/}
                    {/*            }}*/}
                    {/*            placeholderTextColor="#D8B4FE" // Placeholder in purple-300*/}
                    {/*        />*/}
                    {/*        /!* Buttons in a Single Row *!/*/}
                    {/*        <View className="flex-row justify-between">*/}
                    {/*            <TouchableOpacity*/}
                    {/*                onPress={handleAddCollection}*/}
                    {/*                className="bg-purple-200 rounded-full py-2 px-4"*/}
                    {/*            >*/}
                    {/*                <Text className="text-black font-bold">Add</Text>*/}
                    {/*            </TouchableOpacity>*/}
                    {/*            <TouchableOpacity*/}
                    {/*                onPress={() => setIsModalVisible(false)}*/}
                    {/*                className="bg-purple-200 rounded-full py-2 px-4"*/}
                    {/*            >*/}
                    {/*                <Text className="text-black font-bold">Cancel</Text>*/}
                    {/*            </TouchableOpacity>*/}
                    {/*        </View>*/}
                    {/*    </View>*/}
                    {/*</Modal>*/}
                    <Modal
                        visible={isModalVisible}
                        transparent
                        animationType="fade"
                        onRequestClose={() => setIsModalVisible(false)}
                    >
                        <View className="flex-1 justify-center items-center bg-black/50">
                            <View className="bg-black border-2 border-purple-300 rounded-lg p-6 w-4/5">
                                <Text className="text-white text-lg font-bold mb-4 text-center">
                                    Enter Name
                                </Text>

                                {/* Input Field */}
                                <TextInput
                                    value={collectionName}
                                    onChangeText={setCollectionName}
                                    placeholder="Enter name"
                                    placeholderTextColor="white"
                                    className="w-full text-white border-solid border-b-2 border-purple-200 rounded-lg p-4 text-base mb-6 h-12"
                                />

                                {/* Buttons */}
                                <View className="flex-row justify-between">
                                    <TouchableOpacity
                                        onPress={handleAddCollection}
                                        className="bg-purple-200 rounded-full py-2 px-6"
                                    >
                                        <Text className="text-black font-bold">Add</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => setIsModalVisible(false)}
                                        className="border-solid border-2 border-purple-200 rounded-full py-2 px-6"
                                    >
                                        <Text className="text-purple-300 font-bold">Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    {user.affirmationCollections.map((collection, index) => (
                        <LinearGradient
                            key={collection.collectionId}
                            colors={gradientColors[index % gradientColors.length]}
                            start={[0, 0]}
                            end={[1, 0]}
                            style={{
                                borderRadius: 12,
                                padding: 16,
                                shadowColor: 'black',
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.3,
                                shadowRadius: 5,
                                elevation: 5,
                                overflow: 'hidden',
                                marginBottom: 16,
                            }}
                        >
                            <TouchableOpacity
                                style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                                onPress={() => handleCollectionClick(collection.collectionId)}
                            >
                                <Text className="text-black text-lg font-bold">
                                    {collection.collectionName}
                                </Text>
                                <MaterialIcons name="arrow-forward-ios" size={24} color="#555" />
                            </TouchableOpacity>
                        </LinearGradient>
                    ))}
                </>
            )}
        </View>
    );
}

export default MyLibrary;
