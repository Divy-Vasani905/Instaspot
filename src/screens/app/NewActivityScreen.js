// NewActivityScreen.js
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
} from "react-native";
import {
    useCameraDevice,
    useCameraPermission
} from "react-native-vision-camera";
import PagerView from "react-native-pager-view";
import { launchImageLibrary } from "react-native-image-picker";

import Ionicons from "react-native-vector-icons/Ionicons";

import CenteredTabs from "../../components/CenteredTabs";
import NewPost from "../../components/NewPost";
import NewStory from "../../components/NewStory";
import NewReel from "../../components/NewReel";

const pages = ["POST", "STORY", "REEL", "LIVE"];

const NewActivityScreen = ({ navigation, route }) => {
    const [isPermissionLoading, setIsPermissionLoading] = useState(true);
    const [cameraSideBack, setCameraSideBack] = useState(true)
    const device = useCameraDevice(cameraSideBack ? 'back' : 'front')
    const { hasPermission, requestPermission } = useCameraPermission();
    const [photoUri, setPhotoUri] = useState('');
    const cameraRef = useRef(null);
    const pagerRef = useRef(null);

    const [activeFor, setActiveFor] = useState(route?.params?.activeFor || "POST");

    // Sync pager when tab changes
    useEffect(() => {
        const index = pages.findIndex(p => p.toLowerCase() === activeFor?.toLowerCase());
        if (index >= 0) {
            pagerRef.current?.setPage(index);
        }
    }, [activeFor]);

    useEffect(() => {
        if (activeFor === 'POST' && activeFor !== route?.params?.activeFor) {
            navigation.navigate('Gallery', { activeFor: activeFor })
        }
    }, [activeFor]);

    // Handle pager swipe
    const onPageSelected = (e) => {
        const index = e.nativeEvent.position;
        setActiveFor(pages[index]);
    };

    useEffect(() => {
        const checkAndRequestPermissions = async () => {
            setIsPermissionLoading(true);
            try {
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

    useEffect(() => {
        if (photoUri && photoUri !== '') {
            setTimeout(() => {
                navigation.navigate('EditActivityScreen', { photoUri: photoUri })
            }, 0)
        }
    }, [photoUri])

    const handleClose = () => {
        navigation?.goBack();
    };

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
            mediaType: "mixed",
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
            }
        } catch (error) {
            console.error('Error taking photo:', error);
            Alert.alert('Error', 'Failed to take photo. Please try again.');
        }
    }

    return (
        <SafeAreaView style={styles.SafeAreaViewContainer}>
            <View style={styles.container}>

                <PagerView
                    ref={pagerRef}
                    style={{ flex: 1 }}
                    initialPage={pages.findIndex(p => p.toLowerCase() === activeFor.toLowerCase())}
                    onPageSelected={onPageSelected}
                    scrollEnabled={false}
                >
                    <View key="POST" style={{ flex: 1 }}>
                        {activeFor === "POST" &&
                            <NewPost
                                photoUri={photoUri}
                                device={device}
                                cameraRef={cameraRef}
                                handleClose={handleClose}
                                capturePhoto={capturePhoto}
                                setPhotoUri={setPhotoUri}
                            />
                        }
                    </View>

                    <View key="STORY" style={{ flex: 1 }}>
                        {activeFor === "STORY" &&
                            <NewStory
                                photoUri={photoUri}
                                device={device}
                                cameraRef={cameraRef}
                                handleClose={handleClose}
                                capturePhoto={capturePhoto}
                                setPhotoUri={setPhotoUri}
                            />
                        }
                    </View>

                    <View key="REEL" style={{ flex: 1 }}>
                        {activeFor === "REEL" &&
                            <NewReel
                                photoUri={photoUri}
                                device={device}
                                cameraRef={cameraRef}
                                handleClose={handleClose}
                                capturePhoto={capturePhoto}
                                setPhotoUri={setPhotoUri}
                            />
                        }
                    </View>

                    <View key="LIVE" style={{ flex: 1 }}>
                        {activeFor === "LIVE" &&
                            <Text style={{ color: "white", fontSize: 20 }}>Live Page</Text>
                        }
                    </View>
                </PagerView>

                <View style={styles.controlsContainer}>
                    {(photoUri && photoUri !== '') &&
                        <>
                            {/* <TouchableOpacity
                                onPress={() => setPhotoUri(null)}
                                style={styles.captureButton}
                            >
                                <Text style={{ color: '#fff' }}>Retake</Text>
                            </TouchableOpacity> */}

                            <CenteredTabs
                                photoUri={photoUri}
                                pickFromGallery={pickFromGallery}
                                activeFor={activeFor}
                                setActiveFor={setActiveFor}
                            />
                        </>
                    }

                    {!photoUri &&
                        <>
                            {/* <TouchableOpacity
                                style={styles.captureButton}
                                onPress={() => capturePhoto()}
                            >
                                <View style={styles.captureButtonInner} />
                            </TouchableOpacity> */}

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
