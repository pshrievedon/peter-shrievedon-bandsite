function createCommentElement({ id, name, timestamp, comment }) {
  const commentDiv = document.createElement("div");
  commentDiv.classList.add("comments__item");

  const avatar = document.createElement("img");
  avatar.classList.add("comments__avatar");
  avatar.src = "assets/images/greygreygrey_avatar.jpeg";
  avatar.alt = "Avatar";
  commentDiv.appendChild(avatar);

  const contentDiv = document.createElement("div");
  contentDiv.classList.add("comments__content");

  const authorP = document.createElement("p");
  authorP.classList.add("comments__author");

  const nameSpan = document.createElement("span");
  nameSpan.textContent = name;
  authorP.appendChild(nameSpan);

  const dateSpan = document.createElement("span");
  dateSpan.classList.add("comments__date");
  dateSpan.textContent = formatDate(timestamp);
  authorP.appendChild(dateSpan);

  contentDiv.appendChild(authorP);

  const commentTextP = document.createElement("p");
  commentTextP.classList.add("comments__text");
  commentTextP.textContent = comment;
  contentDiv.appendChild(commentTextP);

  //DELETE DELETE SASS BUTTON LATER
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("comments__delete");
  deleteButton.textContent = "Delete";
  deleteButton.setAttribute("data-id", id);
  contentDiv.appendChild(deleteButton);

  commentDiv.appendChild(contentDiv);

  const divider = document.createElement("hr");
  divider.classList.add("comments__divider");

  const commentContainer = document.createElement("div");
  commentContainer.classList.add("comments__container");
  commentContainer.appendChild(commentDiv);
  commentContainer.appendChild(divider);

  return commentContainer;
}

async function renderComments() {
  const commentsList = document.querySelector(".comments__list");
  commentsList.innerHTML = "";

  try {
    const comments = await bandSiteApi.getComments();
    comments.forEach((comment) => {
      commentsList.appendChild(createCommentElement(comment));
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
  }

  document.querySelectorAll(".comments__delete").forEach((button) => {
    button.addEventListener("click", async (event) => {
      const commentId = event.target.getAttribute("data-id");
      console.log(`Deleting comment with ID: ${commentId}`);
      try {
        await bandSiteApi.deleteComment(commentId);
        await renderComments();
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    });
  });
}

async function commentOn(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const comment = document.getElementById("comment").value;

  const newComment = { name, comment };

  try {
    await bandSiteApi.postComment(newComment);
    await renderComments();
  } catch (error) {
    console.error("Error posting comment:", error);
  }

  document.getElementById("name").value = "";
  document.getElementById("comment").value = "";
}

renderComments();

const commentForm = document.querySelector(".comments__form");
commentForm.addEventListener("submit", commentOn);

function formatDate(timestamp) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(timestamp).toLocaleDateString("en-US", options);
}
