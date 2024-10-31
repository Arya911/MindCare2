import {FontAwesome5, FontAwesome6} from "@expo/vector-icons";
import {Text, TouchableOpacity, View} from "react-native";
import React from "react";

// @ts-ignore
export default function SelectedCategory({category, handleCategoryRemove}) {

    switch (category) {
        case 'self_esteem': {
            return (
                <View key={category} className="flex-row items-center bg-yellow-200 p-2 rounded-lg m-1">
                    <FontAwesome6 name="ranking-star" size={20} color="black" />
                    <TouchableOpacity onPress={() => handleCategoryRemove(category)}>
                        <FontAwesome5 name="times" size={20} color="black" style={{ marginLeft: 12 }} />
                    </TouchableOpacity>
                </View>
            );
        }

        case 'motivation': {
            return (
                <View key={category} className="flex-row items-center bg-green-200 p-2 rounded-lg m-1">
                    <FontAwesome5 name="bolt" size={20} color="black" />
                    <TouchableOpacity onPress={() => handleCategoryRemove(category)}>
                        <FontAwesome5 name="times" size={20} color="black" style={{ marginLeft: 12 }} />
                    </TouchableOpacity>
                </View>
            );
        }

        case 'spiritual': {
            return (
                <View key={category} className="flex-row items-center bg-blue-200 p-2 rounded-lg m-1">
                    <FontAwesome5 name="spa" size={20} color="black" />
                    <TouchableOpacity onPress={() => handleCategoryRemove(category)}>
                        <FontAwesome5 name="times" size={20} color="black" style={{ marginLeft: 12 }} />
                    </TouchableOpacity>
                </View>
            );
        }

        case 'relationships': {
            return (
                <View key={category} className="flex-row items-center bg-red-200 p-2 rounded-lg m-1">
                    <FontAwesome5 name="heart" size={20} color="black" />
                    <TouchableOpacity onPress={() => handleCategoryRemove(category)}>
                        <FontAwesome5 name="times" size={20} color="black" style={{ marginLeft: 12 }} />
                    </TouchableOpacity>
                </View>
            );
        }
    }

}
