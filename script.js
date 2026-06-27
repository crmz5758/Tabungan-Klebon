let semuaData = [];


// JAM REALTIME

function updateWaktu(){

    let waktu = new Date();


    let tanggal = waktu.toLocaleDateString(
        "id-ID",
        {
            day:"2-digit",
            month:"long",
            year:"numeric"
        }
    );


    let jam = waktu.toLocaleTimeString(
        "id-ID",
        {
            hour:"2-digit",
            minute:"2-digit",
            second:"2-digit"
        }
    );


    document.getElementById("update").innerHTML =
    tanggal + " | " + jam;

}


updateWaktu();

setInterval(updateWaktu,1000);





// LOAD DATA

fetch("data.json")

.then(response => response.json())

.then(data => {


    semuaData = data.anggota;


    document.getElementById("jumlah").innerHTML =
    semuaData.length + " Orang";


    hitungSaldo(semuaData);


    tampilData(semuaData);


});





// HITUNG TOTAL SALDO

function hitungSaldo(data){


    let total = data.reduce(

        (jumlah,item)=> jumlah + item.nominal,

        0

    );



    document.getElementById("saldo").innerHTML =

    "Rp " + total.toLocaleString("id-ID");


}





// TAMPIL TABEL

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

            <td>
                ${index + 1}
            </td>


            <td>
                ${item.nama}
            </td>


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
.addEventListener("input",function(){


    let keyword = this.value.toLowerCase();



    let hasil = semuaData.filter(item =>


        item.nama
        .toLowerCase()
        .includes(keyword)


    );



    tampilData(hasil);


});
