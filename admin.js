import { Chart } from "@/components/ui/chart"
document.addEventListener("DOMContentLoaded", () => {
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
      alert(`مشاهده سفارش ${orderId}`)
    } else if (action === "edit") {
      alert(`ویرایش سفارش ${orderId}`)
    } else if (action === "delete") {
      if (confirm(`آیا از حذف سفارش ${orderId} اطمینان دارید؟`)) {
        alert(`سفارش ${orderId} حذف شد`)
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
    alert(`فیلتر نمودار ${chartId} به ${period} تغییر کرد`)
  })
})
