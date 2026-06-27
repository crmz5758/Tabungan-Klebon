let semuaData = [];

fetch("data.json")
.then(response => response.json())
.then(data => {

    semuaData = data.anggota;

    updateWaktu();

    setInterval(updateWaktu,1000);

    document.getElementById("jumlah").innerHTML =
    semuaData.length + " Orang";

    hitungSaldo(semuaData);

    tampilData(semuaData);

});


function updateWaktu(){

    let waktu = new Date();

    document.getElementById("update").innerHTML =
    waktu.toLocaleString("id-ID");

}



function hitungSaldo(data){

    let total = data.reduce(
        (jumlah,item)=> jumlah + item.nominal,
        0
    );

    document.getElementById("saldo").innerHTML =
    "Rp " + total.toLocaleString("id-ID");

}



function tampilData(data){

    let tabel = document.getElementById("data");

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
.addEventListener("keyup",function(){

    let keyword = this.value.toLowerCase();


    let hasil = semuaData.filter(item =>
        item.nama.toLowerCase().includes(keyword)
    );


    tampilData(hasil);

});
