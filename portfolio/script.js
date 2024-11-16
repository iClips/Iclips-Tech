document.addEventListener("DOMContentLoaded", function() {
  const cardContainers = document.querySelectorAll(".card-container");

  cardContainers.forEach(container => {
    container.addEventListener("click", function() {
      this.classList.toggle("flipped");
    });
  });
});