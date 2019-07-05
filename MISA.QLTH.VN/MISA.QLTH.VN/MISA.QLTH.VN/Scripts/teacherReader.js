//"use strict";rowSelect

$(document).ready(function () {


    var teacherReaderJS = new TeacherReaderJS();
    // load data bạn đọc
    teacherReaderJS.loadData();
    teacherReaderJS.validateEvent();
    // chuẩn hóa chuổi nhập tên
    teacherReaderJS.standardizedString();
});
/**
* Đối tượn  JS quản lý các funciton của trang Bạn đọc giáo viên
* Created by: NNDUONG (13/06/2019)
* */
class TeacherReaderJS extends Base {
    constructor() {
        var data = "abc";
        var key = "TeacherReaderID";
        super(key, data);
        this.initEvents();
        // tạo dialog bạn đọc
        this.createDialog();
        // tạo dialog cảnh báo
        this.createAlertDialog();
        //tạo dialog xóa
        this.createDeleteDialog();
        // tạo dialog thông báo
        this.createInformationDialog();
        this.me = this;
        this.shortCut(this);



    }

    /**
     * Create by:NNDUONG(26/06/2019
     * Ham tạo các dialog
     * */
    createDialog() {
        // tạo class cho dialog
        var classes = {
            "ui-dialog": "dialog_add_teacher",
            "ui-dialog-titlebar": "dialog_add_teacher_title_bar",
            "ui-dialog-title": "dialog_add_teacher_title",
            "ui-dialog-titlebar-close": "dialog_add_teacher_close",
            "ui-dialog-content": "dialog_add_teacher_title_content",
            "ui-dialog-buttonpane": "dialog_add_teacher_buttonpane",
            "ui-dialog-buttonset": "dialog_add_teacher_buttonset"
        };
        // tạo dialog
        this.dialogAddTeacher = new Dialog("Đăng ký bạn đọc", '.dialog_Add_Teacher', 745, 325, classes);

        ////thêm ảnh và tiêu đề dialog
        //var a = "dialog_Add_Teacher_title";
        //var header = "<div class=" + a + "><i></i><span>Đăng ký bạn đọc</span></div>";
        //$('.dialog_add_teacher_title_bar').append(header);


        //them hinh anh nut dong
        $('.dialog_add_teacher_close').append('<img></img>');
        // bỏ chữ nút đóng
        $('.dialog_add_teacher_close span:nth-child(1)').remove();
        $('.ui-dialog-buttonset').append('<div class="wrap-flex flex" style="height:25px;"></div>');
        // thêm nút thêm vào dialgo
        $('.dialog_add_teacher_buttonset .wrap-flex.flex').append('<button id="btn_add" class="btn_dialog flex" tabindex="10"><div class="background_btn_save16"></div><div>Cất</div></button>');
        // thêm nút hủy vào dialog
        $('.dialog_add_teacher_buttonset .wrap-flex.flex').append('<button id="btn_cancel" class="btn_dialog btn_cancel flex"tabindex="11"><div class="background_btn_disable16"></div><div>Hủy bỏ</div></button>');
        // thêm class phần dưới dialog
        $('.dialog_add_teacher_buttonpane').addClass('dialog_Add_Teacher_footer');
        // thêm class nút phần chứa button
        $('.dialog_add_teacher_buttonset').addClass('dialog_Add_Teacher_footer_button');
        // thêm dòng kể ngang dialog
        $('.dialog_add_teacher_buttonpane').append('<div class="line_dialog_add_teacher"></div>');


    }
    /**
     * Gán sự kiện cho các Element
     * Created by: NNDUONG (13/06/2019)
     * */
    initEvents() {
        // click nhấn nút đăng ký
        $(document).on('click ', '.tool_register_read_enable', this.btnAddTeacherOnClick.bind(this));
        //click nhấn nút xóa
        $(document).on('click', '.tool_delete_enable', this.btnDeleteTeacherOnClick.bind(this));
        // click nhấn nút thoát dialog cảnh báo
        $(document).on('click', '#dialog_alert_btn_cancel', this.closeDialogDelete.bind(this));
        //enter nút thêm
        //$(document).on('focus', '#btn_add', this.keyBoardEnterOnButton.bind(this));
        // click vào nút xóa của dialog xóa
        $(document).on('click', '.dialog_delete_btn', this.btnAcceptDeleteOnClick.bind(this));
        // click nút nạp
        $(document).on('click', '.tool_charge_enable', this.btnChargeTeacherOnClick.bind(this));
        var me = this;
        // click vào nút thay ảnh
        $(document).on('change', '#uploadImage', function () {
            me.changeImage.call(this, me);
        });
        // click vào dòng bảng bạn đọc
        $(document).on('click', '.table_title tbody tr', this.rowSelect);

        // click vào dòng bảng mượn
        $(document).on('click', '#table_rental tbody tr', this.rowSelect);

        // click vào nút thêm bạn đọc
        $(document).on('click keydown', '#btn_add', function (e) {
            me.eventBtnAdd.call(me, e);
        }.bind(this));


        // click vào nút sửa bạn đọc
        $(document).on('click keydown', '#btn_edit', function (e) {
            me.eventBtnEdit.call(me, e);
        }.bind(this));

        // click vào nút hủy
        $(document).on('click', '#btn_cancel', this.btnCancelOnClick.bind(this));

        // click vào nút chấp nhận cảnh báo
        $(document).on('click', '#dialog_alert_btn_accept', this.btnAcceptAlertOnClick.bind(this));

        // click vào nút x dialog
        $(document).on('click', '.dialog_add_teacher_close', this.btnCancelOnClick.bind(this));

        // click vào nút sửa
        $(document).on('click', '.tool_edit_enable', this.btnEditOnClick.bind(this));
    }

    // hàm phần loại các sự kiện nút add
    eventBtnAdd(e) {
        var me = this;
        if (e.which === 13 && $('#btn_add').is(":focus")) {
            me.btnAddOnClick.call(me, "add");
        }
        else if (e.type === "click") {
            me.btnAddOnClick.call(me, "add");
        }
    }
    // hàm phần loại các sự kiện nút edit
    eventBtnEdit(e) {
        var me = this;
        if (e.which === 13 && $('#btn_edit').is(":focus")) {
            me.btnAddOnClick.call(me, "edit");
        }
        else if (e.type === "click") {
            me.btnAddOnClick.call(me, "edit");
        }
    }
    keyBoardEnterOnButton() {
        var me = this;
        $('#btn_add').on('keydown', function (e) {
            if (e.which === 13) {
                me.btnAddOnClick();
            }
        });
    }
    // click vào chữ thay đổi ảnh
    changeImage(me) {
        //var me = this;
        //var files_data = $(me).prop('files')[0];
        //var form_data = new FormData();
        //if (files_data.length > 0) {
        //    form_data.append('file', files_data);
        //}
        //$.ajax({
        //    type: 'POST',
        //    url: '/api/Reader',
        //    data: form_data,
        //    processData:false,
        //    contentType: false,
        //    cache: false,
        //    dataType: 'text',
        //    success: function (res) {
        //        console.log("thanh cong");
        //    },
        //    fail: function (res) {
        //    },
        //    error: function (res) {
        //    }

        //});
        var input = this;
        // lấy file đầu tiên được chọn
        var fileImage = input.files[0];
        // lấy tên ảnh
        var name = fileImage.name;
        // lấy size ảnh
        var size = fileImage.size / (1024 * 1024);
        // lấy loại ảnh
        var type = fileImage.type;
        var pos = type.indexOf('/');
        //image/png
        var typeFile = type.substring(pos + 1, type.length + 1).toLowerCase();
        // tập các định dạng
        var arrTypeFile = ["jpg", 'png', 'gif', 'jpeg'];
        // nếu không đúng định dạng
        if (!arrTypeFile.includes(typeFile)) {
            var str = 'Hệ thống không cho phép upload file theo định dạng ' + typeFile;
            //var inputAlertDialog = $('.notify_data_exist').find('.wrap_content').find('span');
            //inputAlertDialog.text(str);
            //me.alertDialog.varDialog.dialog('open');
            return;
        }
        // nếu lơn hơn 2 MB
        if (size >= 2) {
            str = 'Kích thước tệp nguồn không được vượt quá 2MB, vui lòng chọn lại';
            //inputAlertDialog = $('.notify_data_exist').find('.wrap_content').find('span');
            //inputAlertDialog.text(str);
            //me.alertDialog.varDialog.dialog('open');
            return;
        }
        // nếu file tồn tại
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            // load ảnh vào <img>
            reader.onload = function (e) {
                $('#dialog_add_teacher_content .img_reader img').attr('src', e.target.result);
            };
            reader.readAsDataURL(input.files[0]);

        }
        // gán file ảnh class
        me.fileImage = fileImage;
    }
    // click vào nút nạp
    btnChargeTeacherOnClick() {
        $('.table_title tbody tr').remove();
        this.loadData();
    }
    // click vào nút 
    btnAcceptAlertOnClick() {
        // tắt dialog alert
        this.alertDialog.varDialog.dialog('close');
        // tắt dialog thông báo
        this.informationDialog.varDialog.dialog('close');
    }
    // click vào nút đóng dialog thêm và sửa
    btnCancelOnClick() {
        var me = this;
        // tắt dialog đăng ký bạn đọc
        me.dialogAddTeacher.varDialog.dialog('close');

    }
    // click vào nút thêm hoặc sửa 
    btnAddTeacherOnClick() {
        var me = this;
        // mở dialog đăng ký bạn đọc
        me.dialogAddTeacher.varDialog.dialog("open");
        // chuyển id nút thêm thành nút sửa
        var btn_edit = $('.dialog_add_teacher').find('#btn_edit');
        btn_edit.removeAttr('id');
        btn_edit.attr('id', 'btn_add');

    }
    //click vào nút đồng ý xóa của dialog xóa
    btnAcceptDeleteOnClick() {
        var me = this;
        var rowSelected = $('.table_title tbody .rowSelected');
        var key = $(rowSelected).attr('key');
        // đóng dialog xóa
        me.deleteDialog.varDialog.dialog("close");
        $.ajax({
            type: 'DELETE',
            url: '/api/Reader/del/' + key,
            success: function (res) {
                $('.table_title tbody tr').remove();
                me.loadData();
            },
            fail: function (res) {

            }
        });
    }
    // đóng dialog xóa grid master
    closeDialogDelete() {
        var me = this;
        me.deleteDialog.varDialog.dialog('close');
    }
    //Sự kiện bấm vào nút xóa
    btnDeleteTeacherOnClick() {
        var me = this;
        //nếu không có hàng
        var rowSelected = $('.table_title tbody .rowSelected');
        if (rowSelected.length <= 0) {
            alert("chọn một hàng");
        }
        // tạo nội dung cho dialog xóa
        var tdCol3 = $('.table_title tbody .rowSelected td:nth-child(3)');
        var strDialog = 'Bạn có thực sự muốn xóa bạn đọc ' + tdCol3.text() + ' đang chọn không ?';
        var inputAlertDialog = $('.notify_data_exist4').find('.wrap_content').find('span');
        inputAlertDialog.text(strDialog);
        // mở dialog xóa
        this.deleteDialog.varDialog.dialog('open');

    }
    /*
     * CreateBy:nnduong 28/06/2019
     * khi cất gửi ảnh lên sever
     * 
     * */
    sendImage() {
        // nếu không tìm thấy ảnh
        if (typeof this.fileImage === 'undefined') return;
        var data = new FormData();
        data.append('file', this.fileImage);
        $.ajax({
            url: '/api/Reader/postFile',
            processData: false,
            contentType: false,
            data: data,
            type: 'POST'
        }).done(function (result) {
            alert("thanh cong" + name);
        }).fail(function (a, b, c) {
            console.log(a, b, c);
        });
    }
    /**
    * Tạo validate cho cho dialog
    * Create by : NNDUONG (18/06/2019)
    */
    validateEvent() {
        //get tất cả các input cần validate
        var fields = $('[isvalidateinput]');
        //duyệt tất các các input
        var me = this;
        $.each(fields, function (index, field) {


            // thêm tooltip cho input chưa được nhập

            //$(field).focus(function () {
            //    var x = $(this).val();
            //    $(this).removeClass("form_text_wrap_invalid");
            //    $(this).tooltip("option", "disabled", true);

            //})
            //sự kiện thoát khỏi input(blur)
            //$(field).onInput(function () {
            //    var x = $(this).val();
            //    if (x) {
            //      
            //        me.removeRequireValidateEmpty(this, "form_text_wrap_invalid");
            //    }
            //});


            // nếu click ra input để trống
            $(field).blur(function () {
                var x = $(this).val();
                if (!x) {
                    // thêm validate
                    me.addRequireValidateEmpty(this, "form_text_wrap_invalid", "Dữ liệu không được để trống");
                }


                else if (x) {
                    // nếu có text thì bỏ validate
                    me.removeRequireValidateEmpty(this, "form_text_wrap_invalid");
                }
            });

        });
        // tìm các ô input date
        var inputDates = $('.dialog_Add_Teacher').find('.input_date');
        $.each(inputDates, function (index, item) {
            // click ra ngoài ô input 
            $(item).blur(function () {
                // thêm validate ngày
                me.validateDate(this, me);
            });
        });
        // get giá trị dropdown cho vào input
        var inputGenders = $('.dialog_Add_Teacher').find('.ip_gender');
        $.each(inputGenders, function (index, item) {
            $(item).blur(function () {
                var valInput = $(this).val();
                if (valInput !== "Nam" && valInput !== "Nữ") {
                    $(this).val("");
                }
            });
        });
    }
    // bỏ validate
    removeRequireValidateEmpty(element, classes) {
        // thêm title
        $(element).removeAttr('title');
        // bỏ class border
        $(element).parent().removeClass(classes);
    }
    // thêm validate 
    addRequireValidateEmpty(element, classes, title) {
        // thêm tooltip
        $(element).tooltip({
            content: '<div class="flex" style=""><div class="ic_alert16" style="margin:2px;"></div><span style="display:block;white-space:nowrap;">' + title + '</span></div>',
            duration: 0,
            track: true,
            open: function (event, ui) {
                ui.tooltip.css("max-width", "600px");
            },
            position: { my: "left+10 bottom+40", at: "" },
            disabled: "true"
            , classes: {
                "ui-tooltip": "highlight"
            }

        });
        // thêm title
        $(element).attr("title", title);
        // thêm border validate
        $(element).parent().addClass(classes);
    }
    // tạo dialog xóa 
    createDeleteDialog() {
        // tạo class dialog xóa
        var classes = {
            "ui-dialog": "dialog_alert",
            "ui-dialog-titlebar": "dialog_alert_header",
            "ui-dialog-content": "dialog_alert_content",
            "ui-dialog-buttonpane": "dialog_alert_footer",
            "ui-dialog-titlebar-close": "dialog_alert_close"
        };
        // tạo dialog
        this.deleteDialog = new Dialog("QLTH.VN", '.notify_data_exist4', 449, 131, classes);
        // thêm ảnh nút xóa
        $('.dialog_alert_close').append('<img></img>');
        $('.dialog_alert_close span:nth-child(1)').remove();

    }
    // tạo dialog thông báo
    createInformationDialog() {
        var classes = {
            "ui-dialog": "dialog_alert",
            "ui-dialog-titlebar": "dialog_alert_header",
            "ui-dialog-content": "dialog_alert_content",
            "ui-dialog-buttonpane": "dialog_alert_footer",
            "ui-dialog-titlebar-close": "dialog_alert_close"
        };
        this.informationDialog = new Dialog("QLTH.VN", '.notify_data_exist2', 372, 100, classes);
        $('.dialog_alert_close').append('<img></img>');
        $('.dialog_alert_close span:nth-child(1)').remove();
        //var a = "dialog_Add_Teacher_title";
        var xdialog = this.informationDialog.varDialog;
        $(xdialog).find('.wrap_content_img').remove();
        //var header = "<div cl ass=" + a + "><i></i><span>QLTH.VN</span></div>";
        //$('.dialog_alert_header').append(header);
    }
    /**
     * tạo dialog cảnh báo
     */
    createAlertDialog() {
        // thêm class dialog cảnh báo
        var classes = {
            "ui-dialog": "dialog_alert",
            "ui-dialog-titlebar": "dialog_alert_header",
            "ui-dialog-content": "dialog_alert_content",
            "ui-dialog-buttonpane": "dialog_alert_footer",
            "ui-dialog-titlebar-close": "dialog_alert_close"
        };
        // tạo dialog cảnh báo
        this.alertDialog = new Dialog("QLTH.VN", '.notify_data_exist', 372, 100, classes);
        // thêm ảnh nút xóa
        $('.dialog_alert_close').append('<img></img>');
        $('.dialog_alert_close span:nth-child(1)').remove();
    }

    /***
     * Xử lý sự kiên add được click
     */

    btnAddOnClick(str) {
        //kiểm tra có phải sự kiện ấn nút enter không
        var me = this;
        //lấy thông tin trên form
        var inputs = $('.dialog_Add_Teacher input');
        inputs.splice(0, 3);
        var teacherReader = {};
        //lấy dữ liệu từ các input
        $.each(inputs, function (index, item) {
            // tìm trường input
            var propertyName = $(item).attr("fieldinputregister");
            // get giá trị từ các input
            var value = $(item).val();
            // tạo dữ liệu cho thực thể
            teacherReader[propertyName] = value;
        });
        var fileImage = this.fileImage;
        // nếu up ảnh
        if (str === 'add') {
            if (typeof fileImage !== "undefined")
                // lấy tên ảnh
                teacherReader['ImagePath'] = fileImage['name'];
            else
                teacherReader['ImagePath'] = "";
        }
        else if (str === 'edit') {
            var pathImage = $('.img_reader').find('img').attr('src').split('/');
            teacherReader['ImagePath'] = $(pathImage).get(pathImage.length - 1);
            debugger
        }
        teacherReader['Mobile'] = '09213123';
        teacherReader['TeacherReaderName'] = $('.dialog_Add_Teacher').find('.show_name').text();
        // kiểm tra có đã nhập đúng chưa
        if (this.focusRequireFocus(this) === false) {
            console.log("focus thất bại");
            return;
        }
        else {
            // kiểm tra mã thẻ trùng
            me.testCodeReaderDuplicate.call(this, teacherReader, str);
        }



    }
    /*
     * CreateBy:nnduong 27/06/2019
     * kiểm tra mã thẻ trùng
     */
    testCodeReaderDuplicate(teacherReader, str) {
        var me = this;

        // kiểm trả nếu là nút trùng
        if (str === "add") {
            var readerCard = teacherReader["ReaderCard"];
            if (readerCard === "") readerCard = 0;
            // kiểm tra đã có id này chưa
            $.ajax({
                method: "GET",
                url: "/api/Reader/" + readerCard + "/ReaderCard",
                success: function (res) {
                    // nếu không có bạn đọc theo id này
                    if (res !== null) {
                        // tạo nội dung dialog cảnh báo
                        var strDialog = 'Mã thẻ ' + readerCard + ' đã được sử dụng. Vui lòng kiểm tra lại.';
                        var inputAlertDialog = $('.notify_data_exist').find('.wrap_content').find('span');
                        inputAlertDialog.text(strDialog);
                        // mở dialog cảnh báo
                        me.alertDialog.varDialog.dialog('open');
                    }
                    // nếu có bạn đọc theo id này
                    else {
                        // validate quan hệ các ngày hiệu lực, ngày cấp, ngày hết hạn
                        me.validateDateOnForm.call(me, teacherReader, teacherReader['DateCreate'], teacherReader['DateValid'], teacherReader['DateInValid'], str);
                    }


                },
                fail: function (res) {
                },
                error: function (res) {
                }
            });
        }
        // nếu là nút sửa sẽ không kiểm tra trùng mã
        if (str === "edit") {
            // validate quan hệ các ngày hiệu lực, ngày cấp, ngày hết hạn
            me.validateDateOnForm.call(me, teacherReader, teacherReader['DateCreate'], teacherReader['DateValid'], teacherReader['DateInValid'], str);
        }

    }

    /**
     * CreateBy:nnduong27/06/2019
     * Sự kiện khi nhân nút cất focus vào require border đỏ đầu tiên
     * */

    focusRequireFocus(dialogAddTeacher) {

        var fields = $('[isvalidateinput]');
        // nếu có ô nhập trống thì thêm border mầu đỏ
        $.each(fields, function (index, textBox) {
            var str = $(textBox).val();
            if ($(textBox).val() === "") {
                dialogAddTeacher.addRequireValidateEmpty(textBox, "form_text_wrap_invalid", "Dữ liệu không được để trống");
            }
        });
        var requires = $('.form_text_wrap_invalid');
        //var inputs = $('.dialog_Add_Teacher');
        //var arrRequire=[];
        //$(inputs, function (index, item) {
        //    
        //    if ($(item).hasAttribute("isvalidateinput")) {
        //        arrRequire.push(item);
        //    }
        //    else if ($(item).parent().hasClass("form_text_wrap_invalid")) {
        //        arrRequire.push(item);
        //    };
        //});
        //
        //$.each(fields, function (index, item) {
        //    if ($(item).val() == "") {
        //        $(item).focus();
        //        return;
        //    }
        //});

        // nếu có nhiều ô phải chưa đúng validate -> focus ô đầu tiên
        if (requires.length > 0) {
            // tìm ô border đỏ đầu tiên 
            var temp = requires.get(0);
            // focus
            $(temp).find('input').focus();
            return false;
        }
        else {
            return true;
        }
        //$.each(requires, function (index, item) {

        //});
    }
    // validate ngày tháng form detail
    validateDateOnForm(teacherReader, dateCreate, dateValid, dateInValid, str) {
        // this là thực thể TeacherReaderJS
        var me = this;
        // nếu ô tạo và ô hiệu lực không trống
        if (dateCreate !== "" && dateValid !== "") {
            if (changeStringToDate(dateCreate) <= changeStringToDate(dateValid)) {//compare end <=, not >=
            }
            else {
                // tạo nội dung dialog cảnh báo
                var strDialog = 'Ngày hiệu lực không được nhỏ hơn ngày cấp';
                var inputAlertDialog = $('.notify_data_exist').find('.wrap_content').find('span');
                inputAlertDialog.text(strDialog);
                // mở dialog cảnh báo
                me.alertDialog.varDialog.dialog('open');
                return false;
            }
        }
        // nếu ô hiệu lực và ô hết hiệu lực không trống
        if (dateInValid !== "" && dateValid !== "") {
            if (changeStringToDate(dateValid) <= changeStringToDate(dateInValid)) {//compare end <=, not >=
            }
            else {
                // tạo nội dung dialog cảnh báo
                strDialog = 'Ngày hết hạn không được nhỏ hơn Ngày hiệu lực';
                inputAlertDialog = $('.notify_data_exist').find('.wrap_content').find('span');
                inputAlertDialog.text(strDialog);
                // mở dialog cảnh báo
                me.alertDialog.varDialog.dialog('open');
                return false;
            }
        }
        // nếu ổ hiệu lực và ô cấp không trống
        if (dateInValid !== "" && dateCreate !== "") {
            if (changeStringToDate(dateCreate) <= changeStringToDate(dateInValid)) {//compare end <=, not >=
            }
            else {
                // tạo nội dung dialog cảnh báo
                strDialog = 'Ngày hết hạn không được nhỏ hơn ngày cấp';
                inputAlertDialog = $('.notify_data_exist').find('.wrap_content').find('span');
                inputAlertDialog.text(strDialog);
                // mở dialog cảnh báo
                me.alertDialog.varDialog.dialog('open');
                return false;

            }
        }
        // nếu là nút thêm
        if (str === "add") {
            this.sendDataOnClient.call(this, teacherReader);
        }
        // nếu là nút sửa
        else if (str === "edit") {
            this.sendEditDataOnClient.call(this, teacherReader);
        }
        return true;

    }
    /*
     * Createby:nnduong
     * 26/6/2019
     * hàm xử lý cảnh báo khi người dùng nhập sai ô nhập ngày trong dialog thêm bạn đọc khi click khỏi input
     * ** */
    validateDate(textBoxDate, dialogAddTeacher) {
        // regex cho ô nhập ngày
        var dateReg = /^(([0-2]?\d{1})|([3][0,1]{1}))\/[0,1]?\d{1}\/(([1]{1}[9]{1}[9]{1}\d{1})|([2-9]{1}\d{3}))$/;
        var valueInput = $(textBoxDate).val();
        // test ô nhập ngày
        if (dateReg.test(valueInput)) {
            // chuyển giá trị từ input sang ngày
            var dateInput = changeStringToDate(valueInput);
        }
        else {

            dateInput = "Invalid Date";
        }
        // giá trị ngày nhỏ nhất
        var dateMin = '01/01/1753';
        // chuyển ngày min-> dạng date
        dateMin = changeStringToDate(dateMin);
        // tìm ký tự "-" nếu không thấy
        if (valueInput.indexOf('_') === -1) {
            // nếu ô nhập không trống và không hợp lệ
            if (dateInput === "Invalid Date" && valueInput !== '') {
                // thêm border đỏ và validate
                dialogAddTeacher.addRequireValidateEmpty(textBoxDate, "form_text_wrap_invalid", valueInput + " không phải là một ngày hợp lệ - phải có dạng dd/mm/yyyy");
            }
            // nếu ô nhập nhỏ hơn ngày min
            else if (dateInput < dateMin) {
                // thêm border đỏ và validate
                dialogAddTeacher.addRequireValidateEmpty(textBoxDate, "form_text_wrap_invalid", "Ngày nhập sau ô này phải sau ngày 01/01/1753");
            }
            // bỏ validate trên dialog
            else {
                dialogAddTeacher.removeRequireValidateEmpty(textBoxDate, "form_text_wrap_invalid");
            }
            // nếu tìm thấy ký tự '_'
        } else {
            // cho ô nhập tới rỗng
            $(textBoxDate).val('');
            // bỏ validate border đỏ và tooltip
            dialogAddTeacher.removeRequireValidateEmpty(textBoxDate, "form_text_wrap_invalid");
        }

    }
    /**
     * Thay đổi dữ liệu sẵn có
     * CREATEBY:NNDUONG 27/06/2019
     * 
     */

    sendEditDataOnClient(teacherReader) {
        var me = this;// this là class TeacherReader
        var rowSelected = $('.rowSelected');// tìm hàng đang chọn
        var teacherReaderID = $(rowSelected).attr('key');// lấy mã bạn guid của bạn đọc
        debugger
        $.each(teacherReader, function (index, item) {
            if (index === 'Birthday' || index === 'DateCreate' || index === 'DateValid' || index === 'DateInValid') {
                teacherReader[index] = changeStringToDate(item);
            }// chuyển đổi string từ các input dạng string sang chuẩn date
        });
        $.ajax({
            method: 'PUT',
            url: '/api/reader/edit/' + teacherReaderID,
            data: JSON.stringify(
                teacherReader
            ),
            contentType: 'application/json',
            dataType: 'json',
            async: true,
            success: function (res) {
                $('.table_title tbody tr').remove();
                me.dialogAddTeacher.varDialog.dialog('close');
                me.informationDialog.varDialog.dialog('open');
                me.loadData();//load lại dữ liệu bảng
            },// nếu thành công
            fail: function (res) {
            },
            error: function (res) {
            }// nếu thất bại
        });
    }

    // gửi dữ liệu tới sever
    sendDataOnClient(teacherReader) {
        // kiểm tra các giá tri trong thực thể là dạng ngày
        $.each(teacherReader, function (index, item) {
            if (index === 'Birthday' || index === 'DateCreate' || index === 'DateValid' || index === 'DateInValid') {
                // đổi string tới date
                teacherReader[index] = changeStringToDate(item);
            }
        });
        var me = this;
        // gửi dữ liệu một bạn đọc tới sever
        $.ajax({
            type: 'POST',
            url: '/api/Reader',
            data: JSON.stringify(teacherReader),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (res) {
                // gửi ảnh tới thư mục 
                me.sendImage.call(me);
                // bỏ hết các dòng trong bảng
                $('.table_title tbody tr').remove();
                // đóng dialog thêm bạn đọc
                me.dialogAddTeacher.varDialog.dialog('close');
                // thêm nội dung dialog thông báo
                var strDialog = 'Cất thành công';
                var inputAlertDialog = $('.notify_data_exist2').find('.wrap_content').find('span');
                inputAlertDialog.text(strDialog);


                // mở dialog thống báo
                me.informationDialog.varDialog.dialog('open');
                // load lại dữ liệu bảng
                me.loadData();
            },
            fail: function (res) {
                alert("that bai");
            },
            error: function (res) {
            }
        });
    }
    /**
     * Xử lý sự kiên nút edit được click
     * bind thông tin lên form
     */
    btnEditOnClick() {
        // kiểm tra nếu không có hàng nào được chọn thì thông báo
        var rowSelected = $('.rowSelected');
        if (rowSelected.length === 0) {
            alert("Vui lòng chọn nhân viên cần chỉnh sửa!");
            return;
        }
        // Lấy id bản ghi đang được chọn:
        var readerId = $(rowSelected).attr('key');
        this.readerId = readerId;
        var me = this;
        // Gọi api lấy dữ liệu nhân viên đang chọn:
        $.ajax({
            method: "GET",
            url: "/api/Reader/" + readerId
        }).done(function (res) {
            // gét tên ô input
            var fields = $("[fieldinputregister]");
            var fullName = res['TeacherReaderName'];
            // kết hợp ô 
            var fName = fullName.split(' ').slice(0, -1).join(' ');
            var lName = fullName.split(' ').slice(-1).join(' ');
            if (fullName !== null) {
                me.dialogAddTeacher.varDialog.find('.show_name').text(fullName);
                // tìm input họ và tên
                $(fields).filter("[fieldinputregister='falName']").val(fName);
                // tìm input tên
                $(fields).filter("[fieldinputregister='lName']").val(lName);


            }
            // bỏ đi 2 phần tử tính từ vị trí 0
            fields.splice(0, 2);
            // duyệt hết các ô input type date
            $.each(fields, function (index, item) {
                var s = $(item).attr('fieldinputregister');
                if (res[s] !== null && $(item).hasClass('input_date')) {
                    var valueField = new Date(res[s]);// chuyển sang dạng Date
                    valueField = valueField.formatddMMyyyy();// chuyển sang dạng chuổi đề hiển thị 
                    $(item).val(valueField);

                }// nếu đây là dữ liệu dạng date thì chuyển tới dạng string
                else {
                    $(item).val(res[s]);
                }// còn không phải date thì truyền vào form luôn
            });

            if (res['ImagePath'] !== "") {
                // thêm đường dẫn ảnh 
                me.dialogAddTeacher.varDialog.find('.img_reader img').attr('src', '/Contents/Images/' + res["ImagePath"]);
            }
            else {
                me.dialogAddTeacher.varDialog.find('.img_reader img').attr('src', '/Contents/Images/no-image.jpg');
            }
        }).fail(function (res) {

        })
        // binding thông tin lên form:
        // mở dialog thêm bạn đọc
        this.dialogAddTeacher.varDialog.dialog("open");
        // thay id cho nút thêm thành  nút sửa
        var btn_add = $('.dialog_add_teacher').find('#btn_add');
        btn_add.removeAttr('id');
        btn_add.attr('id', 'btn_edit');
    }

    /**
        * Set trạng thái row đang được chọn
        * Created by: NNDUONG (13/06/2019)
        * */
    rowSelect() {
        $(this).siblings().removeClass('rowSelected');
        this.classList.add("rowSelected");
    }
    //chuẩn hóa chuỗi khi nhập
    standardizedString() {
        //tim input cua dialog
        var inputs = $('.dialog_Add_Teacher input');
        var inputTypeFile = $(inputs).filter('[type="file"]');
        inputs = jQuery.grep(inputs, function (value) {
            return value !== inputTypeFile.get(0);
        });
        $.each(inputs, function (index, item) {
            $(item).blur(function () {
                // lấy chữ ô input đang focus
                var txt = $(this).val();
                // loại bỏ khoảng trăng 2 bên chữ
                txt = txt.trim();
                // thay thể nhiều dấu trằng bằng 1 dầu trắng
                txt = txt.toString().replace(/\s+/g, " ");
                // thay thế chữ mới đc chuẩn hóa
                $(this).val(txt);

            });

        })
    }

    /**
    * CreateBy :NNDUONG (1/7/2019)
    * tạo phím tắt
    * */

    shortCut(teacherReaderJS) {
        window.addEventListener('keydown', function (e) {
            // nếu ấn nút ctrl +alt+n 
            if (e.ctrlKey === true && e.altKey === true && e.keyCode === 78) {
                e.preventDefault();
                // mở dialog thêm bạn đọc
                teacherReaderJS.dialogAddTeacher.varDialog.dialog('open');
            }
            // nếu ấn nút ctrl + e thì mở dialog sửa
            else if (e.keyCode === 69 && e.ctrlKey === true) {
                e.preventDefault();
                // nếu có dữ liệu thì mở dialog
                if ($('.table_title tbody tr').length > 0)
                    teacherReaderJS.btnEditOnClick();
            }
            else if (e.keyCode === 68 && e.ctrlKey === true) {
                e.preventDefault();
                // nếu có dữ liệu thì mở dialog
                if ($('.table_title tbody tr').length > 0)
                    teacherReaderJS.btnDeleteTeacherOnClick();
            }
            else if (e.keyCode === 82 && e.ctrlKey === true) {
                e.preventDefault();
                // nếu có dữ liệu thì mở dialog
                $('.table_title tbody tr').remove();
                teacherReaderJS.loadData();
            }
        });

        //window.addEventListener('keyup', function (e) {
        //    if (e.which === 69 && e.which === 17 && e.which === 17) {
        //        e.preventDefault();     
        //        teacherReaderJS.btnEditOnClick();
        //    };
        //});
        //window.addEventListener('keyup', function (e) {
        //    if (e.ctrlKey === true  && e.keyCode === 69) {
        //        teacherReaderJS.btnEditOnClick();
        //    }
        //});
        //document.onkeyup = function (e) {
        //    if (e.ctrlKey === true && e.which === 69) {
        //        alert("alo");
        //    }
        //};

        // tạo phím tắt lên xuống
        $('.table_title tbody').on('keydown ', function (event) {

            var rowCurrent = $('.table_title tbody').find('.rowSelected');
            if (!$('.table_title tbody tr:last').hasClass("rowSelected")) {
                // nếu ấn nút lên
                if (event.keyCode === 40) {
                    // tìm dòng trên dòng đang chọn
                    var nextRow = $(rowCurrent).next();
                    // bỏ đi css select dòng đang chọn
                    $(rowCurrent).removeClass('rowSelected');
                    // thêm css select dòng trên
                    $(nextRow).addClass('rowSelected');
                    event.preventDefault();
                }
            }
            if (!$('.table_title tbody tr:first').hasClass("rowSelected")) {
                // nếu ấn nút xuống
                if (event.keyCode === 38) {
                    // tìm dòng dưới dòng đang chọn
                    var preRow = $(rowCurrent).prev();
                    // bỏ css dòng hiện tại
                    $(rowCurrent).removeClass('rowSelected');
                    // thêm css dòng dưới
                    $(preRow).addClass('rowSelected');
                    event.preventDefault();
                }
            }



        });

        //window.onkeydown = function (event) {
        //    var preRow = $('.table_title tbody').find('.rowSelected').prev();
        //    $('.table_title tbody .rowSelected').removeClass('rowSelected');
        //};
    }

}




