(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/pages/Deals/DealsPage.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "card": "DealsPage-module__Mi8k5a__card",
  "cardActions": "DealsPage-module__Mi8k5a__cardActions",
  "cardControls": "DealsPage-module__Mi8k5a__cardControls",
  "cardHead": "DealsPage-module__Mi8k5a__cardHead",
  "clientDropdown": "DealsPage-module__Mi8k5a__clientDropdown",
  "clientEmpty": "DealsPage-module__Mi8k5a__clientEmpty",
  "clientLink": "DealsPage-module__Mi8k5a__clientLink",
  "clientOption": "DealsPage-module__Mi8k5a__clientOption",
  "clientPicker": "DealsPage-module__Mi8k5a__clientPicker",
  "dangerBtn": "DealsPage-module__Mi8k5a__dangerBtn",
  "empty": "DealsPage-module__Mi8k5a__empty",
  "error": "DealsPage-module__Mi8k5a__error",
  "form": "DealsPage-module__Mi8k5a__form",
  "formActions": "DealsPage-module__Mi8k5a__formActions",
  "formGrid": "DealsPage-module__Mi8k5a__formGrid",
  "header": "DealsPage-module__Mi8k5a__header",
  "input": "DealsPage-module__Mi8k5a__input",
  "line": "DealsPage-module__Mi8k5a__line",
  "page": "DealsPage-module__Mi8k5a__page",
  "pipeline": "DealsPage-module__Mi8k5a__pipeline",
  "primaryBtn": "DealsPage-module__Mi8k5a__primaryBtn",
  "search": "DealsPage-module__Mi8k5a__search",
  "secondaryBtn": "DealsPage-module__Mi8k5a__secondaryBtn",
  "select": "DealsPage-module__Mi8k5a__select",
  "stageCards": "DealsPage-module__Mi8k5a__stageCards",
  "stageColumn": "DealsPage-module__Mi8k5a__stageColumn",
  "stageEmpty": "DealsPage-module__Mi8k5a__stageEmpty",
  "stageHead": "DealsPage-module__Mi8k5a__stageHead",
  "statCard": "DealsPage-module__Mi8k5a__statCard",
  "statsGrid": "DealsPage-module__Mi8k5a__statsGrid",
  "status-active": "DealsPage-module__Mi8k5a__status-active",
  "status-lost": "DealsPage-module__Mi8k5a__status-lost",
  "status-paused": "DealsPage-module__Mi8k5a__status-paused",
  "status-won": "DealsPage-module__Mi8k5a__status-won",
  "statusBadge": "DealsPage-module__Mi8k5a__statusBadge",
  "successBtn": "DealsPage-module__Mi8k5a__successBtn",
  "toolbar": "DealsPage-module__Mi8k5a__toolbar",
  "toolbarManager": "DealsPage-module__Mi8k5a__toolbarManager",
  "warningBtn": "DealsPage-module__Mi8k5a__warningBtn",
});
}),
"[project]/src/pages/Deals/DealsPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DealsPage",
    ()=>DealsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/crm.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/pages/Deals/DealsPage.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$feedback$2f$Notifications$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/feedback/Notifications.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$feedback$2f$ConfirmDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/feedback/ConfirmDialog.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
const STAGES = [
    'Первичный контакт',
    'Пробный урок',
    'Выбор курса',
    'Оформление договора',
    'Оплата',
    'Учеба'
];
const STATUS_OPTIONS = [
    {
        value: 'active',
        label: 'Активная'
    },
    {
        value: 'won',
        label: 'Успешная'
    },
    {
        value: 'lost',
        label: 'Потеряна'
    },
    {
        value: 'paused',
        label: 'Пауза'
    }
];
const LAST_STAGE = STAGES[STAGES.length - 1];
const DealsPage = ()=>{
    _s();
    const { notify } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$feedback$2f$Notifications$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotifications"])();
    const { confirm } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$feedback$2f$ConfirmDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConfirmDialog"])();
    const [deals, setDeals] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [clients, setClients] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [users, setUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [showCreateForm, setShowCreateForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [updatingDealId, setUpdatingDealId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [stageFilter, setStageFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [statusFilter, setStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [managerFilter, setManagerFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [clientSearch, setClientSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [clientSearchOpen, setClientSearchOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        client_id: '',
        manager_id: '',
        amount: ''
    });
    const [currentUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "DealsPage.useState": ()=>{
            const raw = localStorage.getItem('user');
            if (!raw) {
                return null;
            }
            try {
                return JSON.parse(raw);
            } catch  {
                return null;
            }
        }
    }["DealsPage.useState"]);
    const roleRaw = typeof currentUser?.role === 'string' ? currentUser.role : currentUser?.role?.name ?? '';
    const roleName = roleRaw.toLowerCase();
    const isManager = roleName.includes('менеджер') || roleName.includes('manager');
    const currentManagerId = isManager ? currentUser?.id ?? null : null;
    const load = async ()=>{
        setLoading(true);
        try {
            const [dealsRes, clientsRes, usersRes] = await Promise.all([
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dealsApi"].list(),
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clientsApi"].list(),
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["metaApi"].users()
            ]);
            setDeals(dealsRes.data);
            setClients(clientsRes.data);
            setUsers(usersRes.data);
            setError('');
        } catch (e) {
            setError(e?.response?.data?.detail ?? 'Не удалось загрузить сделки');
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DealsPage.useEffect": ()=>{
            load().catch(console.error);
        }
    }["DealsPage.useEffect"], []);
    const createDeal = async (event)=>{
        event.preventDefault();
        if (!form.client_id) {
            return;
        }
        if (!await confirm({
            title: 'Создание сделки',
            message: 'Создать новую сделку?',
            confirmText: 'Создать'
        })) {
            return;
        }
        try {
            setSubmitting(true);
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dealsApi"].create({
                client_id: Number(form.client_id),
                manager_id: currentManagerId ?? (form.manager_id ? Number(form.manager_id) : undefined),
                amount: Number(form.amount || 0),
                stage: STAGES[0],
                status: 'active'
            });
            setForm({
                client_id: '',
                manager_id: '',
                amount: ''
            });
            setClientSearch('');
            setClientSearchOpen(false);
            await load();
            setShowCreateForm(false);
            notify('success', 'Сделка создана', 'Сделка успешно добавлена в воронку.', {
                href: `/deals#deal-${response.data.id}`
            });
        } catch  {
            notify('error', 'Ошибка', 'Не удалось создать сделку.');
        } finally{
            setSubmitting(false);
        }
    };
    const updateDeal = async (dealId, payload, confirmText)=>{
        if (!await confirm({
            title: 'Подтверждение изменения',
            message: confirmText,
            confirmText: 'Подтвердить'
        })) {
            return;
        }
        try {
            setUpdatingDealId(dealId);
            const currentDeal = deals.find((deal)=>deal.id === dealId);
            const nextPayload = {
                ...payload
            };
            if (currentDeal) {
                if (nextPayload.stage && !nextPayload.status) {
                    if (nextPayload.stage === LAST_STAGE) {
                        nextPayload.status = 'won';
                    } else if (currentDeal.status === 'won') {
                        nextPayload.status = 'active';
                    }
                }
                if (nextPayload.status === 'won' && !nextPayload.stage) {
                    nextPayload.stage = LAST_STAGE;
                }
            }
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dealsApi"].patch(dealId, nextPayload);
            await load();
            notify('info', 'Сделка обновлена', 'Изменения сохранены.', {
                href: `/deals#deal-${dealId}`
            });
        } catch  {
            notify('error', 'Ошибка', 'Не удалось обновить сделку.');
        } finally{
            setUpdatingDealId(null);
        }
    };
    const moveStage = async (deal)=>{
        const currentIndex = STAGES.findIndex((stage)=>stage === deal.stage);
        const nextIndex = currentIndex === -1 ? 0 : Math.min(currentIndex + 1, STAGES.length - 1);
        const nextStage = STAGES[nextIndex];
        if (nextStage === deal.stage) {
            return;
        }
        await updateDeal(deal.id, {
            stage: nextStage
        }, `Перевести сделку на этап "${nextStage}"?`);
    };
    const closeDeal = async (deal, status)=>{
        const label = status === 'won' ? 'успешную' : 'потерянную';
        await updateDeal(deal.id, {
            status
        }, `Закрыть сделку как ${label}?`);
    };
    const archiveDeal = async (dealId)=>{
        if (!await confirm({
            title: 'Архивация сделки',
            message: 'Архивировать сделку?',
            confirmText: 'Архивировать',
            variant: 'danger'
        })) {
            return;
        }
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dealsApi"].remove(dealId);
            await load();
            notify('info', 'Сделка архивирована', 'Сделка перенесена в архив.', {
                href: '/archive'
            });
        } catch  {
            notify('error', 'Ошибка', 'Не удалось архивировать сделку.');
        }
    };
    const clientsMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DealsPage.useMemo[clientsMap]": ()=>new Map(clients.map({
                "DealsPage.useMemo[clientsMap]": (client)=>[
                        client.id,
                        `${client.second_name} ${client.first_name} ${client.patronymic ?? ''}`.trim()
                    ]
            }["DealsPage.useMemo[clientsMap]"]))
    }["DealsPage.useMemo[clientsMap]"], [
        clients
    ]);
    const managersMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DealsPage.useMemo[managersMap]": ()=>new Map(users.map({
                "DealsPage.useMemo[managersMap]": (user)=>[
                        user.id,
                        `${user.second_name} ${user.first_name}`.trim()
                    ]
            }["DealsPage.useMemo[managersMap]"]))
    }["DealsPage.useMemo[managersMap]"], [
        users
    ]);
    const filteredDeals = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DealsPage.useMemo[filteredDeals]": ()=>{
            const term = query.trim().toLowerCase();
            return deals.filter({
                "DealsPage.useMemo[filteredDeals]": (deal)=>{
                    if (currentManagerId && deal.manager_id !== currentManagerId) {
                        return false;
                    }
                    if (stageFilter && deal.stage !== stageFilter) {
                        return false;
                    }
                    if (!isManager && statusFilter && deal.status !== statusFilter) {
                        return false;
                    }
                    if (!isManager && managerFilter && String(deal.manager_id ?? '') !== managerFilter) {
                        return false;
                    }
                    if (!term) {
                        return true;
                    }
                    const clientName = (clientsMap.get(deal.client_id) ?? '').toLowerCase();
                    const managerName = (deal.manager_id ? managersMap.get(deal.manager_id) : '')?.toLowerCase() ?? '';
                    return String(deal.id).includes(term) || clientName.includes(term) || managerName.includes(term) || deal.stage.toLowerCase().includes(term) || !isManager && deal.status.toLowerCase().includes(term) || String(deal.amount).includes(term);
                }
            }["DealsPage.useMemo[filteredDeals]"]);
        }
    }["DealsPage.useMemo[filteredDeals]"], [
        deals,
        query,
        stageFilter,
        statusFilter,
        managerFilter,
        clientsMap,
        managersMap,
        currentManagerId,
        isManager
    ]);
    const clientOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DealsPage.useMemo[clientOptions]": ()=>{
            const term = clientSearch.trim().toLowerCase();
            if (!term) {
                return clients.slice(0, 12);
            }
            return clients.filter({
                "DealsPage.useMemo[clientOptions]": (client)=>{
                    const fullName = `${client.second_name} ${client.first_name} ${client.patronymic ?? ''}`.toLowerCase();
                    return fullName.includes(term) || String(client.id).includes(term);
                }
            }["DealsPage.useMemo[clientOptions]"]).slice(0, 12);
        }
    }["DealsPage.useMemo[clientOptions]"], [
        clients,
        clientSearch
    ]);
    const stageGroups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DealsPage.useMemo[stageGroups]": ()=>STAGES.map({
                "DealsPage.useMemo[stageGroups]": (stage)=>({
                        stage,
                        deals: filteredDeals.filter({
                            "DealsPage.useMemo[stageGroups]": (deal)=>deal.stage === stage
                        }["DealsPage.useMemo[stageGroups]"])
                    })
            }["DealsPage.useMemo[stageGroups]"])
    }["DealsPage.useMemo[stageGroups]"], [
        filteredDeals
    ]);
    const visibleDeals = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DealsPage.useMemo[visibleDeals]": ()=>stageGroups.flatMap({
                "DealsPage.useMemo[visibleDeals]": (group)=>group.deals
            }["DealsPage.useMemo[visibleDeals]"])
    }["DealsPage.useMemo[visibleDeals]"], [
        stageGroups
    ]);
    const stats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DealsPage.useMemo[stats]": ()=>{
            const statsSource = visibleDeals;
            const totalAmount = statsSource.reduce({
                "DealsPage.useMemo[stats].totalAmount": (sum, deal)=>sum + deal.amount
            }["DealsPage.useMemo[stats].totalAmount"], 0);
            const active = statsSource.filter({
                "DealsPage.useMemo[stats]": (deal)=>deal.status === 'active'
            }["DealsPage.useMemo[stats]"]).length;
            const closed = statsSource.filter({
                "DealsPage.useMemo[stats]": (deal)=>deal.status === 'won' || deal.status === 'lost'
            }["DealsPage.useMemo[stats]"]).length;
            return {
                total: statsSource.length,
                active,
                closed,
                totalAmount,
                avgAmount: statsSource.length ? totalAmount / statsSource.length : 0
            };
        }
    }["DealsPage.useMemo[stats]"], [
        visibleDeals
    ]);
    const formatAmount = (value)=>new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            maximumFractionDigits: 0
        }).format(value || 0);
    const formatDate = (value)=>value ? new Date(value).toLocaleDateString('ru-RU') : 'не задан';
    const getStatusLabel = (status)=>STATUS_OPTIONS.find((item)=>item.value === status)?.label ?? status;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].page,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                children: "Сделки"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                lineNumber: 273,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Воронка продаж с быстрым управлением этапами и статусами."
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                lineNumber: 274,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                        lineNumber: 272,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].primaryBtn,
                        onClick: ()=>setShowCreateForm((prev)=>!prev),
                        children: showCreateForm ? 'Скрыть форму' : 'Новая сделка'
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                        lineNumber: 276,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                lineNumber: 271,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statsGrid,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statCard,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Сделок в выборке"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                lineNumber: 286,
                                columnNumber: 46
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: stats.total
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                lineNumber: 286,
                                columnNumber: 75
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                        lineNumber: 286,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statCard,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Активные"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                lineNumber: 287,
                                columnNumber: 46
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: stats.active
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                lineNumber: 287,
                                columnNumber: 67
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                        lineNumber: 287,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statCard,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Закрытые"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                lineNumber: 288,
                                columnNumber: 46
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: stats.closed
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                lineNumber: 288,
                                columnNumber: 67
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                        lineNumber: 288,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statCard,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Сумма"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                lineNumber: 289,
                                columnNumber: 46
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: formatAmount(stats.totalAmount)
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                lineNumber: 289,
                                columnNumber: 64
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                children: [
                                    "Средний чек: ",
                                    formatAmount(stats.avgAmount)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                lineNumber: 289,
                                columnNumber: 114
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                        lineNumber: 289,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                lineNumber: 285,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].toolbar} ${isManager ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].toolbarManager : ''}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].search,
                        value: query,
                        onChange: (e)=>setQuery(e.target.value),
                        placeholder: isManager ? 'Поиск: ID, клиент, этап, сумма' : 'Поиск: ID, клиент, менеджер, этап, сумма'
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                        lineNumber: 293,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].select,
                        value: stageFilter,
                        onChange: (e)=>setStageFilter(e.target.value),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "Все этапы"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                lineNumber: 300,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            STAGES.map((stage)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: stage,
                                    children: stage
                                }, stage, false, {
                                    fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                    lineNumber: 302,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                        lineNumber: 299,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    !isManager ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].select,
                        value: statusFilter,
                        onChange: (e)=>setStatusFilter(e.target.value),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "Все статусы"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                lineNumber: 307,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            STATUS_OPTIONS.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: item.value,
                                    children: item.label
                                }, item.value, false, {
                                    fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                    lineNumber: 309,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                        lineNumber: 306,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)) : null,
                    !isManager ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].select,
                        value: managerFilter,
                        onChange: (e)=>setManagerFilter(e.target.value),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "Все менеджеры"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                lineNumber: 315,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            users.map((user)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: user.id,
                                    children: [
                                        user.second_name,
                                        " ",
                                        user.first_name
                                    ]
                                }, user.id, true, {
                                    fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                    lineNumber: 317,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                        lineNumber: 314,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)) : null
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                lineNumber: 292,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].error,
                children: error
            }, void 0, false, {
                fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                lineNumber: 323,
                columnNumber: 16
            }, ("TURBOPACK compile-time value", void 0)) : null,
            showCreateForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].form,
                onSubmit: createDeal,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "Создание сделки"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                        lineNumber: 327,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formGrid,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                children: [
                                    "Клиент",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].clientPicker,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input,
                                                placeholder: "Начните вводить ФИО или ID клиента",
                                                value: clientSearch,
                                                onFocus: ()=>setClientSearchOpen(true),
                                                onBlur: ()=>window.setTimeout(()=>setClientSearchOpen(false), 120),
                                                onChange: (e)=>{
                                                    setClientSearch(e.target.value);
                                                    setClientSearchOpen(true);
                                                    if (form.client_id) {
                                                        setForm((prev)=>({
                                                                ...prev,
                                                                client_id: ''
                                                            }));
                                                    }
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                                lineNumber: 332,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            clientSearchOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].clientDropdown,
                                                children: clientOptions.length > 0 ? clientOptions.map((client)=>{
                                                    const fullName = `${client.second_name} ${client.first_name} ${client.patronymic ?? ''}`.trim();
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].clientOption,
                                                        onMouseDown: (event)=>event.preventDefault(),
                                                        onClick: ()=>{
                                                            setForm((prev)=>({
                                                                    ...prev,
                                                                    client_id: String(client.id)
                                                                }));
                                                            setClientSearch(fullName);
                                                            setClientSearchOpen(false);
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: fullName
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                                                lineNumber: 363,
                                                                columnNumber: 29
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                                children: [
                                                                    "#",
                                                                    client.id
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                                                lineNumber: 364,
                                                                columnNumber: 29
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, client.id, true, {
                                                        fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                                        lineNumber: 352,
                                                        columnNumber: 27
                                                    }, ("TURBOPACK compile-time value", void 0));
                                                }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].clientEmpty,
                                                    children: "Ничего не найдено"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                                    lineNumber: 369,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                                lineNumber: 347,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)) : null
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                        lineNumber: 331,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                lineNumber: 329,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            !isManager ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                children: [
                                    "Менеджер",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].select,
                                        value: form.manager_id,
                                        onChange: (e)=>setForm({
                                                ...form,
                                                manager_id: e.target.value
                                            }),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "Не назначен"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                                lineNumber: 380,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            users.map((user)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: user.id,
                                                    children: [
                                                        user.second_name,
                                                        " ",
                                                        user.first_name
                                                    ]
                                                }, user.id, true, {
                                                    fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                                    lineNumber: 382,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                        lineNumber: 379,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                lineNumber: 377,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                children: [
                                    "Сумма",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input,
                                        type: "number",
                                        value: form.amount,
                                        onChange: (e)=>setForm({
                                                ...form,
                                                amount: e.target.value
                                            }),
                                        placeholder: "0",
                                        min: 0
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                        lineNumber: 390,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                lineNumber: 388,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                        lineNumber: 328,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formActions,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].secondaryBtn,
                                onClick: ()=>setShowCreateForm(false),
                                children: "Отмена"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                lineNumber: 401,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].primaryBtn,
                                type: "submit",
                                disabled: submitting,
                                children: submitting ? 'Сохранение...' : 'Создать сделку'
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                lineNumber: 402,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                        lineNumber: 400,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                lineNumber: 326,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].empty,
                children: "Загрузка сделок..."
            }, void 0, false, {
                fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                lineNumber: 408,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pipeline,
                children: stageGroups.map((group)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].stageColumn,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].stageHead,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: group.stage
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                        lineNumber: 414,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: group.deals.length
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                        lineNumber: 415,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                lineNumber: 413,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            group.deals.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].stageEmpty,
                                children: "Нет сделок"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                lineNumber: 418,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].stageCards,
                                children: group.deals.map((deal)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card,
                                        id: `deal-${deal.id}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardHead,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: [
                                                            "Сделка #",
                                                            deal.id
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                                        lineNumber: 424,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statusBadge} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"][`status-${deal.status}`] ?? ''}`,
                                                        children: getStatusLabel(deal.status)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                                        lineNumber: 425,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                                lineNumber: 423,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].line,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Клиент:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                                        lineNumber: 428,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    ' ',
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: `/clients/${deal.client_id}`,
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].clientLink,
                                                        children: clientsMap.get(deal.client_id) ?? `ID ${deal.client_id}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                                        lineNumber: 429,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                                lineNumber: 427,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].line,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Менеджер:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                                        lineNumber: 433,
                                                        columnNumber: 50
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    " ",
                                                    deal.manager_id ? managersMap.get(deal.manager_id) ?? `ID ${deal.manager_id}` : 'не назначен'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                                lineNumber: 433,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].line,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Сумма:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                                        lineNumber: 434,
                                                        columnNumber: 50
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    " ",
                                                    formatAmount(deal.amount)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                                lineNumber: 434,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].line,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Дедлайн:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                                        lineNumber: 435,
                                                        columnNumber: 50
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    " ",
                                                    formatDate(deal.deadline)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                                lineNumber: 435,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardControls,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        children: [
                                                            "Этап",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].select,
                                                                value: deal.stage,
                                                                disabled: updatingDealId === deal.id,
                                                                onChange: (e)=>{
                                                                    if (e.target.value === deal.stage) {
                                                                        return;
                                                                    }
                                                                    const nextStatus = e.target.value === LAST_STAGE ? 'успешная' : 'активная';
                                                                    updateDeal(deal.id, {
                                                                        stage: e.target.value
                                                                    }, `Сменить этап сделки на "${e.target.value}"? Статус будет обновлен на "${nextStatus}" автоматически.`).catch(console.error);
                                                                },
                                                                children: STAGES.map((stage)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: stage,
                                                                        children: stage
                                                                    }, stage, false, {
                                                                        fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                                                        lineNumber: 457,
                                                                        columnNumber: 31
                                                                    }, ("TURBOPACK compile-time value", void 0)))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                                                lineNumber: 440,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                                        lineNumber: 438,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        children: [
                                                            "Статус",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].select,
                                                                value: deal.status,
                                                                disabled: updatingDealId === deal.id,
                                                                onChange: (e)=>{
                                                                    if (e.target.value === deal.status) {
                                                                        return;
                                                                    }
                                                                    const willMoveToLastStage = e.target.value === 'won' && deal.stage !== LAST_STAGE;
                                                                    updateDeal(deal.id, {
                                                                        status: e.target.value
                                                                    }, willMoveToLastStage ? `Обновить статус на "${getStatusLabel(e.target.value)}"? Сделка будет автоматически перенесена на этап "${LAST_STAGE}".` : `Обновить статус сделки на "${getStatusLabel(e.target.value)}"?`).catch(console.error);
                                                                },
                                                                children: STATUS_OPTIONS.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: item.value,
                                                                        children: item.label
                                                                    }, item.value, false, {
                                                                        fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                                                        lineNumber: 482,
                                                                        columnNumber: 31
                                                                    }, ("TURBOPACK compile-time value", void 0)))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                                                lineNumber: 463,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                                        lineNumber: 461,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                                lineNumber: 437,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardActions,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].secondaryBtn,
                                                        onClick: ()=>moveStage(deal),
                                                        disabled: updatingDealId === deal.id || STAGES.indexOf(deal.stage) === STAGES.length - 1,
                                                        title: "Перевести на следующий этап",
                                                        children: "Далее"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                                        lineNumber: 489,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dangerBtn,
                                                        onClick: ()=>archiveDeal(deal.id),
                                                        disabled: updatingDealId === deal.id,
                                                        title: "Перенести сделку в архив",
                                                        children: "В архив"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                                        lineNumber: 497,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    deal.status !== 'won' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].successBtn,
                                                        onClick: ()=>closeDeal(deal, 'won'),
                                                        disabled: updatingDealId === deal.id,
                                                        title: "Закрыть сделку как успешную",
                                                        children: "Успех"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                                        lineNumber: 506,
                                                        columnNumber: 27
                                                    }, ("TURBOPACK compile-time value", void 0)) : null,
                                                    deal.status !== 'lost' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].warningBtn,
                                                        onClick: ()=>closeDeal(deal, 'lost'),
                                                        disabled: updatingDealId === deal.id,
                                                        title: "Закрыть сделку как потерянную",
                                                        children: "Потеря"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                                        lineNumber: 516,
                                                        columnNumber: 27
                                                    }, ("TURBOPACK compile-time value", void 0)) : null
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                                lineNumber: 488,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, deal.id, true, {
                                        fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                        lineNumber: 422,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                                lineNumber: 420,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, group.stage, true, {
                        fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                        lineNumber: 412,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                lineNumber: 410,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            !loading && filteredDeals.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].empty,
                children: "По текущим фильтрам сделки не найдены."
            }, void 0, false, {
                fileName: "[project]/src/pages/Deals/DealsPage.tsx",
                lineNumber: 536,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)) : null
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/Deals/DealsPage.tsx",
        lineNumber: 270,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(DealsPage, "h9uy2e34Ith49y0Rf0yxjZZqLP0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$feedback$2f$Notifications$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotifications"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$feedback$2f$ConfirmDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConfirmDialog"]
    ];
});
_c = DealsPage;
var _c;
__turbopack_context__.k.register(_c, "DealsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/(dashboard)/deals/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/pages/Deals/DealsPage.tsx [app-client] (ecmascript)");
'use client';
;
;
function Page() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Deals$2f$DealsPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DealsPage"], {}, void 0, false, {
        fileName: "[project]/src/app/(dashboard)/deals/page.tsx",
        lineNumber: 6,
        columnNumber: 10
    }, this);
}
_c = Page;
var _c;
__turbopack_context__.k.register(_c, "Page");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_0424w3t._.js.map