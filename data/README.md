# Product Management Flow

This project uses a static, JSON-based product management system. Follow these steps to update products:

## 1. Edit Metadata
Modify `data/products.json` at the root of the project.
- Each product must have a unique `id`.
- `nameKey`, `shortDescriptionKey`, and `descriptionKey` should follow the pattern `data.products.[id].[field]`.
- Update `uses` (slugs from `categories.json` where `type` is `purpose`).
- Update `category` (slug from `categories.json` where `type` is `category`).

## 2. Update Translations
Add the localized text in both:
- `src/i18n/en.ts`
- `src/i18n/ta.ts`

Ensure the keys match those defined in `products.json`.

## 3. Deploy
- **Commit** your changes.
- **Push** to GitHub.
- The site will **auto-deploy** with the updated data.

## Safety & Validation
- The site handles missing fields gracefully.
- Malformed products will be skipped during rendering, and a warning will be logged to the console (in development).
- No UI code changes are required for adding or removing products.
