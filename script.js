/**
 * EVENTHUB - Sistem Pendaftaran Workshop Informatika
 * Implementasi JavaScript Dasar & Manipulasi DOM (Sesuai Syarat UTS)
 */

document.addEventListener("DOMContentLoaded", function () {
  // 1. Inisialisasi Elemen Form & DOM
  const registrationForm = document.getElementById("registrationForm");
  const summaryContent = document.getElementById("summaryContent");
  const workshopCheckboxes = document.querySelectorAll(".workshop-option");

  // 2. Daftar Biaya Workshop (Struktur Biaya Eksplisit)
  const workshopPrices = {
    "Front-End Web": 150000,
    "UI/UX Design": 125000,
    "Cybersecurity Dasar": 175000
  };

  // 3. Menambahkan Interaktivitas Visual pada Pilihan Workshop (CSS State Toggle)
  workshopCheckboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      const parentLabel = this.closest(".selection-option");
      if (this.checked) {
        parentLabel.classList.add("selected-active");
      } else {
        parentLabel.classList.remove("selected-active");
      }
    });
  });

  // 4. Event Listener Submit Form
  registrationForm.addEventListener("submit", function (event) {
    // Mencegah reload halaman
    event.preventDefault();

    // Mengambil nilai input pengguna
    const nameInput = document.getElementById("name").value.trim();
    const emailInput = document.getElementById("email").value.trim();
    const phoneInput = document.getElementById("phone").value.trim();
    const attendanceDateInput = document.getElementById("attendanceDate").value;
    const sessionInput = document.getElementById("session").value;
    const institutionInput = document.getElementById("institution").value.trim();

    // Membaca Pilihan Tipe Peserta (Radio Button)
    const participantTypeElement = document.querySelector('input[name="participantType"]:checked');
    const participantType = participantTypeElement ? participantTypeElement.value : "";

    // Membaca Pilihan Workshop (Checkbox) melalui Perulangan/Iterasi
    const selectedWorkshops = [];
    let totalCost = 0;

    // Iterasi 1: Memproses workshop yang dipilih dan menghitung total biaya
    for (let i = 0; i < workshopCheckboxes.length; i++) {
      if (workshopCheckboxes[i].checked) {
        const workshopName = workshopCheckboxes[i].value;
        selectedWorkshops.push(workshopName);

        // Mengambil nilai biaya dari struktur harga eksplisit
        if (workshopPrices[workshopName]) {
          totalCost += workshopPrices[workshopName];
        }
      }
    }

    // 5. Validasi Form
    // Validasi dasar: Nama, Email, No HP, Tanggal, dan Minimal 1 Workshop
    const phoneRegex = /^[0-9]{10,13}$/;

    if (nameInput === "") {
      alert("Harap masukkan nama lengkap Anda.");
      return;
    }

    if (emailInput === "" || !emailInput.includes("@")) {
      alert("Harap masukkan alamat email yang valid.");
      return;
    }

    if (!phoneRegex.test(phoneInput)) {
      alert("Nomor HP harus berupa angka dengan panjang 10 - 13 digit.");
      return;
    }

    if (attendanceDateInput === "") {
      alert("Harap pilih tanggal kehadiran.");
      return;
    }

    // Percabangan: Validasi minimal satu workshop dipilih
    if (selectedWorkshops.length === 0) {
      alert("Harap pilih setidaknya satu workshop yang ingin diikuti.");
      return;
    }

    // 6. Formatting Total Biaya ke Format Rupiah (Rp)
    const formattedTotalCost = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(totalCost);

    // 7. Manipulasi DOM untuk Menampilkan Ringkasan Pendaftaran
    // Menyusun string workshop terdaftar
    let workshopListHTML = "";
    for (let j = 0; j < selectedWorkshops.length; j++) {
      workshopListHTML += `<div>• ${selectedWorkshops[j]}</div>`;
    }

    // Memperbarui UI Ringkasan secara Dinamis
    summaryContent.innerHTML = `
      <ul class="summary-data-list">
        <li class="summary-data-item">
          <span>Nama</span>
          <span>${escapeHTML(nameInput)}</span>
        </li>
        <li class="summary-data-item">
          <span>Email</span>
          <span>${escapeHTML(emailInput)}</span>
        </li>
        <li class="summary-data-item">
          <span>Nomor HP</span>
          <span>${escapeHTML(phoneInput)}</span>
        </li>
        <li class="summary-data-item">
          <span>Tipe Peserta</span>
          <span>${escapeHTML(participantType)}</span>
        </li>
        <li class="summary-data-item">
          <span>Institusi</span>
          <span>${escapeHTML(institutionInput)}</span>
        </li>
        <li class="summary-data-item">
          <span>Tanggal Hadir</span>
          <span>${escapeHTML(attendanceDateInput)}</span>
        </li>
        <li class="summary-data-item">
          <span>Sesi</span>
          <span>${escapeHTML(sessionInput)}</span>
        </li>
        <li class="summary-data-item">
          <span>Workshop</span>
          <span>${workshopListHTML}</span>
        </li>
      </ul>

      <div class="summary-total">
        <span class="summary-total-label">Total Biaya</span>
        <span class="summary-total-value">${formattedTotalCost}</span>
      </div>
    `;
  });

  // Helper Function untuk Keamanan (XSS Prevention)
  function escapeHTML(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
});