<<<<<<< HEAD
const comments = [
  {
    name: "Victor Pinto",
    timestamp: "11/02/2023",
    text: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
  },
  {
    name: "Christina Cabrera",
    timestamp: "10/28/2023",
    text: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
  },
  {
    name: "Isaac Tadesse",
    timestamp: "10/20/2023",
    text: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
  },
];

const commentSchema = {
=======
import BandSiteApi from "./band-site-api.js";

const apiKey = "482e58bf-fc9e-45ad-a62a-ca1296bde52c";
const bandSiteApi = new BandSiteApi(apiKey);

const commentThing = {
>>>>>>> sprint-3
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
<<<<<<< HEAD
        { type: "p", className: "comments__text", content: "text" },
=======
        { type: "p", className: "comments__text", content: "comment" },
        {
          type: "button",
          className: "comments__delete",
          content: "Delete",
          attributes: { "data-id": "" },
        },
>>>>>>> sprint-3
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
<<<<<<< HEAD
  if (content)
    element.textContent =
      content === "timestamp"
        ? formatDate(data[content])
        : data[content] || content;

  for (const attr in attributes) {
    element.setAttribute(attr, attributes[attr]);
=======
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
>>>>>>> sprint-3
  }

  children.forEach((child) => {
    element.appendChild(createComment(child, data));
  });

  return element;
}

<<<<<<< HEAD
function renderComments(comments, schema) {
  const region = document.querySelector(".comments__list");
  region.innerHTML = ""; // Clear existing comments
  comments.forEach((comment) => {
    const commentElement = createComment(schema, comment);
=======
function renderComments(comments, template) {
  const region = document.querySelector(".comments__list");
  region.innerHTML = "";
  comments.forEach((comment) => {
    const commentElement = createComment(template, comment);
>>>>>>> sprint-3
    const divider = document.createElement("hr");
    divider.classList.add("comments__divider");
    region.appendChild(commentElement);
    region.appendChild(divider); // Add the divider after each comment
  });
<<<<<<< HEAD
}

document.addEventListener("DOMContentLoaded", () => {
  renderComments(comments, commentSchema);
});

const commentForm = document.querySelector(".comments__form");
commentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const text = document.getElementById("comment").value;
  const timestamp = formatDate(new Date().toISOString());

  const newComment = { name, timestamp, text };
  comments.unshift(newComment);

  renderComments(comments, commentSchema);
=======

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
>>>>>>> sprint-3

  // CLEAR INPUT FIELDS
  document.getElementById("name").value = "";
  document.getElementById("comment").value = "";
});

<<<<<<< HEAD
function formatDate(date) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(date).toLocaleDateString("en-US", options);
=======
function formatDate(timestamp) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(timestamp).toLocaleDateString("en-US", options);
>>>>>>> sprint-3
}
