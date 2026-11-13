namespace Hani.Modules.Marketplace.Application;

/// <summary>
/// Public-site URL settings used to build canonical and sitemap links.
/// </summary>
public sealed class SeoOptions
{
    /// <summary>
    /// Absolute public base URL without a trailing slash, for example <c>https://hani.ir</c>.
    /// </summary>
    public string PublicBaseUrl { get; set; } = string.Empty;
}
