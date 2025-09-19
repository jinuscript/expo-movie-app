import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "홈",
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "저장",
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "검색",
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "프로필",
          headerShown: true,
        }}
      />
    </Tabs>
  );
}
