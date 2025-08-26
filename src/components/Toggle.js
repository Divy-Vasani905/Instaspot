import React, { useState } from "react";
import { View, TouchableOpacity, Animated, StyleSheet } from "react-native";

const CustomSwitch = ({ small = false }) => {
    const [isOn, setIsOn] = useState(false);

    if (small) {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setIsOn(!isOn)}
                style={[
                    styles.smallTrack,
                    { backgroundColor: isOn ? "#36459aff" : "#bbb" },
                ]}
            >
                <View
                    style={[
                        styles.smallThumb,
                        { alignSelf: isOn ? "flex-end" : "flex-start" },
                        { backgroundColor: isOn ? "#6e84ffff" : "#fff" }
                    ]}
                />
            </TouchableOpacity>
        )
    }
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsOn(!isOn)}
            style={[
                styles.track,
                { backgroundColor: isOn ? "#fff" : "#bbb" },
            ]}
        >
            <View
                style={[
                    styles.thumb,
                    { alignSelf: isOn ? "flex-end" : "flex-start" },
                ]}
            />
        </TouchableOpacity>
    );
};

export default CustomSwitch;

const styles = StyleSheet.create({
    smallTrack: {
        width: 40,
        height: 15,
        borderRadius: 20,
        justifyContent: "center",
    },
    smallThumb: {
        width: 22,
        height: 22,
        borderRadius: 60,
        backgroundColor: "#fff",
        elevation: 3,
    },
    track: {
        width: 70,
        height: 40,
        borderRadius: 20,
        padding: 3,
        justifyContent: "center",
    },
    thumb: {
        width: 30,
        height: 30,
        borderRadius: 60,
        backgroundColor: "#000",
        elevation: 3,
    },
});
