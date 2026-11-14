namespace Hani.Modules.Payments.Application.Invoices;

/// <summary>
/// Generates a PDF representation of an invoice.
/// </summary>
public interface IInvoicePdfGenerator
{
    /// <summary>
    /// Returns PDF bytes for the supplied invoice.
    /// </summary>
    byte[] Generate(
        string invoiceNumber,
        Guid orderId,
        string issuer,
        string sellerOfRecord,
        string buyerEmail,
        decimal subtotal,
        decimal tax,
        decimal total,
        string currency,
        string status,
        DateTimeOffset issuedAt);
}
