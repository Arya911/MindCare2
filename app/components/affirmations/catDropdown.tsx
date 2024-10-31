import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {Select, SelectItem, Icon, useStyleSheet, StyleService} from '@ui-kitten/components';
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';

const categoryOptions = {
    motivation: {
        bgColor: '#bbf7d0', // Tailwind's bg-green-200
        icon: 'bolt',
    },
    spiritual: {
        bgColor: '#bfdbfe', // Tailwind's bg-blue-200
        icon: 'spa',
    },
    relationships: {
        bgColor: '#fecaca', // Tailwind's bg-red-200
        icon: 'heart',
    },
    self_esteem: {
        bgColor: 'rgb(254 240 138)', // Tailwind's bg-yellow-200
        icon: 'ranking-star',
    },
};

// @ts-ignore
const DropdownWithCategories = ({ selectedCategories, setSelectedCategories, handleCategoryRemove }) => {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const availableOptions = Object.keys(categoryOptions).filter(
        (key) => !selectedCategories.includes(key)
    );

    function handleCategorySelect (category: any) {
        // @ts-ignore
        if (!selectedCategories.includes(category)) {
            // @ts-ignore
            setSelectedCategories([...selectedCategories, category]);
        }
    }

    const handleSelect = (index) => {
        const selectedCategory = availableOptions[index.row];
        handleCategorySelect(selectedCategory);
        setSelectedIndex(index);
        setDropdownVisible(false);
    };

    // Custom Icons
    const PlusIcon = () => (
        <AntDesign name="pluscircleo" size={20} color="#D6BCFA"/>
    );

    const DownArrowIcon = () => (
        <AntDesign name="down" size={18} color="black"/>
    );

    const styles = useStyleSheet(themedStyles);

    return (
        <View>
            <Select
                selectedIndex={selectedIndex}
                onSelect={handleSelect}
                onOpen={() => setDropdownVisible(true)}
                onClose={() => setDropdownVisible(false)}
                style={styles.select}
                accessoryLeft={PlusIcon}
                // accessoryRight={DownArrowIcon}
            >
                {availableOptions.map((option) => {
                    const { bgColor, icon } = categoryOptions[option];
                    return (
                        <SelectItem
                            key={option}
                            style={[styles.selectItem, { backgroundColor: bgColor }]} // Custom background color
                            accessoryLeft={() =>
                                option !== 'self_esteem' ? (
                                    <FontAwesome5 name={icon} size={20} color="black" />
                                ) : (
                                    <FontAwesome6 name={icon} size={20} color="black" />
                                )
                            }
                        />
                    );
                })}
            </Select>
        </View>
    );
};

const themedStyles = StyleService.create({
    // container: {
    //     marginTop: ,
    // },
    select: {
        borderRadius: 4, // Rounded corners
        backgroundColor: '#D6BCFA', // Tailwind's bg-purple-200
        padding: 1,
        borderWidth: 0,
    },
    selectItem: {
        marginVertical: 1,
    },
});

export default DropdownWithCategories;
