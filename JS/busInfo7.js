$(document).ready(function() {
    var data;
    $.ajax({
        dataType: "json",
        url: 'http://localhost:8080/BusMap/businfo/findById/7',
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