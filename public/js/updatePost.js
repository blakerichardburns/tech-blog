const updatePost = async (event) => {
  event.preventDefault();

  const newBlogTitle = document.querySelector('#update-post-title').value.trim();
  const newBlogContent = document.querySelector('#update-post-content').value.trim();

  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blogpost/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        post_title: newBlogTitle,
        post_content: newBlogContent,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace(`/blogpost/${id}`);
    } else {
      alert('Error: update failed');
    }
  }
};

document
  .querySelector('#update-post-button')
  .addEventListener('click', updatePost);
