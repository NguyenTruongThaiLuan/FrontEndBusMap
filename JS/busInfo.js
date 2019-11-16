$(document).ready(function() {
    var data;
    $.ajax({
        dataType: "json",
        url: 'http://localhost:8899/businfo/findById/24',
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
        url: 'http://localhost:8899/businfo/getBusInfoAll',
        data: data,
        error: function() {
            $('#infoBusList').html('<p>Lỗi Khi đọc dữ liệu</p>');
        },
        success: function(data) {
            for (let index = 0; index < data.length; index++) {
                const id = data[index].id;
                const name = data[index].name;
                var $busStationName = "<li class='stop-container' role='stopContainer' tabindex='-1'><div class='stop-wrapper '><h3>" + id + " : " + name + "</h3></div></li>";
                $('#infoBusList').append($busStationName);
            }
        }
    });
});