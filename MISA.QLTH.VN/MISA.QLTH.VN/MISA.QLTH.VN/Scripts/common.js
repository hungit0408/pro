// chuyển date sang string
Date.prototype.formatddMMyyyy = function () {
    var day = this.getDate();
    var month = this.getMonth()+1;
    var year = this.getFullYear();
    // nếu ngày <10
    if (day < 10) day = '0' + day;
    // nếu tháng <10
    if (month < 10) month = '0' + month;
    return day + '/' + month + '/' + year;
}
//Date.prototype.formatddMMyyyy = function () {
//    var day = this.getDate();
//    var month = this.getMonth() + 1;
//    var year = this.getFullYear();
//    return day + '-' + month + '-' + year;
//}
// định dạng số
Number.prototype.formatMoney = function () {
    return (this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."));
};
//changeStringToDate = function (value) {
//    //ddmmyyyy
//    var day = value.substring(0, 2);
//    var month = value.substring(3, 5);
//    var year = value.substring(6, 10);
//    return month + "," + day + "," + year;
//}
// chuyển chư ra date
changeStringToDate = function (dateStr) {
    // 12/01/1998
    const [day, month, year] = dateStr.split("/");
    return new Date(year, month - 1, day);
}
//de cap nhap input ho va ten
function OnInput(event) {
    //nhận giá trị ô nhập lastname
    var x = document.getElementById("ip_falname").value;
    //nhận giá trị ô nhập firstname
    var y = document.getElementById("ip_name").value;
    // truyền giá last name và first name vào ô họ và tên
    var v = document.getElementById('id_show_name').innerHTML = x + " " + y;
}
    