const newBlogPost = async (event) => {
  event.preventDefault();

  const title = document.querySelector('post-title').value.trim();
  const content = document.querySelector('post-content').value.trim();

  if (title && content) {
    const response = await fetch(`/api/blogposts`, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
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

const updatePost = async (event) => {
  event.preventDefault();

  const content = document.querySelector('post-content').value.trim();

  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blogposts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ content: newBlogContent }),
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

const deletePost = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blogposts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Error: Delete failed');
    }
  }
};

const newComment = async (event) => {
  event.preventDefault();

  const comment = document.querySelector('comment').value.trim();

  if (comment) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ comment }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/blogposts');
    } else {
      alert('Error: Comment failed');
    }
  }
};

const deleteComment = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/comments');
    } else {
      alert('Error: Delete failed');
    }
  }
};

document
  .querySelector('.new-blog-post')
  .addEventListener('submit', newBlogPost);

document
  .querySelector('#update-post-button')
  .addEventListener('click', updatePost);

document
  .querySelector('#delete-post-button')
  .addEventListener('click', deletePost);

document.querySelector('.new-comment').addEventListener('submit', newComment);

document
  .querySelector('#delete-post-button')
  .addEventListener('click', deleteComment);
