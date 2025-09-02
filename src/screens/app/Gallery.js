import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import {
  Image,
  TouchableOpacity,
  View,
  Dimensions,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from "react-native";
import Video from "react-native-video";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";

import React, { useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";

import CenteredTabs from "../../components/CenteredTabs";
import screen from "../../assets/image/screen-size-icon/fullscreen.png";
import { FlashList } from "@shopify/flash-list";

const { width, height } = Dimensions.get("window");

const Gallery = ({ route }) => {
  const navigation = useNavigation();

  const [photoUri, setPhotoUri] = useState("");
  const [currectType, setCurrectType] = useState("");
  const [photos, setPhotos] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);
  const [activeFor, setActiveFor] = useState(route?.params?.activeFor);
  const [imageFill, setImageFill] = useState(true);
  const isFocused = useIsFocused();
  const [videoDuration, setVideoDuration] = useState({});
  const [mainLoader, setMainLoader] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    navigation?.goBack();
  };

  useEffect(() => {
    loadPhotos(); // load first 50
  }, []);

  useEffect(() => {
    if (
      activeFor &&
      activeFor !== route?.params?.activeFor &&
      activeFor !== "POST"
    ) {
      navigation.navigate("NewActivityScreen", { activeFor: activeFor });
    }
  }, [activeFor, route?.params?.activeFor]);

  const loadPhotos = async (afterCursor = null) => {
    try {
      console.log("Loading photos after cursor:", afterCursor);
      const result = await CameraRoll.getPhotos({
        first: 40,
        assetType: "All",
        after: afterCursor,
      });

      const customBox = { isCustom: true };

      if (!afterCursor) {
        handleSelection(result.edges[0]);
        setPhotos([customBox, ...result.edges]);
      }
      else {
        setPhotos((prev) => [...prev, ...result.edges]);
      }

      setPageInfo(result.page_info);
      setMainLoader(false);
    } catch (err) {
      console.error("Error fetching photos:", err);
    }
  };

  const loadMore = () => {
    if (loading || !pageInfo?.has_next_page) return;
    setLoading(true);

    setTimeout(() => {
      loadPhotos(pageInfo.end_cursor).finally(() => {
        setLoading(false);
      });
    }, 2000);
  };

  const handleOpenCamera = () => {
    navigation.navigate("NewActivityScreen", { activeFor: activeFor });
  };

  const handleSelection = (item) => {
    setPhotoUri(item.node.image.uri);
    if (item.node.type.startsWith("video")) {
      setCurrectType("video");
    } else if (item.node.type.startsWith("image")) {
      setCurrectType("image");
    }
  };

  // helper function
  const formatDuration = (seconds) => {
    seconds = Number(seconds);
    if (!seconds || isNaN(seconds)) {
      return "00:00";
    }
    const secs = Math.ceil(seconds % 60) === 60 ? 0 : Math.ceil(seconds % 60);
    const mins = Math.floor(seconds / 60);
    const hours = Math.floor(seconds / 3600);
    if (hours === 0) {
      return `${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    } else {
      return `${hours.toString().padStart(2, "0")}:${mins
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.mainLoader}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  };

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

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("EditActivityScreen", { photoUri: photoUri })
            }
          >
            <Text style={styles.nextButton}>Next</Text>
          </TouchableOpacity>
        </View>

        {mainLoader ? (
          <View style={styles.permissionContainer}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.permissionText}>Loading...</Text>
          </View>
        ) : (
          <FlashList
            data={photos}
            numColumns={4}
            estimatedItemSize={width / 4}
            estimatedListSize={{ height: height, width: width }}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              photoUri && photoUri !== "" ? (
                <View style={{ marginBottom: 20 }}>
                  {currectType === "video" && (
                    <Video
                      source={{ uri: photoUri }}
                      style={{
                        width: width,
                        height: 400,
                        margin: 1,
                        borderRadius: 10,
                      }}
                      resizeMode="contain"
                      repeat={true}
                      paused={!isFocused}
                    />
                  )}
                  {currectType === "image" && (
                    <>
                      <Image
                        source={{ uri: photoUri }}
                        style={{
                          width: width,
                          height: 400,
                          margin: 1,
                          borderRadius: 10,
                        }}
                        resizeMode={imageFill ? "cover" : "contain"}
                      />
                      <TouchableOpacity
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 10,
                          padding: 10,
                        }}
                        onPress={() => {
                          setImageFill(!imageFill);
                        }}
                      >
                        <Image
                          source={screen}
                          style={{ width: 25, height: 25 }}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              ) : null
            }
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) =>
              item.isCustom ? (
                <TouchableOpacity
                  style={{
                    width: width / 4,
                    height: width / 4,
                    backgroundColor: "#333",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 1,
                    borderRadius: 10,
                  }}
                  onPress={() => handleOpenCamera()}
                >
                  <FontAwesome name="camera" size={25} color="white" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => handleSelection(item)}>
                  <Image
                    source={{ uri: item.node.image.uri }}
                    style={[
                      {
                        width: width / 4,
                        height: width / 4,
                        margin: 1,
                        borderRadius: 5,
                      },
                      photoUri === item.node?.image?.uri && {
                        backgroundColor: "#fff",
                        opacity: 0.3,
                      },
                    ]}
                  />
                  {item.node.type.startsWith("video") && (
                    <View style={{ position: "absolute", bottom: 5, right: 5 }}>
                      <Text style={{ color: "#fff", fontSize: 12 }}>
                        {formatDuration(videoDuration[item.node.image.uri])}
                      </Text>

                      {/* Hidden video loader to fetch duration */}
                      {!videoDuration[item.node.image.uri] && (
                        <Video
                          source={{ uri: item.node.image.uri }}
                          onLoad={(meta) => {
                            setVideoDuration((prev) => ({
                              ...prev,
                              [item.node.image.uri]: meta.duration,
                            }));
                          }}
                          paused={true}
                          style={{ width: 0, height: 0 }}
                        />
                      )}
                    </View>
                  )}
                </TouchableOpacity>
              )
            }
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
          />
        )}

        <View style={styles.controlsContainer}>
          <CenteredTabs
            photoUri={photoUri}
            activeFor={activeFor}
            setActiveFor={setActiveFor}
            galleryOpened={true}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Gallery;

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
    paddingTop: Platform.OS === "ios" ? 60 : 15,
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
  controlsContainer: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  mainLoader: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 30,
    alignItems: "center",
  },
});