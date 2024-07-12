import Image from "next/image";
import ArticleContainer from "./components/ArticleContainer";

const apiKey = process.env.API_KEY;

console.log(apiKey);



export default function Home() {

  return (
    <main className="m-4">
    <header className=" p-6 flex items-start sm:justify-between sm:items-center flex-col sm:flex-row">
      <h1 className="text-2xl font-bold  py-3">This is the news</h1>
      <div className="logo-container">
        <Image src="/poweredby_nytimes_200c.png" alt="logo" width={100} height={100} />
      </div>

    </header>
      <ArticleContainer apiKey={apiKey}></ArticleContainer>

    </main>
  );
}
