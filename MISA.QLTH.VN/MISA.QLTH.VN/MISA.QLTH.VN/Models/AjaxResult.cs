using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MISA.QLTH.VN.Models
{
    /// <summary>
    /// AjaxResult
    /// Lưu trữ response trả về cho request client
    /// </summary>
    /// Create date:15/06/2019
    /// Author: Nguyễn Nam Dương
    public class AjaxResult
    {
        /// <summary>
        /// Kết quả lấy dữ liệu
        /// </summary>
        public bool Success { get; set; }
        /// <summary>
        /// Thông điệp
        /// </summary>
        public string Message { get; set; }
        /// <summary>
        /// Dữ liệu
        /// </summary>
        public object Data { get; set; }
    }
}