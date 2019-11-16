$(document).ready(function() {
    var data;
    $.ajax({
        dataType: "json",
        url: 'http://localhost:8899/busstation/getBusStationByIdBus/148',
        data: data,
        error: function() {
            $('#infoBusStation').html('<p>Lỗi Khi đọc dữ liệu</p>');
        },
        success: function(data) {
            var listBusStation = [];
            for (let index = 0; index < data.length; index++) {
                const name = data[index].name;
                var $busStationName = "<li class='stop-container' role='stopContainer' tabindex='-1'><div class='stop-wrapper '><h3>" + name + "</h3></div></li>";
                $('#infoBusStation').append($busStationName);

                listBusStation.push(name);

            }
            $('#listBusStation').text(listBusStation.join(' - '));

        }
    });
});