let semuaData = [];


function updateWaktu(){

    let waktu = new Date();

    document.getElementById("update").innerHTML =
    waktu.toLocaleString("id-ID");

}


updateWaktu();

setInterval(updateWaktu,1000);



fetch("data.json")
.then(response => response.json())
.then(data => {

    semuaData = data.anggota;

    document.getElementById("jumlah").innerHTML =
    semuaData.length + " Orang";


    hitungSaldo(semuaData);


    tampilData(semuaData);

});



function hitungSaldo(data){

    let total = data.reduce(
        (sum,item)=> sum + item.nominal,
        0
    );


    document.getElementById("saldo").innerHTML =
    "Rp " + total.toLocaleString("id-ID");

}



function tampilData(data){

    let tabel = document.getElementById("data");

    tabel.innerHTML = "";


    if(data.length === 0){

        tabel.innerHTML = `
        <tr>
            <td colspan="3">
            Data tidak ditemukan
            </td>
        </tr>
        `;

        return;

    }


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



document
.getElementById("search")
.addEventListener("input",function(){


    let keyword = this.value.toLowerCase();


    let hasil = semuaData.filter(item =>

        item.nama.toLowerCase()
        .includes(keyword)

    );


    tampilData(hasil);


});
