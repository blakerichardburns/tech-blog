const newComment = async (event) => {
  event.preventDefault();

  const comment_content = document.querySelector('#new-comment').value.trim();

  if (comment_content) {
    const response = await fetch(`/api/comment`, {
      method: 'POST',
      body: JSON.stringify({ comment_content }),
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

document.querySelector('.comment-input').addEventListener('submit', newComment);
