import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import fetchMovies from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

const HomeScreen = () => {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  // useEffect(() => {
  // const checkDatabaseConnection = async () => {
  //   try {
  //     const response = await databases.listDocuments({
  //       databaseId: `${process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID}`,
  //       collectionId: `${process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID}`,
  //     });
  //     console.log("데이터베이스 연결 성공:", response);
  //     //
  //     return true;
  //   } catch (error) {
  //     console.log("데이터베이스 연결 실패:", error);
  //     //
  //     return false;
  //   }
  // };
  // checkDatabaseConnection();
  // }, []);

  return (
    <View className="flex-1 bg-primary">
      {/* 배경 */}
      <Image source={images.bg} className="absolute w-full z-0" />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
      >
        {/* 아이콘 */}
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {/* 로딩 */}
        {moviesLoading || trendingLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError || trendingError ? (
          <Text className="text-lg text-white font-bold mt-5 mb-3">
            Error: {moviesError?.message || trendingError?.message}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a movie..."
            />

            {/* 인기 검색어 */}
            {trendingMovies && (
              <View className="mt-10">
                <Text className="text-lg text-white font-bold mt-5 mb-3">
                  Trending Movies
                </Text>
              </View>
            )}
            <>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View className="w-4" />}
                className="mb-4 mt-3"
                data={trendingMovies}
                renderItem={({ item, index }) => (
                  <TrendingCard movie={item} index={index} />
                )}
                keyExtractor={(item) => item.movie_id.toString()}
              />

              {/* 최신 영화 */}
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Latest Movies
              </Text>

              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
