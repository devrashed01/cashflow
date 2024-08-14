// remove ts for this file
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { createClient } from "@supabase/supabase-js";

const geminiAIApiKey = process.env.REACT_APP_GOOGLE_API_KEY;

console.log("geminiAIApiKey", geminiAIApiKey);

const embeddings = new GoogleGenerativeAIEmbeddings({ apiKey: geminiAIApiKey });
const sbApiKey = process.env.REACT_APP_SUPABASE_API_KEY;
const sbUrl = process.env.REACT_APP_SUPABASE_URL_LC_CHATBOT;
const client = createClient(sbUrl, sbApiKey);

const vectorStore = new SupabaseVectorStore(embeddings, {
  client,
  tableName: "documents",
  queryName: "match_documents",
});

const retriever = vectorStore.asRetriever();

export { retriever };
