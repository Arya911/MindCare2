import React, {useState} from "react";
import {Modal, SafeAreaView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View} from "react-native";
import DocDetailsCard from "@/app/components/findProfessionals/docDetailsCard";
import {Feather} from "@expo/vector-icons";

const SearchableDocListWithModal = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState({
        name: '',
        degree: '',
        phone: '',
        address: '',
    });

    const docs = [
        { name: 'Alice Smith', degree: 'MD(Psychiatry)', phone: '1234567890', address: '123 Main St' },
        { name: 'Bob Johnson', degree: 'MD(Psychiatry)', phone: '0987654321', address: '456 Elm St' },
        { name: 'Charlie Brown', degree: 'MD(Neurosurgery)', phone: '5678901234', address: '789 Pine St' },
    ];

    const [filtereddocs, setFilteredDocs] = useState([]);

    const handleSearch = () => {
        // add API call for getting actual docs
        const results = docs.filter((doc) =>
            Object.keys(searchQuery).every((key) =>
                doc[key].toLowerCase().includes(searchQuery[key].toLowerCase())
            )
        );
        setFilteredDocs(results);
        setIsModalVisible(false);
    };

    return (
        <SafeAreaView style={{ paddingTop: StatusBar.currentHeight || 0 }} className="flex h-full bg-black p-5">
        <View className="flex-1 p-4">
            {/* Search Button */}
            <View className="flex flex-row items-center justify-between mb-4">
                <Text className="text-white text-lg font-bold">Find Professionals</Text>

                <TouchableOpacity
                    onPress={() => setIsModalVisible(true)}
                    className="p-4 bg-purple-200 rounded-lg"
                >
                    <Feather name="search" size={24} color="black"/>
                </TouchableOpacity>
            </View>


            {/* Search Modal */}
            <Modal
                visible={isModalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="bg-black border-solid border-2 border-purple-200 rounded-lg p-6 w-4/5">
                        <Text className="text-white text-lg font-bold mb-4 text-center">
                            Search
                        </Text>

                        {/* Input Fields for Search */}
                        {Object.keys(searchQuery).map((key) => (
                            <TextInput
                                key={key}
                                value={searchQuery[key]}
                                onChangeText={(text) =>
                                    setSearchQuery((prev) => ({ ...prev, [key]: text }))
                                }
                                placeholder={`${key}`}
                                placeholderTextColor="#d1d5db"
                                className="w-full text-white border-solid border-b-2 border-purple-200 rounded-lg p-2 text-base mb-4 h-12"
                            />
                        ))}

                        {/* Buttons */}
                        <View className="flex-row justify-between">
                            <TouchableOpacity
                                onPress={handleSearch}
                                className="bg-purple-200 rounded-full py-2 px-6"
                            >
                                <Text className="text-black font-bold">Search</Text>
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

            {/* Results List */}
            <ScrollView className="flex-1">
                {filtereddocs.length > 0 ? (
                    filtereddocs.map((doc, index) => (
                        <DocDetailsCard key={index} docDetails={doc} />
                    ))
                ) : (
                    <Text className="text-white text-center mt-4">No results found</Text>
                )}
            </ScrollView>
        </View>
        </SafeAreaView>
    );
};

export default SearchableDocListWithModal;