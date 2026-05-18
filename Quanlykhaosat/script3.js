const data = [
    {
        title: "Khảo sát đánh giá chất lượng giảng dạy",
        desc: "Khảo sát đánh giá chất lượng giảng dạy môn học",
        type: "Nội bộ",
        status: "Hoạt động",
        questions: [
            "Giảng viên truyền đạt kiến thức rõ ràng, dễ hiểu",
            "Nội dung bài giảng phù hợp với mục tiêu môn học",
            "Giảng viên nhiệt tình, tận tâm trong giảng dạy"
        ],
        link: null
    },
    {
        title: "Khảo sát cơ sở vật chất",
        desc: "Khảo sát đánh giá cơ sở vật chất phục vụ học tập",
        type: "Google Form",
        status: "Không hoạt động",
        questions: [],
        link: "https://forms.gle/example123"
    }
];


// ================= RENDER =================
function render() {
    const list = document.getElementById("list");
    document.getElementById("total").innerText = data.length;

    list.innerHTML = "";

    data.forEach((s, i) => {
        const statusClass = s.status === "Hoạt động" ? "tag-green" : "tag-gray";

        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <div>
                <div class="title">
                    ${s.title}
                    <span class="tag tag-blue">${s.type}</span>
                    <span class="tag ${statusClass}">${s.status}</span>
                </div>

                <div class="desc">${s.desc}</div>

                ${s.type === "Nội bộ" && s.questions.length
                ? `<div class="small">${s.questions.length} câu hỏi</div>`
                : ""}

                ${s.type === "Google Form" && s.link
                ? `<a href="${s.link}" target="_blank" class="link">${s.link}</a>`
                : ""}
            </div>

            <div class="actions">
                <span class="icon" onclick="view(${i})">👁</span>
                <span class="icon" onclick="edit(${i})">✏️</span>
                <button class="btn-gan" onclick="openAssign(${i})">Gán</button>
                <span class="icon" onclick="removeItem(${i})">🗑</span>
            </div>
        `;

        list.appendChild(div);
    });
}


// ================= VIEW =================
function view(i) {
    const s = data[i];

    let html = `
        <p><b>Tiêu đề</b></p>
        <p>${s.title}</p>

        <p><b>Mô tả</b></p>
        <p>${s.desc}</p>

        <p><b>Loại</b></p>
        <span class="tag tag-blue">${s.type}</span>

        <p><b>Trạng thái</b></p>
        <span class="tag">${s.status}</span>
    `;

    if (s.type === "Nội bộ") {
        html += `<p><b>Danh sách câu hỏi (${s.questions.length})</b></p>`;

        s.questions.forEach((q, index) => {
            html += `
                <div class="question">
                    ${index + 1}. ${q}
                    <div class="rating">Đánh giá (1-5)</div>
                </div>
            `;
        });
    } else {
        html += `
            <p><b>Link khảo sát</b></p>
            <a href="${s.link}" target="_blank">${s.link}</a>
        `;
    }

    document.getElementById("modalBody").innerHTML = html;

    document.querySelector(".btn-edit").onclick = function () {
        closeModal();
    };

    document.getElementById("modal").style.display = "block";
}


// ================= EDIT =================
function edit(i) {
    const s = data[i];

    let html = `
        <p><b>Tiêu đề</b></p>
        <input id="editTitle" value="${s.title}" class="input">

        <p><b>Mô tả</b></p>
        <textarea id="editDesc" class="input">${s.desc}</textarea>

        <p><b>Loại khảo sát</b></p>
        <select id="editType" class="input" onchange="toggleType()">
            <option value="Nội bộ" ${s.type === "Nội bộ" ? "selected" : ""}>Câu hỏi nội bộ</option>
            <option value="Google Form" ${s.type === "Google Form" ? "selected" : ""}>Google Form</option>
        </select>

        <p><b>Trạng thái</b></p>
        <select id="editStatus" class="input">
            <option value="Hoạt động" ${s.status === "Hoạt động" ? "selected" : ""}>Hoạt động</option>
            <option value="Không hoạt động" ${s.status === "Không hoạt động" ? "selected" : ""}>Không hoạt động</option>
        </select>

        <div id="internalBox">
            <p><b>Danh sách câu hỏi</b></p>
            <div id="questionList">
    `;

    if (s.type === "Nội bộ") {
        s.questions.forEach((q) => {
            html += `
                <div class="q-row">
                    <input class="input q-item" value="${q}" />
                    <button class="btn-delete" onclick="removeQuestion(this)">✖</button>
                </div>
            `;
        });
    }

    html += `
            </div>
            <button class="btn-add" onclick="addQuestion()">+ Thêm câu hỏi</button>
        </div>

        <div id="linkBox" style="display:none;">
            <p><b>Link Google Form</b></p>
            <input id="editLink" class="input" value="${s.link || ""}">
        </div>
    `;

    document.getElementById("modalBody").innerHTML = html;

    setTimeout(toggleType, 0);

    document.querySelector(".btn-edit").onclick = function () {
        saveEdit(i);
    };

    document.getElementById("modal").style.display = "block";
}


// ================= TOGGLE =================
function toggleType() {
    const type = document.getElementById("editType").value;

    document.getElementById("internalBox").style.display =
        type === "Nội bộ" ? "block" : "none";

    document.getElementById("linkBox").style.display =
        type === "Google Form" ? "block" : "none";
}


// ================= ADD QUESTION =================
function addQuestion() {
    const container = document.getElementById("questionList");

    const div = document.createElement("div");
    div.className = "q-row";

    div.innerHTML = `
        <input class="input q-item" placeholder="Nhập câu hỏi..." />
        <button class="btn-delete" onclick="removeQuestion(this)">✖</button>
    `;

    container.appendChild(div);
}


// ================= REMOVE QUESTION =================
function removeQuestion(btn) {
    btn.parentElement.remove();
}


// ================= SAVE =================
function saveEdit(i) {
    const title = document.getElementById("editTitle").value;
    const desc = document.getElementById("editDesc").value;
    const type = document.getElementById("editType").value;
    const status = document.getElementById("editStatus").value;

    data[i].title = title;
    data[i].desc = desc;
    data[i].type = type;
    data[i].status = status;

    if (type === "Nội bộ") {
        const qList = document.querySelectorAll(".q-item");

        let newQuestions = [];
        qList.forEach(q => {
            if (q.value.trim() !== "") {
                newQuestions.push(q.value);
            }
        });

        data[i].questions = newQuestions;
        data[i].link = null;
    } else {
        data[i].link = document.getElementById("editLink").value;
        data[i].questions = [];
    }

    closeModal();
    render();
}


// ================= DELETE =================
function removeItem(i) {
    if (confirm("Xóa khảo sát?")) {
        data.splice(i, 1);
        render();
    }
}


// ================= CLOSE =================
function closeModal() {
    document.getElementById("modal").style.display = "none";
}


// ===================================================
// ================= GÁN KHẢO SÁT =====================
// ===================================================
function openAssign(i) {

    // ✅ ĐỔI TIÊU ĐỀ TẠI ĐÂY
    document.querySelector(".modal-header h2").innerText = "Gán khảo sát";

    const html = `
        <label>Môn học *</label>
        <select id="subject" class="input">
            <option>Chọn môn học</option>
            <option>IT001 - Lập trình OOP</option>
            <option>IT002 - Cấu trúc dữ liệu</option>
        </select>

        <label>Học kỳ *</label>
        <select id="semester" class="input">
            <option>Chọn học kỳ</option>
            <option>HK1 2025</option>
            <option>HK2 2025</option>
        </select>

        <div style="display:flex; gap:20px; margin-top:15px;">
            <div style="flex:1;">
                <label>Ngày bắt đầu *</label>
                <input type="date" id="start" class="input">
            </div>

            <div style="flex:1;">
                <label>Ngày kết thúc *</label>
                <input type="date" id="end" class="input">
            </div>
        </div>
    `;

    document.getElementById("modalBody").innerHTML = html;

    document.querySelector(".btn-edit").innerText = "Gán";
    document.querySelector(".btn-edit").onclick = function () {
        assignSurvey(i);
    };

    document.getElementById("modal").style.display = "block";
}
// ================= OPEN CREATE =================
document.querySelector(".btn-create").onclick = function () {
    document.getElementById("createModal").style.display = "block";
};

// ================= CLOSE =================
function closeCreate() {
    document.getElementById("createModal").style.display = "none";
}

// ================= TOGGLE TYPE =================
function toggleCreateType() {
    const type = document.querySelector('input[name="ctype"]:checked').value;

    document.getElementById("cInternal").style.display =
        type === "Nội bộ" ? "block" : "none";

    document.getElementById("cLinkBox").style.display =
        type === "Google Form" ? "block" : "none";
}

// ================= ADD QUESTION =================
function addCreateQuestion() {
    const input = document.getElementById("cQuestionInput");

    if (!input.value.trim()) return;

    const div = document.createElement("div");
    div.className = "question";

    div.innerHTML = `
        ${input.value}
        <button class="btn-delete" onclick="this.parentElement.remove()">✖</button>
    `;

    document.getElementById("cQuestionList").appendChild(div);

    input.value = "";
}

// ================= CREATE =================
function createSurvey() {
    const title = document.getElementById("cTitle").value;
    const desc = document.getElementById("cDesc").value;
    const type = document.querySelector('input[name="ctype"]:checked').value;
    const status = document.querySelector('input[name="cstatus"]:checked').value;

    if (!title || !desc) {
        alert("Vui lòng nhập đầy đủ!");
        return;
    }

    let newSurvey = {
        title,
        desc,
        type,
        status,
        questions: [],
        link: null
    };

    if (type === "Nội bộ") {
        const qList = document.querySelectorAll("#cQuestionList .question");

        qList.forEach(q => {
            newSurvey.questions.push(q.innerText.replace("✖", "").trim());
        });

    } else {
        const link = document.getElementById("cLink").value;

        if (!link) {
            alert("Nhập link!");
            return;
        }

        newSurvey.link = link;
    }

    data.push(newSurvey);

    closeCreate();
    render();
}

function assignSurvey(i) {
    const subject = document.getElementById("subject").value;
    const semester = document.getElementById("semester").value;
    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;

    if (!start || !end) {
        alert("Vui lòng nhập đầy đủ!");
        return;
    }

    alert("✅ Gán khảo sát thành công!");
    closeModal();
}


// ================= INIT =================
render();