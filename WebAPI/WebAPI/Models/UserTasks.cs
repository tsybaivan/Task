namespace WebAPI.Models
{
    public class UserTasks
    {
        public int Id { get; set; }

        public string TaskName { get; set; }

        public string Description { get; set; }

        public string ClientAddress { get; set; }

        public string StartTime { get; set; }

        public string EndTime { get; set; }
    }
}
