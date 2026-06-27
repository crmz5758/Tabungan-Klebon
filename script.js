let semuaAnggota = [];

const totalAnggota = document.getElementById("totalAnggota");
const totalSaldo = document.getElementById("totalSaldo");
const tableBody = document.getElementById("tableBody");
const search = document.getElementById("search");
const tanggal = document.getElementById("tanggal");

function rupiah(angka) {
    return "Rp" + angka.toLocaleString("id-ID");
}

function renderTable(data) {

    tableBody.innerHTML = "";

    if (data.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="3" style="text-align:center;padding:30px;">
                    Data tidak ditemukan
                </td>
            </tr>
        `;

        return;
    }

    data.forEach((item, index) => {

        tableBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.nama}</td>
                <td>${rupiah(item.saldo)}</td>
            </tr>
        `;

    });

}

fetch("data.json")
.then(res => res.json())
.then(data => {

    semuaAnggota = data.anggota;

    tanggal.textContent =
        "Update terakhir : " + data.updateTerakhir;

    totalAnggota.textContent =
        semuaAnggota.length;

    const total = semuaAnggota.reduce((sum, item) => {

        return sum + item.saldo;

    }, 0);

    totalSaldo.textContent =
        rupiah(total);

    renderTable(semuaAnggota);

});

search.addEventListener("keyup", function () {

    const keyword = this.value.toLowerCase();

    const hasil = semuaAnggota.filter(item =>
        item.nama.toLowerCase().includes(keyword)
    );

    renderTable(hasil);

});
