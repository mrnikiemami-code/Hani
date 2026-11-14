using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Catalog.Domain.Visas;

/// <summary>
/// Visa destination country with localized content and visa types.
/// </summary>
public sealed class VisaCountry : AggregateRoot<Guid>
{
    private readonly List<VisaCountryTranslation> _translations = [];
    private readonly List<VisaType> _types = [];

    private VisaCountry()
    {
    }

    private VisaCountry(Guid id, string slug, string countryCode) : base(id)
    {
        Slug = slug;
        CountryCode = countryCode;
        CreatedAt = DateTimeOffset.UtcNow;
    }

    /// <summary>
    /// Unique public slug.
    /// </summary>
    public string Slug { get; private set; } = string.Empty;

    /// <summary>
    /// ISO country code.
    /// </summary>
    public string CountryCode { get; private set; } = string.Empty;

    /// <summary>
    /// Creation time.
    /// </summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>
    /// Localized country names.
    /// </summary>
    public IReadOnlyCollection<VisaCountryTranslation> Translations => _translations;

    /// <summary>
    /// Offered visa types.
    /// </summary>
    public IReadOnlyCollection<VisaType> Types => _types;

    /// <summary>
    /// Creates a visa country.
    /// </summary>
    public static VisaCountry Create(IIdGenerator ids, string slug, string countryCode)
    {
        if (string.IsNullOrWhiteSpace(slug) || string.IsNullOrWhiteSpace(countryCode))
        {
            throw new ArgumentException("Slug and country code are required.");
        }

        return new VisaCountry(
            ids.NewId(),
            slug.Trim().ToLowerInvariant(),
            countryCode.Trim().ToUpperInvariant());
    }

    /// <summary>
    /// Adds a translation.
    /// </summary>
    public void AddTranslation(IIdGenerator ids, string locale, string name, string? description = null)
    {
        if (_translations.Any(item => string.Equals(item.Locale, locale, StringComparison.OrdinalIgnoreCase)))
        {
            throw new InvalidOperationException($"Translation '{locale}' already exists.");
        }

        _translations.Add(new VisaCountryTranslation(ids.NewId(), Id, locale, name, description));
    }

    /// <summary>
    /// Adds a visa type.
    /// </summary>
    public VisaType AddType(IIdGenerator ids, VisaTypeInput input)
    {
        var type = new VisaType(
            ids.NewId(),
            Id,
            input.Code,
            input.EntryType,
            input.ProcessingDaysMin,
            input.ProcessingDaysMax,
            input.ValidityDays,
            input.PriceAdult,
            input.PriceChild,
            input.Currency);

        foreach (var document in input.Documents)
        {
            type.AddDocument(ids, document);
        }

        foreach (var step in input.Steps)
        {
            type.AddStep(ids, step);
        }

        foreach (var faq in input.Faqs)
        {
            type.AddFaq(ids, faq.Question, faq.Answer);
        }

        _types.Add(type);
        return type;
    }
}

/// <summary>
/// Localized visa country content.
/// </summary>
public sealed class VisaCountryTranslation : Entity<Guid>
{
    private VisaCountryTranslation()
    {
    }

    internal VisaCountryTranslation(Guid id, Guid countryId, string locale, string name, string? description)
        : base(id)
    {
        CountryId = countryId;
        Locale = locale.Trim().ToLowerInvariant();
        Name = name.Trim();
        Description = description?.Trim();
    }

    /// <summary>Parent country.</summary>
    public Guid CountryId { get; private set; }

    /// <summary>Locale code.</summary>
    public string Locale { get; private set; } = string.Empty;

    /// <summary>Localized name.</summary>
    public string Name { get; private set; } = string.Empty;

    /// <summary>Localized description.</summary>
    public string? Description { get; private set; }
}

/// <summary>
/// Visa product for one country.
/// </summary>
public sealed class VisaType : Entity<Guid>
{
    private readonly List<VisaDocument> _documents = [];
    private readonly List<VisaStep> _steps = [];
    private readonly List<VisaFaq> _faqs = [];

    private VisaType()
    {
    }

    internal VisaType(
        Guid id,
        Guid countryId,
        string code,
        string entryType,
        int processingDaysMin,
        int processingDaysMax,
        int validityDays,
        decimal priceAdult,
        decimal? priceChild,
        string currency) : base(id)
    {
        CountryId = countryId;
        Code = code.Trim();
        EntryType = entryType.Trim();
        ProcessingDaysMin = processingDaysMin;
        ProcessingDaysMax = processingDaysMax;
        ValidityDays = validityDays;
        PriceAdult = priceAdult;
        PriceChild = priceChild;
        Currency = currency.Trim().ToUpperInvariant();
    }

    /// <summary>Parent country.</summary>
    public Guid CountryId { get; private set; }

    /// <summary>Visa code such as Tourist or Business.</summary>
    public string Code { get; private set; } = string.Empty;

    /// <summary>Entry type such as Single or Multiple.</summary>
    public string EntryType { get; private set; } = string.Empty;

    /// <summary>Minimum processing days.</summary>
    public int ProcessingDaysMin { get; private set; }

    /// <summary>Maximum processing days.</summary>
    public int ProcessingDaysMax { get; private set; }

    /// <summary>Validity in days after issue.</summary>
    public int ValidityDays { get; private set; }

    /// <summary>Adult price.</summary>
    public decimal PriceAdult { get; private set; }

    /// <summary>Optional child price.</summary>
    public decimal? PriceChild { get; private set; }

    /// <summary>Price currency.</summary>
    public string Currency { get; private set; } = string.Empty;

    /// <summary>Required documents.</summary>
    public IReadOnlyCollection<VisaDocument> Documents => _documents;

    /// <summary>Application steps.</summary>
    public IReadOnlyCollection<VisaStep> Steps => _steps;

    /// <summary>Frequently asked questions.</summary>
    public IReadOnlyCollection<VisaFaq> Faqs => _faqs;

    internal void AddDocument(IIdGenerator ids, string name) =>
        _documents.Add(new VisaDocument(ids.NewId(), Id, name));

    internal void AddStep(IIdGenerator ids, string description) =>
        _steps.Add(new VisaStep(ids.NewId(), Id, _steps.Count + 1, description));

    internal void AddFaq(IIdGenerator ids, string question, string answer) =>
        _faqs.Add(new VisaFaq(ids.NewId(), Id, question, answer));
}

/// <summary>Required visa document.</summary>
public sealed class VisaDocument : Entity<Guid>
{
    private VisaDocument()
    {
    }

    internal VisaDocument(Guid id, Guid visaTypeId, string name) : base(id)
    {
        VisaTypeId = visaTypeId;
        Name = name.Trim();
    }

    /// <summary>Parent visa type.</summary>
    public Guid VisaTypeId { get; private set; }

    /// <summary>Document name.</summary>
    public string Name { get; private set; } = string.Empty;
}

/// <summary>One visa application step.</summary>
public sealed class VisaStep : Entity<Guid>
{
    private VisaStep()
    {
    }

    internal VisaStep(Guid id, Guid visaTypeId, int sequence, string description) : base(id)
    {
        VisaTypeId = visaTypeId;
        Sequence = sequence;
        Description = description.Trim();
    }

    /// <summary>Parent visa type.</summary>
    public Guid VisaTypeId { get; private set; }

    /// <summary>One-based sequence.</summary>
    public int Sequence { get; private set; }

    /// <summary>Step description.</summary>
    public string Description { get; private set; } = string.Empty;
}

/// <summary>Visa FAQ entry.</summary>
public sealed class VisaFaq : Entity<Guid>
{
    private VisaFaq()
    {
    }

    internal VisaFaq(Guid id, Guid visaTypeId, string question, string answer) : base(id)
    {
        VisaTypeId = visaTypeId;
        Question = question.Trim();
        Answer = answer.Trim();
    }

    /// <summary>Parent visa type.</summary>
    public Guid VisaTypeId { get; private set; }

    /// <summary>Question.</summary>
    public string Question { get; private set; } = string.Empty;

    /// <summary>Answer.</summary>
    public string Answer { get; private set; } = string.Empty;
}

/// <summary>Visa payment summary.</summary>
public sealed record VisaTypeInput(
    string Code,
    string EntryType,
    int ProcessingDaysMin,
    int ProcessingDaysMax,
    int ValidityDays,
    decimal PriceAdult,
    decimal? PriceChild,
    string Currency,
    IReadOnlyList<string> Documents,
    IReadOnlyList<string> Steps,
    IReadOnlyList<VisaFaqInput> Faqs);

/// <summary>Visa FAQ input.</summary>
public sealed record VisaFaqInput(string Question, string Answer);

/// <summary>Visa country translation input.</summary>
public sealed record VisaCountryTranslationInput(string Locale, string Name, string? Description = null);
