const courses = [
    {
        code: "IT001",
        name: "Lập trình OOP",
        teacher: "Nguyễn Văn A",
        status: "pending",
        deadline: "2026-04-15",
        submittedAt: null
    },
    {
        code: "IT002",
        name: "Cơ sở dữ liệu",
        teacher: "Trần Thị B",
        status: "done",
        deadline: "2026-04-15",
        submittedAt: "2026-03-10 14:30"
    },
    {
        code: "IT003",
        name: "Mạng máy tính",
        teacher: "Lê Văn C",
        status: "done",
        deadline: "2026-04-15",
        submittedAt: "2026-04-20 10:20"
    },
    {
        code: "IT004",
        name: "Trí tuệ nhân tạo",
        teacher: "Phạm Văn D",
        status: "pending",
        deadline: "2026-04-20",
        submittedAt: null
    },
    {
        code: "IT005",
        name: "Hệ điều hành",
        teacher: "Nguyễn Thị E",
        status: "done",
        deadline: "2026-04-18",
        submittedAt: "2026-04-10 09:00"
    }
];

let currentFilter = "all";

// tính số ngày còn lại
function daysLeft(deadline) {
    const now = new Date();
    const end = new Date(deadline);
    return Math.ceil((end - now) / (1000 * 60 * 60 * 24));
}

// tính sớm / trễ
function getSubmitStatus(submittedAt, deadline) {
    const submitDate = new Date(submittedAt);
    const deadlineDate = new Date(deadline);

    const diff = Math.ceil((deadlineDate - submitDate) / (1000 * 60 * 60 * 24));

    if (diff > 0) {
        return `<span style="color:green">✔ Sớm ${diff} ngày</span>`;
    } else if (diff === 0) {
        return `<span style="color:green">✔ Đúng hạn</span>`;
    } else {
        return `<span style="color:red">⚠ Trễ ${Math.abs(diff)} ngày</span>`;
    }
}

function renderCourses() {
    const container = document.getElementById("courseList");
    const keyword = document.getElementById("searchInput").value.toLowerCase();

    let filtered = courses.filter(c => {
        const matchSearch =
            c.name.toLowerCase().includes(keyword) ||
            c.code.toLowerCase().includes(keyword);

        const matchFilter =
            currentFilter === "all" || c.status === currentFilter;

        return matchSearch && matchFilter;
    });

    container.innerHTML = "";

    filtered.forEach(c => {
        const div = document.createElement("div");
        div.className = "course";

        let deadlineText = "";

        if (c.status === "done") {
            deadlineText = getSubmitStatus(c.submittedAt, c.deadline);
        } else {
            const days = daysLeft(c.deadline);

            if (days < 0) {
                deadlineText = `<span style="color:red">⚠ Quá hạn ${Math.abs(days)} ngày</span>`;
            } else if (days <= 2) {
                deadlineText = `<span style="color:orange">🔥 Gấp (${days} ngày)</span>`;
            } else {
                deadlineText = `<span style="color:gray">Còn ${days} ngày</span>`;
            }
        }

        div.innerHTML = `
        <div>
            <p><b>${c.code}</b></p>
            <p><b>${c.name}</b></p>
            <p>GV: ${c.teacher}</p>
            <p>⏰ Hạn: ${c.deadline}</p>
            <p>${deadlineText}</p>
            ${c.status === "done"
                ? `<p>📅 Ngày gửi: ${c.submittedAt}</p>`
                : ""
            }
        </div>

        <div class="actions">
            ${c.status === "done"
                ? `
                <span class="tag tag-green">✔ Đã gửi</span>
                <button class="btn btn-blue" onclick="openDetail(${courses.indexOf(c)})">Chi tiết</button>
<button class="btn btn-gray" onclick="openEdit(${courses.indexOf(c)})">Sửa</button>
              `
                : `
                <span class="tag tag-red">⏳ Chưa gửi</span>
                <button class="btn" style="background:red;color:white;">Thực hiện</button>
              `
            }
        </div>
        `;

        container.appendChild(div);
    });
}

function filterCourses(type) {
    currentFilter = type;
    renderCourses();
}

// search realtime
document.getElementById("searchInput").addEventListener("input", renderCourses);

// load lần đầu
renderCourses();
let currentIndex = null;
function openDetail(index) {
    const c = courses[index];

    document.getElementById("modalTitle").innerText = c.name;
    document.getElementById("modalContent").innerHTML = `
        <p>Mã: ${c.code}</p>
        <p>GV: ${c.teacher}</p>
        <p>Hạn: ${c.deadline}</p>
        ${c.submittedAt ? `<p>Ngày gửi: ${c.submittedAt}</p>` : ""}
    `;

    document.getElementById("editBox").style.display = "none";
    document.getElementById("modal").style.display = "block";
}

function openEdit(index) {
    const c = courses[index];
    currentIndex = index;

    document.getElementById("modalTitle").innerText = "Sửa môn";
    document.getElementById("modalContent").innerHTML = "";

    document.getElementById("editBox").style.display = "block";
    document.getElementById("editName").value = c.name;
    document.getElementById("editTeacher").value = c.teacher;

    document.getElementById("modal").style.display = "block";
}

function saveEdit() {
    courses[currentIndex].name = document.getElementById("editName").value;
    courses[currentIndex].teacher = document.getElementById("editTeacher").value;

    closeModal();
    renderCourses();
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}