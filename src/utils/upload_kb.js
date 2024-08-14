import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { createClient } from "@supabase/supabase-js";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import textFile from "./upload.txt";

export const uploadDocuments = async () => {
  try {
    const result = await fetch(textFile);
    const text = await result.text();

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 50,
      separators: ["\n\n", "\n", " ", ""], // default setting
    });

    const output = await splitter.createDocuments([text]);

    // const openAIApiKey: string = import.meta.env.REACT_APP_OPENAI_API_KEY;
    const genAIApiKey = import.meta.env.REACT_APP_GOOGLE_API_KEY;
    const sbApiKey = import.meta.env.REACT_APP_SUPABASE_API_KEY;
    const sbUrl = import.meta.env.REACT_APP_SUPABASE_URL_LC_CHATBOT;
    // console.log("sbUrl", sbUrl, sbApiKey);

    const client = createClient(sbUrl, sbApiKey);

    await SupabaseVectorStore.fromDocuments(
      output,
      new GoogleGenerativeAIEmbeddings({
        apiKey: genAIApiKey,
        model: "embedding-001",
      }),
      {
        client,
        tableName: "documents",
      }
    );
  } catch (err) {
    console.error("Error uploading documents:", err);
  }
};
