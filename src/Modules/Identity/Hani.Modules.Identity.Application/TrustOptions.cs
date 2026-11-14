namespace Hani.Modules.Identity.Application;

/// <summary>
/// Public trust and support information shown on the marketplace.
/// </summary>
public sealed class TrustOptions
{
    /// <summary>
    /// Support phone number.
    /// </summary>
    public string SupportPhone { get; set; } = string.Empty;

    /// <summary>
    /// Support email.
    /// </summary>
    public string SupportEmail { get; set; } = string.Empty;

    /// <summary>
    /// Enamad trust seal URL.
    /// </summary>
    public string EnamadUrl { get; set; } = string.Empty;

    /// <summary>
    /// Terms and conditions URL.
    /// </summary>
    public string TermsUrl { get; set; } = string.Empty;

    /// <summary>
    /// About page URL.
    /// </summary>
    public string AboutUrl { get; set; } = string.Empty;
}
