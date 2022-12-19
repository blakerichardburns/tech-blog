const newBlogpost = async (event) => {
  event.preventDefault();

  const post_title = document.querySelector('#post-title').value.trim();
  const post_content = document.querySelector('#post-content').value.trim();

  if (post_title && post_content) {
    const response = await fetch(`/api/blogpost`, {
      method: 'POST',
      body: JSON.stringify({ post_title, post_content }),
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
    console.log("asjkljklasdfkdfs");
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
  .querySelector('.new-blogpost')
  .addEventListener('submit', newBlogpost);

  document.querySelectorAll('#delete-post-button')
    .forEach(element => {
      element.addEventListener('click', deletePost)
    });
