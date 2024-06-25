$(document).ready(function() {

    loadData();

    $('#productForm').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: 'https://app.magento.test/test/save_data.php',
            method: 'POST',
            data: $(this).serialize(),
            success: function(response) {
                loadData();
                $('#productForm')[0].reset();
            },
            error: function(xhr, status, error) {
                console.error("Form submission failed: ", status, error);
            }
        });
    });
});

function loadData() {
    $.ajax({
        url: 'https://app.magento.test/test/load_data.php',
        method: 'GET',
        success: function(data) {
            let products = JSON.parse(data);
            console.log(data)
            let totalValueSum = 0;
            let rows = '';

            products.forEach(function(product, index) {
                let totalValue = product.quantityInStock * product.pricePerItem;
                totalValueSum += totalValue;
                rows += `
                    <tr>
                        <td>${product.productName}</td>
                        <td>${product.quantityInStock}</td>
                        <td>&#x24;${product.pricePerItem}</td>
                        <td>${product.datetimeSubmitted}</td>
                        <td>&#x24;${totalValue}</td>
                        <td>
                            <button class="btn btn-secondary" onclick="editProduct(${index})">Edit</button>
                        </td>
                    </tr>
                `;
            });

            rows += `
                <tr>
                    <td colspan="4"><strong>Total</strong></td>
                    <td><strong>&#x24;${totalValueSum}</strong></td>
                    <td></td>
                </tr>
            `;

            $('#productTable').html(rows);
        },
        error: function(xhr, status, error) {
            console.error("Data loading failed: ", status, error);
        }
    });
}

function editProduct(index) {
    let product = $(`#productTable tr:eq(${index})`);
    let productName = product.find('td:eq(0)').text();
    let quantityInStock = product.find('td:eq(1)').text();
    let pricePerItem = product.find('td:eq(2)').text();

    $('#productName').val(productName);
    $('#quantityInStock').val(quantityInStock);
    $('#pricePerItem').val(pricePerItem);

    $('#productForm').append(`<input type="hidden" name="index" value="${index}">`);
}
