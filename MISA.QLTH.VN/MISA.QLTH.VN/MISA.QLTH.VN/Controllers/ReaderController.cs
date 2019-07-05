using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.UI.WebControls;
using MISA.QLTH.VN.Models;
using MISA.QLTH.VN.Properties;

namespace MISA.QLTH.VN.Controllers
{
    /// <summary>
    /// Reader Controlller
    /// Controlller của bạn đọc
    /// </summary>
    /// Create date:15/06/2019
    /// Author: Nguyễn Nam Dương
    public class ReaderController : ApiController
    {
        private static List<TeacherReader> readerList = TeacherReader.ListTeacherReader;
        /// <summary>
        /// Lấy danh sách bạn đọc
        /// </summary>
        /// <returns>Ajax Results</returns>
        // GET: api/Reader
        public async Task<IEnumerable<TeacherReader>> Get()
        {
            return readerList;
        }
        /// <summary>
        /// Nhận bạn đọc theo mã bạn đọc
        /// </summary>
        /// <param name="id">mã bạn đọc</param>
        /// <returns>Bạn đọc</returns>
        // GET: api/Reader/5
        public TeacherReader Get(Guid id)
        {
            var teacherReader = TeacherReader.ListTeacherReader.Where(e => e.TeacherReaderID == id).FirstOrDefault();
            return teacherReader;
        }
        /// <summary>
        /// Nhận bạn đọc theo mã thẻ
        /// </summary>
        /// <param name="readerCard">mã thẻ</param>
        /// <returns>bạn đọc</returns>
        [HttpGet]
        [Route("api/Reader/{readerCard}/ReaderCard")]
        public TeacherReader GetByReaderCard(String readerCard)
        {
            var teacherReader = TeacherReader.ListTeacherReader.Where(e => e.ReaderCard == readerCard).FirstOrDefault();
            return teacherReader;
        }
        /// <summary>
        /// Thêm bạn đọc
        /// </summary>
        /// <param name="teacherReader">bạn đọc muốn thêm</param>
        /// <returns>trả về thành công</returns>
        // POST: api/Reader
        [HttpPost]
        public bool Post([FromBody]TeacherReader teacherReader)
        {
            teacherReader.TeacherReaderID = Guid.NewGuid();
            TeacherReader.ListTeacherReader.Add(teacherReader);
            return true;
        }
        /// <summary>
        /// Cập nhật thông tin bạn đọc
        /// </summary>
        /// <param name="teacherReader"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("api/reader/edit/{id}")]
        public async Task<AjaxResult> Put(Guid id,[FromBody]TeacherReader teacherReader)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                await Task.Delay(500);
                //cái này chúng ta sẽ tìm thằng có index của thằng có ReaderID=id,nếu tồn tại thì index>=0 ngược lại =-1
                int index = readerList.FindIndex(x => x.TeacherReaderID==id);
                if (index == -1)// Bạn đọc không tồn tại
                {
                    ajaxResult.Success = false;
                    ajaxResult.Message = Resources.ReaderIsNotExist;
                }
                else
                {
                    ajaxResult.Success = true;
                    ajaxResult.Data = teacherReader;
                    teacherReader.TeacherReaderID = id;//gán ID cho thằng này vi ReaderID của thằng này sẽ là null
                    readerList[index] = teacherReader;// Thay thằng cũ bằng thằng mới
                }
            }
            catch (Exception ex)
            {
                ajaxResult.Success = false;
                Console.WriteLine(ex.Message);
            }
            return ajaxResult;
        }


        /// <summary>
        /// Xóa bạn đọc theo mã bạn đọc
        /// </summary>
        /// <param name="id">mã bạn đọc</param>
        /// <returns>trả về kết quả đúng/sai</returns>
        [Route("api/Reader/del/{id}/")]
        [HttpDelete]
        // DELETE: api/Reader/5
        public async Task<AjaxResult> Delete(Guid id)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                await Task.Delay(500);
                // tìm số thự tự bạn đọc cần xóa
                int index = readerList.FindIndex(x => x.TeacherReaderID == id);

                if (index == -1)// Bạn đọc không tồn tại
                {
                    ajaxResult.Success = false;
                    ajaxResult.Message = Resources.ReaderIsNotExist;
                }
                else
                {
                    ajaxResult.Success = true;
                    TeacherReader.ListTeacherReader.RemoveAt(index);
                    ajaxResult.Message = "Thành công";
                }
            }
            catch (Exception ex)
            {
                ajaxResult.Success = false;
                Console.WriteLine(ex.Message);
            }
            return ajaxResult;
        }
        /// <summary>
        /// Nhận ảnh bạn đọc
        /// </summary>
        /// <returns>trả về kết quả đúng sai</returns>
        [Route("api/reader/postFile")]
        [HttpPost]
        public HttpResponseMessage PostFile()
        {
            HttpResponseMessage result = null;
            //get request 
            var httpRequest = HttpContext.Current.Request;
            //đếm số file trong request nếu >0
            if (httpRequest.Files.Count > 0)
            {
                //nơi địa chỉ của file
                var docfiles = new List<string>();
                foreach (string file in httpRequest.Files)
                {
                    var postedFile = httpRequest.Files[file];
                    //tạo nơi đường dẫn để lưu file
                    var filePath = HttpContext.Current.Server.MapPath(Path.Combine("~/Contents/Images/", postedFile.FileName));
                    //lưu file
                    postedFile.SaveAs(filePath);
                    //lưu vào danh sách đường dẫn
                    docfiles.Add(filePath);
                }
                result = Request.CreateResponse(HttpStatusCode.Created, docfiles);
            }
            else
            {
                result = Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            return result;
        }
    }
}
