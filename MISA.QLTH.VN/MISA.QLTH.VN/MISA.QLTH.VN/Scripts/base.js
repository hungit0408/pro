// class load data sever
class Base {

    constructor(key, data) {
        this.key = key;
        this.data = data;
    }
    /**
     * Thực hiện load dữ liệu theo bản ghi cố định
     * Created by: NNDUONG (13/06/2019)
     * */

    loadData2(start,numberRecord) {
        var me = this;
        me.data = "";
        $.ajax({
            method: "GET",
            url: "/api/Reader",
            beforeSend: function () {
                $('.loading_img').show();
            },
            complete: function () {
                $('.loading_img').hide();
            }
        }).done(function (response) {
            me.data = response;
            // xóa dữ liệu của bảng
            //không dữ liệu->disable toolbar
            me.enableDisableToolbar(me.data.length);
            for (var i = start; i <= start + numberRecord-1; i++) {
                var teachReader = $(me.data).get(i);
                if (typeof teachReader !== 'undefined')
                    me.addDataTableMaster(teachReader);
                else {
                    console.log(teachReader);
                }
            }
            //$.each(me.data, function (index, item) {
            //    if (index >= numberRecord) return;
            //    // thêm từng dữ liệu tới bảng
            //    me.addDataTableMaster(item);
            //});
            // chọn dòng đầu tiên bảng master
            me.settingOpenMasterForm();
        }).fail(function (response) {
            console.log("load dữ liệu lên bảng table title bị lỗi");
        });

    }
    /**
     * Thực hiện load dữ liệu
     * Created by: NNDUONG (13/06/2019)
     * */
    loadData() {
        var me = this;
        me.data = "";
        $.ajax({
            method: "GET",
            url: "/api/Reader",
            beforeSend: function () {
                $('.loading_img').show();
            },
            complete: function () {
                $('.loading_img').hide();
            }
        }).done(function (response) {
            me.data = response;
            // xóa dữ liệu của bảng
            //không dữ liệu->disable toolbar
            me.enableDisableToolbar(me.data.length);
            $.each(me.data, function (index, item) {
                // thêm từng dữ liệu tới bảng
                me.addDataTableMaster(item);
            });
            // chọn dòng đầu tiên bảng master
            me.settingOpenMasterForm();
        }).fail(function (response) {
            console.log("load dữ liệu lên bảng table title bị lỗi");
        });

    }
    /**
     * CreateBy:NNDUONG 01/07/2019
     * thêm từng dòng tới bảng master
     */

    addDataTableMaster(data) {
        var listFieldName = $('.table_title thead tr th');
        // bỏ đi cột đầu tiên
        listFieldName.splice(0, 1);
        var listTrMaster = $('.table_title tbody tr');
        var trHTML = $('<tr title="Giữ Ctrl hoặc Shift để chọn nhiều"></tr>');
        var j = listTrMaster.length + 1;
        // thêm cột số thứ tự
        trHTML.append('<td ><div>' + j + '</div></td>');
        $.each(listFieldName, function (i, col) {
            //get tên cột
            var fieldName = $(col).attr('fieldName');
            //get loại cột
            var dataType = $(col).attr('dataType');
            //chuyển thành viết thường
            dataType = dataType ? dataType.toLocaleLowerCase() : "";
            var value = data[fieldName] ? data[fieldName] : "";
            var cellHTML;
            // kiểm trả loại dữ liệu
            switch (dataType) {
                case "date":
                    //Định dạng hiển thị ddMMyyyy
                    var dateString = "";
                    value = new Date(value);
                    dateString = value.formatddMMyyyy();
                    // kiểm tra loại ngày để trống
                    if (dateString === '1/1/1' || dateString === "1/1/1" || dateString === "01/01/1" || dateString === "01/1/1" || dateString === "1/01/1") dateString = '';
                    cellHTML = '<td><div style="text-align:center;">' + dateString + '</div></td>';
                    break;
                case "number":
                    //đinh dạng số và hiển thị
                    cellHTML = '<td><div style="text-align:right;">' + value + '</div></td>';
                    break;
                default:
                    cellHTML = '<td><div style="text-align:left;"><span>' + value + '</span></div></td>';
                    break;
            }
            // thêm vào dòng
            trHTML.append(cellHTML);
        });
        // thêm trường key cho dòng
        trHTML.attr('key', data['TeacherReaderID']);
        // thêm vào bảng
        $('.table_column .table_title tbody').append(trHTML);
        var x = $('.table_title tbody tr');
        // thêm tool tip cho dòng
        $.each(x, function (index, item) {
            $(item).tooltip({
                content: "Giữ  Ctrl hoặc Shift để chọn nhiều",
                duration: 0,
                track: true,
                classes: {
                    "ui-tooltip": "table_title_tooltip"
                }
            });
        });
    }
    // kiểm tra dữ liệu -> không-> disable toobar
    enableDisableToolbar(numberRow) {
        if (numberRow <= 0) {
            // bỏ hover
            $('.tool_delete_enable').unbind('mouseenter').unbind('mouseleave');
            // làm nhạt màu
            $('.tool_delete').css('opacity', '0.5');
            // bỏ sự kiện click
            $('.tool_delete').removeClass('tool_delete_enable');
            // tương tự nút sửa, xuất khẩu
            $('.tool_edit_enable').unbind('mouseenter').unbind('mouseleave');
            $('.tool_edit').css('opacity', '0.5');
            $('.tool_edit').removeClass('tool_edit_enable');
            $('.tool_export_enable').unbind('mouseenter').unbind('mouseleave');
            $('.tool_export').css('opacity', '0.5');
            $('.tool_export').removeClass('tool_export_enable');
        }
        // enable tool bar (ngươc lại)
        else {
            $('.tool_delete_enable').bind('mouseenter').bind('mouseleave');
            $('.tool_delete').css('opacity', '1');
            $('.tool_delete').addClass('tool_delete_enable');
            $('.tool_edit_enable').bind('mouseenter').bind('mouseleave');
            $('.tool_edit').css('opacity', '1');
            $('.tool_edit').addClass('tool_edit_enable');
            $('.tool_export_enable').bind('mouseenter').bind('mouseleave');
            $('.tool_export').css('opacity', '1');
            $('.tool_export').addClass('tool_export_enable');
        }
    }
    // chọn bạn đầu tiên
    settingOpenMasterForm() {
        var me = this;// this là đối tượng base
        // set màu cho dòng đầu tiên
        var rowFirt = $('.table_title tbody tr:first');
        rowFirt.addClass('rowSelected');
        $('.table_title tbody').focus();
        // load detail bạn đầu tiên
        var propertyName = $(rowFirt).attr('key');
        this.loadDataBookBorrowFromServer(propertyName);
        // hiện thị tổng số bản ghi
        $('.seperate_page_teacher').find('.sum_record').text(me.data.length);
    }
    // load sách bạn đọc mượn=Guid id
    loadDataBookBorrowFromServer(teacherID) {
        var me = this;
        $.ajax({
            method: "GET",
            url: "/detail/" + teacherID,
            beforeSend: function () {
                $('.loading_ic_rental').show();
                //$./*mobile*/.loading("show");
            },
            complete: function () {
                $('.loading_ic_rental').hide();
            }
        }).done(function (response) {
            me.data = response;
            // bỏ các dòng hiện thị
            $('#table_rental tbody tr').remove();
            $.each(me.data, function (index, item) {
                me.sendDataBookBorrowToClient(item);
            });
        }).fail(function (response) {
            console.log("load dữ liệu lên bảng table title bị lỗi");
        });
    }
    //gửi từng dòng data tới grid detail
    sendDataBookBorrowToClient(bookBorrow) {
        var bodyTableRental = $('#table_rental tbody');
        var colTableRental = $('#table_rental thead tr th span');
        var rowHtml = $('<tr></tr>');
        var cellHtml = "";
        $.each(colTableRental, function (index, item) {
            //get tên cột detail
            var fieldName = $(item).attr('fieldname');
            // get loại cột
            var dataType = $(item).attr('datatype');
            // get giá trị cột
            var value = bookBorrow[fieldName];
            switch (dataType) {
                // nếu là date
                case 'date':
                    if (!value) {
                        cellHtml = '<td style="text-align:center;">' + '</td>';
                    }
                    else {
                        // chuyển từ sever ra date
                        value = new Date(value);
                        // nếu để trống
                        if (value === "1/1/1" || value === "01/01/1" || value === "01/1/1" || value === "1/01/1") {
                            cellHtml = '<td style="text-align:center;" >' + '</td>';
                            break;
                        }
                        // format date ra string
                        cellHtml = '<td style="text-align:center;" >' + value.formatddMMyyyy() + '</td>';
                    }
                    break;
                // nếu là text
                case 'text':
                    if (!value) {
                        cellHtml = '<td style="text-align:left;">' + '</td>';
                    }
                    else {
                        cellHtml = '<td style="text-align:left;">' + value + '</td>';
                    }
                    break;
                case 'status':
                    if (!value) {
                        cellHtml = '<td style="text-align:center;">' + '</td>';
                    }
                    else {
                        if (value === 'Đã trả') {
                            cellHtml = '<td style="text-align:center;"><div class="army_medal_green flex"><span ></span ><div>' + value + '</div></div></td>';
                        }
                        else if (value === 'Chưa trả') {
                            cellHtml = '<td style="text-align:center;"><div class="army_medal_red flex"><span ></span ><div>' + value + '</div></div></td>';
                        }
                    }
                    break;
            }
            // thêm cột detail
            rowHtml.append(cellHtml);
        });
        // thêm dòng table detail
        bodyTableRental.append(rowHtml);
        //$.each(fieldName, function (index, item) {
        //    var value = bookBorrow[item];
        //    var typeData=
        //    var cellHtml = '<td>' + bookBorrow[item] + '</td>';
        //    $(rowHtml).append(cellHtml);
        //});
        //$(bodyTableRental).append(rowHtml);

    }
}
