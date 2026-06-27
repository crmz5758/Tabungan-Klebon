const API_URL = "https://script.google.com/macros/s/AKfycbwPWEHzyDgVo4Jplk-jMWfGxixRRpYfNLWLuX3cnxopvvBCkq4xmpaZE2rbKWKgpM0/exec";

let semuaAnggota = [];

const totalAnggota = document.getElementById("totalAnggota");
const totalSaldo = document.getElementById("totalSaldo");
const tableBody = document.getElementById("tableBody");
const search = document.getElementById("search");
const tanggal = document.getElementById("tanggal");

function rupiah(angka) {
    return "Rp" + Number(angka).toLocaleString("id-ID");
}

function renderTable(data) {

    tableBody.innerHTML = "";

    if (data.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="3" style="text-align:center;padding:30px">
                    Data tidak ditemukan
                </td>
            </tr>
        `;
        return;
    }

    data.forEach(item => {

        tableBody.innerHTML += `
            <tr>
                <td>${item.no}</td>
                <td>${item.nama}</td>
                <td>${rupiah(item.saldo)}</td>
            </tr>
        `;

    });

}

async function loadData() {

    try {

        const response = await fetch(API_URL);
        const data = await response.json();

        semuaAnggota = data.anggota;

        tanggal.textContent =
            "Update Terakhir : " +
            new Date(data.updateTerakhir).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric"
            });

        totalAnggota.textContent = semuaAnggota.length;

        const total = semuaAnggota.reduce((a, b) => a + Number(b.saldo), 0);

        totalSaldo.textContent = rupiah(total);

        renderTable(semuaAnggota);

    } catch (err) {

        console.error(err);

        tanggal.textContent = "Gagal mengambil data.";

    }

}

search.addEventListener("input", () => {

    const keyword = search.value.toLowerCase();

    const hasil = semuaAnggota.filter(item =>
        item.nama.toLowerCase().includes(keyword)
    );

    renderTable(hasil);

});

loadData();
