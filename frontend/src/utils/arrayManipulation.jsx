export function reduceLikedBy(liker_id_user, liked_id_post, data) {
  // Create a new array with modified likedBy property
  const modifiedData = data.map((post) => {
    // If the post has a matching id_post
    if (post.id_post === liked_id_post) {
      // Filter out the liker_id_user from the likedBy array
      const updatedLikedBy = post.likedBy.filter((id) => id !== liker_id_user);
      const updatedNumberOfLikes = post.numberOfLikes - 1;

      // Return a new post object with the updated likedBy array
      return {
        ...post,
        likedBy: updatedLikedBy,
        numberOfLikes: updatedNumberOfLikes,
      };
    }
    // For other posts, return as-is
    return post;
  });

  // Return the modified array
  return modifiedData;
}

export function addLikedBy(liker_id_user, liked_id_post, data) {
  // Create a new array with modified likedBy property
  const modifiedData = data.map((post) => {
    // If the post has a matching id_post
    if (post.id_post === liked_id_post) {
      // Check if liker_id_user is already in the likedBy array
      const alreadyLiked = post.likedBy.includes(liker_id_user);

      // If liker_id_user is not already in likedBy array, add it
      if (!alreadyLiked) {
        const updatedLikedBy = [...post.likedBy, liker_id_user];
        const updatedNumberOfLikes = post.numberOfLikes + 1;
        return {
          ...post,
          likedBy: updatedLikedBy,
          numberOfLikes: updatedNumberOfLikes,
        };
      }
    }

    // For other posts, return as-is
    return post;
  });

  // Return the modified array
  return modifiedData;
}
