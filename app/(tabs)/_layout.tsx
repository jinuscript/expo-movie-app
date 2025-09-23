import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import { Image, ImageBackground, Text } from "react-native";

const TabIcons = () => {
  return (
    <ImageBackground
      source={images.highlight}
      className="flex flex-row w-full items-center justify-center min-w-[112px] min-h-14 mt-4 rounded-full overflow-hidden"
    >
      <Image source={icons.home} tintColor="#151312" className="size-5" />
      <Text className="text-secondary text-base font-semibold ml-2">Home</Text>
    </ImageBackground>
  );
};

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "홈",
          headerShown: true,
          tabBarIcon: ({ focused }) => <TabIcons />,
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "저장",
          headerShown: true,
          tabBarIcon: ({ focused }) => <TabIcons />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "검색",
          headerShown: true,
          tabBarIcon: ({ focused }) => <TabIcons />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "프로필",
          headerShown: true,
          tabBarIcon: ({ focused }) => <TabIcons />,
        }}
      />
    </Tabs>
  );
}
