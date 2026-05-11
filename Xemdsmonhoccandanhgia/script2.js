const courses = [
    { code: "IT002", name: "Cơ sở dữ liệu", teacher: "PGS. Trần Thị B", credit: 3, status: "pending" },
    { code: "IT005", name: "Kỹ thuật phần mềm", teacher: "TS. Hoàng Văn E", credit: 3, status: "done" },
    { code: "IT001", name: "Lập trình hướng đối tượng", teacher: "TS. Nguyễn Văn A", credit: 4, status: "pending" },
    { code: "IT003", name: "Mạng máy tính", teacher: "TS. Lê Văn C", credit: 3, status: "done" },
    { code: "IT004", name: "Trí tuệ nhân tạo", teacher: "GS. Phạm Thị D", credit: 4, status: "pending" }
];

let currentFilter = "all";

/* ================== RENDER ================== */
function render() {
    const body = document.getElementById("tableBody");
    const keyword = document.getElementById("searchInput").value.toLowerCase();
    const sort = document.getElementById("sortSelect").value;

    let data = courses.filter(c => {
        return (currentFilter === "all" || c.status === currentFilter)
            && (c.name.toLowerCase().includes(keyword) || c.code.toLowerCase().includes(keyword));
    });

    // sort
    data.sort((a, b) => {
        if (sort === "name") return a.name.localeCompare(b.name);
        if (sort === "code") return a.code.localeCompare(b.code);
        if (sort === "status") return a.status.localeCompare(b.status);
    });

    body.innerHTML = "";

    data.forEach((c, index) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${c.code}</td>
            <td>${c.name}</td>
            <td>${c.teacher}</td>
            <td>${c.credit}</td>
            <td class="${c.status === "done" ? "status-done" : "status-pending"}">
                ${c.status === "done" ? "✔ Đã gửi" : "⏳ Chưa gửi"}
            </td>

            <td>
    <div class="actions">
        ${c.status === "done"
                ? `<button class="btn btn-green">Xem kết quả</button>`
                : `<button class="btn btn-blue">Thực hiện</button>`
            }

        <button class="icon-btn">👁</button>

        <div class="menu-wrapper">
            <button class="icon-btn more-btn" onclick="toggleMenu(event, ${index})">⋮</button>

            <div class="dropdown-menu" id="menu-${index}">
                <div>📄 Xem chi tiết môn học</div>
                <div>👨‍🏫 Thông tin giảng viên</div>
                <div>🕒 Lịch sử khảo sát</div>
            </div>
        </div>
    </div>
</td>
        `;

        body.appendChild(tr);
    });

    updateStats();
}

/* ================== STATS ================== */
function updateStats() {
    const total = courses.length;
    const done = courses.filter(c => c.status === "done").length;
    const percent = Math.round((done / total) * 100);

    document.getElementById("total").innerText = total;
    document.getElementById("done").innerText = done;
    document.getElementById("pending").innerText = total - done;

    document.getElementById("progressText").innerText = `Tiến độ khảo sát: ${done}/${total} môn`;
    document.getElementById("progressPercent").innerText = percent + "%";
    document.getElementById("progress").style.width = percent + "%";
}

/* ================== FILTER ================== */
function filterCourses(type) {
    currentFilter = type;
    render();
}

/* ================== MENU ================== */
function toggleMenu(event, index) {
    event.stopPropagation();

    const menu = document.getElementById(`menu-${index}`);
    const isOpen = menu.style.display === "block";

    // đóng hết
    document.querySelectorAll(".dropdown-menu").forEach(m => {
        m.style.display = "none";
    });

    // mở lại nếu trước đó đang đóng
    if (!isOpen) {
        menu.style.display = "block";
    }
}

// click ngoài -> đóng menu
document.addEventListener("click", function (e) {
    if (!e.target.closest(".menu-wrapper")) {
        document.querySelectorAll(".dropdown-menu").forEach(m => {
            m.style.display = "none";
        });
    }
});

/* ================== EVENT ================== */
document.getElementById("searchInput").addEventListener("input", render);
document.getElementById("sortSelect").addEventListener("change", render);

/* ================== INIT ================== */
render();