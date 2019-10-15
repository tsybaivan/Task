using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Database;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public sealed class UserTaskController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserTaskController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<UserTasks> GetUserTasks()
        {
            return _context.UserTasks;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserTasks([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userTasks = await _context.UserTasks.FindAsync(id);

            if (userTasks == null)
            {
                return NotFound();
            }

            return Ok(userTasks);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserTasks([FromRoute] int id, [FromBody] UserTasks userTasks)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != userTasks.Id)
            {
                return BadRequest();
            }

            _context.Entry(userTasks).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserTasksExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> PostUserTasks([FromBody] UserTasks userTasks)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.UserTasks.Add(userTasks);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserTasks", new { id = userTasks.Id }, userTasks);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserTasks([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userTasks = await _context.UserTasks.FindAsync(id);
            if (userTasks == null)
            {
                return NotFound();
            }

            _context.UserTasks.Remove(userTasks);
            await _context.SaveChangesAsync();

            return Ok(userTasks);
        }

        private bool UserTasksExists(int id)
        {
            return _context.UserTasks.Any(e => e.Id == id);
        }
    }
}