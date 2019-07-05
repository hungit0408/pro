using MISA.QLTH.VN.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace MISA.QLTH.VN.Controllers
{
    [RoutePrefix("detail")]
    public class DetailController : ApiController
    {
        // GET: api/Detail
        [HttpGet]
        [Route("{id}")]
        public async Task<IEnumerable <Detail> > Get(Guid id)
        {
            await Task.Delay(10);   
            return Detail.ListDetail.Where(e => e.TeacherID == id);
        }

        // GET: api/Detail/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Detail
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Detail/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Detail/5
        public void Delete(int id)
        {
        }
    }
}
