let semuaData = [];


function updateWaktu(){

    const sekarang = new Date();

    const tanggal = sekarang.toLocaleDateString("id-ID",{
        day:"2-digit",
        month:"long",
        year:"numeric"
    });

    const jam = sekarang.toLocaleTimeString("id-ID",{
        hour:"2-digit",
        minute:"2-digit",
        second:"2-digit"
    });


    document.getElementById("update").innerHTML =
    tanggal + " | " + jam;

}


setInterval(updateWaktu,1000);
updateWaktu();



fetch("data.json")
.then(res => res.json())
.then(data => {

    semuaData = data.anggota;

    document.getElementById("jumlah").innerHTML =
    semuaData.length + " Orang";

    hitungSaldo(semuaData);

    tampilData(semuaData);

});



function hitungSaldo(data){

    let total = data.reduce(
        (a,b)=>a+b.nominal,
        0
    );

    document.getElementById("saldo").innerHTML =
    "Rp " + total.toLocaleString("id-ID");

}



function tampilData(data){

    let tabel=document.getElementById("data");

    tabel.innerHTML="";


    data.forEach((item,index)=>{

        tabel.innerHTML += `
        <tr>
            <td>${index+1}</td>
            <td>${item.nama}</td>
            <td>Rp ${item.nominal.toLocaleString("id-ID")}</td>
        </tr>
        `;

    });

}



document.getElementById("search")
.addEventListener("input",function(){

    let cari=this.value.toLowerCase();

    let hasil=semuaData.filter(item =>
        item.nama.toLowerCase().includes(cari)
    );

    tampilData(hasil);

});
