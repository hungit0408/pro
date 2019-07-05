/*
 *Màn hình bạn đọc
 * nnDuong 11/6/2019 
 */
$(document).ready(function () {
    $('html').focus();
    //$('.tool_register_read').hover(function () {
    //    //$('.table_tool_left .tool_register_read span').addClass('change').attr('data-content', 'bar');
    //    //css('background-image', 'url("/Contents/Images/line_blue_register_reader.png.gif")');
    //}, function () {
    //    $(this).removeClass('.register_tool_over');
    //});
    //$('.master.flex-1.context-menu-one').resizable();
    var homePage = new HomePage();
});
// class bạn đọc
class HomePage extends Base {
    constructor() {
        var data = "abc";
        var key = "TeacherReaderID";
        super(key, data);
        // khởi tạo sự kiện
        this.initEvent();
        this.hoverToolbar();
        // tạo datepicker
        this.datePicker();
        // focus input đầu tiên
        this.inputFocus();
        this.hoverIconToolbarSeperate();
        this.slideShowMenu();
        // tắt dropdown
        this.turnOffDropDown();
        // click dropdown
        this.eventClickDropDown();
        // click nút lọc
        this.eventClickBtnManipulation();
        // event resize window
        this.onResizeWindow();
        // tạo short cut
        this.shortCut();
        

    }
    
    btnResizeTableTitle() {
        if ($('.details').is(':visible')) {
            $('.details').css('display', 'none');
        }
        else {
            $('.details').css('display', 'block');
        }
    }
    /*
     * CreateBy:NNDUONG 2/7/2019
     * hàm tạo short cut cho trang bạn đọc
     * */
    shortCut() {
    }
    /**
     * CreateBy:NNDuong 2/7/2019
     * gán sự kiện
     * */
    initEvent() {
        // click vào nút phân trang bạn đọc
        //tbody focus->event nút ấn
        $('.table_title tbody').on('keydown', this.clickRowTableMasterOnChange.bind(this));
        //click dòng bảng master
        $(document).on('click', '.table_title tbody tr', this.clickRowTableMasterOnChange.bind(this));
        // click vao nut resize bang table title
        $(document).on('click', '.ic_resize_table', this.btnResizeTableTitle.bind(this));
        // click vào nút 
        $(document).on('click', '.to_next_reader', this.eventClickNextPage.bind(this));
    }
    /**
 * CreateBy:NNDUONG 23/06/2019
 * Thay đổi giao diện nút lọc khi được click
 * * */
    eventClickBtnManipulation() {
        var me = this;
        //khi hover 1 dòng dropdown nút lọc
        $('.manipulation_dropdown .manipulation_dropdown_ele').hover(function () {
            $(this).addClass('x-menu-item-active');
        }, function () {
            $(this).removeClass('x-menu-item-active');
        });
        //tạo một nút nhỏ bên trái nút lọc
        var btnLeft =
            '<div class="btn_left" style="left:0px;position:absolute;height:100%;width:50%;"></div>'
            ;
        var btnRight =
            '<div class="btn_right" style="right:0px;position:absolute;height:100%;width:50%;"></div>';
        //chỉ đến tất cả nút lọc
        var btns = $('.btn_manipulation');
        // thay đổi position relative để chứa nút trái và phải
        $(btns).css('position', 'relative');
        //cho nút trái vào 
        $(btns).append(btnLeft);
        //cho nút phải vào
        $(btns).append(btnRight);
        // duyệt tất cả các nút lọc
        $.each(btns, function (index, btn) {
            var btn_txt = $(btn).find('.btn_manipulation_content .btn_manipulation_wrap span');
            $(btn).find('.btn_left').click(function () {
                //$(btn).addClass('x-btn-default-small-pressed');
                // chi đến chữ trong nút lọc    
                // get text nút lọc
                 btn_txt = $(btn).find('.btn_manipulation_content .btn_manipulation_wrap span');
                var txt = $(btn_txt).text();
                switch (txt) {
                    case '* :':
                        $(btn_txt).replaceWith('<span>= :</span>');
                        break;
                    case '= :':
                        $(btn_txt).replaceWith('<span>+ :</span>');
                        break;
                    case '+ :':
                        $(btn_txt).replaceWith('<span>- :</span>');
                        break;
                    case '- :':
                        $(btn_txt).replaceWith('<span>! :</span>');
                        break;
                    case '! :':
                        $(btn_txt).replaceWith('<span>* :</span>');
                        break;
                    default: break;
                }
            });
            // nếu click vào nút phải
            $(btn).find('.btn_right').click(function () {
                // dừng 
                event.stopPropagation();
                // dropdown nút lọc hiển thị
                if ($('.btn_manipulation ').find('.manipulation_dropdown').is(':visible')) {
                    $('.btn_manipulation ').find('.manipulation_dropdown').remove();
                    return
                }
                // nội dung dropdown
                var htmlDropDownManipulation =
                    '<div class="manipulation_dropdown">' +
                    '<div class="manipulation_dropdown_content">' +
                    '   <div class="line_manipulation_dropdown"></div>' +
                    '  <div class="manipulation_dropdown_content_sub">' +
                    '     <div title="Chứa" class="manipulation_dropdown_ele">' +
                    '        <div></div>' +
                    '       <span>* : Chứa</span>' +
                    '  </div>' +
                    ' <div title="Bằng" class="manipulation_dropdown_ele">' +
                    '    <div></div>' +
                    '   <span>= : Bằng</span>' +
                    ' </div>' +
                    '<div title="Chứa" class="manipulation_dropdown_ele">' +
                    '   <div></div>' +
                    '<span>+ : Chứa</span>' +
                    '</div>' +
                    '<div title="Kết thức bằng" class="manipulation_dropdown_ele">' +
                    ' <div></div>' +
                    '<span>- : Kết thúc bằng</span>' +
                    '</div>' +
                    '<div title="Không chứa" class="manipulation_dropdown_ele">' +
                    '   <div></div>' +
                    '  <span>! : Không chứa</span>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    ' </div>';
                //nút bấm dropdown
                var btnDropDownManipulation = $(this);
                var eleDropDownManipulation = '.manipulation_dropdown_ele';
                var parent = $(btnDropDownManipulation).parent();
                $(parent).append(htmlDropDownManipulation);
                $(parent).css('position', 'relative');
                var dropdown = $(parent).find('.manipulation_dropdown');
                //tạo ví trí trong nút lọc
                dropdown.css('top', '22px');
                dropdown.css('left', '0px');
                //không cho hiển thị tất cả các icon dropdown
                dropdown.find('.manipulation_dropdown_ele').find('div').css('display', 'none');
                //tìm chữ trong nút lọc
                var txt = $(this).parent().find('.btn_manipulation_wrap span').text();
                //gán số thự tự tương ứng từng loại chữ lọc
                var number = 0;
                switch (txt) {
                    case '* :':
                        number = 0;
                        break;
                    case '= :':
                        number = 1;
                        break;
                    case '+ :':
                        number = 2;
                        break;
                    case '- :':
                        number = 3;
                        break;
                    case '! :':
                        number = 4;
                        break;
                    default:
                        break;
                }
                var allDropDownEle = $(dropdown).find(eleDropDownManipulation);
                //chỉ đến hàng đã chọn từ icon
                var dropDownEleSelected = $(allDropDownEle).get(number);
                //tìm thẻ div chứa icon
                var divIcon = $(dropDownEleSelected).find('div');
                $(divIcon).css('display', 'block');

                //tạo sự kiện hover từng phần tử trong dropdown
                $(dropdown).find(eleDropDownManipulation).hover(function () {
                    $(this).addClass('x-menu-item-active');
                }, function () {
                    $(this).removeClass('x-menu-item-active');
                });
                //nếu hiển thị thì xóa
                $(document).click(function () {
                    if ($('.manipulation_dropdown').is(':visible')) {
                        $(parent).find('.manipulation_dropdown').remove();
                    }
                });
                ////xét sự kiện click cho phần tử trong dropdown
                //$(dropdown).find(eleDropDownManipulation).click(function () {
                //    var txt = $(this).find('span').text();
                //    debugger
                //    //không cho hiển thị tất cả các icon dropdown
                //});
                $.each(allDropDownEle, function (index, item) {

                })
                // duyệt tất cả các dòng dropdown nút lọc
                $.each(allDropDownEle, function (index, item) {
                    var txt = $(item).find('span').text();
                    var btn_txt = $(btn).find('.btn_manipulation_content .btn_manipulation_wrap span');
                    $(item).click(function () {
                        // lấy text từ dropdown lọc
                        // không hiển thị icon hàng dropdown
                        dropdown.find('.manipulation_dropdown_ele').find('div').css('display', 'none');
                        console.log(me.getTextManipulationDropDown(index));
                        $(btn_txt).replaceWith('<span>' + me.getTextManipulationDropDown(index) + '</span>');
                        //chỉ đến hàng đã chọn từ icon
                        dropDownEleSelected = $(allDropDownEle).get(index);
                        //tìm thẻ div chứa icon
                        var divIcon = $(dropDownEleSelected).find('div');
                        $(divIcon).css('display', 'block');
                    });
                });
                //chưa làm xong
            });

        });
    }
    getTextManipulationDropDown(number) {
        var txt = "";
        switch (number) {
            case 0:
                txt = '* :';
                break;
            case 1:
                txt = '= :';
                break;
            case 2:
                txt = '+ :';
                break;
            case 3:
                txt = '- :';
                break;
            case 4:
                txt = '! :';
                break;
            default:
                break;
        }
        return txt;
    }
    /**
     * CreateBy:NNDUONG 23/06/2019
     * Sự kiện thu nhỏ phóng to cửa số màn hình cột tên bạn đọc độ rộng thay đổi để không bị vỡ bảng (hàng bị to)
     * */
    onResizeWindow() {
        // tìm tất cả các cột bảng table title
        //var colTableTitle = $('.table_column .table_title tr th');
        //// tìm cột cuối cùng
        //var col9 = colTableTitle.get(8);
        //var paddingLeftCol9 = $(col9).css('padding-right');
        //window.onresize = function (event) {
        //    console.log('%' + (window.innerWidth / screen.width)*100);
        //};
    }
    /*
     *Sư kiện input được ấn vào thay đổi màu sắc border của input
     * nnDuong 21/6/2019
     */
    inputFocus() {
        // border input focus
        $('input').focus(function () {
            $(this).parent().css('border-color', '#99bce8');
        });
        // border input thoát focus
        $('input').blur(function () {
            $(this).parent().css('border-color', '#ccc');
        });
    }

    //  slide show cho dropdown menu
    slideShowMenu() {

        $('.slideShowPageMenu').click(function () {
            event.stopPropagation();
            if ($('.biggest_menu_dropdown').is(':hidden')) {

                $('.biggest_menu_dropdown').slideDown(250);
            }
            else if ($('.biggest_menu_dropdown').is(':visible')) {
                $('.biggest_menu_dropdown').slideUp(250);
            }

        });
    }
    /*
     *CreateBy:NNDUONG 23/06/2019
     * click vào vùng khác dropdown thì tắt dropdown
     */
    removeDropDown2(txtClassNameDropDown, containDropDown) {
        $(document).click(function (e) {
            if ($(txtClassNameDropDown).is(':visible')) {
                $(txtClassNameDropDown).css('display', 'none');
                $(containDropDown).find(txtClassNameDropDown).remove();
            }
        });
    }
    // click màn hình tắt dropdown
    turnOffDropDown() {
        $(document).click(function (e) {
            if ($('.application_box').is(':visible')) {
                $('.application_box').slideUp(250);
            }
            if ($('.option_user_account').is(':visible')) {
                $('.option_user_account').css('display', 'none');
            }
            if ($('.list_gender1').is(':visible')) {
                $('.list_gender1').css('display', 'none');
            }
            if ($('.list_gender2').is(':visible')) {
                $('.list_gender2').css('display', 'none');
            }


        });

    }
    //$(document).ready(function () {
    //    $('.logo_right_dropdown').click(function () {
    //        event.stopPropagation();

    //        if ($('.option_user_account').is(':hidden')) {

    //            $('.option_user_account').css('display', 'block');
    //        }
    //        else if ($('.option_user_account').is(':visible')) {
    //            $('.option_user_account').css('display', 'none');
    //        }
    //    });

    //});
    /*
    *CreateBy:NNDUONG 22/06/2019
    *ham sét tất cả sự kiên dropdown  
    */
    createDropDown(htmlDropDown, btnDropDown,
        containDropDown, classNameDropDown, txtClassNameDropDown, strClassNameInput, eleDropDown) {
        //nếu nội dung dropdown  hiện thị trên màn hình
        if ($(txtClassNameDropDown).length > 0) {
            //xóa đi để không hiển thị 
            $(txtClassNameDropDown).remove();
        }
        //nếu chưa hiển thị
        else {
            // cho nội dung dropdown ở trong thẻ cha 
            $(containDropDown).append(htmlDropDown);
            // css cho thẻ cha có position là relative để thẻ con nằm trong thẻ cha
            $(containDropDown).css("position", "relative");
            // tạo sự kiện click vào các phần khác thì tắt dropdown
            this.removeDropDown2(txtClassNameDropDown, containDropDown);
            // click một nội dung dropdown
            $(eleDropDown).click(function () {
                // tìm ô input
                var ip = $(containDropDown).find(strClassNameInput);
                // lấy chữ trong li
                var txt = $(this).text();
                // cho chữ vào trong input
                ip.val(txt);
            });
        }
    }
    /*
     * các sự kiện click tạo dropdown
     * CreateBy: NNDUONG 23/06/2019
     * */
    eventClickDropDown() {
        var me = this;
        $('.btn_option_gender2').click(function () {
            event.stopPropagation();
            if ($('.list_gender2').is(':hidden')) {

                //td la cha của ô input và nút bấm chọn giới tính
                var td = $(this).parent().parent().parent();
                td.css('position', 'relative');
                $('.list_gender2').css('display', 'block');
                $('.table_column_option_dropdown.list_gender2 ul li').click(function () {
                    // tìm ô input
                    var ip = td.find('.ip_gender');
                    // lấy chữ trong li
                    var txt = $(this).text();
                    // cho chữ vào trong input
                    ip.val(txt);
                });
            }
            else if ($('.list_gender2').is(':visible')) {
                $(this).parent().css('position', 'none');
                $('.list_gender2').css('display', 'none');
            }
        });

        //dropdown giới tính trên bảng dánh sách học sinh
        //nội dung dropdown
        var htmlDropDownGender =
            '<div class="table_column_option_dropdown list_gender1" style="cursor: pointer; display: block;width:100%;left:3px;top:56px; ">' +
            '<ul>' +
            '<li title="Nam">Nam</li>' +
            '<li title="Nữ">Nữ</li>' +
            '</ul>' +
            '</div>';
        //nút bấm dropdown
        var btnDropDownGender = $('.btn_option_gender1');
        // thẻ cha chứa dropdown
        var containDropDownGender = $('.table_column thead tr th').get(4);
        // tên class dropdown
        var txtClassNameDropDownGender = '.list_gender1';
        // chỉ đến dropdown
        var classNameDropDownGender = $('.list_gender1');
        // tên class Input truyền nội dung dropdown
        var strClassNameInputGender = '.ip_gender';
        // chỉ đến phần tử trong dropdown
        var eleDropDownGender = '.table_column_option_dropdown ul li';
        // gọi hàm tạo dropdown dòng 124
        $(btnDropDownGender).click(function () {
            event.stopPropagation();
            me.createDropDown(htmlDropDownGender, btnDropDownGender, containDropDownGender,
                classNameDropDownGender, txtClassNameDropDownGender, strClassNameInputGender, eleDropDownGender);
        });

        //dropdown nút phân trang
        //nội dung dropdown
        var tableGender3 = '<div class="table_column_option_dropdown list_gender3" style="cursor:pointer;display: block ;width:100%;left:0;top:25px;">' +
            '<ul>' +
            '<li title="10">10</li>' +
            '<li title ="20"> 20</li > ' +
            '<li title = "50" > 50</li > ' +
            '<li title = "100" > 100</li > ' +
            '</ul >' +
            '</div >';
        //nút bấm dropdown 
        var btnDropDown = $('.btn_option_gender3');
        // thẻ cha chứa dropdown
        var containDropDown = $('.wrap_drop_down3');
        // chỉ đến dropdown
        var classNameDropDown = $('.list_gender3');
        // tên class dropdown
        var txtClassNameDropDown = '.list_gender3';
        // tên class Input truyền nội dung dropdown
        var strClassNameInput = '.contain_txt_dropdown';
        // chỉ đến phần tử trong dropdown
        var eleDropDown = '.table_column_option_dropdown ul li';
        // gọi hàm tạo dropdown dòng 124
        $(btnDropDown).click(function () {
            
            event.stopPropagation();
            me.createDropDown(tableGender3, btnDropDown, containDropDown,
                classNameDropDown, txtClassNameDropDown, strClassNameInput, eleDropDown);
            //hàm set sự kiện cho chọn số trang
            me.eventClickNumberRecord();
        });
        //dropdown nút phân trang
        //nội dung dropdown
        var tableGender4 = '<div class="table_column_option_dropdown list_gender4" style="cursor:pointer;display: block ;width:100%;left:0;top:-98px;">' +
            '<ul>' +
            '<li title="10">10</li>' +
            '<li title ="20"> 20</li > ' +
            '<li title = "50" > 50</li > ' +
            '<li title = "100" > 100</li > ' +
            '</ul >' +
            '</div >';
        //nút bấm dropdown 
        var btnDropDown4 = $('.btn_option_gender4');
        // thẻ cha chứa dropdown
        var containDropDown4 = $('.wrap_drop_down4');
        // chỉ đến dropdown
        var classNameDropDown4 = $('.list_gender4');
        // tên class dropdown
        var txtClassNameDropDown4 = '.list_gender4';
        // tên class Input truyền nội dung dropdown
        var strClassNameInput4 = '.contain_txt_dropdown';
        // chỉ đến phần tử trong dropdown
        var eleDropDown4 = '.table_column_option_dropdown ul li';
        // gọi hàm tạo dropdown dòng 124
        $(btnDropDown4).click(function () {
            event.stopPropagation();
            me.createDropDown(tableGender4, btnDropDown4, containDropDown4,
                classNameDropDown4, txtClassNameDropDown4, strClassNameInput4, eleDropDown4);
        });

    }

    // xet su kien date picker
    datePicker() {
        //khi click vao icon lịch
        $(document).on('click', '.date_picker .table_column_calendar', function () {
            //tìm ô input cạnh icon lịch
            var input = $(this).parent().find('.input_date');
            //cấu hình cho datepicker 
            input.datepicker({
                changeYear: true,
                showButtonPanel: true,
                showCurrentAtPos: 3,
                monthNames: ["Tháng một", "Tháng hai", "Tháng ba", "Tháng tư", "Tháng năm", "Tháng sáu", "Tháng bảy", "Tháng tám", "Tháng chín", "Tháng mười", "Tháng mười một", "Tháng mười hai"],
                dayNames: ["Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy", "Chủ nhật"],
                dayNamesShort: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
                dayNamesMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
                weekHeader: "Tuần",
                dateFormat: "dd/mm/yy",
                firstDay: 1,
                isRTL: false,
                showMonthAfterYear: false,
                yearSuffix: ""
            });
            // show date picker và nếu được chọn sẽ truyền vào ô input
            input.datepicker("show");


        });
        $(".date_picker input").mask("99/99/9999");
    }
    // sét sự kiện hover cho các toolbar trên bảng bạn đọc giảng viên
    hoverToolbar() {
        $('.table_tool_left .tool_bar').hover(function () {
            $(this).addClass('tool_bar_hover');
        }, function () {
            $(this).removeClass('tool_bar_hover');
        });
    }
    // thay đổi màn hình sách mượn khi click vào bạn đọc
    clickRowTableMasterOnChange() {
        //tìm row được chọn
        var rowSelected = $('.table_title tbody ').find('.rowSelected');
        var valueKeyAttr = $(rowSelected).attr('key');
        this.loadDataBookBorrowFromServer(valueKeyAttr);
    }
    //hover icon on toolbar của phân trang
    hoverIconToolbarSeperate() {
        $('.seperate_page_sub.to_next').hover(function () {
            $(this).addClass('tool_bar_hover');
        }, function () {
            $(this).removeClass('tool_bar_hover');
        });
        $('.seperate_page_sub.to_last').hover(function () {
            $(this).addClass('tool_bar_hover');
        }, function () {
            $(this).removeClass('tool_bar_hover');
        });
    }
    // slide menu header bạn đọc 
    slideShowMenu() {

        $('.slideShowPageMenu').click(function () {
            event.stopPropagation();
            if ($('.biggest_menu_dropdown').is(':hidden')) {

                $('.biggest_menu_dropdown').slideDown(250);
            }
            else if ($('.biggest_menu_dropdown').is(':visible')) {
                $('.biggest_menu_dropdown').slideUp(250);
            }

        });
    }
    
    // sự kiện click nút chọn số lượng trang bảng bạn đọc
    eventClickNumberRecord() {
        // get div chưa input phân trang
        var parent = $('.btn_option_gender3').parent();
        // tìm input của nơi chưa input nhập số phân trang
        var input = $(parent).find('input');
        // số bản ghi
        var number_record = $('.seperate_page_teacher').find('.number_record_page');
        // lấy tất cả các loại dòng có thể phân trang
        var elementDropDown = $('.list_gender3 ul li');
        $.each(elementDropDown, function (index, item) {
            $(item).click(function () {
                $(number_record).text(input.val());
            });
        })
    }
    // hàm tạo sự kiện click vào trang tiếp theo
    eventClickNextPage() {
        var me = this;
        // get div chưa input phân trang
        var parent = $('.btn_option_gender3').parent();
        // tìm input của nơi chưa input nhập số phân trang
        var input = $(parent).find('input');
        // số bản ghi
        var number_record = $('.seperate_page_teacher').find('.contain_txt_dropdown');
        number_record = $(number_record).val();
        number_record = parseInt(number_record);
        $('.table_title tbody tr').remove();
        var input_seperate = $('.seperate_page_teacher .input_seperate_page:first');
        var txt_page = $(input_seperate).val();
        var number_page = parseInt(txt_page);
        var startPage = (number_page - 1) * parseInt(number_record);
        me.loadData2(startPage, number_record);
    }
}

//function handleClickInput{
//    $('.table_column_manipulation_data .manipulation_data_input input').click(funti)
//}
// lay thong tin tu input luu du lieu
//function addReader() {
//    var table2 = {
//        id: "",
//        falName: "",
//        name: "",
//        idCard: "",
//        office: "",
//        gender: "",
//        dateBirth: "",
//        address: "",
//        dateCreate: "",
//        dateValid: "",
//        dateInValid: ""
//    };
//    var inputs = $('#id_register_reader tr td .input input');
//    var selects = $('#id_register_reader tr td select');
//    $.each(inputs, function (index, item) {
//        var fieldInputRegister = item.getAttribute('fieldInputRegister');
//        if (fieldInputRegister != null) {
//            table2[fieldInputRegister] = item.value;
//        }
//    });
//    $.each(selects, function (index, item) {
//        var fieldInputRegister = item.getAttribute('fieldInputRegister');
//        if (fieldInputRegister != null) {
//            table2[fieldInputRegister] = item.value;
//        }
//    });
//    $.ajax({
//        method: 'POST',
//        url: '/custommers/new',
//        data: JSON.stringify(table2),
//        dateType: 'json',
//        contentType: 'application/json',
//        success: function (res) {

//        },
//        fail: function (res) {

//        },
//        error: function (res) {

//        }

//    });
//    debugger;
//}
//function diaLogAddTeacher() {

//    dialog = $('.dialog_Add_Teacher').dialog({
//        autoOpen: false,
//        height: 325,
//        width: 745,
//        modal: true,
//        buttons: [
//            {
//                text: 'Cất',
//                id: "btnAdd",
//                click: addReader
//            },
//            {
//                text: 'Thoát',
//                id: "btnExit",
//                click: function () {
//                    dialog.dialog('close');
//                }
//            }

//        ]


//    });
//    $('.tool_register_read').click(function () {
//        dialog.dialog('open');
//    });
//    var a = "dialog_Add_Teacher_title";
//    var header = "<div class=" + a + "><i></i><span>Đăng ký bạn đọc</span></div>";
//    $('.ui-dialog .ui-dialog-titlebar').append(header);
//}



