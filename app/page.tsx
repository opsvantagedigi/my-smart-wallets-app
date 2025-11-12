import React from "react";
import { sanityClient } from "../lib/sanityClient";
import { groq } from "next-sanity";

type Page = {
  _id: string;
  title: string;
  content?: any;
};

export default async function Home() {
  const query = groq`*[_type == "page"] | order(_createdAt asc)[0]{_id, title, content}`;
  const page: Page | null = await sanityClient.fetch(query);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white font-orbitron">
      <div className="text-4xl">
        {page ? (
          <>
            <h1>{page.title}</h1>
            {page.content && (
              <div className="prose prose-invert mt-4">
                {/* Optionally render content blocks here if needed */}
                {JSON.stringify(page.content)}
              </div>
            )}
          </>
        ) : (
          "No Sanity page found."
        )}
      </div>
    </div>
  );
}

// npx sanity dev --cwd sanity
