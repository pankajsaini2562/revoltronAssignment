import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
export default function NewsSection() {
  const [headlines, setHeadlines] = useState([]);
  //state for handle error
  const [error, setError] = useState(null);

  //state for loading state
  const [loading, setLoading] = useState(true);
  // NEWS API
  const API_URL =
    "https://newsapi.org/v2/top-headlines?country=us&apiKey=157543b6cd3c4a75b6464d64a47267ea";

  //react hook to fetch the data through api
  useEffect(() => {
    const fetchHeadline = async () => {
      try {
        const response = await axios.get(API_URL);
        console.log(response);
        setHeadlines(response.data.articles.slice(0, 5)); // Fetch only the top 5 headlines
      } catch (error) {
        setError(
          "Failed to fetch the latest headlines. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchHeadline();
  }, []);

  //if loading take some time than shown this message
  if (loading) {
    return <p className="text-center text-gray-500">Loading headlines...</p>;
  }

  // for found error in fetching the data through api

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>; // Display error message
  }
  return (
    <div className="news-section bg-gray-100 p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Latest Headlines
      </h2>
      {headlines.length > 0 ? (
        <ul className="space-y-6">
          {headlines.map((article, index) => (
            <li key={index} className="border-b pb-4 mb-4">
              <h3 className="text-lg font-bold text-blue-600 hover:underline">
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
              </h3>
              <p className="text-sm text-gray-500">
                <strong>Source:</strong> {article.source.name} |{" "}
                <strong>Published on:</strong>{" "}
                {new Date(article.publishedAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No headlines available.</p>
      )}
    </div>
  );
}
