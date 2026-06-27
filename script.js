fetch("data.json")

.then(response => response.json())

.then(data => {


    // tampil total

    document.getElementById("total").innerHTML =
    "Rp " + data.total.toLocaleString("id-ID");



    let tabel = document.getElementById("dataTabungan");


    data.anggota.forEach((item,index)=>{


        let row = `

        <tr>

            <td>${index+1}</td>

            <td>${item.nama}</td>

            <td>
            Rp ${item.nominal.toLocaleString("id-ID")}
            </td>

        </tr>

        `;


        tabel.innerHTML += row;


    });


});
