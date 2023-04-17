namespace Server.Dto
{
    public class LoginResponseDto
    {
        public string Token { get; set; }
        public UserEditDto User { get; set; }
        public bool LogedIn { get; set; }
    }
}
