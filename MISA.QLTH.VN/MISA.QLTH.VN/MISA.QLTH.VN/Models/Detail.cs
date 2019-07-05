using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MISA.QLTH.VN.Models
{
    public class Detail
    {
        public static List<Detail> ListDetail = new List<Detail>()
        {
             new Detail{TeacherID=new Guid("ce543123-0b19-4cd5-ba83-f07763f98e41"),NumberDKCB="STK00350",CodeISBN="978-604-0-02619-4",Title="Thạch Sanh",NumberVotes= "PM0008",Author="Đào Thọ Dũng",DateBorrow=DateTime.Now ,DatePay= DateTime.Now,DateReport=DateTime.Now,Status= "Chưa trả"},
             new Detail{TeacherID=new Guid("ce543123-0b19-4cd5-ba83-f07763f98e41"),NumberDKCB="STK00330",CodeISBN="978-604-0-08992-3",Title="11 vạn câu hỏi vì sao - Phần 1",NumberVotes= "PM0009",Author="Đào Văn Dũng",DateBorrow=DateTime.Now ,DatePay= DateTime.Now,DateReport=DateTime.Now,Status= "Đã trả"},
             new Detail{TeacherID=new Guid("ce543123-0b19-4cd5-ba83-f07763f98e41"),NumberDKCB="STK00350",CodeISBN="978-604-0-02619-4",Title="Nghìn lẻ 1 đêm",NumberVotes= "PM0011",Author="Đinh Xuân Tiến",DateBorrow=DateTime.Now ,DatePay= DateTime.Now,DateReport=DateTime.Now,Status= "Chưa trả"},
             new Detail{TeacherID=new Guid("ce543123-0b19-4cd5-ba83-f07763f98e41"),NumberDKCB="STK00330",CodeISBN="978-604-0-08992-3",Title="Tấm Cám",NumberVotes= "PM0010",Author="Vũ Trọng Phụng",DateBorrow=DateTime.Now ,DatePay= DateTime.Now,DateReport=DateTime.Now,Status= "Đã trả"},
             new Detail{TeacherID=new Guid("ce543123-0b19-4cd5-ba83-f07763f98e41"),NumberDKCB="STK00353",CodeISBN="978-604-0-08994-2",Title="11 vạn câu hỏi vì sao - Phần 1",NumberVotes= "PM0009",Author="Nguyễn Anh Tâm",DateBorrow=DateTime.Now ,DatePay= DateTime.Now,DateReport=DateTime.Now,Status= "Chưa trả"},
             new Detail{TeacherID=new Guid("ce543123-0b19-4cd5-ba83-f07763f98e42"),NumberDKCB="STK00420",CodeISBN="978-604-0-08992-2",Title="Ba phương pháp giải bài toán hình không gian",NumberVotes= "PM0009",Author="Đào Văn Dũng",DateBorrow=DateTime.Now,DatePay= DateTime.Now,DateReport=DateTime.Now,Status= "Đã trả"},
              new Detail{TeacherID=new Guid("ce543123-0b19-4cd5-ba83-f07763f98e42"),NumberDKCB="STK00420",CodeISBN="978-604-0-08992-2",Title="Toán giải tich",NumberVotes= "PM00030",Author="Đào Văn Dũng",DateBorrow=DateTime.Now,DatePay= DateTime.Now,DateReport=DateTime.Now,Status= "Đã trả"},
               new Detail{TeacherID=new Guid("ce543123-0b19-4cd5-ba83-f07763f98e42"),NumberDKCB="STK00420",CodeISBN="978-604-0-08992-2",Title="Người giàu có nhất thành babylon",NumberVotes= "PM0009",Author="NGuyễn Anh Phúc",DateBorrow=DateTime.Now,DatePay= DateTime.Now,DateReport=DateTime.Now,Status= "Đã trả"},
             new Detail{TeacherID=new Guid("ce543123-0b19-4cd5-ba83-f07763f98e43"),NumberDKCB="STK00291",CodeISBN="978-604-0-02615-4",Title="Tích Chu",NumberVotes= "PM00015",Author="Trần Tiến Đ",DateBorrow=DateTime.Now ,DatePay= DateTime.Now,DateReport=DateTime.Now,Status= "Chưa trả"},
             new Detail{TeacherID=new Guid("ce543123-0b19-4cd5-ba83-f07763f98e44"),NumberDKCB="STK00351",CodeISBN="978-604-0-08992-2",Title="",NumberVotes= "PM00011",Author="Đào Văn Dũng",DateBorrow=DateTime.Now,DateReport=DateTime.Now,Status= "Chưa trả" }
             };
        /// <summary>
        /// mã bạn đọc
        /// </summary>
        public Guid TeacherID { get; set; }
        /// <summary>
        /// </summary>
        public string NumberDKCB { get; set; } //số đk cá biệt
        public string CodeISBN { get; set; } //mã ISBN
        public string Title { get; set; }   //nhan đề
        public string NumberVotes { get; set; }   //phiếu
        public string Author { get; set; }  //tác giả
        public DateTime DateBorrow { get; set; }  //ngày mượn 
        public DateTime DatePay { get; set; } //ngày trả
        public DateTime DateReport { get; set; } //ngày báo
        public string Status { get; set; }  //trạng thái
    }
}   