import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, BackHandler, View } from "react-native";
import WebView from "react-native-webview";
import { useDispatch, useSelector } from "react-redux";
import { webActions } from "../../store/web_search";
import TabsScreen from "./tabs/TabsScreen";
import { Dimensions } from "react-native";
import BottomSlide from "./tabs/BottomSlide";
import ViewShot from "react-native-view-shot";
import FirstPage from "./home/FirstPage";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import { historic_action } from "../../store/historic_store";

export default function HomeScreen({ navigation, route }) {
  const dispatch = useDispatch();

  let tab = useSelector((state) => state.web_search.tab);
  let data = useSelector((state) => state.web_search.data);
  const home_screen = useSelector((state) => state.web_search.home_screen);
  const webViewRef = useRef();
  const [urlVideo, setUrlVideo] = useState(null);

  const [textNameVideo, setTextNameVideo] = useState("");
  const refBottomSlide = useRef();
  const openBottmSilde = () => {
    refBottomSlide.current.open();
  };
  const closeBottmSilde = () => {
    refBottomSlide.current.close();
  };

  useEffect(() => {
   /* dispatch(
      historic_action.addHistoric({
        url: tab?.url,
        title: tab.title,
        iconURI: tab.iconURI,
      })
    );*/
  }, [tab.url]);

  useEffect(() => {
    if (home_screen == 1) {
      setTimeout(() => {
        captureScreen();
      }, 3000);
    }
  }, [tab.url]);

  const captureScreen = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      dispatch(
        webActions.setImgScreenTab({
          screenShot: uri,
        })
      );
    } catch (error) {
      console.error("Error capturing screenshot: ", error);
    }
  };

  const backAction = () => {
    console.log("Back button pressed!");
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );

  const handleWebViewMessage = (event) => {
    const { data } = event.nativeEvent;
    const getDatafromJS = JSON.parse(data);
    if (getDatafromJS.src) {
      setTextNameVideo("file" + new Date().getTime());
      setUrlVideo(getDatafromJS.src);
      refBottomSlide.current.open();
    }
    const uri = JSON.parse(event.nativeEvent.data);
    dispatch(
      webActions.setImgScreenTab({
        iconURI: uri,
      })
    );
  };

  const handleLoadEnd = () => {
    // Extract the icon URL from the <head> element of the loaded webpage
    webViewRef.current?.injectJavaScript(`
      const iconUrl = document.querySelector('head > link[rel="shortcut icon"], head > link[rel="icon"]').href;
      window.ReactNativeWebView.postMessage(JSON.stringify(iconUrl));
    `);
  };

  const specifyDownoalderFile = () => {
    if (tab.title.toLowerCase("youtube")) {
      console.log(tab.url);
      console.log(tab.title);
    } else {
      console.log(tab.url);
      console.log(tab.title);
    }
  };

  const downloadVideoYoutube = async () => {
    // refRBSheet.current.open();

    specifyDownoalderFile();

    /*   const { status } = await MediaLibrary.requestPermissionsAsync();


    if (status === "granted") {
      const youtubeURL = urlVideo;
      const [urls] = await ytdl(youtubeURL, { quality: "highestaudio" });
      console.log(urls);

      const folderName = "downoalderappfolder";
      const folderPath = `${FileSystem.documentDirectory}DCIM/${folderName}/`;
      await FileSystem.makeDirectoryAsync(folderPath, {
        intermediates: true,
      });
      console.log("Folder created successfully.");

      const fileUri = folderPath + "qqqq.mp3";
      const downloadResult = await FileSystem.downloadAsync(urls.url, fileUri);
      console.log(downloadResult);
      if (downloadResult.status === 200) {
        const asset = await MediaLibrary.createAssetAsync(downloadResult.uri);
        console.log(asset);
        alert("success");
        return asset;
      } else {
        alert("Failed to download video");
        throw new Error("Failed to download video");
      }
    } else {
      const { status } = await MediaLibrary.requestPermissionsAsync();

      alert("Permission to write to the media library has not been granted");
    }*/
  };

  const onLoadProgress = async (event) => {
    const nativeEvent = await event.nativeEvent;
    const title = nativeEvent.title;
    const icon = nativeEvent.favicon;
    const url = nativeEvent.url;
    dispatch(
      webActions.setURLTab({
        id: tab.id,
        url: url,
        title: title,
      })
    );
  };

  const viewShotRef = useRef();
  const [imageBase64, setImageBase64] = useState(null);

  useEffect(() => {
    loadIcon();
  }, []);
  const loadIcon = async () => {
    const imageAsset = Asset.fromModule(require("../../assets/dwd.png"));
    await imageAsset.downloadAsync();
    const uri = imageAsset.localUri;
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const mimeType = "image/png";
    const dataUri = `data:${mimeType};base64,${base64}`;
    setImageBase64(dataUri);
  };

  return (
    <>
      {tab.url === "about:blank" && home_screen == 1 ? (
        <FirstPage />
      ) : (
        <View
          style={[{ flex: 1 }, home_screen == 1 ? null : { display: "none" }]}
        >
          <ViewShot
            style={{ flex: 1 }}
            ref={viewShotRef}
            options={{
              format: "jpg",
              quality: 0.9,
            }}
          >
            <WebView
              ref={webViewRef}
              renderLoading={LoadingIndicatorView}
              onLoadProgress={onLoadProgress}
              onLoadEnd={handleLoadEnd}
              originWhitelist={["*"]}
              javaScriptEnabled={true}
              injectedJavaScript={`
          function addButtonsToVideos() {
            // Select all video elements on the page
            var videos = document.querySelectorAll('video');
          
            // Loop through each video element
            for (var i = 0; i < videos.length; i++) {
              var video = videos[i];
          
              // Check if a button element already exists in front of the video element
              var existingButton = video.previousSibling;
              if (existingButton && existingButton.tagName == 'BUTTON') {
                continue;
              }
          
              // Create a new button element
              var button = document.createElement('button');
              button.style.fontSize = '12px';
              button.style.padding = '4px 8px';
              button.style.position = 'absolute';
              button.style.backgroundColor  = '#fff0';
              button.style.zIndex = "9999";
              button.style.color = 'white';
              button.style.borderRadius = '25px';
              button.style.padding = '10px 20px';
              button.style.border = 'none';
              button.style.fontSize = '16px';
              button.style.top = '70%';
              button.style.bottom = '20%';
              button.innerHTML = '<img src="${imageBase64}" width="50" height="50" />';
              button.addEventListener("click", () => {
                var poster = video.getAttribute("poster");
                window.ReactNativeWebView.postMessage(JSON.stringify({src:video.src, poster:poster}));  
              });
              video.parentNode.insertBefore(button, video);
            }
          }
          
            var videos = document.querySelectorAll('video');
          
            // Loop through each video element
            for (var i = 0; i < videos.length; i++) {
              var video = videos[i];
          
              // Check if a button element already exists in front of the video element
              var existingButton = video.previousSibling;
              if (existingButton && existingButton.tagName == 'BUTTON') {
                continue;
              }
          
              var button = document.createElement('button');
              button.style.fontSize = '12px';
              button.style.padding = '4px 8px';
              button.style.position = 'absolute';
              button.style.backgroundColor  = '#fff0';
              button.style.zIndex = "9999";
              button.style.color = 'white';
              button.style.borderRadius = '25px';
              button.style.padding = '10px 20px';
              button.style.border = 'none';
              button.style.fontSize = '16px';
              button.style.top = '70%';
              button.style.bottom = '20%';
              button.innerHTML = '<img src="${imageBase64}" width="50" height="50" />';
              button.addEventListener("click", () => {
                var poster = video.getAttribute("poster");
               window.ReactNativeWebView.postMessage(JSON.stringify({src:video.src, poster:poster}));  
              });
          
              // Insert the button element in front of the video element
              video.parentNode.insertBefore(button, video);
            }
          // Add buttons to new videos loaded dynamically on the page
          var observer = new MutationObserver(addButtonsToVideos);
          observer.observe(document.body, {childList: true, subtree: true});
          `}
              onMessage={handleWebViewMessage}
              source={{
                uri: tab?.url,
              }}
            />

            <BottomSlide
              urlVideo={urlVideo}
              refBottomSlide={refBottomSlide}
              textNameVideo={textNameVideo}
              setTextNameVideo={setTextNameVideo}
              closeBottmSilde={closeBottmSilde}
            />
          </ViewShot>
        </View>
      )}
      {home_screen == 2 ? <TabsScreen data={data} tab={tab} /> : <></>}
    </>
  );

  function LoadingIndicatorView() {
    return (
      <>
        <View
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator color="#009b88" size="large" />
        </View>
      </>
    );
  }
}
