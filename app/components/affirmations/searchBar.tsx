import {TextInput, View} from "react-native";
import React from "react";

// @ts-ignore
export default function SearchBar({searchTerm, setSearchTerm}) {
    return(
        <View className="mb-2">
            <TextInput
                placeholder="Search"
                value={searchTerm}
                onChangeText={(text) => setSearchTerm(text)}
                className="border-solid border-4 border-purple-300 rounded-lg p-4 text-base text-purple-300 placeholder-purple-300"
                placeholderTextColor="rgb(216, 180, 254)"
            />
        </View>
    );
}
