// class dialog chung cho mọi dialog
class Dialog {
    constructor(title, element, width, height, classes) {
        // khởi tạo đặc tính dialog
        this.varDialog = $(element).dialog({
            autoOpen: false,
            height: height,
            classes: classes,
            width: width,
            modal: true,
            resizable: false,
            open: function () {
            },
            buttons: [
                {
                    //text: 'Cất',
                    //id: "btnAdd"

                },
                {
                    //text: 'Thoát',
                    //id: "btnExit",
                    //click: function () {
                    //    dialog.dialog('close');
                    //}
                }

            ],
            // khi focus trên dialog
            focus: function (e) {
                //tim tat ca cac tabindex
                var tabIndex = $('.' + classes['ui-dialog']).find('[tabindex]');
                // focus input đầu tiên dialog thêm
                var tabFirst = $(element).find('[tabindex="1"]');
                tabFirst.focus();
                // tab trên nút đóng chuyển tới input dau tien
                $(".ui-dialog-titlebar-close").on("keydown", function (event) {
                    if (event.keyCode === 9 && !event.shiftKey && !event.ctrlKey) {
                        event.preventDefault();
                        
                        // $('.dialog_Add_Teacher').find('.dialog_Add_Teacher input').first().focus();
                        $(tabIndex.get(0)).focus();
                    }
                    // shift tab nut dong chuyen toi nut tab index cuoi cung
                    else if (event.shiftKey && event.which === 9) {
                        $(tabIndex.get(tabIndex.length-1)).focus();
                    }
                });
                
                // shift tab input -> nút đóng
                $(tabIndex.get(0)).on("keydown", function (event) {
                    if (event.shiftKey && event.which===9) {
                        $('.ui-dialog-titlebar-close').focus();
                    }
                });
                // input border đỏ->nhập-> không border đỏ
                var inputs = $('.ui-dialog').find('input');
                $.each(inputs, function (index, item) {
                    // nhả nút
                    $(item).on("keyup", function (event) {
                        var txt = $(this).val();
                        var parent = $(this).parent();
                        // có giá trị-> bỏ border đỏ
                        if (txt !== "" && parent.hasClass("form_text_wrap_invalid")) {
                            parent.removeClass("form_text_wrap_invalid");
                        }
                    });
                });
                //// input nếu ấn enter->focus ô tiếp theo
                //var inputBtn = $('.ui-dialog').find('input, button');
                //$.each(inputBtn, function (index, item) {
                //    $(item).on("keydown", function (event) {
                //        // nếu là enter
                //        if (event.keyCode === 13) {
                //            // tạm dừng
                //            event.preventDefault();
                //            //focus input kế tiếp
                //            var x = inputBtn.get(index + 1);
                //            $(x).focus();
                //        }
                //    });
                //});

            },
            // thoát -> reset dialog
            close: function (event) {
                // bỏ border đỏ
                $(element).find('.form_text_wrap_invalid').removeClass('form_text_wrap_invalid');
                //bỏ title
                $(element).find('input').removeAttr('title');
                // bỏ giá trị input
                $(element).find('input').val("");
                $(element).find('.show_name').text("");
                //thay ảnh mặc đinh
                $(element).find('.img_reader img').replaceWith('<img src="/Contents/images/no-image.jpg">');
            }
        });
        
        // thay title
        this.varDialog.data("uiDialog")._title = function (title) {
            title.html(this.options.title);
        };
        // thay icon dialog
        this.varDialog.dialog('option', 'title', '<div class="ic_dialog"></div> ' + title);


    }

    
   
}