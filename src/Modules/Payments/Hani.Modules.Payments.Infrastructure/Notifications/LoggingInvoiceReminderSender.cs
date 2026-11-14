using Hani.Modules.Payments.Application.Invoices;
using Hani.Modules.Payments.Domain.Invoices;
using Microsoft.Extensions.Logging;

namespace Hani.Modules.Payments.Infrastructure.Notifications;

internal sealed class LoggingInvoiceReminderSender(ILogger<LoggingInvoiceReminderSender> logger)
    : IInvoiceReminderSender
{
    public Task SendAsync(Invoice invoice, CancellationToken cancellationToken)
    {
        if (logger.IsEnabled(LogLevel.Information))
        {
            logger.LogInformation(
                "Invoice reminder {InvoiceNumber} sent to {BuyerEmail}",
                invoice.InvoiceNumber,
                invoice.BuyerEmail);
        }

        return Task.CompletedTask;
    }
}
