(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/pages/Tasks/TasksPage.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "actions": "TasksPage-module__f5LWJq__actions",
  "badge": "TasksPage-module__f5LWJq__badge",
  "badge-high": "TasksPage-module__f5LWJq__badge-high",
  "badge-low": "TasksPage-module__f5LWJq__badge-low",
  "badge-medium": "TasksPage-module__f5LWJq__badge-medium",
  "board": "TasksPage-module__f5LWJq__board",
  "card": "TasksPage-module__f5LWJq__card",
  "cardHead": "TasksPage-module__f5LWJq__cardHead",
  "cardMeta": "TasksPage-module__f5LWJq__cardMeta",
  "column": "TasksPage-module__f5LWJq__column",
  "columnEmpty": "TasksPage-module__f5LWJq__columnEmpty",
  "columnHead": "TasksPage-module__f5LWJq__columnHead",
  "columnTasks": "TasksPage-module__f5LWJq__columnTasks",
  "controls": "TasksPage-module__f5LWJq__controls",
  "dangerBtn": "TasksPage-module__f5LWJq__dangerBtn",
  "description": "TasksPage-module__f5LWJq__description",
  "empty": "TasksPage-module__f5LWJq__empty",
  "error": "TasksPage-module__f5LWJq__error",
  "form": "TasksPage-module__f5LWJq__form",
  "formActions": "TasksPage-module__f5LWJq__formActions",
  "formGrid": "TasksPage-module__f5LWJq__formGrid",
  "fullWidth": "TasksPage-module__f5LWJq__fullWidth",
  "header": "TasksPage-module__f5LWJq__header",
  "input": "TasksPage-module__f5LWJq__input",
  "overdue": "TasksPage-module__f5LWJq__overdue",
  "page": "TasksPage-module__f5LWJq__page",
  "primaryBtn": "TasksPage-module__f5LWJq__primaryBtn",
  "search": "TasksPage-module__f5LWJq__search",
  "secondaryBtn": "TasksPage-module__f5LWJq__secondaryBtn",
  "select": "TasksPage-module__f5LWJq__select",
  "statCard": "TasksPage-module__f5LWJq__statCard",
  "statsGrid": "TasksPage-module__f5LWJq__statsGrid",
  "textarea": "TasksPage-module__f5LWJq__textarea",
  "toggle": "TasksPage-module__f5LWJq__toggle",
  "toolbar": "TasksPage-module__f5LWJq__toolbar",
  "toolbarManager": "TasksPage-module__f5LWJq__toolbarManager",
});
}),
"[project]/src/pages/Tasks/TasksPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TasksPage",
    ()=>TasksPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/crm.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/pages/Tasks/TasksPage.module.css [app-client] (css module)");
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
const STATUS_OPTIONS = [
    {
        value: 'open',
        label: 'Новая'
    },
    {
        value: 'in_progress',
        label: 'В работе'
    },
    {
        value: 'done',
        label: 'Готово'
    }
];
const PRIORITY_OPTIONS = [
    {
        value: 'low',
        label: 'Низкий'
    },
    {
        value: 'medium',
        label: 'Средний'
    },
    {
        value: 'high',
        label: 'Высокий'
    }
];
const PRIORITY_WEIGHT = {
    high: 3,
    medium: 2,
    low: 1
};
const getCurrentUser = ()=>{
    const raw = localStorage.getItem('user');
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch  {
        return null;
    }
};
const statusLabel = (status)=>STATUS_OPTIONS.find((item)=>item.value === status)?.label ?? status;
const priorityLabel = (priority)=>PRIORITY_OPTIONS.find((item)=>item.value === priority)?.label ?? priority;
const prettyDateTime = (value)=>{
    if (!value) return 'не задан';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleString('ru-RU');
};
const toInputDateTime = (value)=>{
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    const pad = (n)=>String(n).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};
const TasksPage = ()=>{
    _s();
    const { notify } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$feedback$2f$Notifications$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotifications"])();
    const { confirm } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$feedback$2f$ConfirmDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConfirmDialog"])();
    const currentUser = getCurrentUser();
    const roleRaw = typeof currentUser?.role === 'string' ? currentUser.role : currentUser?.role?.name ?? '';
    const roleName = roleRaw.toLowerCase();
    const isManager = roleName.includes('менеджер') || roleName.includes('manager');
    const [tasks, setTasks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [showCreateForm, setShowCreateForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [updatingTaskId, setUpdatingTaskId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [statusFilter, setStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [priorityFilter, setPriorityFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [mineOnly, setMineOnly] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(isManager);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        title: '',
        description: '',
        priority: 'medium',
        status: 'open',
        deadline: ''
    });
    const load = async ()=>{
        setLoading(true);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tasksApi"].list();
            setTasks(response.data);
            setError('');
        } catch (e) {
            setError(e?.response?.data?.detail ?? 'Не удалось загрузить задачи');
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TasksPage.useEffect": ()=>{
            load().catch(console.error);
        }
    }["TasksPage.useEffect"], []);
    const scopedTasks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TasksPage.useMemo[scopedTasks]": ()=>{
            if (!mineOnly || !currentUser?.id) return tasks;
            return tasks.filter({
                "TasksPage.useMemo[scopedTasks]": (task)=>task.assignee_id === currentUser.id || task.creator_id === currentUser.id
            }["TasksPage.useMemo[scopedTasks]"]);
        }
    }["TasksPage.useMemo[scopedTasks]"], [
        tasks,
        mineOnly,
        currentUser?.id
    ]);
    const filteredTasks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TasksPage.useMemo[filteredTasks]": ()=>{
            const term = query.trim().toLowerCase();
            return scopedTasks.filter({
                "TasksPage.useMemo[filteredTasks]": (task)=>{
                    if (statusFilter && task.status !== statusFilter) return false;
                    if (priorityFilter && task.priority !== priorityFilter) return false;
                    if (!term) return true;
                    return String(task.id).includes(term) || task.title.toLowerCase().includes(term) || (task.description ?? '').toLowerCase().includes(term);
                }
            }["TasksPage.useMemo[filteredTasks]"]);
        }
    }["TasksPage.useMemo[filteredTasks]"], [
        scopedTasks,
        query,
        statusFilter,
        priorityFilter
    ]);
    const groupedTasks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TasksPage.useMemo[groupedTasks]": ()=>STATUS_OPTIONS.map({
                "TasksPage.useMemo[groupedTasks]": (status)=>({
                        ...status,
                        tasks: filteredTasks.filter({
                            "TasksPage.useMemo[groupedTasks]": (task)=>task.status === status.value
                        }["TasksPage.useMemo[groupedTasks]"]).sort({
                            "TasksPage.useMemo[groupedTasks]": (a, b)=>{
                                const byPriority = PRIORITY_WEIGHT[b.priority] - PRIORITY_WEIGHT[a.priority];
                                if (byPriority !== 0) return byPriority;
                                const aDeadline = a.deadline ? new Date(a.deadline).getTime() : Number.POSITIVE_INFINITY;
                                const bDeadline = b.deadline ? new Date(b.deadline).getTime() : Number.POSITIVE_INFINITY;
                                if (aDeadline !== bDeadline) return aDeadline - bDeadline;
                                return b.id - a.id;
                            }
                        }["TasksPage.useMemo[groupedTasks]"])
                    })
            }["TasksPage.useMemo[groupedTasks]"])
    }["TasksPage.useMemo[groupedTasks]"], [
        filteredTasks
    ]);
    const stats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TasksPage.useMemo[stats]": ()=>{
            const now = Date.now();
            const overdue = filteredTasks.filter({
                "TasksPage.useMemo[stats]": (task)=>task.status !== 'done' && task.deadline && new Date(task.deadline).getTime() < now
            }["TasksPage.useMemo[stats]"]).length;
            return {
                total: filteredTasks.length,
                open: filteredTasks.filter({
                    "TasksPage.useMemo[stats]": (task)=>task.status === 'open'
                }["TasksPage.useMemo[stats]"]).length,
                inProgress: filteredTasks.filter({
                    "TasksPage.useMemo[stats]": (task)=>task.status === 'in_progress'
                }["TasksPage.useMemo[stats]"]).length,
                done: filteredTasks.filter({
                    "TasksPage.useMemo[stats]": (task)=>task.status === 'done'
                }["TasksPage.useMemo[stats]"]).length,
                overdue
            };
        }
    }["TasksPage.useMemo[stats]"], [
        filteredTasks
    ]);
    const createTask = async (event)=>{
        event.preventDefault();
        if (!form.title.trim()) return;
        if (!await confirm({
            title: 'Создание задачи',
            message: 'Создать задачу?',
            confirmText: 'Создать'
        })) return;
        try {
            setSubmitting(true);
            const payload = {
                title: form.title.trim(),
                description: form.description.trim() || undefined,
                priority: form.priority,
                deadline: form.deadline ? new Date(form.deadline).toISOString() : undefined,
                assignee_id: currentUser?.id,
                creator_id: currentUser?.id
            };
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tasksApi"].create(payload);
            if (form.status !== 'open') {
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tasksApi"].patch(response.data.id, {
                    status: form.status
                });
            }
            setForm({
                title: '',
                description: '',
                priority: 'medium',
                status: 'open',
                deadline: ''
            });
            setShowCreateForm(false);
            await load();
            notify('success', 'Задача создана', 'Новая задача добавлена.', {
                href: `/tasks#task-${response.data.id}`
            });
        } catch  {
            notify('error', 'Ошибка', 'Не удалось создать задачу.');
        } finally{
            setSubmitting(false);
        }
    };
    const patchTask = async (task, payload, confirmText)=>{
        if (!await confirm({
            title: 'Подтверждение изменения',
            message: confirmText,
            confirmText: 'Подтвердить'
        })) return;
        try {
            setUpdatingTaskId(task.id);
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tasksApi"].patch(task.id, payload);
            await load();
            notify('info', 'Задача обновлена', 'Изменения сохранены.', {
                href: `/tasks#task-${task.id}`
            });
        } catch  {
            notify('error', 'Ошибка', 'Не удалось обновить задачу.');
        } finally{
            setUpdatingTaskId(null);
        }
    };
    const moveNext = async (task)=>{
        const nextStatus = task.status === 'open' ? 'in_progress' : task.status === 'in_progress' ? 'done' : 'open';
        await patchTask(task, {
            status: nextStatus
        }, `Перевести задачу в статус "${statusLabel(nextStatus)}"?`);
    };
    const archiveTask = async (taskId)=>{
        if (!await confirm({
            title: 'Архивация задачи',
            message: 'Архивировать задачу?',
            confirmText: 'Архивировать',
            variant: 'danger'
        })) return;
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tasksApi"].remove(taskId);
            await load();
            notify('info', 'Задача архивирована', 'Задача перенесена в архив.', {
                href: '/archive'
            });
        } catch  {
            notify('error', 'Ошибка', 'Не удалось архивировать задачу.');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].page,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                children: "Задачи"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                lineNumber: 227,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: isManager ? 'Планирование и контроль ваших задач по клиентам и сделкам.' : 'Рабочие задачи команды.'
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                lineNumber: 228,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                        lineNumber: 226,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].primaryBtn,
                        type: "button",
                        onClick: ()=>setShowCreateForm((prev)=>!prev),
                        children: showCreateForm ? 'Скрыть форму' : 'Новая задача'
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                        lineNumber: 230,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                lineNumber: 225,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statsGrid,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statCard,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Всего"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                lineNumber: 236,
                                columnNumber: 46
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: stats.total
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                lineNumber: 236,
                                columnNumber: 64
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                        lineNumber: 236,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statCard,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Новые"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                lineNumber: 237,
                                columnNumber: 46
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: stats.open
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                lineNumber: 237,
                                columnNumber: 64
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                        lineNumber: 237,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statCard,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "В работе"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                lineNumber: 238,
                                columnNumber: 46
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: stats.inProgress
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                lineNumber: 238,
                                columnNumber: 67
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                        lineNumber: 238,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statCard,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Готово"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                lineNumber: 239,
                                columnNumber: 46
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: stats.done
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                lineNumber: 239,
                                columnNumber: 65
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                        lineNumber: 239,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statCard,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Просрочено"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                lineNumber: 240,
                                columnNumber: 46
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: stats.overdue
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                lineNumber: 240,
                                columnNumber: 69
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                        lineNumber: 240,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                lineNumber: 235,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].toolbar} ${isManager ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].toolbarManager : ''}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].search,
                        placeholder: "Поиск: ID, название, описание",
                        value: query,
                        onChange: (e)=>setQuery(e.target.value)
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                        lineNumber: 244,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].select,
                        value: statusFilter,
                        onChange: (e)=>setStatusFilter(e.target.value),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "Все статусы"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                lineNumber: 251,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            STATUS_OPTIONS.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: option.value,
                                    children: option.label
                                }, option.value, false, {
                                    fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                    lineNumber: 253,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                        lineNumber: 250,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].select,
                        value: priorityFilter,
                        onChange: (e)=>setPriorityFilter(e.target.value),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "Все приоритеты"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                lineNumber: 257,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            PRIORITY_OPTIONS.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: option.value,
                                    children: option.label
                                }, option.value, false, {
                                    fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                    lineNumber: 259,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                        lineNumber: 256,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    !isManager ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].toggle,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                checked: mineOnly,
                                onChange: (e)=>setMineOnly(e.target.checked)
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                lineNumber: 264,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            "Только мои"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                        lineNumber: 263,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)) : null
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                lineNumber: 243,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].error,
                children: error
            }, void 0, false, {
                fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                lineNumber: 270,
                columnNumber: 16
            }, ("TURBOPACK compile-time value", void 0)) : null,
            showCreateForm ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].form,
                onSubmit: createTask,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "Создание задачи"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                        lineNumber: 274,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formGrid,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                children: [
                                    "Название",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input,
                                        value: form.title,
                                        onChange: (e)=>setForm((prev)=>({
                                                    ...prev,
                                                    title: e.target.value
                                                })),
                                        placeholder: "Позвонить родителю, уточнить оплату...",
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                        lineNumber: 278,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                lineNumber: 276,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                children: [
                                    "Приоритет",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].select,
                                        value: form.priority,
                                        onChange: (e)=>setForm((prev)=>({
                                                    ...prev,
                                                    priority: e.target.value
                                                })),
                                        children: PRIORITY_OPTIONS.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: option.value,
                                                children: option.label
                                            }, option.value, false, {
                                                fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                                lineNumber: 294,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)))
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                        lineNumber: 288,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                lineNumber: 286,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                children: [
                                    "Статус",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].select,
                                        value: form.status,
                                        onChange: (e)=>setForm((prev)=>({
                                                    ...prev,
                                                    status: e.target.value
                                                })),
                                        children: STATUS_OPTIONS.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: option.value,
                                                children: option.label
                                            }, option.value, false, {
                                                fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                                lineNumber: 306,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)))
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                        lineNumber: 300,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                lineNumber: 298,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                children: [
                                    "Дедлайн",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input,
                                        type: "datetime-local",
                                        value: form.deadline,
                                        onChange: (e)=>setForm((prev)=>({
                                                    ...prev,
                                                    deadline: e.target.value
                                                }))
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                        lineNumber: 312,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                lineNumber: 310,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].fullWidth,
                                children: [
                                    "Комментарий",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].textarea,
                                        value: form.description,
                                        onChange: (e)=>setForm((prev)=>({
                                                    ...prev,
                                                    description: e.target.value
                                                })),
                                        placeholder: "Детали задачи",
                                        rows: 3
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                        lineNumber: 321,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                lineNumber: 319,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                        lineNumber: 275,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formActions,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].secondaryBtn,
                                onClick: ()=>setShowCreateForm(false),
                                children: "Отмена"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                lineNumber: 331,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].primaryBtn,
                                type: "submit",
                                disabled: submitting,
                                children: submitting ? 'Сохранение...' : 'Создать задачу'
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                lineNumber: 332,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                        lineNumber: 330,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                lineNumber: 273,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)) : null,
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].empty,
                children: "Загрузка задач..."
            }, void 0, false, {
                fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                lineNumber: 338,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].board,
                children: groupedTasks.map((group)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].column,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].columnHead,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: group.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                        lineNumber: 344,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: group.tasks.length
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                        lineNumber: 345,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                lineNumber: 343,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            group.tasks.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].columnEmpty,
                                children: "Нет задач"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                lineNumber: 348,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].columnTasks,
                                children: group.tasks.map((task)=>{
                                    const isOverdue = task.status !== 'done' && Boolean(task.deadline) && new Date(task.deadline).getTime() < Date.now();
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card,
                                        id: `task-${task.id}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardHead,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: task.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                                        lineNumber: 356,
                                                        columnNumber: 27
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].badge} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"][`badge-${task.priority}`]}`,
                                                        children: priorityLabel(task.priority)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                                        lineNumber: 357,
                                                        columnNumber: 27
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                                lineNumber: 355,
                                                columnNumber: 25
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardMeta,
                                                children: [
                                                    "ID #",
                                                    task.id,
                                                    " • ",
                                                    statusLabel(task.status)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                                lineNumber: 359,
                                                columnNumber: 25
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            task.description ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].description,
                                                children: task.description
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                                lineNumber: 360,
                                                columnNumber: 45
                                            }, ("TURBOPACK compile-time value", void 0)) : null,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardMeta} ${isOverdue ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].overdue : ''}`,
                                                children: [
                                                    "Дедлайн: ",
                                                    prettyDateTime(task.deadline)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                                lineNumber: 361,
                                                columnNumber: 25
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].controls,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        children: [
                                                            "Статус",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].select,
                                                                value: task.status,
                                                                disabled: updatingTaskId === task.id,
                                                                onChange: (e)=>{
                                                                    const next = e.target.value;
                                                                    if (next === task.status) return;
                                                                    patchTask(task, {
                                                                        status: next
                                                                    }, `Сменить статус на "${statusLabel(next)}"?`).catch(console.error);
                                                                },
                                                                children: STATUS_OPTIONS.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: option.value,
                                                                        children: option.label
                                                                    }, option.value, false, {
                                                                        fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                                                        lineNumber: 377,
                                                                        columnNumber: 33
                                                                    }, ("TURBOPACK compile-time value", void 0)))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                                                lineNumber: 366,
                                                                columnNumber: 29
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                                        lineNumber: 364,
                                                        columnNumber: 27
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        children: [
                                                            "Приоритет",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].select,
                                                                value: task.priority,
                                                                disabled: updatingTaskId === task.id,
                                                                onChange: (e)=>{
                                                                    const next = e.target.value;
                                                                    if (next === task.priority) return;
                                                                    patchTask(task, {
                                                                        priority: next
                                                                    }, `Сменить приоритет на "${priorityLabel(next)}"?`).catch(console.error);
                                                                },
                                                                children: PRIORITY_OPTIONS.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: option.value,
                                                                        children: option.label
                                                                    }, option.value, false, {
                                                                        fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                                                        lineNumber: 394,
                                                                        columnNumber: 33
                                                                    }, ("TURBOPACK compile-time value", void 0)))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                                                lineNumber: 383,
                                                                columnNumber: 29
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                                        lineNumber: 381,
                                                        columnNumber: 27
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        children: [
                                                            "Дедлайн",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input,
                                                                type: "datetime-local",
                                                                value: toInputDateTime(task.deadline),
                                                                disabled: updatingTaskId === task.id,
                                                                onChange: (e)=>{
                                                                    const value = e.target.value;
                                                                    patchTask(task, {
                                                                        deadline: value ? new Date(value).toISOString() : null
                                                                    }, value ? 'Обновить дедлайн задачи?' : 'Убрать дедлайн задачи?').catch(console.error);
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                                                lineNumber: 400,
                                                                columnNumber: 29
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                                        lineNumber: 398,
                                                        columnNumber: 27
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                                lineNumber: 363,
                                                columnNumber: 25
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].actions,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].secondaryBtn,
                                                        type: "button",
                                                        onClick: ()=>moveNext(task),
                                                        disabled: updatingTaskId === task.id,
                                                        children: "Следующий статус"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                                        lineNumber: 418,
                                                        columnNumber: 27
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dangerBtn,
                                                        type: "button",
                                                        onClick: ()=>archiveTask(task.id),
                                                        disabled: updatingTaskId === task.id,
                                                        children: "Архивировать"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                                        lineNumber: 421,
                                                        columnNumber: 27
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                                lineNumber: 417,
                                                columnNumber: 25
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, task.id, true, {
                                        fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                        lineNumber: 354,
                                        columnNumber: 23
                                    }, ("TURBOPACK compile-time value", void 0));
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                                lineNumber: 350,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, group.value, true, {
                        fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                        lineNumber: 342,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                lineNumber: 340,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            !loading && filteredTasks.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].empty,
                children: "По текущим фильтрам задачи не найдены."
            }, void 0, false, {
                fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
                lineNumber: 436,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)) : null
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/Tasks/TasksPage.tsx",
        lineNumber: 224,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(TasksPage, "L6TJ1XN8ztp75oPlqqUJlLQeu0M=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$feedback$2f$Notifications$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotifications"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$feedback$2f$ConfirmDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConfirmDialog"]
    ];
});
_c = TasksPage;
var _c;
__turbopack_context__.k.register(_c, "TasksPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/(dashboard)/tasks/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/pages/Tasks/TasksPage.tsx [app-client] (ecmascript)");
'use client';
;
;
function Page() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Tasks$2f$TasksPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TasksPage"], {}, void 0, false, {
        fileName: "[project]/src/app/(dashboard)/tasks/page.tsx",
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

//# sourceMappingURL=src_0fe0p0s._.js.map