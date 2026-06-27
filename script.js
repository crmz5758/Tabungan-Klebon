let semuaData=[];


fetch("data.json")
.then(res=>res.json())
.then(data=>{

    semuaData=data.anggota;

    document.getElementById("update").innerHTML=
    "Update terakhir : "+data.update;


    document.getElementById("jumlah").innerHTML=
    semuaData.length+" Orang";


    let total=semuaData.reduce((a,b)=>a+b.nominal,0);


    document.getElementById("saldo").innerHTML=
    "Rp "+total.toLocaleString("id-ID");


    tampil(semuaData);

});


function tampil(data){

let tabel=document.getElementById("data");

tabel.innerHTML="";


data.forEach((item,index)=>{

tabel.innerHTML+=`

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

let keyword=this.value.toLowerCase();


let hasil=semuaData.filter(item=>
item.nama.toLowerCase().includes(keyword)
);


tampil(hasil);


});
