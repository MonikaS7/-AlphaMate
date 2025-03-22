// script.js

document.addEventListener("DOMContentLoaded", () => {
  // Sidebar navigation
  const sidebarItems = document.querySelectorAll(".sidebar-nav li");
  sidebarItems.forEach((item) => {
    item.addEventListener("click", () => {
      sidebarItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");

      // Handle navigation
      const section = item.querySelector("span").textContent.toLowerCase();
      console.log(`Navigating to: ${section}`);
      // Add your navigation logic here
    });
  });

  // Category buttons
  const buttons = document.querySelectorAll(".categories button");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.textContent.toLowerCase();
      console.log(`Category selected: ${category}`);
      // Add your category filtering logic here
    });
  });

  // Card interactions
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    const playBtn = card.querySelector(".play-btn");
    const bookmarkBtn = card.querySelector(".bookmark-btn");
    const title = card.querySelector("h3").textContent;

    playBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      console.log(`Starting course: ${title}`);
      // Add your course start logic here
      // This could open a new page or modal with the course content
    });

    bookmarkBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      bookmarkBtn.classList.toggle("active");
      const icon = bookmarkBtn.querySelector("i");
      icon.classList.toggle("far");
      icon.classList.toggle("fas");
      console.log(`Bookmarked course: ${title}`);
      // Add your bookmark logic here
    });

    card.addEventListener("click", () => {
      console.log(`Selected course: ${title}`);
      // Add your course selection logic here
      // This could show course details or open a course preview
    });
  });

  // Search functionality with debounce
  const searchInput = document.querySelector(".search-bar input");
  let searchTimeout;

  searchInput.addEventListener("input", (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const searchTerm = e.target.value.toLowerCase();
      console.log(`Searching for: ${searchTerm}`);
      // Add your search logic here
      // This could filter courses or make an API call
    }, 300);
  });

  // Notification button
  const notificationBtn = document.querySelector(".notification-btn");
  notificationBtn.addEventListener("click", () => {
    console.log("Notifications clicked");
    // Add your notification panel logic here
    // This could show a dropdown with notifications
  });

  // Add keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    // Search shortcut (Ctrl/Cmd + K)
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      searchInput.focus();
    }
  });
});