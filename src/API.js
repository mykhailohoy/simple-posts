const API = {
  fetchPosts: async (limit) => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts/");
      const posts = await response.json();
      // if limit is omitted then it's undefined, so it will fetch all items
      const limitedPosts = posts.slice(0, limit);
      return [limitedPosts, null]
    }
    catch (error) {
      return [null, error]
    }
  }
}

export default API;