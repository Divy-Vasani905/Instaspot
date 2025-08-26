import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const FollowButton = ({ followed, notification = false }) => {
    const [isFollowed, setIsFollowed] = useState(followed)

    return (
        <TouchableOpacity onPress={() => setIsFollowed(!isFollowed)}>
            <Text style={[
                styles.buttonText,
                !isFollowed && { backgroundColor: '#3c49ffff', color: '#fff' },
                notification && { width: 125, }
            ]}>
                {isFollowed ? 'Following' : 'Follow'}
            </Text>
        </TouchableOpacity>
    )
}

export default FollowButton

const styles = StyleSheet.create({
    buttonText: {
        width: 175,
        fontSize: 14,
        fontWeight: '500',
        textAlign: "center",
        color: "#FFF",
        backgroundColor: '#34343aff',
        paddingVertical: 8,
        borderRadius: 5,
    },
})