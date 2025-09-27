// Appwrite.js 파일 또는 다른 전역 파일에 추가

// import { Client, Databases } from "react-native-appwrite";

// const client = new Client();

// client
//   .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
//   .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
//   .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!);

// export const databases = new Databases(client);

// export default client;

import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

// Appwrite 클라이언트
const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];

      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
        }
      );
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        count: 1,
        title: movie.title,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }

    console.log(result);
    // 1. 저장된 내역이 있는지 확인
    // => 이미 있다면 searchCount 증가
    // => 없다면 DB에 추가
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 인기 검색어 기능
export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);

    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
