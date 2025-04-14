import { Chart } from "@/components/ui/chart"
import feather from "feather-icons" // Import feather-icons

document.addEventListener("DOMContentLoaded", () => {
  // Check if user is logged in as admin
  const isAdminLoggedIn = localStorage.getItem("adminLoggedIn") === "true"

  if (!isAdminLoggedIn && !window.location.href.includes("admin-login.html")) {
    // Redirect to admin login page if not logged in
    window.location.href = "admin-login.html"
    return
  }

  // Mobile sidebar toggle
  const menuToggle = document.getElementById("menu-toggle")
  const sidebarClose = document.getElementById("sidebar-close")
  const sidebar = document.querySelector(".sidebar")

  if (menuToggle && sidebarClose && sidebar) {
    menuToggle.addEventListener("click", () => {
      sidebar.classList.add("active")
    })

    sidebarClose.addEventListener("click", () => {
      sidebar.classList.remove("active")
    })

    // Close sidebar when clicking outside
    document.addEventListener("click", (event) => {
      if (sidebar.classList.contains("active") && !sidebar.contains(event.target) && event.target !== menuToggle) {
        sidebar.classList.remove("active")
      }
    })
  }

  // Admin menu navigation
  const menuItems = document.querySelectorAll(".menu-item a")

  menuItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      // Only prevent default if it's a hash link
      if (this.getAttribute("href").startsWith("#")) {
        e.preventDefault()

        // Remove active class from all menu items
        menuItems.forEach((mi) => mi.parentElement.classList.remove("active"))

        // Add active class to clicked menu item
        this.parentElement.classList.add("active")

        // Get the section ID from href
        const sectionId = this.getAttribute("href").substring(1)

        // Hide all content sections
        document.querySelectorAll(".content-section").forEach((section) => {
          section.style.display = "none"
        })

        // Show the selected section
        const selectedSection = document.getElementById(sectionId)
        if (selectedSection) {
          selectedSection.style.display = "block"
        } else {
          // If section doesn't exist yet, show a message
          showToast(`بخش ${sectionId} در حال توسعه است`)
        }
      }
    })
  })

  // Initialize charts
  initCharts()

  // Initialize feather icons
  if (typeof feather !== "undefined") {
    feather.replace()
  }
})

function initCharts() {
  // Sales Chart
  const salesChartCtx = document.getElementById("sales-chart")
  if (salesChartCtx) {
    const salesChart = new Chart(salesChartCtx, {
      type: "line",
      data: {
        labels: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"],
        datasets: [
          {
            label: "فروش (میلیون تومان)",
            data: [12, 19, 15, 17, 22, 25, 31, 28, 24, 19, 23, 28],
            borderColor: "#f97316",
            backgroundColor: "rgba(249, 115, 22, 0.1)",
            borderWidth: 2,
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: {
              font: {
                family: "Vazirmatn",
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              font: {
                family: "Vazirmatn",
              },
            },
          },
          x: {
            ticks: {
              font: {
                family: "Vazirmatn",
              },
            },
          },
        },
      },
    })
  }

  // Products Chart
  const productsChartCtx = document.getElementById("products-chart")
  if (productsChartCtx) {
    const productsChart = new Chart(productsChartCtx, {
      type: "doughnut",
      data: {
        labels: ["کباب مخصوص", "مرغ کاری", "سالاد الویه", "بستنی زعفرانی", "دوغ"],
        datasets: [
          {
            data: [35, 25, 15, 15, 10],
            backgroundColor: ["#f97316", "#3b82f6", "#22c55e", "#f59e0b", "#8b5cf6"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
            labels: {
              font: {
                family: "Vazirmatn",
              },
            },
          },
        },
      },
    })
  }
}

// Handle table actions
document.querySelectorAll(".action-button").forEach((button) => {
  button.addEventListener("click", function () {
    const action = this.classList.contains("view") ? "view" : this.classList.contains("edit") ? "edit" : "delete"

    const row = this.closest("tr")
    const orderId = row.querySelector("td:first-child").textContent

    // In a real application, these would trigger modals or navigate to other pages
    if (action === "view") {
      showToast(`مشاهده سفارش ${orderId}`)
    } else if (action === "edit") {
      showToast(`ویرایش سفارش ${orderId}`)
    } else if (action === "delete") {
      if (confirm(`آیا از حذف سفارش ${orderId} اطمینان دارید؟`)) {
        showToast(`سفارش ${orderId} حذف شد`)
      }
    }
  })
})

// Chart filter change handlers
document.querySelectorAll(".chart-select").forEach((select) => {
  select.addEventListener("change", function () {
    const chartId = this.closest(".chart-card").querySelector("canvas").id
    const period = this.value

    // In a real application, this would fetch new data and update the chart
    showToast(`فیلتر نمودار ${chartId} به ${period} تغییر کرد`)
  })
})

// Logout functionality
document.querySelector(".logout-button")?.addEventListener("click", (e) => {
  e.preventDefault()
  localStorage.removeItem("adminLoggedIn")
  window.location.href = "admin-login.html"
})

// Toast notification
function showToast(message) {
  // Create toast if it doesn't exist
  let toast = document.getElementById("toast-notification")

  if (!toast) {
    toast = document.createElement("div")
    toast.id = "toast-notification"
    toast.className = "toast-notification"
    document.body.appendChild(toast)

    // Add styles if not already in CSS
    const style = document.createElement("style")
    style.textContent = `
      .toast-notification {
        position: fixed;
        bottom: 20px;
        left: 20px;
        background-color: #f97316;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        transform: translateY(100px);
        opacity: 0;
        transition: transform 0.3s, opacity 0.3s;
      }
      .toast-notification.show {
        transform: translateY(0);
        opacity: 1;
      }
    `
    document.head.appendChild(style)
  }

  // Set message and show toast
  toast.textContent = message
  toast.classList.add("show")

  // Hide toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove("show")
  }, 3000)
}
