// Giả sử tasks là mảng chứa các công việc
var tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask() {
  var taskInput = document.getElementById("taskInput");
  var taskDateTime = document.getElementById("taskDateTime");
  var taskList = document.getElementById("taskList");

  if (taskInput.value.trim() !== "" && taskDateTime.value.trim() !== "") {
    // Tạo đối tượng công việc mới với trạng thái thông báo là false
    var newTask = {
      text: taskInput.value,
      datetime: taskDateTime.value, // lưu dưới dạng chuỗi ISO
      notified: false, // chưa thông báo
    };

    // Thêm vào mảng tasks và lưu vào localStorage
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Hiển thị công việc lên giao diện (đoạn code hiển thị đã có sẵn)
    var li = document.createElement("li");
    li.innerHTML = `
          <div>
              <span><strong class="task-text">${newTask.text}</strong></span>
              <br>
              <small class="task-date">${new Date(
                newTask.datetime
              ).toLocaleString()}</small>
          </div>
          <div class="btn-group">
              <button onclick="editTask(this)" class="icon-btn">
                  <i class="fa-solid fa-pen"></i>
              </button>
              <button onclick="removeTask(this)" class="icon-btn">
                  <i class="fa-solid fa-trash"></i>
              </button>
          </div>
      `;
    taskList.appendChild(li);
    taskInput.value = "";
    taskDateTime.value = "";

    // Đóng modal sau khi thêm công việc
    var closeButton = document.querySelector("#taskModal .btn-close");
    closeButton.click();
  } else {
    alert("Vui lòng nhập đầy đủ thông tin công việc và ngày giờ!");
  }
}

function editTask(button) {
  // Lấy phần tử <li> chứa công việc
  var li = button.closest("li");
  if (!li) return;

  var taskTextElement = li.querySelector(".task-text");
  var taskDateElement = li.querySelector(".task-date");

  // Ẩn phần hiển thị nội dung ban đầu
  taskTextElement.style.display = "none";
  taskDateElement.style.display = "none";

  // Tạo container cho các trường chỉnh sửa theo hàng ngang
  var editContainer = document.createElement("div");
  editContainer.className = "edit-container";

  // Tạo trường nhập liệu cho nội dung công việc
  var textInput = document.createElement("input");
  textInput.type = "text";
  textInput.className = "form-control edit-task-input";
  textInput.value = taskTextElement.textContent;

  // Tạo trường nhập liệu cho ngày giờ
  var dateInput = document.createElement("input");
  dateInput.type = "datetime-local";
  dateInput.className = "form-control edit-date-input";
  // Nếu cần chuyển đổi giá trị hiện tại sang định dạng datetime-local thì xử lý thêm

  // Thêm các input vào container
  editContainer.appendChild(textInput);
  editContainer.appendChild(dateInput);

  // Chèn container chỉnh sửa sau phần tử hiển thị ban đầu
  taskTextElement.parentNode.insertBefore(
    editContainer,
    taskTextElement.nextSibling
  );

  // Lấy nhóm nút hiện tại và thay thế nội dung bằng nút Lưu & Thoát dạng text
  var btnGroup = li.querySelector(".btn-group");
  btnGroup.innerHTML = "";

  // Tạo nút Lưu (Save)
  var saveBtn = document.createElement("button");
  // Gán lớp tùy chỉnh btn-save để có nền đỏ, viền và màu chữ trắng
  saveBtn.className = "btn btn-sm btn-save me-2";
  saveBtn.textContent = "Lưu";
  saveBtn.onclick = function () {
    // Cập nhật nội dung nếu có giá trị hợp lệ
    if (textInput.value.trim() !== "") {
      taskTextElement.textContent = textInput.value;
    }
    if (dateInput.value.trim() !== "") {
      taskDateElement.textContent = new Date(dateInput.value).toLocaleString();
    }
    // Xóa container chỉnh sửa
    editContainer.remove();
    // Hiển thị lại phần nội dung ban đầu
    taskTextElement.style.display = "";
    taskDateElement.style.display = "";
    // Khôi phục lại nhóm nút gốc (nút Chỉnh sửa & Xóa)
    btnGroup.innerHTML = `
      <button onclick="editTask(this)" class="icon-btn">
          <i class="fa-solid fa-pen"></i>
      </button>
      <button onclick="removeTask(this)" class="icon-btn">
          <i class="fa-solid fa-trash"></i>
      </button>
    `;
  };

  // Tạo nút Thoát (Cancel)
  var cancelBtn = document.createElement("button");
  // Gán lớp tùy chỉnh btn-cancel để có nền trắng, viền và màu chữ đen
  cancelBtn.className = "btn btn-sm btn-cancel";
  cancelBtn.textContent = "Thoát";
  cancelBtn.onclick = function () {
    // Hủy chỉnh sửa: xóa container chỉnh sửa và hiển thị lại phần cũ
    editContainer.remove();
    taskTextElement.style.display = "";
    taskDateElement.style.display = "";
    // Khôi phục lại nhóm nút gốc
    btnGroup.innerHTML = `
      <button onclick="editTask(this)" class="icon-btn">
          <i class="fa-solid fa-pen"></i>
      </button>
      <button onclick="removeTask(this)" class="icon-btn">
          <i class="fa-solid fa-trash"></i>
      </button>
    `;
  };

  // Thêm nút Lưu và Thoát vào nhóm nút
  btnGroup.appendChild(saveBtn);
  btnGroup.appendChild(cancelBtn);
}

function removeTask(button) {
  // Xóa phần tử <li> chứa công việc
  var li = button.closest("li");
  li.remove();
}

function saveTasksToFile() {
  // Giả sử tasks là mảng danh sách công việc đã lưu vào localStorage
  var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  // Chuyển đổi dữ liệu thành chuỗi JSON với định dạng đẹp
  var data = JSON.stringify(tasks, null, 2);

  // Tạo Blob từ dữ liệu JSON với kiểu MIME là application/json
  var blob = new Blob([data], { type: "application/json" });
  // Tạo URL cho Blob vừa tạo
  var url = URL.createObjectURL(blob);

  // Tạo thẻ <a> ẩn và thiết lập thuộc tính download
  var a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = "todolist.json"; // Tên file khi tải về

  // Thêm thẻ <a> vào DOM và kích hoạt sự kiện click
  document.body.appendChild(a);
  a.click();

  // Dọn dẹp: loại bỏ thẻ <a> và thu hồi URL của Blob
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function checkTaskNotifications() {
  var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  var now = new Date();
  console.log("Now:", now);

  tasks.forEach(function (task, index) {
    var taskTime = new Date(task.datetime);
    console.log(
      "Task:",
      task.text,
      "Time:",
      taskTime,
      "Notified:",
      task.notified
    );

    if (now >= taskTime && task.notified === false) {
      new Notification("Thông báo công việc", {
        body: task.text + " đã đến giờ!",
      });
      task.notified = true;
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function hienThiThongBao() {
    if (Notification.permission === 'granted') {
        var thongBao = new Notification('Tiêu đề thông báo', {
            body: 'Nội dung thông báo của bạn ở đây.',
            icon: 'duong_dan_den_icon.png' // Đường dẫn đến icon nếu cần
        });

        thongBao.onclick = function() {
            window.focus();
            this.close();
        };
    } else {
        console.log('Quyền thông báo chưa được cấp.');
    }
}

// Kiểm tra mỗi giây cho test (thay vì 60s)
setInterval(checkTaskNotifications, 1000);

// Yêu cầu quyền thông báo
// Kiểm tra xem trình duyệt có hỗ trợ Notifications API không
if ('Notification' in window) {
    // Yêu cầu quyền nếu chưa được cấp
    if (Notification.permission === 'default') {
        Notification.requestPermission().then(function(permission) {
            if (permission !== 'granted') {
                console.log('Người dùng từ chối nhận thông báo.');
            }
        });
    }
} else {
    console.log('Trình duyệt không hỗ trợ Notifications API.');
}

// Hàm kiểm tra thông báo (đã định nghĩa ở trên)
setInterval(checkTaskNotifications, 60000);
