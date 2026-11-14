using Hani.Modules.Payments.Domain.Invoices;

namespace Hani.Modules.Payments.Application.Invoices;

/// <summary>
/// Provider abstraction for invoice dunning reminders.
/// </summary>
public interface IInvoiceReminderSender
{
    /// <summary>
    /// Sends one reminder; throw to retry on the next scheduler tick.
    /// </summary>
    Task SendAsync(Invoice invoice, CancellationToken cancellationToken);
}
