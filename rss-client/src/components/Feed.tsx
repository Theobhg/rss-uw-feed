import { useState, useEffect, FC } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { RSSFeedItem } from '../interfaces/rss-feed-item';
import LoadSpinner from './LoadSpinner';

// Accessing environment variables from the.env file with Vite's import.meta.env;
const viteMetaEnv = import.meta.env;

import FeedItem from './FeedItem';

const Feed: FC = () => {
   const [articles, setArticles] = useState<RSSFeedItem[]>([]);
   const [isLoading, setIsLoading] = useState<boolean>(true);

   const getArticles: () => Promise<void> = async () => {
      try {
         const response = await axios.get(viteMetaEnv.VITE_SERVER_URL);

         setArticles(response.data);
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      const socket = io(viteMetaEnv.VITE_SERVER_URL);

      getArticles();

      socket.on('feed-update', (updatedItems: RSSFeedItem[]) => {
         setArticles(updatedItems);

         if (isLoading) {
            setIsLoading(false);
         }
      });

      return () => {
         socket.disconnect();
      };
   }, []);

   const renderArticles = (
      <ul className="p-16">
         {articles.map(article => (
            <FeedItem article={article} key={article.guid} />
         ))}
      </ul>
   );

   return <>{renderArticles}</>;
};

export default Feed;
