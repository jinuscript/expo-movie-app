// Appwrite.js 파일 또는 다른 전역 파일에 추가

// import { Client, Databases } from "react-native-appwrite";

// const client = new Client();

// client
//   .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
//   .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
//   .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!);

// export const databases = new Databases(client);

// export default client;

import { Client, Databases, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

// Appwrite 클라이언트
const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

const updateSearchCount = async (query: string, movie: Movie) => {
  const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
    Query.equal("searchTerm", query),
  ]);

  console.log(result);
  // 1. 저장된 내역이 있는지 확인
  // => 이미 있다면 searchCount 증가
  // => 없다면 DB에 추가
};

export default updateSearchCount;
