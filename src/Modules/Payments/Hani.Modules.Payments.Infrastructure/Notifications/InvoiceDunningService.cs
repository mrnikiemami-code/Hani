using Hani.Modules.Payments.Application.Commands.Finance;
using Hani.Modules.Payments.Application.Invoices;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Hani.Modules.Payments.Infrastructure.Notifications;

internal sealed class InvoiceDunningService(
    IServiceScopeFactory scopeFactory,
    ILogger<InvoiceDunningService> logger) : BackgroundService
{
    private static readonly TimeSpan PollInterval = TimeSpan.FromMinutes(5);

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        using var timer = new PeriodicTimer(PollInterval);

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await SendDueRemindersAsync(stoppingToken);
                await timer.WaitForNextTickAsync(stoppingToken);
            }
            catch (OperationCanceledException) when (stoppingToken.IsCancellationRequested)
            {
                break;
            }
            catch (Exception exception)
            {
                logger.LogError(exception, "Invoice dunning tick failed.");
            }
        }
    }

    private async Task SendDueRemindersAsync(CancellationToken cancellationToken)
    {
        using var scope = scopeFactory.CreateScope();
        var finance = scope.ServiceProvider.GetRequiredService<IFinanceRepository>();
        var sender = scope.ServiceProvider.GetRequiredService<IInvoiceReminderSender>();
        var due = await finance.ListDueInvoicesAsync(DateTimeOffset.UtcNow, 50, cancellationToken);

        foreach (var invoice in due)
        {
            try
            {
                await sender.SendAsync(invoice, cancellationToken);
                invoice.MarkReminderSent(DateTimeOffset.UtcNow.AddDays(3));
                await finance.SaveChangesAsync(cancellationToken);
            }
            catch (Exception exception)
            {
                logger.LogWarning(exception, "Invoice reminder failed for {InvoiceId}.", invoice.Id);
            }
        }
    }
}
