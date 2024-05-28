function createShow({ date, place, location }) {
  const showDiv = document.createElement("div");
  showDiv.classList.add("show");

  // MOBILE ADD SHOW HERE
  const dateLabel = document.createElement("p");
  dateLabel.classList.add("show__label");
  dateLabel.textContent = "Date";
  showDiv.appendChild(dateLabel);

  const dateP = document.createElement("p");
  dateP.classList.add("show__date");
  dateP.textContent = new Date(date).toLocaleDateString();
  showDiv.appendChild(dateP);

  // MOBILE ADD VENUE HERE
  const venueLabel = document.createElement("p");
  venueLabel.classList.add("show__label");
  venueLabel.textContent = "Venue";
  showDiv.appendChild(venueLabel);

  const venueP = document.createElement("p");
  venueP.classList.add("show__venue");
  venueP.textContent = place;
  showDiv.appendChild(venueP);

  // MOBILE ADD LOCATION HERE
  const locationLabel = document.createElement("p");
  locationLabel.classList.add("show__label");
  locationLabel.textContent = "Location";
  showDiv.appendChild(locationLabel);

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
    document.querySelectorAll(".show__container").forEach((container) => {
      container.classList.remove("show--selected");
    });
    showContainer.classList.add("show--selected");
  });

  return showContainer;
}

async function renderShows() {
  const showsList = document.querySelector(".shows__list");
  showsList.innerHTML = ""; // Clear existing shows

  const labels = createShowLabels();
  showsList.appendChild(labels);

  try {
    const shows = await bandSiteApi.getShows();
    shows.forEach((show) => {
      showsList.appendChild(createShow(show));
    });
  } catch (error) {
    console.error("Error fetching shows:", error);
  }
}

function createShowLabels() {
  const labelsDiv = document.createElement("div");
  labelsDiv.classList.add("show__labels");

  const dateLabel = document.createElement("p");
  dateLabel.classList.add("show__label--tablet");
  dateLabel.textContent = "Date";
  labelsDiv.appendChild(dateLabel);

  const venueLabel = document.createElement("p");
  venueLabel.classList.add("show__label--tablet");
  venueLabel.textContent = "Venue";
  labelsDiv.appendChild(venueLabel);

  const locationLabel = document.createElement("p");
  locationLabel.classList.add("show__label--tablet");
  locationLabel.textContent = "Location";
  labelsDiv.appendChild(locationLabel);

  return labelsDiv;
}

renderShows();
