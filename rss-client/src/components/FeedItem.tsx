import HTMLReactParser from 'html-react-parser';

import { RSSFeedItem } from '../interfaces/rss-feed-item';
import sliceSubstring from '../utils/sliceSubstring';

const FeedItem = ({ article }: { article: RSSFeedItem }) => {
   const { title, link, content } = article;

   // Spliting the title into two parts to apply separate styling (green Upwork and black title)
   const normalTitle = sliceSubstring(title, 0, -'Upwork'.length);
   const upworkTitle = sliceSubstring(title, -'Upwork'.length);

   return (
      <li className="border border-gray-300 py-8 mb-8 rounded-lg shadow-sm">
         <div className="md:container md:mx-auto mb-4">
            <h1 className="text-2xl font-bold mb-2">
               {HTMLReactParser(normalTitle)}
               <span className="text-2xl font-bold mb-2 text-primary">
                  {HTMLReactParser(upworkTitle)}
               </span>
            </h1>
            <div>{HTMLReactParser(content)}</div>
            <div>
               <a href={link} target="_blank">
                  link
               </a>
            </div>
         </div>
      </li>
   );
};

export default FeedItem;
