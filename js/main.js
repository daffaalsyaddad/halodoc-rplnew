/* ========= User Auth Navbar Render ========= */
function renderUserInNavbar() {
  const userAuthSection = document.getElementById("userAuthSection");
  if (!userAuthSection) return;

  const user = getUser();

  if (user) {
    // User sudah login - tampilkan nama user
    userAuthSection.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="text-sm text-gray-700">Halo, <strong>${user.name}</strong></span>
        <a href="/pages/profile.html" class="px-4 py-2 rounded-xl border text-sm hover:bg-gray-50 transition-colors">Profile</a>
      </div>
    `;
  } else {
    // User belum login - tampilkan button masuk
    userAuthSection.innerHTML = `
      <a href="/pages/login.html" class="px-5 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
        Masuk
      </a>
    `;
  }
}

/* Panggil function ini di setiap halaman */
document.addEventListener("DOMContentLoaded", function () {
  renderUserInNavbar();
});

/* ========= Emergency Modal (homepage) ========= */
const fabEmergency = document.getElementById("fabEmergency");
const modalEmergency = document.getElementById("modalEmergency");
function toggleEmergency() {
  if (modalEmergency) modalEmergency.classList.toggle("hidden");
}
if (fabEmergency) fabEmergency.addEventListener("click", toggleEmergency);
document
  .querySelectorAll("[data-close-emergency]")
  ?.forEach((el) => el.addEventListener("click", toggleEmergency));

/* ========= Toast util ========= */
function showToast(msg = "Berhasil", ms = 1800) {
  const t = document.createElement("div");
  t.className =
    "fixed left-1/2 -translate-x-1/2 bottom-6 z-[60] px-4 py-2 rounded-xl bg-gray-900 text-white text-sm shadow";
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => {
    t.classList.add("opacity-0", "transition");
  }, ms - 300);
  setTimeout(() => t.remove(), ms);
}

/* ========= Footer: tahun otomatis ========= */
(() => {
  const yn = document.getElementById("yearNow");
  if (yn) yn.textContent = new Date().getFullYear();
})();

/* ========= Active navbar highlight (kalau ada nav) ========= */
(function setActiveNav() {
  const path = location.pathname.replace(/\/index\.html$/, "/");
  document.querySelectorAll("header nav a").forEach((a) => {
    const href = new URL(a.href, location.origin).pathname;
    if (href === path) a.classList.add("text-pink-600", "font-semibold");
  });
})();

// Tambahkan di main.js atau sebelum </body>
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuButton = document.getElementById("mobileMenuButton");
  const mobileMenu = document.getElementById("mobileMenu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
      mobileMenu.classList.toggle("show");
    });
  }
});

/* ========= Auth (Login/Profile) ========= */
const USER_KEY = "hl_user";
function getUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY)) || null;
  } catch {
    return null;
  }
}
function setUser(u) {
  localStorage.setItem(USER_KEY, JSON.stringify(u));
}
function clearUser() {
  localStorage.removeItem(USER_KEY);
}

/* Page: login */
(function loginPage() {
  if (!document.body.matches('[data-page="login"]')) return;
  const form = document.getElementById("loginForm");
  const loginError = document.getElementById("loginError");
  const errorText = document.getElementById("errorText");

  // Tambahkan element error jika belum ada
  if (!loginError) {
    const errorDiv = document.createElement("div");
    errorDiv.id = "loginError";
    errorDiv.className =
      "hidden mt-4 p-3 rounded-xl bg-red-50 border border-red-200";
    errorDiv.innerHTML = '<p class="text-red-700 text-sm" id="errorText"></p>';
    form.parentNode.insertBefore(errorDiv, form.nextSibling);
  }

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    // Validasi credential khusus
    if (email === "daffaalsyaddad@gmail.com" && password === "pasien123") {
      setUser({
        name: "Daffa Al Syaddad",
        email: email,
        ts: Date.now(),
      });
      showToast("Login berhasil! Selamat datang Daffa");
      setTimeout(() => (location.href = "/"), 600);
    } else {
      // Login gagal
      errorText.textContent =
        "Email atau password salah. Gunakan akun demo yang tersedia.";
      loginError.classList.remove("hidden");
    }
  });
})();

/* Page: profile */
(function profilePage() {
  if (!document.body.matches('[data-page="profile"]')) return;
  const box = document.getElementById("profileBox");
  const u = getUser();
  if (!u) {
    box.innerHTML = `<p class="text-gray-600">Kamu belum login. <a class="text-pink-600 font-medium" href="/pages/login.html">Masuk sekarang</a>.</p>`;
    return;
  }
  box.innerHTML = `
    <div class="flex items-center gap-3">
      <div class="w-12 h-12 rounded-full bg-pink-100 grid place-items-center text-pink-700 font-bold">${
        u.name?.[0]?.toUpperCase() || "U"
      }</div>
      <div>
        <p class="font-semibold">${u.name}</p>
        <p class="text-sm text-gray-600">${u.email}</p>
      </div>
    </div>`;
  document.getElementById("logoutBtn")?.addEventListener("click", () => {
    clearUser();
    showToast("Logout");
    setTimeout(() => (location.href = "/"), 500);
  });
})();

/* ========= Doctor Authentication ========= */
const DOCTOR_KEY = "hl_doctor_session";
const DOCTOR_ACCOUNTS = [
  {
    email: "dokter.andi@halodoc.com",
    password: "dokter123",
    name: "dr. Andi, Sp.A",
    specialization: "Spesialis Anak",
    hospital: "RS Awal Bros Pekanbaru",
  },
  {
    email: "dokter.bella@halodoc.com",
    password: "dokter123",
    name: "dr. Bella, Sp.KK",
    specialization: "Spesialis Kulit & Kelamin",
    hospital: "RSUD Arifin Achmad",
  },
  {
    email: "dokter.citra@halodoc.com",
    password: "dokter123",
    name: "dr. Citra, Sp.M",
    specialization: "Spesialis Mata",
    hospital: "Klinik Utama Mandiri",
  },
];

function getDoctorSession() {
  try {
    return JSON.parse(localStorage.getItem(DOCTOR_KEY)) || null;
  } catch {
    return null;
  }
}

function setDoctorSession(doctor) {
  localStorage.setItem(
    DOCTOR_KEY,
    JSON.stringify({
      ...doctor,
      loginTime: new Date().toISOString(),
    })
  );
}

function clearDoctorSession() {
  localStorage.removeItem(DOCTOR_KEY);
}

/* Doctor Login Page */
(function doctorLoginPage() {
  if (!document.body.matches('[data-page="doctor-login"]')) return;

  const form = document.getElementById("doctorLoginForm");
  const loginError = document.getElementById("loginError");
  const errorText = document.getElementById("errorText");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("doctorEmail").value.trim();
    const password = document.getElementById("doctorPassword").value.trim();

    // Cari dokter dengan email & password yang cocok
    const doctor = DOCTOR_ACCOUNTS.find(
      (d) => d.email === email && d.password === password
    );

    if (doctor) {
      // Login berhasil
      setDoctorSession(doctor);
      showToast(`Selamat datang, ${doctor.name}`);
      setTimeout(() => {
        window.location.href = "/pages/doctor-dashboard.html";
      }, 1000);
    } else {
      // Login gagal
      errorText.textContent =
        "Email atau password salah. Gunakan akun demo yang tersedia.";
      loginError.classList.remove("hidden");
    }
  });
})();

/* Doctor Dashboard Security & Navbar */
(function doctorDashboardSecurity() {
  if (!document.body.matches('[data-page="doctor-dashboard"]')) return;

  const doctorSession = getDoctorSession();

  // Redirect jika belum login
  if (!doctorSession) {
    alert("Silakan login sebagai dokter terlebih dahulu.");
    window.location.href = "/pages/doctor-login.html";
    return;
  }

  // Update navbar info
  const doctorNameNav = document.getElementById("doctorNameNav");
  const doctorHospitalNav = document.getElementById("doctorHospitalNav");
  const mobileDoctorName = document.getElementById("mobileDoctorName");
  const mobileDoctorHospital = document.getElementById("mobileDoctorHospital");

  if (doctorNameNav) doctorNameNav.textContent = doctorSession.name;
  if (doctorHospitalNav) doctorHospitalNav.textContent = doctorSession.hospital;
  if (mobileDoctorName) mobileDoctorName.textContent = doctorSession.name;
  if (mobileDoctorHospital)
    mobileDoctorHospital.textContent = doctorSession.hospital;

  // Mobile menu handler untuk doctor
  const mobileMenuButtonDoctor = document.getElementById(
    "mobileMenuButtonDoctor"
  );
  const mobileMenuDoctor = document.getElementById("mobileMenuDoctor");

  if (mobileMenuButtonDoctor && mobileMenuDoctor) {
    mobileMenuButtonDoctor.addEventListener("click", function () {
      mobileMenuDoctor.classList.toggle("hidden");
      mobileMenuDoctor.classList.toggle("show");
    });
  }
})();

/* ========= Doctor Dashboard ========= */
(function doctorDashboardPage() {
  if (!document.body.matches('[data-page="doctor-dashboard"]')) return;

  const doctorSession = getDoctorSession();
  if (!doctorSession) return; // Sudah dihandle security

  // Elements
  const scheduleList = document.getElementById("scheduleList");
  const scheduleForm = document.getElementById("scheduleForm");
  const scheduleFormElement = document.getElementById("scheduleFormElement");
  const scheduleFormTitle = document.getElementById("scheduleFormTitle");
  const addScheduleBtn = document.getElementById("addScheduleBtn");
  const cancelSchedule = document.getElementById("cancelSchedule");
  const refreshSchedule = document.getElementById("refreshSchedule");
  const patientHistory = document.getElementById("patientHistory");
  const diagnosisForm = document.getElementById("diagnosisForm");
  const selectPatient = document.getElementById("selectPatient");
  const diagnosisSuccess = document.getElementById("diagnosisSuccess");
  const logoutBtn = document.getElementById("logoutBtn");

  // Data khusus dokter ini
  const doctorId = doctorSession.email;
  let doctorSchedules = JSON.parse(
    localStorage.getItem(`hl_doctor_schedules_${doctorId}`) || "[]"
  );
  let patientRecords = JSON.parse(
    localStorage.getItem(`hl_patient_records_${doctorId}`) || "[]"
  );

  const dummyPatients = [
    { id: 1, name: "Siti Nurhaliza", lastVisit: "2024-01-15" },
    { id: 2, name: "Budi Santoso", lastVisit: "2024-01-14" },
    { id: 3, name: "Ani Wijaya", lastVisit: "2024-01-13" },
    { id: 4, name: "Rina Melati", lastVisit: "2024-01-12" },
  ];

  let editingScheduleId = null;

  // Render jadwal
  function renderSchedules() {
    if (doctorSchedules.length === 0) {
      scheduleList.innerHTML = `
        <div class="text-center py-8 text-gray-500">
          <p>Belum ada jadwal praktik.</p>
          <p class="text-sm mt-1">Klik "Tambah Jadwal" untuk menambah jadwal.</p>
        </div>
      `;
      return;
    }

    scheduleList.innerHTML = doctorSchedules
      .map(
        (schedule) => `
      <div class="flex items-center justify-between p-3 rounded-xl border" data-schedule-id="${
        schedule.id
      }">
        <div class="flex-1">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
              <span class="text-pink-600 font-semibold">${schedule.day
                .charAt(0)
                .toUpperCase()}</span>
            </div>
            <div>
              <p class="font-semibold">${
                schedule.day.charAt(0).toUpperCase() + schedule.day.slice(1)
              }</p>
              <p class="text-sm text-gray-600">${schedule.startTime} - ${
          schedule.endTime
        }</p>
              <p class="text-xs text-gray-500">${schedule.location}</p>
            </div>
          </div>
        </div>
        <div class="flex gap-2">
          <button class="edit-schedule px-3 py-1 rounded-lg border text-xs" data-id="${
            schedule.id
          }">Edit</button>
          <button class="delete-schedule px-3 py-1 rounded-lg bg-red-100 text-red-600 text-xs" data-id="${
            schedule.id
          }">Hapus</button>
        </div>
      </div>
    `
      )
      .join("");
  }

  // Render riwayat pasien
  function renderPatientHistory() {
    if (patientRecords.length === 0) {
      patientHistory.innerHTML = `
        <div class="text-center py-8 text-gray-500">
          <p>Belum ada riwayat konsultasi.</p>
        </div>
      `;
      return;
    }

    patientHistory.innerHTML = patientRecords
      .map(
        (record) => `
      <div class="border-b pb-4 last:border-b-0 last:pb-0">
        <div class="flex items-start justify-between mb-2">
          <div>
            <p class="font-semibold">${record.patientName}</p>
            <p class="text-sm text-gray-600">${new Date(
              record.consultationDate
            ).toLocaleDateString("id-ID")}</p>
          </div>
          <span class="text-xs px-2 py-1 rounded-full bg-gray-100">Selesai</span>
        </div>
        <p class="text-sm text-gray-700 mb-1"><strong>Diagnosis:</strong> ${
          record.diagnosis
        }</p>
        <p class="text-sm text-gray-700"><strong>Resep:</strong> ${
          record.prescription
        }</p>
      </div>
    `
      )
      .join("");
  }

  // Populate patient dropdown
  function populatePatientDropdown() {
    selectPatient.innerHTML =
      '<option value="">Pilih Pasien</option>' +
      dummyPatients
        .map(
          (patient) => `<option value="${patient.id}">${patient.name}</option>`
        )
        .join("");
  }

  // Show schedule form
  function showScheduleForm(schedule = null) {
    editingScheduleId = schedule ? schedule.id : null;

    if (schedule) {
      scheduleFormTitle.textContent = "Edit Jadwal";
      document.getElementById("scheduleDay").value = schedule.day;
      document.getElementById("scheduleStart").value = schedule.startTime;
      document.getElementById("scheduleEnd").value = schedule.endTime;
      document.getElementById("scheduleLocation").value = schedule.location;
    } else {
      scheduleFormTitle.textContent = "Tambah Jadwal Baru";
      scheduleFormElement.reset();
    }

    scheduleForm.classList.remove("hidden");
  }

  // Hide schedule form
  function hideScheduleForm() {
    scheduleForm.classList.add("hidden");
    editingScheduleId = null;
  }

  // Event handlers
  addScheduleBtn.addEventListener("click", () => showScheduleForm());
  cancelSchedule.addEventListener("click", hideScheduleForm);

  refreshSchedule.addEventListener("click", () => {
    doctorSchedules = JSON.parse(
      localStorage.getItem(`hl_doctor_schedules_${doctorId}`) || "[]"
    );
    patientRecords = JSON.parse(
      localStorage.getItem(`hl_patient_records_${doctorId}`) || "[]"
    );
    renderSchedules();
    renderPatientHistory();
  });

  scheduleFormElement.addEventListener("submit", (e) => {
    e.preventDefault();

    const day = document.getElementById("scheduleDay").value;
    const startTime = document.getElementById("scheduleStart").value;
    const endTime = document.getElementById("scheduleEnd").value;
    const location = document.getElementById("scheduleLocation").value.trim();

    // Validasi
    if (!day || !startTime || !endTime || !location) {
      alert("Harap lengkapi semua field jadwal.");
      return;
    }

    if (startTime >= endTime) {
      alert("Jam selesai harus setelah jam mulai.");
      return;
    }

    // Cek bentrok jadwal
    const hasConflict = doctorSchedules.some(
      (schedule) =>
        schedule.id !== editingScheduleId &&
        schedule.day === day &&
        ((startTime >= schedule.startTime && startTime < schedule.endTime) ||
          (endTime > schedule.startTime && endTime <= schedule.endTime) ||
          (startTime <= schedule.startTime && endTime >= schedule.endTime))
    );

    if (hasConflict) {
      alert(
        "Jadwal bentrok dengan jadwal lain. Silakan pilih waktu yang berbeda."
      );
      return;
    }

    const scheduleData = {
      id: editingScheduleId || Date.now(),
      day: day,
      startTime: startTime,
      endTime: endTime,
      location: location,
      doctorId: doctorId,
    };

    if (editingScheduleId) {
      const index = doctorSchedules.findIndex(
        (s) => s.id === editingScheduleId
      );
      doctorSchedules[index] = scheduleData;
    } else {
      doctorSchedules.push(scheduleData);
    }

    localStorage.setItem(
      `hl_doctor_schedules_${doctorId}`,
      JSON.stringify(doctorSchedules)
    );
    renderSchedules();
    hideScheduleForm();

    showToast("Jadwal berhasil diperbarui");
  });

  // Edit/Delete schedule handlers
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-schedule")) {
      const scheduleId = parseInt(e.target.dataset.id);
      const schedule = doctorSchedules.find((s) => s.id === scheduleId);
      if (schedule) showScheduleForm(schedule);
    }

    if (e.target.classList.contains("delete-schedule")) {
      const scheduleId = parseInt(e.target.dataset.id);

      const hasConsultation = patientRecords.some(
        (record) => record.scheduleId === scheduleId
      );

      if (hasConsultation) {
        alert(
          "Tidak dapat menghapus jadwal karena ada sesi konsultasi yang sudah terjadwal."
        );
        return;
      }

      if (confirm("Hapus jadwal ini?")) {
        doctorSchedules = doctorSchedules.filter((s) => s.id !== scheduleId);
        localStorage.setItem(
          `hl_doctor_schedules_${doctorId}`,
          JSON.stringify(doctorSchedules)
        );
        renderSchedules();
        showToast("Jadwal berhasil dihapus");
      }
    }
  });

  // Diagnosis form handler
  diagnosisForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const patientId = parseInt(selectPatient.value);
    const diagnosis = document.getElementById("diagnosisText").value.trim();
    const prescription = document
      .getElementById("prescriptionText")
      .value.trim();

    if (!patientId || !diagnosis || !prescription) {
      alert("Harap lengkapi semua field diagnosis dan resep.");
      return;
    }

    const patient = dummyPatients.find((p) => p.id === patientId);

    const record = {
      id: Date.now(),
      patientId: patientId,
      patientName: patient.name,
      diagnosis: diagnosis,
      prescription: prescription,
      consultationDate: new Date().toISOString(),
      doctorId: doctorId,
      doctorName: doctorSession.name,
    };

    patientRecords.push(record);
    localStorage.setItem(
      `hl_patient_records_${doctorId}`,
      JSON.stringify(patientRecords)
    );

    diagnosisForm.reset();
    diagnosisSuccess.classList.remove("hidden");
    renderPatientHistory();

    setTimeout(() => {
      diagnosisSuccess.classList.add("hidden");
    }, 3000);

    showToast("Diagnosis dan resep berhasil disimpan");
  });

  logoutBtn.addEventListener("click", () => {
    if (confirm("Keluar dari dashboard dokter?")) {
      clearDoctorSession();
      window.location.href = "/pages/doctor-login.html";
    }
  });

  // Initialize
  renderSchedules();
  renderPatientHistory();
  populatePatientDropdown();
})();

/* ========= Doctors: data & filter + render (skeleton handled earlier) ========= */
const doctorsData = [
  {
    name: "dr. Daffa, Sp.A",
    spec: "Sp. Anak",
    avail: "Tersedia sekarang",
    badge: "text-green-600",
    image: "/img/dokter/Dok.daffa.png", // Tambahkan URL gambar
  },
  {
    name: "dr. Jenny, Sp.M",
    spec: "Sp. Mata",
    avail: "Besok pagi",
    badge: "text-gray-600",
    image: "/img/dokter/Dokk.jenny.png",
  },
  {
    name: "dr. Gilang, Sp.KK",
    spec: "Sp. Kulit",
    avail: "Tersedia malam ini",
    badge: "text-yellow-600",
    image: "/img/dokter/Dok.gilang.png",
  },
  {
    name: "dr. Bilbina, Sp.KK",
    spec: "Sp. Kulit",
    avail: "Tersedia malam ini",
    badge: "text-yellow-600",
    image: "/img/dokter/Dokk.bilbina.png",
  },
];

function renderDoctors(list) {
  return `
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      ${list
        .map(
          (d) => `
        <div class="rounded-2xl border p-4 hover:shadow">
          <div class="flex items-center gap-3">
            <!-- Ganti div kosong dengan img -->
            <img 
              src="${d.image}" 
              alt="${d.name}"
              class="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
              onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iOCIgZmlsbD0iI0YzRjRGNSIvPgo8cGF0aCBkPSJNMjQgMjZDMjYuNzYxNCAyNiAyOSAyMy43NjE0IDI5IDIxQzI5IDE4LjIzODYgMjYuNzYxNCAxNiAyNCAxNkMyMS4yMzg2IDE2IDE5IDE4LjIzODYgMTkgMjFDMTkgMjMuNzYxNCAyMS4yMzg2IDI2IDI0IDI2WiIgZmlsbD0iIzlDQTBBRiIvPgo8cGF0aCBkPSJNMTUgMzJDMTUgMjguMTM0IDIxLjIzODYgMjYgMjQgMjZDMjYuNzYxNCAyNiAzMyAyOC4xMzQgMzMgMzJWMzRIMTVWMzJaIiBmaWxsPSIjOUNBMEFGIi8+Cjwvc3ZnPgo='"
            >
            <div>
              <p class="font-semibold">${d.name}</p>
              <p class="text-sm text-gray-600">${d.spec}</p>
            </div>
          </div>
          <div class="mt-3 text-sm ${d.badge}">${d.avail}</div>
          <a href="/pages/chat.html?doc=${encodeURIComponent(
            d.name
          )}" class="mt-3 w-full inline-flex justify-center rounded-xl bg-pink-600 text-white py-2">Mulai Chat</a>
        </div>
      `
        )
        .join("")}
    </div>`;
}

function mountSkeleton(holder, count = 6) {
  holder.innerHTML = `
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      ${Array.from({ length: count })
        .map(
          () => `
        <div class="rounded-2xl border p-4">
          <div class="flex items-center gap-3">
            <!-- Ganti skeleton jadi bentuk lingkaran -->
            <div class="w-12 h-12 rounded-full skeleton"></div>
            <div class="flex-1">
              <div class="h-3 w-32 skeleton mb-2"></div>
              <div class="h-3 w-24 skeleton"></div>
            </div>
          </div>
          <div class="h-8 w-full mt-4 skeleton rounded-xl"></div>
        </div>
      `
        )
        .join("")}
    </div>`;
}

/* Doctors page init */
(function doctorsPage() {
  if (!document.body.matches('[data-page="doctors"]')) return;
  const holder = document.querySelector("[data-skeleton-holder]");
  mountSkeleton(holder);
  setTimeout(() => (holder.innerHTML = renderDoctors(doctorsData)), 700);

  // filter simple
  const [search, specSel, timeSel] =
    document.querySelectorAll(".rounded-xl.border");
  function applyFilter() {
    const q = search.value.toLowerCase();
    const spec = specSel.value;
    let list = doctorsData.filter(
      (d) =>
        d.name.toLowerCase().includes(q) || d.spec.toLowerCase().includes(q)
    );
    if (spec !== "Semua Spesialis")
      list = list.filter((d) => d.spec.includes(spec.replace("Sp. ", "Sp. ")));
    holder.innerHTML = renderDoctors(list);
  }
  search?.addEventListener("input", applyFilter);
  specSel?.addEventListener("change", applyFilter);
  timeSel?.addEventListener("change", applyFilter);
})();

/* ========= Articles page: skeleton then list ========= */
(function articlesPage() {
  if (!document.body.matches('[data-page="articles"]')) return;
  const holder = document.querySelector("[data-skeleton-holder]");
  mountSkeleton(holder, 4);
  setTimeout(
    () =>
      (holder.innerHTML = `
    <div class="grid md:grid-cols-2 gap-6">
      ${[
        {
          t: "Deformitas: Kenali Arti, Penyebab, dan Jenisnya",
          tag: "Pengetahuan Umum",
        },
        {
          t: "Vitamin Makarizo: Manfaat dan Cara Pakainya",
          tag: "Perawatan Rambut",
        },
        { t: "Strabismus: Gejala, Sebab, dan Solusinya", tag: "Penyakit Mata" },
        { t: "Muntah Kuning Pahit? Ini Penyebab & Cara Atasi", tag: "Mual" },
        {
          t: "5 Gejala Asam Lambung Naik dan Cara Mengatasinya",
          tag: "Pencernaan",
        },
        {
          t: "Waspada! Ini Tanda-tanda Penyakit Jantung yang Sering Diabaikan",
          tag: "Jantung",
        },
      ]
        .map(
          (a) => `
       <a class="flex gap-4 p-4 rounded-2xl border hover:shadow" href="#">
  <div class="w-28 h-20 flex items-center justify-center rounded-lg bg-gray-100 overflow-hidden">
    <img src="https://klinikkeluarga.com/assets/uploads/artikels/klinik-keluarga-pentingnya-gaya-hidup-sehat-menjaga-kesehatan-tubuh-dan-pikiran.jpg" 
         alt="Gambar artikel" 
         class="w-full h-full object-cover">
  </div>
  <div>
    <p class="font-medium">${a.t}</p>
    <span class="inline-block mt-1 text-xs px-2 py-0.5 rounded bg-gray-100">${a.tag}</span>
  </div>
</a>
      `
        )
        .join("")}
    </div>
  `),
    700
  );
})();

/* ========= Pharmacy cart (localStorage) – tetap dari versi sebelumnya ========= */
const CART_KEY = "hl_cart_v1";
const $cartBtn = document.getElementById("cartBtn");
const $cartDrawer = document.getElementById("cartDrawer");
const $cartCount = document.getElementById("cartCount");
const $cartItems = document.getElementById("cartItems");
const $cartTotal = document.getElementById("cartTotal");
const $closeCart = document.getElementById("closeCart");
const $clearCart = document.getElementById("clearCart");

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}
function saveCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}
function formatRupiah(n) {
  return "Rp" + (n || 0).toLocaleString("id-ID");
}
function updateCartCount() {
  if (!$cartCount) return;
  const totalQty = getCart().reduce((a, b) => a + (b.qty || 0), 0);
  $cartCount.textContent = totalQty;
}
function renderCart() {
  if (!$cartItems || !$cartTotal) return;
  const items = getCart();
  $cartItems.innerHTML = items.length
    ? items
        .map(
          (it) => `
      <div class="flex items-center justify-between gap-3 p-2 rounded-lg border">
        <div><p class="font-medium text-sm">${
          it.name
        }</p><p class="text-xs text-gray-500">${formatRupiah(it.price)} × ${
            it.qty
          }</p></div>
        <div class="flex items-center gap-2">
          <button class="px-2 py-1 rounded border" data-dec="${
            it.id
          }">-</button>
          <button class="px-2 py-1 rounded border" data-inc="${
            it.id
          }">+</button>
          <button class="px-2 py-1 rounded border text-red-600" data-del="${
            it.id
          }">Hapus</button>
        </div>
      </div>`
        )
        .join("")
    : `<div class="text-sm text-gray-600">Keranjang kosong.</div>`;
  const total = items.reduce((a, b) => a + b.price * b.qty, 0);
  $cartTotal.textContent = formatRupiah(total);
}
function addToCart({ id, name, price }) {
  const items = getCart();
  const idx = items.findIndex((i) => i.id === id);
  if (idx > -1) items[idx].qty += 1;
  else items.push({ id, name, price: Number(price), qty: 1 });
  saveCart(items);
  updateCartCount();
  renderCart();
  showToast("Ditambahkan ke keranjang");
}
function openCart() {
  if ($cartDrawer) $cartDrawer.classList.remove("translate-x-full");
}
function closeCart() {
  if ($cartDrawer) $cartDrawer.classList.add("translate-x-full");
}

document.querySelectorAll(".add-cart")?.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const { id, name, price } = e.currentTarget.dataset;
    addToCart({ id, name, price });
  });
});
$cartBtn?.addEventListener("click", openCart);
$closeCart?.addEventListener("click", closeCart);
document.addEventListener("click", (e) => {
  const inc = e.target.closest("[data-inc]");
  const dec = e.target.closest("[data-dec]");
  const del = e.target.closest("[data-del]");
  if (!inc && !dec && !del) return;
  const id =
    (inc || dec || del).dataset.inc ||
    (inc || dec || del).dataset.dec ||
    (inc || dec || del).dataset.del;
  let items = getCart();
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) return;
  if (inc) {
    items[idx].qty += 1;
  }
  if (dec) {
    items[idx].qty = Math.max(1, items[idx].qty - 1);
  }
  if (del) {
    items.splice(idx, 1);
  }
  saveCart(items);
  updateCartCount();
  renderCart();
});
$clearCart?.addEventListener("click", () => {
  saveCart([]);
  updateCartCount();
  renderCart();
  showToast("Keranjang dikosongkan");
});
if ($cartCount) {
  updateCartCount();
  renderCart();
}

/* ========= Chat page ========= */
(function chatPage() {
  if (!document.body.matches('[data-page="chat"]')) return;
  const params = new URLSearchParams(location.search);
  const docName = params.get("doc") || "Dokter";
  const title = document.getElementById("chatTitle");
  const box = document.getElementById("chatBox");
  const form = document.getElementById("chatForm");
  const input = document.getElementById("chatInput");

  title.textContent = `Chat – ${docName}`;

  const KEY = "hl_chat_" + docName;
  const load = () => {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch {
      return [];
    }
  };
  const save = (arr) => localStorage.setItem(KEY, JSON.stringify(arr));

  function render() {
    const arr = load();
    box.innerHTML = arr
      .map(
        (m) => `
      <div class="mb-2 flex ${m.me ? "justify-end" : ""}">
        <div class="max-w-[70%] px-3 py-2 rounded-2xl ${
          m.me ? "bg-pink-600 text-white" : "bg-white border"
        }">${m.text}</div>
      </div>
    `
      )
      .join("");
    box.scrollTop = box.scrollHeight;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    const arr = load();
    arr.push({ me: true, text, ts: Date.now() });
    save(arr);
    input.value = "";
    render();
    // auto-reply dummy
    setTimeout(() => {
      const a = load();
      a.push({
        me: false,
        text: "Baik, akan saya bantu ya 🙂",
        ts: Date.now(),
      });
      save(a);
      render();
    }, 600);
  });

  render();
})();

/* ============ Faskes Terdekat (Map Page) ============ */
const facilitiesData = [
  {
    name: "RS Awal Bros Pekanbaru",
    category: "Rumah Sakit",
    addr: "Jl. Jend. Sudirman No. 117",
    lat: 0.5303,
    lng: 101.4488,
    phone: "(0761) 123456",
  },
  {
    name: "RSUD Arifin Achmad",
    category: "Rumah Sakit",
    addr: "Jl. Diponegoro No. 2",
    lat: 0.5167,
    lng: 101.4333,
    phone: "(0761) 234567",
  },
  {
    name: "Klinik Pratama Sehat",
    category: "Klinik",
    addr: "Jl. Melur No. 15",
    lat: 0.52,
    lng: 101.44,
    phone: "(0761) 345678",
  },
  {
    name: "Apotek Kimia Farma",
    category: "Apotek",
    addr: "Jl. Soekarno Hatta No. 88",
    lat: 0.525,
    lng: 101.445,
    phone: "(0761) 456789",
  },
];

/* ========= Emergency Services Modal Logic - WITH SCROLL ========= */
(function emergencyServices() {
  const modalEmergency = document.getElementById("modalEmergency");
  const step1 = document.getElementById("emergencyStep1");
  const step2 = document.getElementById("emergencyStep2");
  const step1Content = document.getElementById("emergencyStep1Content");
  const step2Content = document.getElementById("emergencyStep2Content");
  const regionTitle = document.getElementById("regionTitle");
  const regionSubtitle = document.getElementById("regionSubtitle");
  const emergencyNumbers = document.getElementById("emergencyNumbers");
  const backToRegions = document.getElementById("backToRegions");
  const modalContent = modalEmergency?.querySelector(".overflow-y-auto");

  if (!modalEmergency) return;

  // Data nomor darurat untuk setiap daerah
  const emergencyData = {
    jakarta: {
      name: "DKI Jakarta",
      numbers: [
        {
          name: "Ambulans Darurat",
          number: "118",
          type: "ambulance",
          icon: "🚑",
        },
        { name: "Polisi", number: "110", type: "police", icon: "👮" },
        { name: "Pemadam Kebakaran", number: "113", type: "fire", icon: "🚒" },
        {
          name: "RS Cipto Mangunkusumo",
          number: "(021) 1500135",
          type: "hospital",
          icon: "🏥",
        },
        {
          name: "RS Polri Sukanto",
          number: "(021) 8093288",
          type: "hospital",
          icon: "🏥",
        },
        {
          name: "Dinas Sosial DKI",
          number: "(021) 3855555",
          type: "social",
          icon: "🏛️",
        },
        {
          name: "Posko Bencana DKI",
          number: "(021) 112",
          type: "disaster",
          icon: "⚡",
        },
      ],
    },
    "jawa-barat": {
      name: "Jawa Barat",
      numbers: [
        {
          name: "Ambulans Darurat",
          number: "118",
          type: "ambulance",
          icon: "🚑",
        },
        { name: "Polisi", number: "110", type: "police", icon: "👮" },
        {
          name: "RS Hasan Sadikin Bandung",
          number: "(022) 2034955",
          type: "hospital",
          icon: "🏥",
        },
        {
          name: "RS Immanuel Bandung",
          number: "(022) 2031187",
          type: "hospital",
          icon: "🏥",
        },
        {
          name: "RS Advent Bandung",
          number: "(022) 4213333",
          type: "hospital",
          icon: "🏥",
        },
        {
          name: "Pemadam Bandung",
          number: "(022) 113",
          type: "fire",
          icon: "🚒",
        },
      ],
    },
    "jawa-tengah": {
      name: "Jawa Tengah",
      numbers: [
        {
          name: "Ambulans Darurat",
          number: "118",
          type: "ambulance",
          icon: "🚑",
        },
        { name: "Polisi", number: "110", type: "police", icon: "👮" },
        {
          name: "RS Dr. Kariadi Semarang",
          number: "(024) 8445252",
          type: "hospital",
          icon: "🏥",
        },
        {
          name: "RS Bethesda Yogyakarta",
          number: "(0274) 586688",
          type: "hospital",
          icon: "🏥",
        },
        {
          name: "RS Panti Rapih Yogyakarta",
          number: "(0274) 514845",
          type: "hospital",
          icon: "🏥",
        },
        {
          name: "RS Roemani Muhammadiyah",
          number: "(024) 3542111",
          type: "hospital",
          icon: "🏥",
        },
      ],
    },
    riau: {
      name: "Riau",
      numbers: [
        {
          name: "Ambulans Darurat",
          number: "118",
          type: "ambulance",
          icon: "🚑",
        },
        { name: "Polisi", number: "110", type: "police", icon: "👮" },
        {
          name: "RS Awal Bros Pekanbaru",
          number: "(0761) 123456",
          type: "hospital",
          icon: "🏥",
        },
        {
          name: "RSUD Arifin Achmad",
          number: "(0761) 234567",
          type: "hospital",
          icon: "🏥",
        },
        {
          name: "Pemadam Kebakaran Pekanbaru",
          number: "(0761) 112",
          type: "fire",
          icon: "🚒",
        },
        {
          name: "RS Ibnu Sina Pekanbaru",
          number: "(0761) 858585",
          type: "hospital",
          icon: "🏥",
        },
        {
          name: "RS Santa Maria Pekanbaru",
          number: "(0761) 674444",
          type: "hospital",
          icon: "🏥",
        },
      ],
    },
  };

  // Fungsi untuk scroll ke atas
  function scrollToTop() {
    if (modalContent) {
      modalContent.scrollTop = 0;
    }
  }

  // Fungsi untuk menampilkan detail nomor darurat
  function showEmergencyNumbers(regionId) {
    const regionData = emergencyData[regionId];

    if (!regionData) {
      console.error("Data untuk region tidak ditemukan:", regionId);
      return;
    }

    // Update judul region
    regionTitle.textContent = regionData.name;
    regionSubtitle.textContent = "Layanan Darurat";

    // Render nomor darurat dengan desain yang elegan
    emergencyNumbers.innerHTML = regionData.numbers
      .map(
        (service) => `
            <div class="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-sm transition-all duration-200">
                <div class="flex items-start justify-between">
                    <div class="flex items-start gap-3 flex-1">
                        <div class="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 text-lg flex-shrink-0">
                            ${service.icon}
                        </div>
                        <div class="flex-1 min-w-0">
                            <h3 class="font-semibold text-gray-900 text-sm">${service.name}</h3>
                            <p class="text-2xl font-bold text-red-600 mt-1 tracking-tight break-all">${service.number}</p>
                        </div>
                    </div>
                </div>
                <div class="flex gap-2 mt-3">
                    <button 
                        class="flex-1 px-3 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-1 call-button"
                        data-number="${service.number}"
                        data-name="${service.name}"
                    >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                        Telepon
                    </button>
                    <button 
                        class="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-1 save-button"
                        data-number="${service.number}"
                        data-name="${service.name}"
                    >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                        </svg>
                        Simpan
                    </button>
                </div>
            </div>
        `
      )
      .join("");

    // Pindah ke step 2 dengan animasi
    step1.style.display = "none";
    step2.style.display = "block";
    step1Content.classList.add("hidden");
    step2Content.classList.remove("hidden");

    // Scroll ke atas ketika pindah step
    setTimeout(scrollToTop, 50);
  }

  // Fungsi kembali ke pilihan daerah
  function backToRegionSelection() {
    step2.style.display = "none";
    step1.style.display = "block";
    step2Content.classList.add("hidden");
    step1Content.classList.remove("hidden");

    // Scroll ke atas ketika kembali
    setTimeout(scrollToTop, 50);
  }

  // Event listener untuk tombol daerah
  document.addEventListener("click", function (e) {
    // Tombol pilih daerah
    if (e.target.closest(".emergency-region")) {
      const regionButton = e.target.closest(".emergency-region");
      const regionId = regionButton.dataset.region;
      showEmergencyNumbers(regionId);
    }

    // Tombol kembali ke pilihan daerah
    if (e.target.id === "backToRegions" || e.target.closest("#backToRegions")) {
      backToRegionSelection();
    }

    // Tombol telepon
    if (e.target.closest(".call-button")) {
      const button = e.target.closest(".call-button");
      const phoneNumber = button.dataset.number;
      const serviceName = button.dataset.name;

      // Hapus karakter non-digit untuk telepon
      const cleanNumber = phoneNumber.replace(/[^\d+]/g, "");

      if (confirm(`Telepon ${serviceName} - ${phoneNumber}?`)) {
        // Di perangkat mobile, ini akan membuka aplikasi telepon
        window.location.href = `tel:${cleanNumber}`;

        // Fallback untuk desktop
        showToast(`Menelepon ${serviceName}: ${phoneNumber}`);
      }
    }

    // Tombol simpan kontak
    if (e.target.closest(".save-button")) {
      const button = e.target.closest(".save-button");
      const phoneNumber = button.dataset.number;
      const serviceName = button.dataset.name;

      showToast(`Nomor ${serviceName} disimpan: ${phoneNumber}`);
    }
  });

  // Close modal ketika klik di luar
  modalEmergency.addEventListener("click", function (e) {
    if (
      e.target === modalEmergency ||
      e.target.closest("[data-close-emergency]")
    ) {
      modalEmergency.classList.add("hidden");
      // Reset ke step 1 ketika modal ditutup
      setTimeout(backToRegionSelection, 300);
    }
  });
})();

// Data Layanan Darurat per Region
const emergencyData = {
  jakarta: {
    name: "DKI Jakarta",
    numbers: [
      { name: "Ambulans Darurat", number: "118", type: "ambulance" },
      { name: "Polisi", number: "110", type: "police" },
      { name: "Pemadam Kebakaran", number: "113", type: "fire" },
      {
        name: "RS Cipto Mangunkusumo",
        number: "(021) 1500135",
        type: "hospital",
      },
      { name: "RS Polri Sukanto", number: "(021) 8093288", type: "hospital" },
    ],
  },
  "jawa-barat": {
    name: "Jawa Barat",
    numbers: [
      { name: "Ambulans Darurat", number: "118", type: "ambulance" },
      { name: "Polisi", number: "110", type: "police" },
      {
        name: "RS Hasan Sadikin Bandung",
        number: "(022) 2034955",
        type: "hospital",
      },
      {
        name: "RS Immanuel Bandung",
        number: "(022) 2031187",
        type: "hospital",
      },
    ],
  },
  "jawa-tengah": {
    name: "Jawa Tengah",
    numbers: [
      { name: "Ambulans Darurat", number: "118", type: "ambulance" },
      { name: "Polisi", number: "110", type: "police" },
      {
        name: "RS Dr. Kariadi Semarang",
        number: "(024) 8445252",
        type: "hospital",
      },
      {
        name: "RS Bethesda Yogyakarta",
        number: "(0274) 586688",
        type: "hospital",
      },
    ],
  },
  riau: {
    name: "Riau",
    numbers: [
      { name: "Ambulans Darurat", number: "118", type: "ambulance" },
      { name: "Polisi", number: "110", type: "police" },
      {
        name: "RS Awal Bros Pekanbaru",
        number: "(0761) 123456",
        type: "hospital",
      },
      { name: "RSUD Arifin Achmad", number: "(0761) 234567", type: "hospital" },
      {
        name: "Pemadam Kebakaran Pekanbaru",
        number: "(0761) 112",
        type: "fire",
      },
    ],
  },
};

// Fungsi hitung jarak
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Radius bumi dalam km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Fungsi urutkan berdasarkan jarak
function sortFacilitiesByDistance() {
  if (!userLocation) return;

  facilitiesData.forEach((faskes) => {
    faskes.distance = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      faskes.lat,
      faskes.lng
    );
  });

  facilitiesData.sort((a, b) => a.distance - b.distance);
}

function renderFacilities(list) {
  return list
    .map(
      (f, i) => `
    <div class="rounded-xl border p-4 mb-4 hover:shadow">
      <div class="flex items-start justify-between gap-3 mb-3">
        <div class="flex-1">
          <p class="font-semibold">${f.name}</p>
          <p class="text-sm text-gray-600">${f.category}</p>
          <p class="text-xs text-gray-500 mt-1">${f.addr}</p>
          <p class="text-xs text-gray-500">📞 ${f.phone}</p>
          ${
            f.distance
              ? `<p class="text-xs text-green-600 mt-1">📍 ${f.distance.toFixed(
                  1
                )} km dari Anda</p>`
              : ""
          }
        </div>
      </div>
      <div class="flex gap-2">
        <button 
          class="flex-1 px-3 py-2 rounded-lg bg-pink-600 text-white text-sm"
          data-view="${i}"
        >
          👁️ Lihat di Maps
        </button>
        <button 
          class="flex-1 px-3 py-2 rounded-lg border border-pink-600 text-pink-600 text-sm"
          data-navigate="${i}"
        >
          🧭 Navigasi
        </button>
      </div>
    </div>
  `
    )
    .join("");
}

(function mapPage() {
  if (!document.body.matches('[data-page="map"]')) return;
  const listEl = document.getElementById("faskesList");
  const qEl = document.getElementById("faskesSearch");
  const frame = document.getElementById("mapFrame");
  const locationBtn = document.getElementById("getLocationBtn");
  const locationStatus = document.getElementById("locationStatus");

  let userLocation = null;
  let data = [...facilitiesData];

  // Fungsi deteksi lokasi
  function getCurrentLocation() {
    if (!navigator.geolocation) {
      alert("Browser tidak mendukung geolocation");
      return;
    }

    locationBtn.textContent = "🔄 Mendeteksi...";

    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        document.getElementById("currentLocation").textContent =
          "Lokasi Anda terdeteksi";
        locationStatus.classList.remove("hidden");
        locationBtn.textContent = "📍 Lokasi Aktif";

        // Urutkan faskes berdasarkan jarak terdekat
        sortFacilitiesByDistance();
        apply();
      },
      (error) => {
        alert(
          "Aktifkan lokasi untuk hasil terdekat, atau gunakan pencarian manual"
        );
        locationBtn.textContent = "📍 Gunakan Lokasi Saya";
      }
    );
  }

  // Fungsi apply yang disederhanakan
  function apply() {
    const q = (qEl.value || "").toLowerCase();
    let res = facilitiesData.filter(
      (f) =>
        f.name.toLowerCase().includes(q) || f.addr.toLowerCase().includes(q)
    );
    data = res;
    listEl.innerHTML = renderFacilities(res);
  }

  apply();
  locationBtn.addEventListener("click", getCurrentLocation);
  qEl.addEventListener("input", apply);

  document.addEventListener("click", (e) => {
    const viewBtn = e.target.closest("[data-view]");
    const navBtn = e.target.closest("[data-navigate]");

    if (viewBtn) {
      const idx = Number(viewBtn.dataset.view);
      const item = data[idx];
      if (!item) return;
      // Lihat di Maps
      const src = `https://www.google.com/maps?q=${encodeURIComponent(
        item.name + " " + item.addr
      )}&output=embed`;
      frame.src = src;
    }

    if (navBtn) {
      const idx = Number(navBtn.dataset.navigate);
      const item = data[idx];
      if (!item) return;
      // Navigasi - buka Google Maps dengan directions
      let navUrl = `https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}`;

      if (userLocation) {
        navUrl += `&origin=${userLocation.lat},${userLocation.lng}`;
      }

      window.open(navUrl, "_blank");
    }
  });
})();

/* ========= BMI Calculator ========= */
(function bmiPage() {
  if (!document.body.matches('[data-page="bmi"]')) return;

  const form = document.getElementById("bmiForm");
  const resultDiv = document.getElementById("bmiResult");
  const bmiValue = document.getElementById("bmiValue");
  const bmiCategory = document.getElementById("bmiCategory");
  const bmiDescription = document.getElementById("bmiDescription");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const height = parseInt(document.getElementById("height").value);
    const weight = parseInt(document.getElementById("weight").value);

    // Validasi sesuai UC
    if (height < 100 || height > 250) {
      alert("Tinggi badan harus antara 100-250 cm");
      return;
    }

    if (weight < 20 || weight > 200) {
      alert("Berat badan harus antara 20-200 kg");
      return;
    }

    // Hitung BMI
    const heightInMeter = height / 100;
    const bmi = weight / (heightInMeter * heightInMeter);
    const roundedBMI = bmi.toFixed(1);

    // Tentukan kategori
    let category = "";
    let description = "";

    if (bmi < 18.5) {
      category = "Kurus";
      description =
        "Berat badan kurang dari ideal. Disarankan konsultasi dengan dokter.";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      category = "Normal (Ideal)";
      description = "Berat badan Anda ideal. Pertahankan pola hidup sehat!";
    } else if (bmi >= 25 && bmi <= 29.9) {
      category = "Gemuk";
      description = "Berat badan berlebih. Disarankan olahraga teratur.";
    } else {
      category = "Obesitas";
      description =
        "Berat badan sangat berlebih. Segera konsultasi dengan dokter.";
    }

    // Tampilkan hasil
    bmiValue.textContent = roundedBMI;
    bmiCategory.textContent = category;
    bmiDescription.textContent = description;

    resultDiv.classList.remove("hidden");

    // Scroll ke hasil
    resultDiv.scrollIntoView({ behavior: "smooth" });
  });
})();

/* ========= Heart Health Test ========= */
(function heartTestPage() {
  if (!document.body.matches('[data-page="heart-test"]')) return;

  const form = document.getElementById("heartTestForm");
  const resultDiv = document.getElementById("testResult");
  const riskLevel = document.getElementById("riskLevel");
  const riskDescription = document.getElementById("riskDescription");
  const submitBtn = document.getElementById("submitBtn");

  // Validasi form (sesuai alternate flow UC)
  function validateForm() {
    const inputs = form.querySelectorAll("input[required]");
    let allFilled = true;

    inputs.forEach((input) => {
      if (input.type === "radio") {
        const name = input.name;
        const checked = form.querySelector(`input[name="${name}"]:checked`);
        if (!checked) allFilled = false;
      } else {
        if (!input.value) allFilled = false;
      }
    });

    submitBtn.disabled = !allFilled;
  }

  // Event listeners untuk validasi real-time
  form.addEventListener("input", validateForm);
  form.addEventListener("change", validateForm);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Ambil data form
    const age = parseInt(document.getElementById("age").value);
    const familyHistory = form.querySelector(
      'input[name="familyHistory"]:checked'
    ).value;
    const smoking = form.querySelector('input[name="smoking"]:checked').value;
    const exercise = form.querySelector('input[name="exercise"]:checked').value;
    const bloodPressure = form.querySelector(
      'input[name="bloodPressure"]:checked'
    ).value;
    const chestPain = form.querySelector(
      'input[name="chestPain"]:checked'
    ).value;

    // Scoring system sederhana
    let score = 0;

    // Usia
    if (age > 50) score += 2;
    else if (age > 35) score += 1;

    // Riwayat keluarga
    if (familyHistory === "yes") score += 2;

    // Merokok
    if (smoking === "yes") score += 2;

    // Olahraga
    if (exercise === "never") score += 2;
    else if (exercise === "occasional") score += 1;

    // Tekanan darah
    if (bloodPressure === "yes") score += 2;
    else if (bloodPressure === "unknown") score += 1;

    // Nyeri dada
    if (chestPain === "yes") score += 3;

    // Tentukan risiko berdasarkan score
    let level = "";
    let description = "";

    if (score <= 3) {
      level = "Rendah";
      description =
        "Risiko penyakit jantung Anda rendah. Pertahankan gaya hidup sehat.";
    } else if (score <= 6) {
      level = "Sedang";
      description =
        "Risiko penyakit jantung Anda sedang. Disarankan konsultasi dengan dokter.";
    } else {
      level = "Tinggi";
      description =
        "Risiko penyakit jantung Anda tinggi. Segera konsultasi dengan dokter spesialis jantung.";
    }

    // Tampilkan hasil
    riskLevel.textContent = `Risiko ${level}`;
    riskDescription.textContent = description;

    // Warna berdasarkan risiko
    if (level === "Rendah") {
      riskLevel.className = "text-2xl font-bold mb-2 text-green-600";
    } else if (level === "Sedang") {
      riskLevel.className = "text-2xl font-bold mb-2 text-yellow-600";
    } else {
      riskLevel.className = "text-2xl font-bold mb-2 text-red-600";
    }

    resultDiv.classList.remove("hidden");

    // Scroll ke hasil
    resultDiv.scrollIntoView({ behavior: "smooth" });
  });

  // Inisialisasi validasi
  validateForm();
})();

/* ========= Depression Test (PHQ-9) ========= */
(function depressionTestPage() {
  if (!document.body.matches('[data-page="depression-test"]')) return;

  const introPage = document.getElementById("introPage");
  const testPage = document.getElementById("testPage");
  const resultPage = document.getElementById("resultPage");
  const startTestBtn = document.getElementById("startTestBtn");
  const questionsContainer = document.getElementById("questionsContainer");
  const depressionTestForm = document.getElementById("depressionTestForm");
  const submitTestBtn = document.getElementById("submitTestBtn");
  const retakeTestBtn = document.getElementById("retakeTestBtn");
  const depressionScore = document.getElementById("depressionScore");
  const depressionLevel = document.getElementById("depressionLevel");
  const depressionDescription = document.getElementById(
    "depressionDescription"
  );

  // Data pertanyaan PHQ-9 sesuai standar
  const phq9Questions = [
    "Kurangnya minat atau kesenangan dalam melakukan sesuatu",
    "Merasa sedih, tertekan, atau putus asa",
    "Sulit tidur atau tidur terlalu banyak",
    "Merasa lelah atau kurang energi",
    "Nafsu makan buruk atau makan berlebihan",
    "Merasa buruk tentang diri sendiri - atau bahwa Anda adalah orang yang gagal atau telah mengecewakan diri sendiri atau keluarga Anda",
    "Sulit berkonsentrasi pada sesuatu, misalnya membaca koran atau menonton televisi",
    "Bergerak atau berbicara sangat lambat sehingga orang lain memperhatikannya. Atau sebaliknya - merasa gelisah atau tidak bisa diam sehingga Anda lebih banyak bergerak dari biasanya",
    "Berpikir bahwa lebih baik mati atau ingin melukai diri sendiri dengan cara tertentu",
  ];

  const answerOptions = [
    { value: 0, label: "Tidak sama sekali" },
    { value: 1, label: "Beberapa hari" },
    { value: 2, label: "Lebih dari separuh hari" },
    { value: 3, label: "Hampir setiap hari" },
  ];

  // Inisialisasi tes
  function initializeTest() {
    questionsContainer.innerHTML = "";

    phq9Questions.forEach((question, index) => {
      const questionDiv = document.createElement("div");
      questionDiv.className = "border-b pb-4 mb-4";
      questionDiv.innerHTML = `
        <p class="font-medium mb-3">${index + 1}. ${question}</p>
        <div class="space-y-2">
          ${answerOptions
            .map(
              (option) => `
            <label class="flex items-center">
              <input type="radio" name="question${index}" value="${option.value}" class="mr-2" required>
              <span>${option.label}</span>
            </label>
          `
            )
            .join("")}
        </div>
      `;
      questionsContainer.appendChild(questionDiv);
    });
  }

  // Validasi form (sesuai alternate flow UC)
  function validateForm() {
    const allQuestions = phq9Questions.length;
    let answeredQuestions = 0;

    for (let i = 0; i < allQuestions; i++) {
      const answered = depressionTestForm.querySelector(
        `input[name="question${i}"]:checked`
      );
      if (answered) answeredQuestions++;
    }

    submitTestBtn.disabled = answeredQuestions !== allQuestions;
  }

  // Event listeners
  startTestBtn.addEventListener("click", () => {
    introPage.classList.add("hidden");
    testPage.classList.remove("hidden");
    initializeTest();
  });

  depressionTestForm.addEventListener("change", validateForm);

  depressionTestForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Hitung skor total
    let totalScore = 0;

    for (let i = 0; i < phq9Questions.length; i++) {
      const selected = depressionTestForm.querySelector(
        `input[name="question${i}"]:checked`
      );
      if (selected) {
        totalScore += parseInt(selected.value);
      }
    }

    // Tentukan tingkat depresi berdasarkan skor
    let level = "";
    let description = "";

    if (totalScore <= 4) {
      level = "Minimal/Tidak ada depresi";
      description =
        "Skor Anda menunjukkan gejala depresi minimal atau tidak ada.";
    } else if (totalScore <= 9) {
      level = "Depresi ringan";
      description =
        "Skor Anda menunjukkan gejala depresi ringan. Pantau kondisi Anda.";
    } else if (totalScore <= 14) {
      level = "Depresi sedang";
      description =
        "Skor Anda menunjukkan gejala depresi sedang. Disarankan konsultasi dengan profesional kesehatan.";
    } else if (totalScore <= 19) {
      level = "Depresi sedang-berat";
      description =
        "Skor Anda menunjukkan gejala depresi sedang-berat. Segera konsultasi dengan profesional kesehatan.";
    } else {
      level = "Depresi berat";
      description =
        "Skor Anda menunjukkan gejala depresi berat. Segera cari bantuan profesional kesehatan.";
    }

    // Tampilkan hasil
    depressionScore.textContent = totalScore;
    depressionLevel.textContent = level;
    depressionDescription.textContent = description;

    // Warna berdasarkan tingkat
    if (totalScore <= 4) {
      depressionScore.className = "text-3xl font-bold mb-2 text-green-600";
    } else if (totalScore <= 9) {
      depressionScore.className = "text-3xl font-bold mb-2 text-blue-600";
    } else if (totalScore <= 14) {
      depressionScore.className = "text-3xl font-bold mb-2 text-yellow-600";
    } else if (totalScore <= 19) {
      depressionScore.className = "text-3xl font-bold mb-2 text-orange-600";
    } else {
      depressionScore.className = "text-3xl font-bold mb-2 text-red-600";
    }

    testPage.classList.add("hidden");
    resultPage.classList.remove("hidden");
  });

  retakeTestBtn.addEventListener("click", () => {
    resultPage.classList.add("hidden");
    introPage.classList.remove("hidden");
    depressionTestForm.reset();
  });

  // Inisialisasi validasi
  depressionTestForm.addEventListener("input", validateForm);
})();

/* ========= Insurance Integration ========= */
(function insurancePage() {
  if (!document.body.matches('[data-page="insurance"]')) return;

  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");
  const step3 = document.getElementById("step3");
  const insuranceOptions = document.getElementById("insuranceOptions");
  const insuranceNotAvailable = document.getElementById(
    "insuranceNotAvailable"
  );
  const selectedInsuranceText = document.getElementById(
    "selectedInsuranceText"
  );
  const insuranceForm = document.getElementById("insuranceForm");
  const backToStep1 = document.getElementById("backToStep1");
  const formErrors = document.getElementById("formErrors");
  const errorMessage = document.getElementById("errorMessage");
  const addAnotherInsurance = document.getElementById("addAnotherInsurance");

  // E-card elements
  const eCardInsuranceName = document.getElementById("eCardInsuranceName");
  const eCardPolicyNumber = document.getElementById("eCardPolicyNumber");
  const eCardPolicyHolder = document.getElementById("eCardPolicyHolder");
  const eCardExpiry = document.getElementById("eCardExpiry");

  // Data asuransi (sesuai UC)
  const insuranceProviders = [
    { id: "bpjs", name: "BPJS Kesehatan", available: true },
    { id: "mandiri", name: "Mandiri Inhealth", available: true },
    { id: "sinarmas", name: "Sinarmas Health Insurance", available: true },
    { id: "allianz", name: "Allianz Health", available: false }, // Tidak tersedia (alternate flow)
    { id: "prudential", name: "Prudential Health", available: true },
    { id: "manulife", name: "Manulife Health", available: true },
  ];

  let selectedInsurance = null;
  let insuranceData = null;

  // Render pilihan asuransi
  function renderInsuranceOptions() {
    insuranceOptions.innerHTML = insuranceProviders
      .map(
        (provider) => `
      <button 
        type="button"
        class="w-full text-left p-4 rounded-xl border hover:bg-white transition-colors insurance-option ${
          !provider.available ? "opacity-50 cursor-not-allowed" : ""
        }"
        data-id="${provider.id}"
        data-available="${provider.available}"
        ${!provider.available ? "disabled" : ""}
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="font-semibold">${provider.name}</p>
            <p class="text-sm text-gray-600 mt-1">Asuransi kesehatan</p>
          </div>
          ${
            !provider.available
              ? '<span class="text-xs text-red-600">Tidak tersedia</span>'
              : ""
          }
        </div>
      </button>
    `
      )
      .join("");
  }

  // Event handlers
  document.addEventListener("click", (e) => {
    const option = e.target.closest(".insurance-option");
    if (!option) return;

    const insuranceId = option.dataset.id;
    const isAvailable = option.dataset.available === "true";

    if (!isAvailable) {
      // Alternate flow: asuransi tidak tersedia
      insuranceNotAvailable.classList.remove("hidden");
      return;
    }

    insuranceNotAvailable.classList.add("hidden");
    selectedInsurance = insuranceProviders.find((p) => p.id === insuranceId);

    // Pindah ke step 2
    selectedInsuranceText.textContent = `Mengisi data polis untuk ${selectedInsurance.name}`;
    step1.classList.add("hidden");
    step2.classList.remove("hidden");
  });

  backToStep1.addEventListener("click", () => {
    step2.classList.add("hidden");
    step1.classList.remove("hidden");
    insuranceForm.reset();
    formErrors.classList.add("hidden");
  });

  insuranceForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const policyNumber = document.getElementById("policyNumber").value.trim();
    const policyHolder = document.getElementById("policyHolder").value.trim();
    const effectiveDate = document.getElementById("effectiveDate").value;
    const expiryDate = document.getElementById("expiryDate").value;

    // Validasi data (sesuai alternate flow UC)
    let hasError = false;
    let errorMsg = "";

    // Validasi: data kosong
    if (!policyNumber || !policyHolder || !effectiveDate || !expiryDate) {
      hasError = true;
      errorMsg = "Silakan lengkapi semua data polis.";
    }
    // Validasi: format nomor polis (minimal 5 karakter)
    else if (policyNumber.length < 5) {
      hasError = true;
      errorMsg = "Nomor polis harus minimal 5 karakter.";
    }
    // Validasi: tanggal berakhir harus setelah tanggal berlaku
    else if (new Date(expiryDate) <= new Date(effectiveDate)) {
      hasError = true;
      errorMsg = "Tanggal berakhir harus setelah tanggal berlaku.";
    }
    // Validasi: polis kadaluarsa
    else if (new Date(expiryDate) < new Date()) {
      hasError = true;
      errorMsg = "Polis telah kadaluarsa. Silakan perbarui data polis.";
    }

    if (hasError) {
      errorMessage.textContent = errorMsg;
      formErrors.classList.remove("hidden");
      return;
    }

    formErrors.classList.add("hidden");

    // Simpan data (simulasi localStorage)
    insuranceData = {
      provider: selectedInsurance.name,
      policyNumber: policyNumber,
      policyHolder: policyHolder,
      effectiveDate: effectiveDate,
      expiryDate: expiryDate,
      connectedAt: new Date().toISOString(),
    };

    // Simpan ke localStorage
    const userInsurances = JSON.parse(
      localStorage.getItem("hl_insurances") || "[]"
    );
    userInsurances.push(insuranceData);
    localStorage.setItem("hl_insurances", JSON.stringify(userInsurances));

    // Tampilkan e-card
    eCardInsuranceName.textContent = selectedInsurance.name;
    eCardPolicyNumber.textContent = policyNumber;
    eCardPolicyHolder.textContent = policyHolder;
    eCardExpiry.textContent = new Date(expiryDate).toLocaleDateString("id-ID");

    // Pindah ke step 3
    step2.classList.add("hidden");
    step3.classList.remove("hidden");
  });

  addAnotherInsurance.addEventListener("click", () => {
    step3.classList.add("hidden");
    step1.classList.remove("hidden");
    selectedInsurance = null;
    insuranceData = null;
    insuranceForm.reset();
  });

  // Inisialisasi
  renderInsuranceOptions();
})();

/* ========= Article Carousel ========= */
(function articleCarousel() {
  if (!document.body.matches('[data-page="home"]')) return;

  const track = document.getElementById("articleTrack");
  const prevBtn = document.getElementById("prevArticle");
  const nextBtn = document.getElementById("nextArticle");
  const indicators = document.querySelectorAll(".article-indicator");

  if (!track) return;

  let currentSlide = 0;
  const totalSlides = track.children.length;

  function updateCarousel() {
    // Update track position
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update buttons state
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides - 1;

    // Update indicators
    indicators.forEach((indicator, index) => {
      if (index === currentSlide) {
        indicator.classList.add("active", "bg-pink-600", "w-6");
        indicator.classList.remove("bg-gray-300", "w-3");
      } else {
        indicator.classList.remove("active", "bg-pink-600", "w-6");
        indicator.classList.add("bg-gray-300", "w-3");
      }
    });
  }

  // Event listeners
  prevBtn?.addEventListener("click", () => {
    if (currentSlide > 0) {
      currentSlide--;
      updateCarousel();
    }
  });

  nextBtn?.addEventListener("click", () => {
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
      updateCarousel();
    }
  });

  // Indicator clicks
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      currentSlide = index;
      updateCarousel();
    });
  });

  // Auto slide (optional)
  let autoSlideInterval;

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      if (currentSlide < totalSlides - 1) {
        currentSlide++;
      } else {
        currentSlide = 0;
      }
      updateCarousel();
    }, 5000); // Ganti slide setiap 5 detik
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  // Start auto slide
  startAutoSlide();

  // Pause auto slide on hover
  const carousel = document.getElementById("articleCarousel");
  if (carousel) {
    carousel.addEventListener("mouseenter", stopAutoSlide);
    carousel.addEventListener("mouseleave", startAutoSlide);
  }

  // Initialize
  updateCarousel();
})();
