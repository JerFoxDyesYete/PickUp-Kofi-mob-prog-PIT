import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the FontAwesome icon set

export default function AccountScreen() {
    const [userData, setUserData] = useState({
        firstName: 'Johnny',
        lastName: 'Sins',
        email: 'johnny.sins@example.com',
        phoneNumber: '0936-123-4567',
    });

    const [isEditing, setIsEditing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const initials = userData.firstName[0] + userData.lastName[0];

    const handleSaveChanges = () => {
        setIsEditing(false);
        setModalVisible(true); // Show modal after saving changes
    };

    // Close the modal after 1500ms (1.5 seconds)
    useEffect(() => {
        if (modalVisible) {
            const timer = setTimeout(() => {
                setModalVisible(false); // Close the modal after the timeout
            }, 1500);

            return () => clearTimeout(timer); // Cleanup timer on unmount
        }
    }, [modalVisible]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.imageWrapper}>
                    <Text style={styles.userInitials}>{initials}</Text>
                </View>
            </View>
            <View style={styles.form}>
                <Text style={styles.label}>Name</Text>
                <View style={styles.nameRow}>
                    <TextInput
                        style={[styles.input, styles.nameInput]}
                        placeholder="First Name"
                        value={userData.firstName}
                        editable={isEditing}
                        onChangeText={(text) => setUserData({ ...userData, firstName: text })}
                    />
                    <TextInput
                        style={[styles.input, styles.nameInput]}
                        placeholder="Last Name"
                        value={userData.lastName}
                        editable={isEditing}
                        onChangeText={(text) => setUserData({ ...userData, lastName: text })}
                    />
                </View>

                <Text style={styles.label}>Email Address</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email Address"
                    value={userData.email}
                    editable={isEditing}
                    keyboardType="email-address"
                    onChangeText={(text) => setUserData({ ...userData, email: text })}
                />

                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    value={userData.phoneNumber}
                    editable={isEditing}
                    keyboardType="phone-pad"
                    onChangeText={(text) => setUserData({ ...userData, phoneNumber: text })}
                />

                <View style={styles.buttonsContainer}>
                    {isEditing ? (
                        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                            <Text style={styles.buttonText}>Save Changes</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
                            <Text style={styles.buttonText}>Edit Account</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity style={styles.deleteButton} disabled={true}>
                        <Text style={styles.deleteButtonText}>Delete Account</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Modal for profile edited notification */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {}}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Icon name="check-circle" size={50} color="white" /> {/* Checkmark icon */}
                        <Text style={styles.modalText}>Profile edited!</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    header: {
        height: 150,
        backgroundColor: '#aac27e',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        position: 'relative',
        marginBottom: 30,
    },
    imageWrapper: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        top: 60,
        elevation: 5,
    },
    userInitials: {
        fontSize: 30,
        color: '#aac27e',
        fontWeight: 'bold',
    },
    form: {
        padding: 20,
    },
    label: { fontSize: 16, color: '#333', marginBottom: 5 },
    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        marginBottom: 20,
        elevation: 2,
    },
    nameRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    nameInput: {
        flex: 1,
        marginHorizontal: 5,
    },
    buttonsContainer: {
        marginTop: 20,
    },
    editButton: {
        backgroundColor: '#aac27e',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    saveButton: {
        backgroundColor: '#aac27e',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    deleteButton: {
        backgroundColor: '#d3d3d3',
        borderWidth: 2,
        borderColor: '#ddd',
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 20,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    deleteButtonText: {
        color: '#777',
        fontSize: 16,
        fontWeight: 'bold',
    },
    // Modal styles
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: 200,
        backgroundColor: '#aac27e', // Modal background color
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        elevation: 10,
    },
    modalText: {
        paddingLeft: 20,
        fontSize: 18,
        color: 'white', // White text color
        textAlign: 'center',
    },
});
