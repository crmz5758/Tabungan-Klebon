let semuaData = [];


// AMBIL DATA JSON

fetch("data.json")

.then(response => response.json())

.then(data => {


    semuaData = data.anggota;


    // update terakhir

    document.getElementById("update").innerHTML = data.update;



    // total orang

    document.getElementById("jumlah").innerHTML =
    semuaData.length + " Orang";



    // total saldo

    hitungSaldo(semuaData);



    // tampil tabel

    tampilData(semuaData);


});





// HITUNG SALDO

function hitungSaldo(data){


    let total = data.reduce(
        (jumlah,item)=> jumlah + item.nominal,
        0
    );


    document.getElementById("saldo").innerHTML =
    "Rp " + total.toLocaleString("id-ID");


}





// TAMPIL DATA

function tampilData(data){


    let tabel = document.getElementById("data");


    tabel.innerHTML = "";



    data.forEach((item,index)=>{


        tabel.innerHTML += `

        <tr>

            <td>${index+1}</td>

            <td>${item.nama}</td>

            <td>
            Rp ${item.nominal.toLocaleString("id-ID")}
            </td>

        </tr>

        `;


    });


}





// SEARCH NAMA

document
.getElementById("search")
.addEventListener("keyup",function(){


    let keyword = this.value.toLowerCase();



    let hasil = semuaData.filter(item =>

        item.nama
        .toLowerCase()
        .includes(keyword)

    );



    tampilData(hasil);



});
