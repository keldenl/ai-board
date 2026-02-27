import { getAllPosts } from './src/lib/posts';

getAllPosts().then(posts => {
  console.log('Posts loaded:', posts.length);
  if (posts.length > 0) {
    console.log('First post title:', posts[0].title);
  } else {
    console.error('NO POSTS LOADED!');
  }
}).catch(err => {
  console.error('Error loading posts:', err);
});
