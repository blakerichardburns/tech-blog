const newBlogPost = async (event) => {
  event.preventDefault();

  const post_title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();

  if (post_title && content) {
    const response = await fetch(`/api/blogpost`, {
      method: 'POST',
      body: JSON.stringify({ post_title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Error: Post failed');
    }
  }
};

const deletePost = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blogpost/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Error: Delete failed');
    }
  }
};

document
  .querySelector('.new-blog-post')
  .addEventListener('submit', newBlogPost);

document
  .querySelector('#delete-post-button')
  .addEventListener('click', deletePost);
