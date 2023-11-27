import React, { useRef, useState } from 'react';
import {
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Modal,
    Pressable,
    TouchableOpacity,
    Alert,
} from 'react-native';
import Input from '../../../components/Input';
import { globalColors } from '../../../styles/globalColors';
import Button from '../../../components/button';
import { Dimensions } from 'react-native';
import { Image } from 'react-native';
import Person from '../../../assets/Person.png';
import { Ionicons } from '@expo/vector-icons';
import { Camera, CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import Loader from '../../../components/loader';
import AlertMessage from '../../../components/Alert';
import axios from 'axios';

const height = Dimensions.get('window').height;

const UserDetails = ({ navigation, route }) => {
    const { phone, password, name } = route.params;
    const [formData, setFormData] = useState({
        username: ''
    })
    const [alertData, setAlertData] = useState({
        alertVisible: false,
        alertMessage: '',
        error: false
    });

    const cameraRef = useRef(null);
    const [loading, setloading] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [openCamera, setOpenCamera] = useState(false);
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();


    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const takePictureAsync = async () => {
        setModalVisible(false);
        setOpenCamera(true);
    }


    const pickImageAsync = async () => {
        setModalVisible(false);
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        } else {
            alert('You did not select any image.');
        }
    };

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const image = await cameraRef.current.takePictureAsync({
                    quality: 0.5,
                });

                setOpenCamera(false);
                setSelectedImage(image.uri);
            } catch (error) {
                console.error('Error taking picture:', error);
            }
        }
    };


    const handleChange = (name, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }


    const handleAlert = (message, error) => {
        setAlertData({
            alertVisible: true,
            alertMessage: message,
            error: error
        });
    };

    const hideAlert = () => {
        setAlertData({
            alertVisible: false,
            alertMessage: '',
        });
    };

    const ConfirmHandler = async () => {
        if (!formData.username)
            return handleAlert("Please Enter Username");
        else {
            setloading(true);
            try {
                const formData2 = new FormData();
                formData2.append('photo', {
                    uri: selectedImage,
                    type: 'image/jpeg',
                    name: 'photo.jpg',
                });
                formData2.append('username', formData.username.toLowerCase());
                formData2.append('phone', phone);
                formData2.append('password', password);
                formData2.append('name', name);

                const response = await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/api/register/registerUser`, formData2,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                if (response.status === 200)
                    return navigation.replace("Login");
            } catch (error) {
                handleAlert(error.response.data.message, true);
            } finally {
                setloading(false);
            }
        }
    };

    return (
        <>
            {openCamera && (
                <Camera ref={(ref) => { cameraRef.current = ref; }} style={styles.camera} type={type}>
                    <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", padding: 20, position: 'absolute', bottom: 20, width: '100%' }}>
                        <TouchableOpacity style={{ alignSelf: 'center', marginLeft: 'auto', marginRight: 'auto' }} onPress={takePicture}>
                            <View style={styles.captureButton} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignSelf: 'center' }} onPress={toggleCameraType}>
                            <Ionicons name="camera-reverse" size={30} color={globalColors.textColor} />
                        </TouchableOpacity>
                    </View>
                </Camera>
            )}
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'null'}
                enabled
            >
                <ScrollView
                    contentContainerStyle={styles.innerContainer}
                    keyboardShouldPersistTaps="always"
                    showsVerticalScrollIndicator={false}
                >

                    {loading && <Loader />}
                    <AlertMessage
                        visible={alertData.alertVisible}
                        message={alertData.alertMessage}
                        error={alertData.error}
                        onPressOk={hideAlert}
                    />
                    <View style={styles.pictureContainer}>
                        <Image
                            source={selectedImage ? { uri: selectedImage } : Person}
                            style={styles.profileImage}
                        />
                        <Pressable style={styles.pencilCircle} onPress={() => setModalVisible(true)}>
                            <Ionicons name="pencil-sharp" size={25} color={globalColors.textColor} />
                        </Pressable>
                    </View>
                    <View style={styles.inputContainer}>
                        <Input
                            icon="person"
                            placeholder="Enter Your Username"
                            name='username'
                            handleChange={handleChange}
                            value={formData.username}
                        />
                    </View>

                    <View style={styles.loginContainer}>
                        <Button onPress={ConfirmHandler}>Confirm</Button>
                    </View>
                </ScrollView>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Pressable style={styles.modalOption} onPress={pickImageAsync}>
                                <Text style={styles.modalOptionText}>Select from Gallery</Text>
                            </Pressable>
                            <Pressable style={styles.modalOption} onPress={takePictureAsync}>
                                <Text style={styles.modalOptionText}>Take a Picture</Text>
                            </Pressable>
                            <Pressable
                                style={styles.modalOption}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.modalOptionText}>Cancel</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </KeyboardAvoidingView>
        </>
    );
};

export default UserDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        backgroundColor: globalColors.backgroundColor
    },
    innerContainer: {
        width: "85%",
        justifyContent: "flex-start",
        marginTop: 60,
        alignItems: "center",
        flexGrow: 1,
        height: height - 0.1 * height,
    },
    inputContainer: {
        marginVertical: 10,
    },
    loginContainer: {
        width: "100%",
        marginVertical: 10,
        position: 'absolute',
        bottom: 20,
    },
    pencilCircle: {
        backgroundColor: globalColors.buttonColor,
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        left: 90,
        bottom: 60,
    },
    pictureContainer: {
        borderRadius: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        width: 256,
        height: 256,
        borderRadius: 150,
        objectFit: 'scale-down',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: globalColors.buttonColor,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 16,
        width: '100%',
    },
    modalOption: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: globalColors.orange,
    },
    modalOptionText: {
        fontSize: 18,
        color: globalColors.textColor,
    },
    camera: {
        width: "100%",
        height: "100%",
        position: 'absolute',
        top: 0,
        zIndex: 1,
        flex: 1,
    },
    captureButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#fff',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
});

