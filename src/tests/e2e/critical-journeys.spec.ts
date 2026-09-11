import { test, expect } from "@playwright/test";

test.describe("Critical User Journeys", () => {
  test("Homepage loads with hero visible", async ({ page }) => {
    await page.goto("/");

    // Wait for hero title to be visible
    const heroTitle = page.locator(
      "h1:has-text('Signature scents, made for two')",
    );
    await expect(heroTitle).toBeVisible();

    // Verify key sections are present
    await expect(page.locator("text=The premise")).toBeVisible();
    await expect(page.locator("text=Featured fragrances")).toBeVisible();
  });

  test("Collection filtering updates URL and results", async ({ page }) => {
    await page.goto("/collection");

    // Verify initial state shows all fragrances
    const resultCount = page.locator("text=/\\d+ fragrances? shown/");
    await expect(resultCount).toBeVisible();

    // Filter by audience: His
    const audienceSelect = page.locator("select").first();
    await audienceSelect.selectOption("his");

    // Wait for URL to update
    await page.waitForURL(/\?for=his/);
    expect(page.url()).toContain("?for=his");

    // Verify result count changed
    const newCount = await resultCount.textContent();
    expect(newCount).toContain("fragrance");

    // Reset filters
    await page.click("text=Reset filters");
    await page.waitForURL("/collection");
    expect(page.url()).toBe("http://localhost:3000/collection");
  });

  test("Fragrance detail page displays correct data", async ({ page }) => {
    await page.goto("/fragrance/midnight-oath");

    // Verify fragrance name and details
    await expect(page.locator("h1:has-text('Midnight Oath')")).toBeVisible();
    await expect(
      page.locator("text=Smoke, oud and a promise kept close"),
    ).toBeVisible();

    // Verify pricing is displayed
    await expect(page.locator("text=/From ₦/")).toBeVisible();

    // Verify notes section
    await expect(page.locator("text=Top Notes")).toBeVisible();
    await expect(page.locator("text=Heart Notes")).toBeVisible();
    await expect(page.locator("text=Base Notes")).toBeVisible();

    // Verify order panel
    await expect(page.locator("text=Order via WhatsApp")).toBeVisible();
  });

  test("WhatsApp order button generates correct URL", async ({ page }) => {
    await page.goto("/fragrance/midnight-oath");

    // Get the WhatsApp order button
    const orderButton = page.locator("button:has-text('Order on WhatsApp')");
    await expect(orderButton).toBeVisible();

    // Click and capture the navigation
    const [popup] = await Promise.all([
      page.waitForEvent("popup"),
      orderButton.click(),
    ]);

    // Verify WhatsApp URL structure
    const url = popup.url();
    expect(url).toContain("wa.me");
    expect(url).toContain("text=");
    expect(url).toContain("Midnight Oath");

    await popup.close();
  });

  test("Pair detail page displays both fragrances", async ({ page }) => {
    await page.goto("/pairs/the-first-night");

    // Verify pair name
    await expect(page.locator("h1:has-text('The First Night')")).toBeVisible();

    // Verify both fragrances are mentioned
    await expect(page.locator("text=Midnight Oath")).toBeVisible();
    await expect(page.locator("text=Velvet Vow")).toBeVisible();

    // Verify shared accord
    await expect(page.locator("text=Shared accord")).toBeVisible();

    // Verify order panel for pair
    await expect(page.locator("text=Order on WhatsApp")).toBeVisible();
  });

  test("Collection filtering persists across navigation", async ({ page }) => {
    await page.goto("/collection?for=his");

    // Verify filter is applied
    const audienceSelect = page.locator("select").first();
    await expect(audienceSelect).toHaveValue("his");

    // Navigate to a fragrance
    await page.click("text=Midnight Oath");
    await page.waitForURL("/fragrance/midnight-oath");

    // Go back to collection
    await page.goBack();
    await page.waitForURL("/collection?for=his");

    // Verify filter is still applied
    await expect(audienceSelect).toHaveValue("his");
  });

  test("Mobile navigation opens and closes", async ({ page }) => {
    // Use mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Menu button should be visible on mobile
    const menuButton = page.locator("button:has-text('Menu')");
    await expect(menuButton).toBeVisible();

    // Open menu
    await menuButton.click();

    // Navigation links should be visible
    await expect(page.locator("a:has-text('Collection')")).toBeVisible();
    await expect(page.locator("a:has-text('Pairs')")).toBeVisible();

    // Close menu via Escape
    await page.keyboard.press("Escape");

    // Menu should be hidden
    const mobileNav = page.locator("#mobile-navigation");
    await expect(mobileNav).not.toBeVisible();
  });

  test("Newsletter form submission works", async ({ page }) => {
    await page.goto("/");

    // Scroll to footer
    await page.locator("footer").scrollIntoViewIfNeeded();

    // Find newsletter form
    const emailInput = page.locator("input[type='email']").last();
    const submitButton = page.locator("button:has-text('Join')").last();

    // Fill and submit
    await emailInput.fill("test@example.com");
    await submitButton.click();

    // Verify success state
    await expect(page.locator("text=You're on the list")).toBeVisible({
      timeout: 5000,
    });
  });

  test("Contact form validation works", async ({ page }) => {
    await page.goto("/contact");

    // Try to submit empty form
    const submitButton = page.locator("button:has-text('Send message')");
    await submitButton.click();

    // Verify error messages appear
    await expect(page.locator("text=Enter your name")).toBeVisible();
    await expect(
      page.locator("text=Enter an email address or phone number"),
    ).toBeVisible();
    await expect(page.locator("text=Enter a message")).toBeVisible();

    // Fill form correctly
    await page.locator("input[name='name']").fill("Test User");
    await page.locator("input[name='contact']").fill("test@example.com");
    await page.locator("select[name='topic']").selectOption("General enquiry");
    await page
      .locator("textarea[name='message']")
      .fill("This is a test message for the contact form.");

    // Submit
    await submitButton.click();

    // Verify success state
    await expect(page.locator("text=Message received")).toBeVisible({
      timeout: 5000,
    });
  });
});
