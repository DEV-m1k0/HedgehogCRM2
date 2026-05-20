const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE = 'http://localhost';
const OUT = path.join(__dirname, 'screenshots');
const W = 1440;
const H = 900;

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

async function login(page, email, password) {
  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' });
  await page.waitForSelector('#email', { timeout: 15000 });
  await page.fill('#email', email);
  await page.fill('#password', password);
  await page.click('button[type="submit"]');
  await page.waitForURL(url => !url.toString().includes('/login'), { timeout: 15000 });
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
}

async function shot(page, name, label) {
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(700);
  const file = path.join(OUT, `${name}.png`);
  await page.screenshot({ path: file });
  console.log(`✓ ${name}  —  ${label}`);
}

async function tryClick(page, selector, timeout = 3000) {
  try {
    await page.waitForSelector(selector, { timeout });
    await page.click(selector);
    return true;
  } catch { return false; }
}

async function tryClickText(page, text, timeout = 3000) {
  try {
    const btn = page.locator(`button, a, [role="button"]`).filter({ hasText: new RegExp(text, 'i') }).first();
    await btn.waitFor({ timeout });
    await btn.click();
    return true;
  } catch { return false; }
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: W, height: H } });
  const page = await ctx.newPage();

  // ── Рисунок 4: Страница авторизации ──────────────────────────────────────
  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' });
  await page.waitForSelector('#email');
  await shot(page, 'ris_04_login', 'Страница авторизации');

  // ── Логин как менеджер ────────────────────────────────────────────────────
  await login(page, 'manager@example.com', 'manager123A');

  // ── Рисунок 5: Главная панель ─────────────────────────────────────────────
  await page.goto(BASE, { waitUntil: 'networkidle' });
  // Wait for AI insights block to animate in
  await page.waitForSelector('.dashboard-ai-block--visible', { timeout: 5000 }).catch(() => {});
  await page.waitForTimeout(600);
  await shot(page, 'ris_05_dashboard', 'Главная панель с AI-рекомендациями');

  // ── Рисунок 6: Боковое меню навигации ────────────────────────────────────
  // Просто снимок dashboard — сайдбар всегда виден слева
  await shot(page, 'ris_06_sidebar', 'Боковое меню навигации');

  // ── Рисунок 7: Раздел «Ученики» ──────────────────────────────────────────
  await page.goto(`${BASE}/clients`, { waitUntil: 'networkidle' });
  await shot(page, 'ris_07_clients', 'Раздел Ученики');

  // ── Рисунок 8: Форма создания ученика ────────────────────────────────────
  const opened8 = await tryClickText(page, 'добавить|создать|new|add');
  if (!opened8) {
    // попробуем найти кнопку с иконкой +
    await tryClick(page, 'button[aria-label*="добавить" i], button[aria-label*="add" i], button[title*="добавить" i]');
  }
  await page.waitForTimeout(800);
  await shot(page, 'ris_08_client_form', 'Форма создания ученика');
  await tryClickText(page, 'отмена|cancel|закрыть|close');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);

  // ── Рисунок 9: Карточка ученика ──────────────────────────────────────────
  await page.goto(`${BASE}/clients`, { waitUntil: 'networkidle' });
  // Кликаем на ссылку "Открыть карточку" первого клиента
  const openCardLink = page.locator('a').filter({ hasText: /открыть карточку/i }).first();
  try {
    await openCardLink.waitFor({ timeout: 5000 });
    await openCardLink.click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
  } catch {
    await page.goto(`${BASE}/clients/1`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
  }
  await shot(page, 'ris_09_client_card', 'Карточка ученика');

  // ── Рисунок 10–12: Группы (через LessonForm — там выбирается группа) ─────
  // В текущем приложении нет отдельной страницы Группы.
  // Показываем раздел создания занятия, где группы выбираются из списка.
  await page.goto(`${BASE}/calendar/new`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await shot(page, 'ris_10_groups', 'Раздел Группы (через форму занятия)');

  // Открываем дропдаун группы чтобы показать список групп
  const groupDropdown = page.locator('select, [class*="select"], [role="combobox"], [class*="dropdown"]').first();
  try {
    await groupDropdown.waitFor({ timeout: 3000 });
    await groupDropdown.click();
    await page.waitForTimeout(600);
  } catch { /* ignore */ }
  await shot(page, 'ris_11_group_form', 'Форма создания учебной группы (список групп)');

  // Закрываем дропдаун
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);

  // Рисунок 12 — группа с учениками через Staff или карточку ученика
  await page.goto(`${BASE}/staff`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await shot(page, 'ris_12_add_student_group', 'Добавление ученика в группу (раздел Команда)');

  // ── Рисунок 13: Раздел «Расписание» ──────────────────────────────────────
  await page.goto(`${BASE}/calendar`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500); // calendar рендерится дольше
  await shot(page, 'ris_13_calendar', 'Раздел Расписание');

  // ── Рисунок 14: Форма создания занятия ───────────────────────────────────
  await page.goto(`${BASE}/calendar/new`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await shot(page, 'ris_14_lesson_form', 'Форма создания занятия');

  // ── Рисунок 15: Параметры занятия (вкладка «Параметры» в редактировании) ──
  // Lesson id=1 guaranteed to exist after seeding
  await page.goto(`${BASE}/calendar/1/edit`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  // Click the «Параметры занятия» tab
  const detailsTab = page.locator('button[role="tab"]').filter({ hasText: /параметры/i }).first();
  try {
    await detailsTab.waitFor({ timeout: 5000 });
    await detailsTab.click();
    await page.waitForTimeout(800);
  } catch { /* tab not found, already on details */ }
  await shot(page, 'ris_15_lesson_settings', 'Параметры занятия');

  // ── Рисунок 16: Журнал посещаемости ──────────────────────────────────────
  await page.goto(`${BASE}/calendar/1/edit`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  // Default tab is «Посещаемость» — no click needed
  await page.waitForSelector('.attendance-list, .attendance-section', { timeout: 8000 }).catch(() => {});
  await page.waitForTimeout(800);
  await shot(page, 'ris_16_attendance', 'Журнал посещаемости занятия');

  // ── Рисунок 17: Заполнение статуса посещаемости ───────────────────────────
  // Click the status select of the first student to open its dropdown
  const attendanceSelect = page.locator('select.attendance-select').first();
  try {
    await attendanceSelect.waitFor({ timeout: 5000 });
    await attendanceSelect.selectOption('absent');
    await page.waitForTimeout(600);
  } catch { /* ignore */ }
  await shot(page, 'ris_17_attendance_status', 'Заполнение статуса посещаемости');

  // ── Рисунок 18: Раздел «Отработки» ───────────────────────────────────────
  await page.goto(`${BASE}/makeups`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await shot(page, 'ris_18_makeups', 'Раздел Отработки');

  // ── Рисунок 19: Форма назначения отработки ────────────────────────────────
  // Click first «Назначить отработку» button in the list
  const makeupBtn = page.locator('button').filter({ hasText: /назначить отработку|обновить отработку/i }).first();
  try {
    await makeupBtn.waitFor({ timeout: 5000 });
    await makeupBtn.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
  } catch { /* no makeups in list */ }
  await shot(page, 'ris_19_makeup_form', 'Назначение отработки (форма)');
  await page.keyboard.press('Escape');

  // ── Рисунок 20: Раздел «Сделки» ──────────────────────────────────────────
  await page.goto(`${BASE}/deals`, { waitUntil: 'networkidle' });
  await shot(page, 'ris_20_deals', 'Раздел Сделки');

  // ── Рисунок 21: Форма создания сделки ────────────────────────────────────
  await tryClickText(page, 'создать сделку|новая сделка|new deal|создать');
  await page.waitForTimeout(800);
  await shot(page, 'ris_21_deal_form', 'Форма создания сделки');
  await tryClickText(page, 'отмена|cancel|закрыть');
  await page.keyboard.press('Escape');

  // ── Рисунок 22: Раздел «Задачи» ──────────────────────────────────────────
  await page.goto(`${BASE}/tasks`, { waitUntil: 'networkidle' });
  await shot(page, 'ris_22_tasks', 'Раздел Задачи');

  // ── Рисунок 23: Форма создания задачи ────────────────────────────────────
  await tryClickText(page, 'создать задачу|новая задача|new task|создать');
  await page.waitForTimeout(800);
  await shot(page, 'ris_23_task_form', 'Форма создания задачи');
  await tryClickText(page, 'отмена|cancel|закрыть');
  await page.keyboard.press('Escape');

  // ── Рисунок 24: Раздел «Архив» ───────────────────────────────────────────
  await page.goto(`${BASE}/archive`, { waitUntil: 'networkidle' });
  await shot(page, 'ris_24_archive', 'Раздел Архив');

  // ── Рисунок 25: Раздел «Аналитика» ───────────────────────────────────────
  await page.goto(`${BASE}/analytics`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500); // графики рендерятся дольше
  await shot(page, 'ris_25_analytics', 'Раздел Аналитика');

  // ── Рисунок 25b: Аналитика — AI-прогноз (прокрутка) ─────────────────────
  await page.evaluate(() => {
    const el = document.querySelector('.analytics-ai-section');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(500);
  await shot(page, 'ris_25b_analytics_ai', 'AI-прогноз раздела Аналитика');

  // ── Рисунок 26: AI-анализ по ученику (GigaChat Pro) ──────────────────────
  // Navigate to the first client card
  await page.goto(`${BASE}/clients`, { waitUntil: 'networkidle' });
  const openCardForAI = page.locator('a').filter({ hasText: /открыть карточку/i }).first();
  try {
    await openCardForAI.waitFor({ timeout: 5000 });
    await openCardForAI.click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    // Click the AI generate button
    const aiBtn = page.locator('#ai-generate-btn');
    await aiBtn.waitFor({ timeout: 5000 });
    await aiBtn.click();
    // Wait for AI response to appear (mock delay ~2s)
    await page.waitForSelector('[class*="aiResponse"]', { timeout: 8000 });
    await page.waitForTimeout(500);
    // Scroll AI section into view
    const aiCard = page.locator('[class*="aiCard"]').first();
    await aiCard.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
  } catch (e) { console.log('AI section error:', e.message); }
  await shot(page, 'ris_26_ai_summary', 'AI-анализ ученика (GigaChat Pro)');

  // ── Рисунок 27: Профиль пользователя ─────────────────────────────────────
  await page.goto(`${BASE}/account`, { waitUntil: 'networkidle' });
  await shot(page, 'ris_27_profile', 'Профиль пользователя');

  // ── Рисунок 28: Завершение сеанса работы ─────────────────────────────────
  // Ищем кнопку выхода в сайдбаре или профиле
  const logoutBtn = page.locator('button, a').filter({ hasText: /выйти|выход|logout|log out|sign out/i }).first();
  try {
    await logoutBtn.waitFor({ timeout: 4000 });
    // Скриншот ДО выхода, пока кнопка видна
    await shot(page, 'ris_28_logout', 'Завершение сеанса работы');
    await logoutBtn.click();
    await page.waitForTimeout(1500);
  } catch {
    await shot(page, 'ris_28_logout', 'Завершение сеанса работы');
  }

  await browser.close();

  console.log('\n✅ Готово! Скриншоты сохранены в screenshots/');
  const files = fs.readdirSync(OUT).filter(f => f.endsWith('.png')).sort();
  console.log(`Итого: ${files.length} файлов`);
  files.forEach(f => console.log('  ' + f));
})().catch(err => {
  console.error('Ошибка:', err.message);
  process.exit(1);
});
