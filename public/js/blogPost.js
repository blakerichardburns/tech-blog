const newComment = async (event) => {
  event.preventDefault();

  const comment = document.querySelector('#comment').value.trim();

  if (comment) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ comment }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/blogpost');
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

document.querySelector('#new-comment').addEventListener('submit', newComment);

document
  .querySelector('#delete-comment-button')
  .addEventListener('click', deleteComment);
