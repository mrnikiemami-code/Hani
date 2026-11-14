using System.Globalization;
using System.Text;

namespace Hani.Modules.Payments.Application.Invoices;

/// <summary>
/// Minimal dependency-free PDF invoice writer.
/// </summary>
public sealed class InvoicePdfGenerator : IInvoicePdfGenerator
{
    /// <summary>
    /// Generates a single-page PDF invoice.
    /// </summary>
    public byte[] Generate(
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
        DateTimeOffset issuedAt)
    {
        var lines = new[]
        {
            "Hani Invoice",
            $"Invoice: {invoiceNumber}",
            $"Order: {orderId}",
            $"Issuer: {issuer}",
            $"Seller of record: {sellerOfRecord}",
            $"Buyer: {buyerEmail}",
            $"Issued at: {issuedAt:yyyy-MM-dd HH:mm} UTC",
            $"Status: {status}",
            $"Subtotal: {subtotal.ToString("0.00", CultureInfo.InvariantCulture)} {currency}",
            $"Tax: {tax.ToString("0.00", CultureInfo.InvariantCulture)} {currency}",
            $"Total: {total.ToString("0.00", CultureInfo.InvariantCulture)} {currency}"
        };

        var content = new StringBuilder();
        content.Append("BT /F1 12 Tf 50 780 Td 16 TL\n");
        foreach (var line in lines)
        {
            content.Append('(').Append(Escape(line)).Append(") Tj T*\n");
        }

        content.Append("ET");

        var stream = content.ToString();
        var objects = new List<string>
        {
            "<< /Type /Catalog /Pages 2 0 R >>",
            "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
            "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 5 0 R /Resources << /Font << /F1 4 0 R >> >> >>",
            "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
            $"<< /Length {Encoding.ASCII.GetByteCount(stream)} >>\nstream\n{stream}\nendstream"
        };

        var builder = new StringBuilder();
        builder.Append("%PDF-1.4\n");
        var offsets = new List<int>();
        foreach (var obj in objects)
        {
            offsets.Add(Encoding.ASCII.GetByteCount(builder.ToString()));
            builder.Append(CultureInfo.InvariantCulture, $"{offsets.Count} 0 obj\n{obj}\nendobj\n");
        }

        var xrefOffset = Encoding.ASCII.GetByteCount(builder.ToString());
        builder.Append(CultureInfo.InvariantCulture, $"xref\n0 {objects.Count + 1}\n");
        builder.Append("0000000000 65535 f \n");
        foreach (var offset in offsets)
        {
            builder.Append(CultureInfo.InvariantCulture, $"{offset:0000000000} 00000 n \n");
        }
        builder.Append(CultureInfo.InvariantCulture, $"trailer\n<< /Size {objects.Count + 1} /Root 1 0 R >>\nstartxref\n{xrefOffset}\n%%EOF\n");

        return Encoding.ASCII.GetBytes(builder.ToString());
    }

    private static string Escape(string value)
        => value.Replace("\\", "\\\\", StringComparison.Ordinal)
            .Replace("(", "\\(", StringComparison.Ordinal)
            .Replace(")", "\\)", StringComparison.Ordinal);
}
