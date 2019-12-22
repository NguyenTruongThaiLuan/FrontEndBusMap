$(document).ready(function() {
    var data;
    $.ajax({
        dataType: "json",
        url: 'http://localhost:8080/BusMap/businfo/getBusInfoCommon',
        data: data,
        error: function() {
            $('#info').html('<p>Lỗi Khi đọc dữ liệu</p>');
        },
        success: function(data) {
            // var $title = $('<h1>').text(data.id);
            // var $description = $('<p>').text(data.name);
            $('span#idBus').replaceWith(
                function() {
                    return data.id;
                }
            );
            $('span#busName').replaceWith(
                function() {
                    return data.name;
                }
            );
            $('#busTime').text(data.time);
            $('#busDescription').text(data.description);
            $('#amount').text(data.amount);
            $('#amountForStudent').text(data.amountForStudent);
            $('#numberOfTrips').text(data.numberOfTrips);
            $('#tripDistance').text(data.tripDistance);
            $('#runTime').text(data.runTime);
            $('#routeLength').text(data.routeLength);

        }
    });
});
$(document).ready(function() {
    var data;
    $.ajax({
        dataType: "json",
        url: 'http://localhost:8080/BusMap/businfo/getBusInfoAll',
        data: data,
        error: function() {
            $('#infoBusList').html('<p>Lỗi Khi đọc dữ liệu</p>');
        },
        success: function(data) {
            for (let index = 0; index < data.length; index++) {
                const id = data[index].id;
                const name = data[index].name;
                var $busStationName = "<li class='stop-container' role='stopContainer' tabindex='-1'><div class='stop-wrapper '><a href='so" + id + ".html'>" + id + " : " + name + "</a></div></li>";
                $('#infoBusList').append($busStationName);
            }
        }
    });
});
$(document).ready(function() {
    $("#timTuyenXe").autocomplete({
        source: [
            { value: "07 : Chợ Lớn‎ → Gò vấp", url: "so7.html" },
            { value: "18 : Bến Thành ‎→ Hiệp Thành", url: "so18.html" },
            { value: "24 : Bến Xe Miền Đông ‎→ Hóc Môn", url: "so24.html" },
            { value: "148 : Bến Xe Miền Tây → Gò Vấp", url: "so148.html" }
        ],
        select: function(event, ui) {
            window.location = ui.item.url;
        }
    });
});