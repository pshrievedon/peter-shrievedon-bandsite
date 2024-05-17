const shows = [
  {
    date: "Mon Sept 09 2024",
    venue: "Ronald Lane",
    location: "San Francisco, CA",
  },
  {
    date: "Tue Sept 17 2024",
    venue: "Pier 3 East",
    location: "San Francisco, CA",
  },
  {
    date: "Sat Oct 12 2024",
    venue: "View Lounge",
    location: "San Francisco, CA",
  },
  {
    date: "Sat Nov 16 2024",
    venue: "Hyatt Agency",
    location: "San Francisco, CA",
  },
  {
    date: "Fri Nov 29 2024",
    venue: "Moscow Center",
    location: "San Francisco, CA",
  },
  {
    date: "Wed Dec 18 2024",
    venue: "Press Club",
    location: "San Francisco, CA",
  },
];

function createShow({ date, venue, location }) {
  const showDiv = document.createElement("div");
  showDiv.classList.add("show");

  if (window.innerWidth < 768) {
    // MOBILE ADD SHOW HERE
    const dateLabel = document.createElement("p");
    dateLabel.classList.add("show__label");
    dateLabel.textContent = "Date";
    showDiv.appendChild(dateLabel);
  }

  const dateP = document.createElement("p");
  dateP.classList.add("show__date");
  dateP.textContent = date;
  showDiv.appendChild(dateP);

  if (window.innerWidth < 768) {
    // MOBILE ADD VENUE HERE
    const venueLabel = document.createElement("p");
    venueLabel.classList.add("show__label");
    venueLabel.textContent = "Venue";
    showDiv.appendChild(venueLabel);
  }

  const venueP = document.createElement("p");
  venueP.classList.add("show__venue");
  venueP.textContent = venue;
  showDiv.appendChild(venueP);

  if (window.innerWidth < 768) {
    // MOBILE ADD LOCATION HERE
    const locationLabel = document.createElement("p");
    locationLabel.classList.add("show__label");
    locationLabel.textContent = "Location";
    showDiv.appendChild(locationLabel);
  }

  const locationP = document.createElement("p");
  locationP.classList.add("show__location");
  locationP.textContent = location;
  showDiv.appendChild(locationP);

  const button = document.createElement("button");
  button.classList.add("show__button");
  button.textContent = "BUY TICKETS";
  showDiv.appendChild(button);

  const divider = document.createElement("hr");
  divider.classList.add("show__divider");

  const showContainer = document.createElement("div");
  showContainer.classList.add("show__container");
  showContainer.appendChild(showDiv);
  showContainer.appendChild(divider);

  showContainer.addEventListener("click", () => {
    document
      .querySelectorAll(".show__container")
      .forEach((container) => container.classList.remove("show--selected"));
    showContainer.classList.add("show--selected");
  });

  return showContainer;
}

function renderShows(shows) {
  const showsList = document.querySelector(".shows__list");
  shows.forEach((show) => {
    showsList.appendChild(createShow(show));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderShows(shows);
});
