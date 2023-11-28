import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { Pressable } from 'react-native'
import { globalColors } from '../../../styles/globalColors'
import Button from '../../../components/button'
import { Dimensions } from 'react-native'
import { Image } from 'react-native'
import ProfilePic from '../../../assets/ProfilePic.png'
import { Ionicons } from '@expo/vector-icons';
import Input from '../../../components/Input'
import { useDispatch, useSelector } from 'react-redux'
import { Camera, CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Modal } from 'react-native'
import { TouchableOpacity } from 'react-native'
import AlertMessage from '../../../components/Alert'
import ConfirmationAlertMessage from '../../../components/ConfirmationAlert'
import { setAuth, setProfilePicture } from '../../../store/auth-slice'
import axios from 'axios'
import Loader from '../../../components/loader'
import AsyncStorage from '@react-native-async-storage/async-storage'

const height = Dimensions.get('window').height
const EditProfile = ({ navigation }) => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const [alertData, setAlertData] = useState({
        alertVisible: false,
        alertMessage: '',
    });
    const cameraRef = useRef(null);
    const [loading, setloading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(user.profilePicture ? user.profilePicture : null);
    const [openCamera, setOpenCamera] = useState(false);
    const [type, setType] = useState(CameraType.back);
    const [editable, seteditable] = useState(false);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [formData, setFormData] = useState({
        name: user.name.toString(),
        phone: user.phone.toString(),
        currentPassword: '',
        password: '',
        CPassword: '',
    })

    const handleChange = (name, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));

    }

    const handleConfirmation = () => {
        setAlertData({
            alertVisible: false,
        });
        setSelectedImage(null);
        dispatch(setProfilePicture(null));
    };


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

    const handleAlert = (message) => {
        setAlertData({
            alertVisible: true,
            alertMessage: message,
        });
    };

    const hideAlert = () => {
        setAlertData({
            alertVisible: false,
            alertMessage: '',
        });
    };

    const handleAlert2 = (message, error) => {
        setAlertData2({
            alertVisible: true,
            alertMessage: message,
            error: error
        });
    };

    const hideAlert2 = () => {
        setAlertData2({
            alertVisible: false,
            alertMessage: '',
        });
    };

    const [alertData2, setAlertData2] = useState({
        alertVisible: false,
        alertMessage: '',
        error: false
    });

    const updateHandler = async () => {
        if (!formData.name)
            return handleAlert2("Please Enter Your Name");
        else if (!formData.phone || formData.phone.length !== 10)
            return handleAlert2("Please Enter Valid Phone Number", true);
        else if (formData.password && !formData.currentPassword)
            return handleAlert2("Please Enter Your Current Password", true);
        else if (!formData.password && formData.currentPassword)
            return handleAlert2("Please Enter Your New Password", true);
        else if (formData.password && formData.currentPassword && formData.password.length < 6)
            return handleAlert2("Please Must be 6 Characters Long", true);
        else if (formData.password && formData.currentPassword && formData.password.length > 6 && formData.password !== formData.CPassword)
            return handleAlert2("Password and Confirm Password Must Be Same", true);
        else {
            setloading(true);
            try {
                const formData2 = new FormData();
                // if (selectedImage) {
                //     formData2.append('photo', {
                //         uri: selectedImage,
                //         type: 'image/jpeg',
                //         name: 'photo.jpg',
                //     });
                // } else {
                //     formData2.append('photo', '88');
                // }
                formData2.append('name', formData.name);
                formData2.append('phone', formData.phone);
                formData2.append('currentPassword', formData.currentPassword);
                formData2.append('password', formData.password);
                formData2.append('CPassword', formData.CPassword);

                console.log(formData2);
                const response = await axios.put(`${process.env.EXPO_PUBLIC_BASE_URL}/api/user/updateProfile`, formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(response.data.user)
                await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
                dispatch(setAuth({ isAuth: true, user: response.data.user }));
                navigation.goBack();
            } catch (error) {
                return handleAlert2(error.response.data.message, true);
            } finally {
                setloading(false);
            }
        }
    }

    const editClickHandler = () => {
        seteditable(true);
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "null"}
            enabled
        >
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
            {loading && <Loader />}
            <ConfirmationAlertMessage
                visible={alertData.alertVisible}
                message={alertData.alertMessage}
                onPressNo={hideAlert}
                onPressYes={handleConfirmation}
            />
            <AlertMessage
                visible={alertData2.alertVisible}
                message={alertData2.alertMessage}
                error={alertData2.error}
                onPressOk={hideAlert2}
            />
            <ScrollView
                contentContainerStyle={styles.innerContainer}
                keyboardShouldPersistTaps="always"
                showsVerticalScrollIndicator={false}
            >

                <View style={styles.titleContainer}>
                    <Pressable style={({ pressed }) => [
                        { opacity: pressed ? 0.7 : 1 }, // Opacity change on press
                    ]} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color={globalColors.buttonColor} />
                    </Pressable>
                    <Text style={styles.title}>Edit Your Profile</Text>
                </View>
                <View style={styles.profilePicContainer}>
                    {selectedImage ? <View style={styles.profilePicContainerPic}>
                        <Image style={{ width: 150, height: 150 }} source={{ uri: selectedImage }} />
                    </View> :
                        <View style={styles.profilePicContainerPic}>
                            {!user.profilePicture ?
                                <Image source={ProfilePic} /> : <Image style={{ width: 150, height: 150 }} source={{ uri: user.profilePicture }} />
                            }
                        </View>
                    }
                    <View style={styles.picOptionsContainer}>
                        <Pressable style={styles.uploadPicture} onPress={() => setModalVisible(true)}>
                            <Text style={styles.uploadPictureText}>Upload Picture</Text>
                        </Pressable>
                        {(user.profilePicture || selectedImage) && <Pressable onPress={() => handleAlert("Are you Sure?")}>
                            <Text style={styles.removePictureText}>Remove your picture</Text>
                        </Pressable>}
                    </View>
                </View>
                <View style={{ marginVertical: 25, marginHorizontal: 15 }}>
                    <View style={styles.inputContainer}>
                        <Input placeholder='Enter Your Username' editProfile={true} edit={true} value={formData.name} editable={editable} onEditClick={editClickHandler} name='name' handleChange={handleChange} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Input placeholder='Enter Your Phone Number' editProfile={true} value={formData.phone} editable={false} defaultInput={"(+92)"} onEditClick={editClickHandler} name='phone' handleChange={handleChange} maxLength={10} inputMode='numeric' grey={true} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.changePassText}>Want to change your password?</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Input placeholder='Current Password' editProfile={true} secureTextEntry={true} eye={true} handleChange={handleChange} name="currentPassword" value={formData.currentPassword} editable={true} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Input placeholder='New Password' editProfile={true} secureTextEntry={true} eye={true} handleChange={handleChange} name="password" value={formData.password} editable={true} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Input placeholder='Confirm Password' editProfile={true} secureTextEntry={true} eye={true} handleChange={handleChange} name="CPassword" value={formData.CPassword} editable={true} />
                    </View>
                    <Pressable style={styles.inputContainer}>
                        <Button onPress={updateHandler}>Update</Button>
                    </Pressable>

                </View>
            </ScrollView>
            <Modal
                animationType="fade"
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

    )
}

export default EditProfile;

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalColors.backgroundColor,
        flex: 1,
        // paddingTop: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    innerContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '85%',
    },
    arrowBackContainer: {
        width: '100%',
        alignItems: 'flex-start',
        marginTop: 20,
    },
    title: {
        fontSize: 30,
        fontFamily: 'Poppins_700Bold',
        color: globalColors.buttonColor,
        marginVertical: 20
    },
    profilePicContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
    },
    profilePicContainerPic: {
        width: 150,
        height: 150,
        borderRadius: 150,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadPicture: {
        backgroundColor: globalColors.buttonColor,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 30
    },
    picOptionsContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    uploadPictureText: {
        fontFamily: 'Poppins_700Bold',
        color: globalColors.textColor,
        fontSize: 16
    },
    removePictureText: {
        color: globalColors.red,
        fontSize: 14,
        fontFamily: "Poppins_400Regular",
        textDecorationLine: 'underline',
        marginTop: 8
    },
    inputContainer: {
        marginVertical: 5,
        // width: '100%',
    },
    changePassText: {
        color: globalColors.buttonColor,
        fontSize: 18,
        fontFamily: "Poppins_600SemiBold",
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        width: '80%',
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
})