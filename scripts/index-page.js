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
  type: "div",
  className: "comments__item",
  children: [
    {
      type: "img",
      className: "comments__avatar",
      content: "",
      attributes: { src: "./assets/images/avatar1.jpg", alt: "Avatar" },
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
        { type: "p", className: "comments__text", content: "text" },
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
  if (content)
    element.textContent =
      content === "timestamp"
        ? formatDate(data[content])
        : data[content] || content;

  // Set attributes
  for (const attr in attributes) {
    element.setAttribute(attr, attributes[attr]);
  }

  children.forEach((child) => {
    element.appendChild(createComment(child, data));
  });

  return element;
}

function renderComments(comments, schema) {
  const region = document.querySelector(".comments__list");
  region.innerHTML = ""; // Clear existing comments
  comments.forEach((comment) => {
    region.appendChild(createComment(schema, comment));
  });
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

  // Re-render comments
  renderComments(comments, commentSchema);

  // Clear input fields
  document.getElementById("name").value = "";
  document.getElementById("comment").value = "";
});

function formatDate(date) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(date).toLocaleDateString("en-US", options);
}
