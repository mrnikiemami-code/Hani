using Hani.Api.Configuration;
using Hani.Api.Pipeline;

var builder = WebApplication.CreateBuilder(args);
builder.AddHaniApi();

var app = builder.Build();
app.UseHaniApi();
app.Run();

/// <summary>Entry point marker used by integration tests and tooling.</summary>
public partial class Program;
