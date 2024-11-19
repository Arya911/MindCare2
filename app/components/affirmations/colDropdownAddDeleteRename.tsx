import React, {useContext, useState} from 'react';
import {Alert, View} from 'react-native';
import { Select, SelectItem, Icon, useStyleSheet, StyleService } from '@ui-kitten/components';
import { FontAwesome5 } from '@expo/vector-icons'; // For delete and add icons
import AntDesign from '@expo/vector-icons/AntDesign';
import {deleteCollection} from "@/services/collectionService";
import {UserContext} from "@/app/UserContext"; // For three dots icon

// @ts-ignore
const DropdownWithActions = ({selectedCollection, setSelectedCollection, setIsModalVisible}) => {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const {user} = useContext(UserContext);

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

    const styles = useStyleSheet(themedStyles);

    // Custom icons for the dropdown actions
    const ActionItems = [
        { label: 'Add', icon: 'plus-circle', color: '#34D399' }, // Green for "Add"
        { label: 'Delete', icon: 'trash-alt', color: '#EF4444' }, // Red for "Delete"
    ];

    // Handle selection
    const handleSelect = (index) => {
        const selectedAction = ActionItems[index.row];
        if (selectedAction.label === 'Add') {
            console.log('Add action triggered');
            setIsModalVisible(true);
        } else if (selectedAction.label === 'Delete') {
            console.log('Delete action triggered');
            handleDeleteCollection(selectedCollection.collectionId);
        }
        setSelectedIndex(index);
        setDropdownVisible(false);
    };

    // Custom three-dots icon
    const ThreeDotsIcon = () => <AntDesign name="ellipsis1" size={20} color="white" />;

    return (
        <View>
            <Select
                selectedIndex={selectedIndex}
                onSelect={handleSelect}
                onOpen={() => setDropdownVisible(true)}
                onClose={() => setDropdownVisible(false)}
                style={styles.select}
                accessoryLeft={ThreeDotsIcon} // Left accessory as three dots
            >
                {ActionItems.map((action, index) => (
                    <SelectItem
                        key={index}
                        accessoryLeft={() => (
                            <FontAwesome5 name={action.icon} size={20} color={action.color} />
                        )}
                    />
                ))}
            </Select>
        </View>
    );
};

const themedStyles = StyleService.create({
    select: {
        borderRadius: 4, // Rounded corners
        backgroundColor: 'white', // Transparent background
        padding: 1,
        borderWidth: 0,
    },
    selectItem: {
        marginVertical: 1,
    },
});

export default DropdownWithActions;
