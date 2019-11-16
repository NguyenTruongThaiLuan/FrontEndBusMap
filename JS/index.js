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
            { value: "07 : Chợ Lớn‎ → Bãi Hậu Cần Số 1", url: "so7.html" },
            { value: "18 : Sài Gòn ‎→ Hiệp Thành", url: "so18.html" },
            { value: "24 : 19/5 ‎→ Bến Xe Miền Đông", url: "so24.html" },
            { value: "148 : Cần Số 1‎ → Bến Xe Miền Tây", url: "so148.html" }
        ],
        select: function(event, ui) {
            window.location = ui.item.url;
        }
    });
});