// chạy các hàm
$(document).ready(function () {
    clickRightTableTitle();
});
// hàm tạo sự kiện khi click nút phải
function clickRightTableTitle() {
    // gọi từ thư viện
    $.contextMenu({
        selector: '.context-menu-one',
        callback: function (key, options) {
        },
        // giao diện của context menu
        items: {
            "register": {
                name: "Đăng ký bạn đọc", icon: "add16",
                items: {
                    "fold1-key1": { "name": "Đăng ký bạn đọc từ danh sách giáo viên" },
                    
                }
            },
            "edit": { name: "Sửa", icon: "edit16" },
            "delete": { name: "Xóa", icon: "delete_metro" },
            "load": { name: "Nạp", icon: "refresh16" },
            "sep1": "---------",
            "import": { name: "Nhập khẩu", icon: "import16" },
            "export": { name: "Xuất khẩu", icon: "export16" },
            "sep2": "---------",
            "print": {
                name: "In", icon: "printer16",
                items: {
                    "fold2-key2": { name: "Thẻ thư viện học sinh", icon: "printer16" },
                    "fold3-key3": { name: "Thẻ thư viện học sinh(mã vạch)", icon: "printer16" },
                    "fold4-key4": { name: "Danh sách bạn đọc học sinh", icon: "printer16" },
                }
            },
            "help": { name: "Giúp", icon: "help16" }
        }
    });
    //// tạo màu xanh khi hover 
    //$('.context-menu-item').hover(function () {
    //    $('.context-menu-item').addClass('x-menu-item-active');

    //});
    
}