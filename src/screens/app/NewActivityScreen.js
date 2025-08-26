import React, { useEffect, useState, useRef } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Linking,
    Alert,
    Platform,
    PermissionsAndroid,
    SafeAreaView,
    Image,
} from "react-native";
import {
    Camera,
    useCameraDevice,
    useCameraPermission
} from "react-native-vision-camera";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { launchImageLibrary } from "react-native-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import CenteredTabs from "../../components/CenteredTabs";

const NewActivityScreen = ({ navigation, route }) => {
    const [isPermissionLoading, setIsPermissionLoading] = useState(true);
    const [cameraSideBack, setCameraSideBack] = useState(true)
    const device = useCameraDevice(cameraSideBack ? 'back' : 'front', {
        physicalDevices: [
            'ultra-wide-angle-camera',
            'wide-angle-camera',
            'telephoto-camera'
        ]
    })
    const { hasPermission, requestPermission } = useCameraPermission();
    const [photoUri, setPhotoUri] = useState(null);
    const cameraRef = useRef(null);

    const [activeFor, setActiveFor] = useState(route?.params?.activeFor)
    console.log('activeFor', activeFor)

    useEffect(() => {
        const checkAndRequestPermissions = async () => {
            setIsPermissionLoading(true);
            try {
                // For Android, also check native permissions as fallback
                if (Platform.OS === 'android') {
                    const cameraGranted = await PermissionsAndroid.check(
                        PermissionsAndroid.PERMISSIONS.CAMERA
                    );
                    if (!cameraGranted && !hasPermission) {
                        const androidPermissions = await PermissionsAndroid.requestMultiple([
                            PermissionsAndroid.PERMISSIONS.CAMERA,
                            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                        ]);
                        const cameraPermissionGranted =
                            androidPermissions['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED;
                        if (!cameraPermissionGranted) {
                            await requestPermission();
                        }
                    } else if (!hasPermission) {
                        await requestPermission();
                    }
                } else {
                    // For iOS, use Vision Camera permission
                    if (!hasPermission) {
                        await requestPermission();
                    }
                }
            } catch (error) {
                console.error('Permission error:', error);
            } finally {
                setIsPermissionLoading(false);
            }
        };
        checkAndRequestPermissions();
    }, [hasPermission, requestPermission]);

    // Handle close
    const handleClose = () => {
        navigation?.goBack();
    };

    // Handle permission request
    const handleRequestPermission = async () => {
        try {
            const granted = await requestPermission();
            if (!granted) {
                Alert.alert(
                    'Camera Permission Required',
                    'Please enable camera permission to use this feature. You can enable it in your device settings.',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'Open Settings', onPress: () => Linking.openSettings() }
                    ]
                );
            }
        } catch (error) {
            console.error('Error requesting permission:', error);
            Alert.alert(
                'Permission Error',
                'There was an error requesting camera permission. Please try enabling it manually in settings.',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Open Settings', onPress: () => Linking.openSettings() }
                ]
            );
        }
    };

    // Show loading state while checking permissions
    if (isPermissionLoading) {
        return (
            <SafeAreaView style={styles.SafeAreaViewContainer}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <TouchableOpacity onPress={handleClose}>
                                <Ionicons name="close-outline" size={30} color="#fff" />
                            </TouchableOpacity>
                            <Text style={styles.headerTitle}>New {activeFor}</Text>
                        </View>
                    </View>
                    <View style={styles.permissionContainer}>
                        <Ionicons name="camera-outline" size={50} color="#fff" />
                        <Text style={styles.permissionText}>Checking camera permissions...</Text>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    // Show permission request screen
    if (!hasPermission) {
        return (
            <SafeAreaView style={styles.SafeAreaViewContainer}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <TouchableOpacity onPress={handleClose}>
                                <Ionicons name="close-outline" size={30} color="#fff" />
                            </TouchableOpacity>
                            <Text style={styles.headerTitle}>New {activeFor}</Text>
                        </View>
                    </View>
                    <View style={styles.permissionContainer}>
                        <Ionicons name="camera-off-outline" size={50} color="#fff" />
                        <Text style={styles.permissionText}>
                            Camera access is required to take photos and videos.
                        </Text>
                        <TouchableOpacity
                            style={styles.settingsButton}
                            onPress={handleRequestPermission}
                        >
                            <Text style={styles.settingsButtonText}>Grant Camera Permission</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.settingsButton, styles.secondaryButton]}
                            onPress={() => Linking.openSettings()}
                        >
                            <Text style={[styles.settingsButtonText, styles.secondaryButtonText]}>
                                Open Settings
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    // Show error if no camera device available
    if (device == null) {
        return (
            <SafeAreaView style={styles.SafeAreaViewContainer}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <TouchableOpacity onPress={handleClose}>
                                <Ionicons name="close-outline" size={30} color="#fff" />
                            </TouchableOpacity>
                            <Text style={styles.headerTitle}>New {activeFor}</Text>
                        </View>
                    </View>
                    <View style={styles.permissionContainer}>
                        <Ionicons name="camera-off-outline" size={50} color="#fff" />
                        <Text style={styles.permissionText}>
                            Camera not available on this device.
                        </Text>
                        <TouchableOpacity
                            style={styles.settingsButton}
                            onPress={handleClose}
                        >
                            <Text style={styles.settingsButtonText}>Go Back</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    const pickFromGallery = async () => {
        const result = await launchImageLibrary({
            mediaType: "photo",
            quality: 1,
        });
        if (result.assets && result.assets.length > 0) {
            setPhotoUri(result.assets[0].uri || null);
        }
    };

    const capturePhoto = async () => {
        try {
            if (cameraRef.current) {
                const photo = await cameraRef.current.takePhoto({
                    qualityPrioritization: 'speed',
                    flash: 'off',
                    enableAutoStabilization: true,
                });
                console.log("Captured photo:", photo.path);
                setPhotoUri("file://" + photo.path);
                // await CameraRoll.save(`file://${photo.path}`, {
                //     type: 'photo',
                //     album: "InstaspotPics",
                // })
                // Navigate to preview/edit screen with photo
                // navigation.navigate('PhotoPreview', { photoPath: photo.path });
            }
        } catch (error) {
            console.error('Error taking photo:', error);
            Alert.alert('Error', 'Failed to take photo. Please try again.');
        }
    }

    // Main camera screen
    return (
        <SafeAreaView style={styles.SafeAreaViewContainer}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={handleClose}>
                            <Ionicons name="close-outline" size={30} color="#fff" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>New {activeFor}</Text>
                    </View>

                    <TouchableOpacity>
                        <Text style={styles.nextButton}>Next</Text>
                    </TouchableOpacity>
                </View>

                {/* Camera */}
                <View style={styles.cameraContainer}>
                    {photoUri ? (
                        <Image
                            source={{ uri: photoUri }}
                            style={StyleSheet.absoluteFill}
                        />
                    ) : (
                        <Camera
                            ref={cameraRef}
                            style={StyleSheet.absoluteFill}
                            device={device}
                            isActive={true}
                            photo={true}
                        />
                    )}
                </View>

                {/* Bottom Capture Button */}
                <View style={styles.controlsContainer}>
                    {photoUri &&
                        <>
                            <TouchableOpacity
                                onPress={() => setPhotoUri(null)}
                                style={styles.captureButton}
                            >
                                <Text style={{ color: '#fff' }}>
                                    Retake
                                </Text>
                            </TouchableOpacity>
                        </>
                    }

                    {!photoUri &&
                        <>
                            <TouchableOpacity
                                style={styles.captureButton}
                                onPress={() => capturePhoto()}
                            >
                                <View style={styles.captureButtonInner} />
                            </TouchableOpacity>

                            <CenteredTabs
                                photoUri={photoUri}
                                pickFromGallery={pickFromGallery}
                                cameraSideBack={cameraSideBack}
                                setCameraSideBack={setCameraSideBack}
                                activeFor={activeFor}
                                setActiveFor={setActiveFor}
                            />
                        </>
                    }
                </View>
            </View>
        </SafeAreaView>
    );
};
export default NewActivityScreen;

const styles = StyleSheet.create({
    SafeAreaViewContainer: {
        flex: 1,
        paddingTop: 35,
        backgroundColor: "black",
    },
    container: {
        flex: 1,
        backgroundColor: "black",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 60 : 15,
        zIndex: 10,
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
    },
    headerTitle: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "500",
    },
    nextButton: {
        fontSize: 18,
        color: "#3797EF",
        fontWeight: "500",
    },
    cameraContainer: {
        flex: 1,
        marginBottom: 150,
        overflow: "hidden",
        backgroundColor: "black",
        borderRadius: 20,
    },
    permissionContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    permissionText: {
        color: "#fff",
        textAlign: "center",
        marginTop: 20,
        marginBottom: 20,
        fontSize: 16,
        lineHeight: 22,
    },
    settingsButton: {
        marginTop: 15,
        paddingVertical: 12,
        paddingHorizontal: 24,
        backgroundColor: "#3797EF",
        borderRadius: 10,
        minWidth: 200,
    },
    secondaryButton: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#3797EF",
    },
    settingsButtonText: {
        color: "white",
        fontWeight: "600",
        fontSize: 16,
        textAlign: "center",
    },
    secondaryButtonText: {
        color: "#3797EF",
    },
    controlsContainer: {
        position: "absolute",
        bottom: 50,
        left: 0,
        right: 0,
        alignItems: "center",
        justifyContent: 'center',
        gap: 20,
    },
    captureButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 3,
        alignSelf: 'center',
        borderColor: "white",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.3)",
    },
    captureButtonInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "white",
    },
    previewContainer: {
        position: "absolute",
        top: 0,
        left: 30,
        borderWidth: 2,
        borderColor: "#fff",
        borderRadius: 8,
        overflow: "hidden",
    },
    preview: {
        width: 50,
        height: 50,
        resizeMode: "cover",
    },
});
