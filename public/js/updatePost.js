const updatePost = async (event) => {
  event.preventDefault();

  const newBlogContent = document.querySelector('#post-content').value.trim();

  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blogpost/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ post_content: newBlogContent }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Error: update failed');
    }
  }
};

document
  .querySelector('#update-post-button')
  .addEventListener('click', updatePost);
