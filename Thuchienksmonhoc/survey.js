const subjects = [
    {
        name: "IT001 - Lập trình căn bản",
        teacher: "TS. Nguyễn Văn A",
        credit: 3
    },
    {
        name: "IT002 - Cấu trúc dữ liệu",
        teacher: "PGS. Trần Thị B",
        credit: 4
    }
];

const questions = [
    "Giảng viên truyền đạt kiến thức rõ ràng, dễ hiểu",
    "Nội dung bài giảng phù hợp với mục tiêu môn học",
    "Giảng viên nhiệt tình, tận tâm trong giảng dạy",
    "Tài liệu học tập đầy đủ và chất lượng",
    "Phương pháp giảng dạy hiệu quả"
];

// render subjects
function renderSubjects() {
    const list = document.getElementById("subjectList");

    subjects.forEach((s, i) => {
        const div = document.createElement("div");
        div.className = "subject";

        div.innerHTML = `
            <b>${s.name}</b><br>
            <small>Giảng viên: ${s.teacher} | ${s.credit} tín chỉ</small>
        `;

        div.onclick = () => selectSubject(div);

        list.appendChild(div);
    });
}

function selectSubject(el) {
    document.querySelectorAll(".subject").forEach(s => s.classList.remove("active"));
    el.classList.add("active");

    document.getElementById("surveyBox").style.display = "block";
    renderQuestions();
}

// render questions
function renderQuestions() {
    const box = document.getElementById("questionList");
    box.innerHTML = "";

    questions.forEach((q, i) => {
        const div = document.createElement("div");
        div.className = "q-item";

        div.innerHTML = `
            <b>${i + 1}. ${q} *</b>
            <div class="stars">
                ${[1, 2, 3, 4, 5].map(n => `
                    <div class="star" onclick="rate(this, ${i}, ${n})">${n}</div>
                `).join("")}
            </div>
        `;

        box.appendChild(div);
    });
}

const answers = {};

function rate(el, qIndex, value) {
    const stars = el.parentElement.querySelectorAll(".star");
    stars.forEach(s => s.classList.remove("active"));

    el.classList.add("active");
    answers[qIndex] = value;
}

// textarea count
document.addEventListener("input", () => {
    const txt = document.getElementById("comment");
    document.getElementById("count").innerText =
        txt.value.length + "/500 ký tự";
});

// submit
function submitSurvey() {
    if (Object.keys(answers).length < questions.length) {
        alert("Vui lòng đánh giá hết câu hỏi!");
        return;
    }

    alert("Gửi khảo sát thành công!");
}

renderSubjects();