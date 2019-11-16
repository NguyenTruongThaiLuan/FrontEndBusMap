$(document).ready(function() {

    $('.burger').click(function() {
        $('header').toggleClass('clicked');
    });

    $('nav ul li').click(function() {
        $('nav ul li').removeClass('selected');
        $('nav ul li').addClass('notselected');
        $(this).toggleClass('selected');
        $(this).removeClass('notselected');
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