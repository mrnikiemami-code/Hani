using FluentValidation;

namespace Hani.Modules.Identity.Application.Commands.Wishlists;

/// <summary>Validation rules for reading a wishlist.</summary>
public sealed class GetMyWishlistQueryValidator : AbstractValidator<GetMyWishlistQuery>
{
    /// <summary>Creates user-id validation rules.</summary>
    public GetMyWishlistQueryValidator()
    {
        RuleFor(query => query.UserId).NotEmpty().WithErrorCode("HANI-IDENTITY-1600");
    }
}

/// <summary>Validation rules for saving a wishlist item.</summary>
public sealed class AddWishlistItemCommandValidator : AbstractValidator<AddWishlistItemCommand>
{
    /// <summary>Creates user and product id validation rules.</summary>
    public AddWishlistItemCommandValidator()
    {
        RuleFor(command => command.UserId).NotEmpty().WithErrorCode("HANI-IDENTITY-1600");
        RuleFor(command => command.ProductId).NotEmpty().WithErrorCode("HANI-IDENTITY-1601");
    }
}

/// <summary>Validation rules for removing a wishlist item.</summary>
public sealed class RemoveWishlistItemCommandValidator
    : AbstractValidator<RemoveWishlistItemCommand>
{
    /// <summary>Creates user and product id validation rules.</summary>
    public RemoveWishlistItemCommandValidator()
    {
        RuleFor(command => command.UserId).NotEmpty().WithErrorCode("HANI-IDENTITY-1600");
        RuleFor(command => command.ProductId).NotEmpty().WithErrorCode("HANI-IDENTITY-1601");
    }
}
