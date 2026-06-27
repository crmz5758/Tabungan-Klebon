fetch("data.json")
    .then(res => res.json())
    .then(data => {

        const anggota = data.anggota;

        document.getElementById("totalAnggota").textContent = anggota.length;

        const total = anggota.reduce((sum, item) => sum + item.saldo, 0);

        document.getElementById("totalSaldo").textContent =
            "Rp" + total.toLocaleString("id-ID");

    });
