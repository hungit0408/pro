using System;
using System.Collections.Generic;
using System.Linq;
namespace MISA.QLTH.VN.Models
{
    public class TeacherReader
    {
        public static List<TeacherReader> ListTeacherReader = new List<TeacherReader>()
        {
            new TeacherReader{TeacherReaderID= new Guid("ce543123-0b19-4cd5-ba83-f07763f98e41"),ReaderCard="GV0001",TeacherReaderName= "Nguyễn Mạnh", Birthday=new DateTime(1998,10,12), Mobile="0977340334", Address="Hà nội",Gender="Nam",Office="Tổ-Anh - Văn",DateCreate=new DateTime(2017,12,03),DateValid=new DateTime(2017,12,03),DateInValid=new DateTime(2020,12,03),ImagePath="nam.jpg" },
            new TeacherReader{TeacherReaderID= new Guid("ce543123-0b19-4cd5-ba83-f07763f98e42"),ReaderCard="GV0002",TeacherReaderName= "Nguyễn Hoàng", Birthday=new DateTime(1997,9,11), Mobile="0977340334", Address="Hà nội",Gender="Nam",Office="Tổ Sử - Địa - GDCD",DateCreate=new DateTime(2017,12,03),DateValid=new DateTime(2017,12,03),DateInValid=new DateTime(2020,12,03),ImagePath="nam.jpg" },
            new TeacherReader{TeacherReaderID= new Guid("ce543123-0b19-4cd5-ba83-f07763f98e43"),ReaderCard="GV0003",TeacherReaderName= "Hoàng Văn Tuấn", Birthday=new DateTime(1996,8,7), Mobile="0977340334", Address="Hà nội",Gender="Nam",Office="Tổ Ngữ văn",DateCreate=new DateTime(2017,12,03),DateValid=new DateTime(2017,12,03),DateInValid=new DateTime(2020,12,03),ImagePath="nam.jpg" },
            new TeacherReader{TeacherReaderID= new Guid("ce543123-0b19-4cd5-ba83-f07763f98e44"),ReaderCard="GV0004",TeacherReaderName= "Nguyễn Mạnh Duy", Birthday=new DateTime(2000,11,12), Mobile="0977340334", Address="Hà nội",Gender="Nam",Office="Tổ Lý - Công nghệ",DateCreate=new DateTime(2017,12,03),DateValid=new DateTime(2017,12,03),DateInValid=new DateTime(2020,12,03),ImagePath="nam.jpg"},
            new TeacherReader{TeacherReaderID= new Guid("ce543123-0b19-4cd5-ba83-f07763f98e45"),ReaderCard="GV0005",TeacherReaderName= "Trần Đức Công", Birthday=new DateTime(1996,8,9), Mobile="0977340334", Address="Hà nội",Gender="Nam",Office="Tổ Toán - Tin",DateCreate=new DateTime(2017,12,03),DateValid=new DateTime(2017,12,03),DateInValid=new DateTime(2020,12,03),ImagePath="nam.jpg"},
            new TeacherReader{TeacherReaderID= new Guid("ce543123-0b19-4cd5-ba83-f07763f98e46"),ReaderCard="GV0006",TeacherReaderName= "Nguyễn Thị Ngọc Linh", Birthday=new DateTime(1995,12,10), Mobile="0977340334", Address="Hà nội",Gender="Nữ",Office="Tổ Lý - Công nghệ",DateCreate=new DateTime(2017,12,03),DateValid=new DateTime(2017,12,03),DateInValid=new DateTime(2020,12,03),ImagePath="nu.jpg"},
            new TeacherReader{TeacherReaderID= new Guid("ce543123-0b19-4cd5-ba83-f07763f98e47"),ReaderCard="GV0007",TeacherReaderName= "Đoàn Văn Toàn", Birthday=new DateTime(1998,10,30), Mobile="0977340334", Address="Hà nội",Gender="Nam",Office="Tổ Ngữ Văn",DateCreate=new DateTime(2017,12,03),DateValid=new DateTime(2017,12,03),DateInValid=new DateTime(2020,12,03),ImagePath="nam.jpg"},
            new TeacherReader{TeacherReaderID= new Guid("ce543123-0b19-4cd5-ba83-f07763f98e48"),ReaderCard="GV0008",TeacherReaderName= "Chu Minh Sang", Birthday=new DateTime(1997,10,31), Mobile="0977340334", Address="Hà nội",Gender="Nam",Office="Tổ Sử - Địa - GDCD",DateCreate=new DateTime(2017,12,03),DateValid=new DateTime(2017,12,03),DateInValid=new DateTime(2020,12,03),ImagePath="nam.jpg"},
            new TeacherReader{TeacherReaderID= new Guid("ce543123-0b19-4cd5-ba83-f07763f98e49"),ReaderCard="GV0009",TeacherReaderName= "Nghiêm Phú Thiết", Birthday=new DateTime(1999,11,16), Mobile="0977340334", Address="Hà nội",Gender="Nam",Office="Tổ Thể dục",DateCreate=new DateTime(2017,12,03),DateValid=new DateTime(2017,12,03),DateInValid=new DateTime(2020,12,03),ImagePath="nam.jpg"},
            new TeacherReader{TeacherReaderID= new Guid("ce543123-0b19-4cd5-ba83-f07763f98e50"),ReaderCard="GV0010",TeacherReaderName= "Nguyễn Thị Thu Ngân", Birthday=new DateTime(1997,10,17), Mobile="0977340334", Address="Hà nội",Gender="Nữ",Office="Tổ Lý - Công nghệ",DateCreate=new DateTime(2017,12,03),DateValid=new DateTime(2017,12,03),DateInValid=new DateTime(2020,12,03),ImagePath="nam.jpg"},
            new TeacherReader{TeacherReaderID= new Guid("ce543123-0b19-4cd5-ba83-f07763f98e51"),ReaderCard="GV0011",TeacherReaderName= "Nguyễn Thị Minh An", Birthday=new DateTime(2002,10,11), Mobile="0977340334", Address="Hà nội",Gender="Nữ",Office="Tổ Lý - Công nghệ ",DateCreate=new DateTime(2017,12,03),DateValid=new DateTime(2017,12,03),DateInValid=new DateTime(2020,12,03),ImagePath="nu.jpg"},
            new TeacherReader{TeacherReaderID= new Guid("ce543123-0b19-4cd5-ba83-f07763f98e53"),ReaderCard="GV0012",TeacherReaderName= "Đỗ Xuân Quang", Birthday=new DateTime(1996,10,15), Mobile="0977340334", Address="Hà nội",Gender="Nam",Office="Tổ Thể dục",DateCreate=new DateTime(2017,12,03),DateValid=new DateTime(2017,12,03),DateInValid=new DateTime(2020,12,03),ImagePath="nu.jpg"},
            new TeacherReader{TeacherReaderID= new Guid("ce543123-0b19-4cd5-ba83-f07763f98e54"),ReaderCard="GV0013",TeacherReaderName= "Cao Công Hân", Birthday=new DateTime(1995,10,11), Mobile="0977340334", Address="Hà nội",Gender="Nam",Office="Tổ Toán - Tin",DateCreate=new DateTime(2017,12,03),DateValid=new DateTime(2017,12,03),DateInValid=new DateTime(2020,12,03),ImagePath="nam.jpg"},
            new TeacherReader{TeacherReaderID= new Guid("ce543123-0b19-4cd5-ba83-f07763f98e56"),ReaderCard="GV0015",TeacherReaderName= "Đặng Giang Sơn", Birthday=new DateTime(1992,12,25), Mobile="0977340334", Address="Hà nội",Gender="Nam",Office="Tổ Sử - Địa - GDCD",DateCreate=new DateTime(2017,12,03),DateValid=new DateTime(2017,12,03),DateInValid=new DateTime(2020,12,03),ImagePath="nam.jpg"},
            new TeacherReader{TeacherReaderID= new Guid("ce543123-0b19-4cd5-ba83-f07763f98e57"),ReaderCard="GV0015",TeacherReaderName= "NGuyễn Thị Lan Hương", Birthday=new DateTime(1994,10,11), Mobile="0977340334", Address="Hà nội",Gender="Nữ",Office="Tổ Toán - Tin",DateCreate=new DateTime(2017,12,03),DateValid=new DateTime(2017,12,03),DateInValid=new DateTime(2020,12,03),ImagePath="nu.jpg"}




        };    
        /// <summary>
        /// ID bạn đọc
        /// </summary>
        public Guid TeacherReaderID { get; set; }
        /// <summary>
        /// mã bạn đọc
        /// </summary>
        public string ReaderCard { get; set; }
        /// <summary>
        /// tên
        /// </summary>
        public string TeacherReaderName { get; set; }
        /// <summary>
        /// ngày sinh
        /// </summary>
        public DateTime Birthday {get;set;}
        /// <summary>
        /// số điện thoại
        /// </summary>
        public string Mobile { get; set; }
        /// <summary>
        /// địa chỉ
        /// </summary>
        public string Address { get; set; }
        /// <summary>
        ///  giới tính
        /// </summary>
        public string Gender { get; set; }
        /// <summary>
        ///  phòng ban
        /// </summary>
        public string Office { get; set; }
        /// <summary>
        /// ngày cấp
        /// </summary>
        public DateTime DateCreate { get; set; }
        /// <summary>
        /// ngày hiệu lực
        /// </summary>
        public DateTime DateValid { get; set; }
        /// <summary>
        /// ngày hết hạn
        /// </summary>
        public DateTime DateInValid { get; set; }
        /// <summary>
        /// đường dẫn ảnh 
        /// </summary>
        public string ImagePath { get; set; }


    }
}