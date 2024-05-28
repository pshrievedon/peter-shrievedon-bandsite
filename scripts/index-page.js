import BandSiteApi from "./band-site-api.js";

const apiKey = "482e58bf-fc9e-45ad-a62a-ca1296bde52c";
const bandSiteApi = new BandSiteApi(apiKey);

const commentThing = {
  type: "div",
  className: "comments__item",
  children: [
    {
      type: "img",
      className: "comments__avatar",
      content: "",
      attributes: {
        src: "assets/images/greygreygrey_avatar.jpeg",
        alt: "Avatar",
      },
    },
    {
      type: "div",
      className: "comments__content",
      children: [
        {
          type: "p",
          className: "comments__author",
          content: "",
          children: [
            { type: "span", className: "", content: "name" },
            { type: "span", className: "comments__date", content: "timestamp" },
          ],
        },
        { type: "p", className: "comments__text", content: "comment" },
        {
          type: "button",
          className: "comments__delete",
          content: "Delete",
          attributes: { "data-id": "" },
        },
      ],
    },
  ],
};

function createComment(
  { type, className, content = "", children = [], attributes = {} },
  data
) {
  const element = document.createElement(type);
  if (className) element.classList.add(className);
  if (content) {
    element.textContent =
      content === "timestamp"
        ? formatDate(data.timestamp)
        : data[content] || content;
  }

  for (const attr in attributes) {
    element.setAttribute(attr, data[attr] || attributes[attr]);
  }

  if (element.classList.contains("comments__delete")) {
    element.setAttribute("data-id", data.id); //COMMENT ID
  }

  children.forEach((child) => {
    element.appendChild(createComment(child, data));
  });

  return element;
}

function renderComments(comments, template) {
  const region = document.querySelector(".comments__list");
  region.innerHTML = "";
  comments.forEach((comment) => {
    const commentElement = createComment(template, comment);
    const divider = document.createElement("hr");
    divider.classList.add("comments__divider");
    region.appendChild(commentElement);
    region.appendChild(divider); // Add the divider after each comment
  });

  document.querySelectorAll(".comments__delete").forEach((button) => {
    button.addEventListener("click", async (event) => {
      const commentId = event.target.getAttribute("data-id");
      console.log(`Deleting comment with ID: ${commentId}`); // Log the comment ID
      try {
        await bandSiteApi.deleteComment(commentId);
        const updatedComments = await bandSiteApi.getComments();
        renderComments(updatedComments, commentThing);
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const comments = await bandSiteApi.getComments();
  renderComments(comments, commentThing);
});

const commentForm = document.querySelector(".comments__form");
commentForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const comment = document.getElementById("comment").value;

  const newComment = { name, comment };

  try {
    await bandSiteApi.postComment(newComment);
    const comments = await bandSiteApi.getComments();
    renderComments(comments, commentThing);
  } catch (error) {
    console.error("Error posting comment:", error);
  }

  // CLEAR INPUT FIELDS
  document.getElementById("name").value = "";
  document.getElementById("comment").value = "";
});

function formatDate(timestamp) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(timestamp).toLocaleDateString("en-US", options);
}
