fetch('data.json')
  .then(res => res.json())
  .then(data => {
    const tbody = document.getElementById('table-body');
    const totalEl = document.getElementById('grand-total');

    let grandTotal = 0;

    data.data.forEach(item => {
      grandTotal += item.total;

      const row = `
        <tr>
          <td>${item.no}</td>
          <td>${item.nama}</td>
          <td>Rp ${item.total.toLocaleString('id-ID')}</td>
        </tr>
      `;

      tbody.innerHTML += row;
    });

    totalEl.innerText = `Rp ${grandTotal.toLocaleString('id-ID')}`;
  });
