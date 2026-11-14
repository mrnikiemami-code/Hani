using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Payments.Domain.Invoices;

/// <summary>Invoice lifecycle state.</summary>
public enum InvoiceStatus
{
    Issued = 0,
    Paid = 1,
    Void = 2
}

/// <summary>
/// Immutable commercial invoice issued for an order.
/// </summary>
public sealed class Invoice : AggregateRoot<Guid>
{
    private Invoice()
    {
    }

    private Invoice(
        Guid id,
        string invoiceNumber,
        Guid orderId,
        string issuer,
        string sellerOfRecord,
        string buyerEmail,
        decimal subtotal,
        decimal tax,
        decimal total,
        string currency,
        DateTimeOffset issuedAt) : base(id)
    {
        InvoiceNumber = invoiceNumber;
        OrderId = orderId;
        Issuer = issuer.Trim();
        SellerOfRecord = sellerOfRecord.Trim();
        BuyerEmail = buyerEmail.Trim().ToLowerInvariant();
        Subtotal = subtotal;
        Tax = tax;
        Total = total;
        Currency = currency.Trim().ToUpperInvariant();
        IssuedAt = issuedAt;
        Status = InvoiceStatus.Issued;
    }

    /// <summary>Human-readable invoice number.</summary>
    public string InvoiceNumber { get; private set; } = string.Empty;

    /// <summary>Order id.</summary>
    public Guid OrderId { get; private set; }

    /// <summary>Invoice issuer.</summary>
    public string Issuer { get; private set; } = string.Empty;

    /// <summary>Seller of record.</summary>
    public string SellerOfRecord { get; private set; } = string.Empty;

    /// <summary>Buyer email.</summary>
    public string BuyerEmail { get; private set; } = string.Empty;

    /// <summary>Pre-tax amount.</summary>
    public decimal Subtotal { get; private set; }

    /// <summary>Tax amount.</summary>
    public decimal Tax { get; private set; }

    /// <summary>Total amount.</summary>
    public decimal Total { get; private set; }

    /// <summary>Currency.</summary>
    public string Currency { get; private set; } = string.Empty;

    /// <summary>Invoice state.</summary>
    public InvoiceStatus Status { get; private set; }

    /// <summary>Issue time.</summary>
    public DateTimeOffset IssuedAt { get; private set; }

    /// <summary>Creates an invoice.</summary>
    public static Invoice Create(
        IIdGenerator ids,
        Guid orderId,
        string issuer,
        string sellerOfRecord,
        string buyerEmail,
        decimal subtotal,
        decimal tax,
        decimal total,
        string currency,
        DateTimeOffset? now = null)
    {
        if (orderId == Guid.Empty ||
            string.IsNullOrWhiteSpace(issuer) ||
            string.IsNullOrWhiteSpace(sellerOfRecord) ||
            string.IsNullOrWhiteSpace(buyerEmail) ||
            string.IsNullOrWhiteSpace(currency) ||
            total < 0)
        {
            throw new ArgumentException("Invoice parties, currency, and non-negative total are required.");
        }

        var id = ids.NewId();
        return new Invoice(
            id,
            $"INV-{id.ToString("N")[..12].ToUpperInvariant()}",
            orderId,
            issuer,
            sellerOfRecord,
            buyerEmail,
            subtotal,
            tax,
            total,
            currency,
            now ?? DateTimeOffset.UtcNow);
    }

    /// <summary>Marks the invoice paid.</summary>
    public void MarkPaid() => Status = InvoiceStatus.Paid;

    /// <summary>Voids the invoice.</summary>
    public void Void() => Status = InvoiceStatus.Void;
}
