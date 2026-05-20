(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/providers/query-provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QueryProvider",
    ()=>QueryProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/queryClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function QueryProvider({ children }) {
    _s();
    const [queryClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "QueryProvider.useState": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClient"]({
                defaultOptions: {
                    queries: {
                        staleTime: 30_000,
                        retry: 1,
                        refetchOnWindowFocus: true
                    }
                }
            })
    }["QueryProvider.useState"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClientProvider"], {
        client: queryClient,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/lib/providers/query-provider.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_s(QueryProvider, "x5TWDoWXXTDfhnPIYkfH1vozShg=");
_c = QueryProvider;
var _c;
__turbopack_context__.k.register(_c, "QueryProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/feedback/ConfirmDialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConfirmDialogProvider",
    ()=>ConfirmDialogProvider,
    "useConfirmDialog",
    ()=>useConfirmDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
const ConfirmDialogContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
const INITIAL_STATE = {
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Подтвердить',
    cancelText: 'Отмена',
    variant: 'primary'
};
const ConfirmDialogProvider = ({ children })=>{
    _s();
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(INITIAL_STATE);
    const [resolver, setResolver] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const close = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ConfirmDialogProvider.useCallback[close]": (result)=>{
            if (resolver) {
                resolver(result);
            }
            setResolver(null);
            setState(INITIAL_STATE);
        }
    }["ConfirmDialogProvider.useCallback[close]"], [
        resolver
    ]);
    const confirm = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ConfirmDialogProvider.useCallback[confirm]": (options)=>{
            setState({
                isOpen: true,
                title: options.title ?? 'Подтверждение действия',
                message: options.message,
                confirmText: options.confirmText ?? 'Подтвердить',
                cancelText: options.cancelText ?? 'Отмена',
                variant: options.variant ?? 'primary'
            });
            return new Promise({
                "ConfirmDialogProvider.useCallback[confirm]": (resolve)=>{
                    setResolver({
                        "ConfirmDialogProvider.useCallback[confirm]": ()=>resolve
                    }["ConfirmDialogProvider.useCallback[confirm]"]);
                }
            }["ConfirmDialogProvider.useCallback[confirm]"]);
        }
    }["ConfirmDialogProvider.useCallback[confirm]"], []);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ConfirmDialogProvider.useMemo[value]": ()=>({
                confirm
            })
    }["ConfirmDialogProvider.useMemo[value]"], [
        confirm
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ConfirmDialogProvider.useEffect": ()=>{
            if (!state.isOpen) return undefined;
            const onKeyDown = {
                "ConfirmDialogProvider.useEffect.onKeyDown": (event)=>{
                    if (event.key === 'Escape') {
                        close(false);
                    }
                }
            }["ConfirmDialogProvider.useEffect.onKeyDown"];
            window.addEventListener('keydown', onKeyDown);
            return ({
                "ConfirmDialogProvider.useEffect": ()=>window.removeEventListener('keydown', onKeyDown)
            })["ConfirmDialogProvider.useEffect"];
        }
    }["ConfirmDialogProvider.useEffect"], [
        state.isOpen,
        close
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ConfirmDialogContext.Provider, {
        value: value,
        children: [
            children,
            state.isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "confirm-overlay",
                role: "presentation",
                onClick: (event)=>{
                    if (event.target === event.currentTarget) {
                        close(false);
                    }
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                    className: "confirm-modal",
                    role: "dialog",
                    "aria-modal": "true",
                    "aria-labelledby": "confirm-title",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                            className: "confirm-header",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                id: "confirm-title",
                                children: state.title
                            }, void 0, false, {
                                fileName: "[project]/src/components/feedback/ConfirmDialog.tsx",
                                lineNumber: 90,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/feedback/ConfirmDialog.tsx",
                            lineNumber: 89,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "confirm-body",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: state.message
                            }, void 0, false, {
                                fileName: "[project]/src/components/feedback/ConfirmDialog.tsx",
                                lineNumber: 93,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/feedback/ConfirmDialog.tsx",
                            lineNumber: 92,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                            className: "confirm-actions",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "confirm-btn confirm-btn-secondary",
                                    onClick: ()=>close(false),
                                    children: state.cancelText
                                }, void 0, false, {
                                    fileName: "[project]/src/components/feedback/ConfirmDialog.tsx",
                                    lineNumber: 96,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: `confirm-btn ${state.variant === 'danger' ? 'confirm-btn-danger' : 'confirm-btn-primary'}`,
                                    onClick: ()=>close(true),
                                    autoFocus: true,
                                    children: state.confirmText
                                }, void 0, false, {
                                    fileName: "[project]/src/components/feedback/ConfirmDialog.tsx",
                                    lineNumber: 99,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/feedback/ConfirmDialog.tsx",
                            lineNumber: 95,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/feedback/ConfirmDialog.tsx",
                    lineNumber: 88,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/feedback/ConfirmDialog.tsx",
                lineNumber: 79,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)), document.body)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/feedback/ConfirmDialog.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ConfirmDialogProvider, "b5p7Yp1rONroL9cCRmwg+VClmuc=");
_c = ConfirmDialogProvider;
const useConfirmDialog = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ConfirmDialogContext);
    if (!context) {
        throw new Error('useConfirmDialog must be used inside ConfirmDialogProvider');
    }
    return context;
};
_s1(useConfirmDialog, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "ConfirmDialogProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/utils/teacherSettings.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_TEACHER_SETTINGS",
    ()=>DEFAULT_TEACHER_SETTINGS,
    "loadTeacherSettings",
    ()=>loadTeacherSettings,
    "saveTeacherSettings",
    ()=>saveTeacherSettings
]);
const DEFAULT_TEACHER_SETTINGS = {
    desktopView: 'dayGridMonth',
    mobileView: 'timeGridWeek',
    timeFormat: '24h',
    firstDay: 1,
    slotDuration: '00:30:00',
    snapDuration: '00:15:00',
    dayStartTime: '08:00:00',
    dayEndTime: '22:00:00',
    initialScrollTime: '09:00:00',
    monthEventRows: 2,
    showNowIndicator: true,
    showWeekends: true,
    showLegend: true,
    denseEvents: false,
    showCancelledLessons: true,
    showEventTypeBadges: true,
    showEventStatusBadges: true,
    eventTitleMode: 'full',
    eventTitleLines: 2,
    showEventTime: true,
    showRecurringBadge: true,
    dimConductedEvents: false,
    showCourseInTitle: true,
    autoMarkNotificationsRead: true,
    toastDurationMs: 4000,
    maxVisibleToasts: 5
};
const isObject = (value)=>typeof value === 'object' && value !== null;
const normalizeSettings = (raw)=>{
    if (!isObject(raw)) {
        return DEFAULT_TEACHER_SETTINGS;
    }
    const desktopView = raw.desktopView;
    const mobileView = raw.mobileView;
    const timeFormat = raw.timeFormat;
    const firstDay = raw.firstDay;
    const slotDuration = raw.slotDuration;
    const snapDuration = raw.snapDuration;
    const dayStartTime = raw.dayStartTime;
    const dayEndTime = raw.dayEndTime;
    const initialScrollTime = raw.initialScrollTime;
    const monthEventRows = raw.monthEventRows;
    const showNowIndicator = raw.showNowIndicator;
    const showWeekends = raw.showWeekends;
    const showLegend = raw.showLegend;
    const denseEvents = raw.denseEvents;
    const showCancelledLessons = raw.showCancelledLessons;
    const showEventTypeBadges = raw.showEventTypeBadges;
    const showEventStatusBadges = raw.showEventStatusBadges;
    const eventTitleMode = raw.eventTitleMode;
    const eventTitleLines = raw.eventTitleLines;
    const showEventTime = raw.showEventTime;
    const showRecurringBadge = raw.showRecurringBadge;
    const dimConductedEvents = raw.dimConductedEvents;
    const showCourseInTitle = raw.showCourseInTitle;
    const autoMarkNotificationsRead = raw.autoMarkNotificationsRead;
    const toastDurationMs = raw.toastDurationMs;
    const maxVisibleToasts = raw.maxVisibleToasts;
    const timeRegex = /^\d{2}:\d{2}:\d{2}$/;
    return {
        desktopView: desktopView === 'timeGridWeek' || desktopView === 'listWeek' || desktopView === 'dayGridMonth' ? desktopView : DEFAULT_TEACHER_SETTINGS.desktopView,
        mobileView: mobileView === 'timeGridDay' || mobileView === 'listWeek' || mobileView === 'timeGridWeek' ? mobileView : DEFAULT_TEACHER_SETTINGS.mobileView,
        timeFormat: timeFormat === '12h' ? '12h' : DEFAULT_TEACHER_SETTINGS.timeFormat,
        firstDay: firstDay === 0 ? 0 : DEFAULT_TEACHER_SETTINGS.firstDay,
        slotDuration: slotDuration === '00:15:00' || slotDuration === '01:00:00' || slotDuration === '00:30:00' ? slotDuration : DEFAULT_TEACHER_SETTINGS.slotDuration,
        snapDuration: snapDuration === '00:05:00' || snapDuration === '00:10:00' || snapDuration === '00:30:00' || snapDuration === '00:15:00' ? snapDuration : DEFAULT_TEACHER_SETTINGS.snapDuration,
        dayStartTime: typeof dayStartTime === 'string' && timeRegex.test(dayStartTime) ? dayStartTime : DEFAULT_TEACHER_SETTINGS.dayStartTime,
        dayEndTime: typeof dayEndTime === 'string' && timeRegex.test(dayEndTime) ? dayEndTime : DEFAULT_TEACHER_SETTINGS.dayEndTime,
        initialScrollTime: typeof initialScrollTime === 'string' && timeRegex.test(initialScrollTime) ? initialScrollTime : DEFAULT_TEACHER_SETTINGS.initialScrollTime,
        monthEventRows: monthEventRows === 3 || monthEventRows === 4 ? monthEventRows : DEFAULT_TEACHER_SETTINGS.monthEventRows,
        showNowIndicator: typeof showNowIndicator === 'boolean' ? showNowIndicator : DEFAULT_TEACHER_SETTINGS.showNowIndicator,
        showWeekends: typeof showWeekends === 'boolean' ? showWeekends : DEFAULT_TEACHER_SETTINGS.showWeekends,
        showLegend: typeof showLegend === 'boolean' ? showLegend : DEFAULT_TEACHER_SETTINGS.showLegend,
        denseEvents: typeof denseEvents === 'boolean' ? denseEvents : DEFAULT_TEACHER_SETTINGS.denseEvents,
        showCancelledLessons: typeof showCancelledLessons === 'boolean' ? showCancelledLessons : DEFAULT_TEACHER_SETTINGS.showCancelledLessons,
        showEventTypeBadges: typeof showEventTypeBadges === 'boolean' ? showEventTypeBadges : DEFAULT_TEACHER_SETTINGS.showEventTypeBadges,
        showEventStatusBadges: typeof showEventStatusBadges === 'boolean' ? showEventStatusBadges : DEFAULT_TEACHER_SETTINGS.showEventStatusBadges,
        eventTitleMode: eventTitleMode === 'short' ? 'short' : DEFAULT_TEACHER_SETTINGS.eventTitleMode,
        eventTitleLines: eventTitleLines === 1 || eventTitleLines === 3 ? eventTitleLines : DEFAULT_TEACHER_SETTINGS.eventTitleLines,
        showEventTime: typeof showEventTime === 'boolean' ? showEventTime : DEFAULT_TEACHER_SETTINGS.showEventTime,
        showRecurringBadge: typeof showRecurringBadge === 'boolean' ? showRecurringBadge : DEFAULT_TEACHER_SETTINGS.showRecurringBadge,
        dimConductedEvents: typeof dimConductedEvents === 'boolean' ? dimConductedEvents : DEFAULT_TEACHER_SETTINGS.dimConductedEvents,
        showCourseInTitle: typeof showCourseInTitle === 'boolean' ? showCourseInTitle : DEFAULT_TEACHER_SETTINGS.showCourseInTitle,
        autoMarkNotificationsRead: typeof autoMarkNotificationsRead === 'boolean' ? autoMarkNotificationsRead : DEFAULT_TEACHER_SETTINGS.autoMarkNotificationsRead,
        toastDurationMs: toastDurationMs === 6000 || toastDurationMs === 8000 ? toastDurationMs : DEFAULT_TEACHER_SETTINGS.toastDurationMs,
        maxVisibleToasts: maxVisibleToasts === 3 || maxVisibleToasts === 8 ? maxVisibleToasts : DEFAULT_TEACHER_SETTINGS.maxVisibleToasts
    };
};
const keyByUser = (userId)=>`teacher_settings_${userId}`;
const loadTeacherSettings = (user)=>{
    if (!user) {
        return DEFAULT_TEACHER_SETTINGS;
    }
    const roleName = user.role?.name?.toLowerCase() ?? '';
    const isTeacher = roleName.includes('преподаватель') || roleName.includes('teacher');
    if (!isTeacher) {
        return DEFAULT_TEACHER_SETTINGS;
    }
    const raw = localStorage.getItem(keyByUser(user.id));
    if (!raw) {
        return DEFAULT_TEACHER_SETTINGS;
    }
    try {
        return normalizeSettings(JSON.parse(raw));
    } catch  {
        return DEFAULT_TEACHER_SETTINGS;
    }
};
const saveTeacherSettings = (user, settings)=>{
    localStorage.setItem(keyByUser(user.id), JSON.stringify(settings));
    window.dispatchEvent(new Event('teacher-settings-updated'));
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/feedback/Notifications.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NotificationsProvider",
    ()=>NotificationsProvider,
    "useNotifications",
    ()=>useNotifications
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$teacherSettings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/teacherSettings.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
const NotificationsContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
const NotificationsProvider = ({ children })=>{
    _s();
    const [notifications, setNotifications] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [toastIds, setToastIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const getCurrentUser = ()=>{
        const raw = localStorage.getItem('user');
        if (!raw) return null;
        try {
            return JSON.parse(raw);
        } catch  {
            return null;
        }
    };
    const notify = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "NotificationsProvider.useCallback[notify]": (type, title, message, options)=>{
            const user = getCurrentUser();
            const settings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$teacherSettings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadTeacherSettings"])(user);
            const toastLifetime = settings.toastDurationMs;
            const maxVisibleToasts = settings.maxVisibleToasts;
            const id = Date.now() + Math.floor(Math.random() * 1000);
            setNotifications({
                "NotificationsProvider.useCallback[notify]": (prev)=>[
                        {
                            id,
                            type,
                            title,
                            message,
                            createdAt: new Date().toISOString(),
                            read: false,
                            href: options?.href
                        },
                        ...prev
                    ]
            }["NotificationsProvider.useCallback[notify]"]);
            setToastIds({
                "NotificationsProvider.useCallback[notify]": (prev)=>[
                        id,
                        ...prev
                    ].slice(0, maxVisibleToasts)
            }["NotificationsProvider.useCallback[notify]"]);
            setTimeout({
                "NotificationsProvider.useCallback[notify]": ()=>{
                    setToastIds({
                        "NotificationsProvider.useCallback[notify]": (prev)=>prev.filter({
                                "NotificationsProvider.useCallback[notify]": (toastId)=>toastId !== id
                            }["NotificationsProvider.useCallback[notify]"])
                    }["NotificationsProvider.useCallback[notify]"]);
                }
            }["NotificationsProvider.useCallback[notify]"], toastLifetime);
        }
    }["NotificationsProvider.useCallback[notify]"], []);
    const dismissToast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "NotificationsProvider.useCallback[dismissToast]": (id)=>{
            setToastIds({
                "NotificationsProvider.useCallback[dismissToast]": (prev)=>prev.filter({
                        "NotificationsProvider.useCallback[dismissToast]": (toastId)=>toastId !== id
                    }["NotificationsProvider.useCallback[dismissToast]"])
            }["NotificationsProvider.useCallback[dismissToast]"]);
            setNotifications({
                "NotificationsProvider.useCallback[dismissToast]": (prev)=>prev.map({
                        "NotificationsProvider.useCallback[dismissToast]": (item)=>item.id === id ? {
                                ...item,
                                read: true
                            } : item
                    }["NotificationsProvider.useCallback[dismissToast]"])
            }["NotificationsProvider.useCallback[dismissToast]"]);
        }
    }["NotificationsProvider.useCallback[dismissToast]"], []);
    const dismissAllToasts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "NotificationsProvider.useCallback[dismissAllToasts]": ()=>{
            setToastIds([]);
            setNotifications({
                "NotificationsProvider.useCallback[dismissAllToasts]": (prev)=>prev.map({
                        "NotificationsProvider.useCallback[dismissAllToasts]": (item)=>({
                                ...item,
                                read: true
                            })
                    }["NotificationsProvider.useCallback[dismissAllToasts]"])
            }["NotificationsProvider.useCallback[dismissAllToasts]"]);
        }
    }["NotificationsProvider.useCallback[dismissAllToasts]"], []);
    const markAsRead = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "NotificationsProvider.useCallback[markAsRead]": (id)=>{
            setNotifications({
                "NotificationsProvider.useCallback[markAsRead]": (prev)=>prev.map({
                        "NotificationsProvider.useCallback[markAsRead]": (item)=>item.id === id ? {
                                ...item,
                                read: true
                            } : item
                    }["NotificationsProvider.useCallback[markAsRead]"])
            }["NotificationsProvider.useCallback[markAsRead]"]);
        }
    }["NotificationsProvider.useCallback[markAsRead]"], []);
    const markAllAsRead = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "NotificationsProvider.useCallback[markAllAsRead]": ()=>{
            setNotifications({
                "NotificationsProvider.useCallback[markAllAsRead]": (prev)=>prev.map({
                        "NotificationsProvider.useCallback[markAllAsRead]": (item)=>({
                                ...item,
                                read: true
                            })
                    }["NotificationsProvider.useCallback[markAllAsRead]"])
            }["NotificationsProvider.useCallback[markAllAsRead]"]);
        }
    }["NotificationsProvider.useCallback[markAllAsRead]"], []);
    const unreadCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "NotificationsProvider.useMemo[unreadCount]": ()=>notifications.filter({
                "NotificationsProvider.useMemo[unreadCount]": (item)=>!item.read
            }["NotificationsProvider.useMemo[unreadCount]"]).length
    }["NotificationsProvider.useMemo[unreadCount]"], [
        notifications
    ]);
    const toastItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "NotificationsProvider.useMemo[toastItems]": ()=>toastIds.map({
                "NotificationsProvider.useMemo[toastItems]": (id)=>notifications.find({
                        "NotificationsProvider.useMemo[toastItems]": (item)=>item.id === id
                    }["NotificationsProvider.useMemo[toastItems]"])
            }["NotificationsProvider.useMemo[toastItems]"]).filter(Boolean)
    }["NotificationsProvider.useMemo[toastItems]"], [
        toastIds,
        notifications
    ]);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "NotificationsProvider.useMemo[value]": ()=>({
                notify,
                notifications,
                unreadCount,
                markAsRead,
                markAllAsRead
            })
    }["NotificationsProvider.useMemo[value]"], [
        notify,
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NotificationsContext.Provider, {
        value: value,
        children: [
            children,
            toastItems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "notifications",
                role: "status",
                "aria-live": "polite",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "notifications-actions",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "notifications-hide-all",
                            onClick: dismissAllToasts,
                            children: "Скрыть все"
                        }, void 0, false, {
                            fileName: "[project]/src/components/feedback/Notifications.tsx",
                            lineNumber: 104,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/feedback/Notifications.tsx",
                        lineNumber: 103,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    toastItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                            className: `notification notification--${item.type}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "notification-close",
                                    onClick: ()=>dismissToast(item.id),
                                    "aria-label": "Скрыть уведомление",
                                    children: "×"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/feedback/Notifications.tsx",
                                    lineNumber: 110,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "notification-title",
                                    children: item.title
                                }, void 0, false, {
                                    fileName: "[project]/src/components/feedback/Notifications.tsx",
                                    lineNumber: 118,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "notification-text",
                                    children: item.message
                                }, void 0, false, {
                                    fileName: "[project]/src/components/feedback/Notifications.tsx",
                                    lineNumber: 119,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, item.id, true, {
                            fileName: "[project]/src/components/feedback/Notifications.tsx",
                            lineNumber: 109,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/feedback/Notifications.tsx",
                lineNumber: 102,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/feedback/Notifications.tsx",
        lineNumber: 99,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(NotificationsProvider, "fMRhQr/nTahenWV30XNZxlc37FU=");
_c = NotificationsProvider;
const useNotifications = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(NotificationsContext);
    if (!context) {
        throw new Error('useNotifications must be used inside NotificationsProvider');
    }
    return context;
};
_s1(useNotifications, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "NotificationsProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/stores/notifications-store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useNotifications",
    ()=>useNotifications,
    "useNotificationsStore",
    ()=>useNotificationsStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
const useNotificationsStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        notifications: [],
        toastIds: [],
        notify: (type, title, message, options)=>{
            const id = Date.now() + Math.floor(Math.random() * 1000);
            const maxVisibleToasts = 5;
            const toastLifetime = 4000;
            set((state)=>({
                    notifications: [
                        {
                            id,
                            type,
                            title,
                            message,
                            createdAt: new Date().toISOString(),
                            read: false,
                            href: options?.href
                        },
                        ...state.notifications
                    ],
                    toastIds: [
                        id,
                        ...state.toastIds
                    ].slice(0, maxVisibleToasts)
                }));
            setTimeout(()=>{
                set((state)=>({
                        toastIds: state.toastIds.filter((toastId)=>toastId !== id)
                    }));
            }, toastLifetime);
        },
        dismissToast: (id)=>{
            set((state)=>({
                    toastIds: state.toastIds.filter((toastId)=>toastId !== id),
                    notifications: state.notifications.map((item)=>item.id === id ? {
                            ...item,
                            read: true
                        } : item)
                }));
        },
        dismissAllToasts: ()=>{
            set((state)=>({
                    toastIds: [],
                    notifications: state.notifications.map((item)=>({
                            ...item,
                            read: true
                        }))
                }));
        },
        markAsRead: (id)=>{
            set((state)=>({
                    notifications: state.notifications.map((item)=>item.id === id ? {
                            ...item,
                            read: true
                        } : item)
                }));
        },
        markAllAsRead: ()=>{
            set((state)=>({
                    notifications: state.notifications.map((item)=>({
                            ...item,
                            read: true
                        }))
                }));
        }
    }));
const useNotifications = ()=>{
    _s();
    const store = useNotificationsStore();
    return {
        notify: store.notify,
        notifications: store.notifications,
        unreadCount: store.notifications.filter((n)=>!n.read).length,
        markAsRead: store.markAsRead,
        markAllAsRead: store.markAllAsRead
    };
};
_s(useNotifications, "umC0hIAtyg7/mVwaux+ml0Cb6hA=", false, function() {
    return [
        useNotificationsStore
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/feedback/ToastContainer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToastContainer",
    ()=>ToastContainer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$notifications$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/stores/notifications-store.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function ToastContainer() {
    _s();
    const toastIds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$notifications$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotificationsStore"])({
        "ToastContainer.useNotificationsStore[toastIds]": (s)=>s.toastIds
    }["ToastContainer.useNotificationsStore[toastIds]"]);
    const notifications = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$notifications$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotificationsStore"])({
        "ToastContainer.useNotificationsStore[notifications]": (s)=>s.notifications
    }["ToastContainer.useNotificationsStore[notifications]"]);
    const dismissToast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$notifications$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotificationsStore"])({
        "ToastContainer.useNotificationsStore[dismissToast]": (s)=>s.dismissToast
    }["ToastContainer.useNotificationsStore[dismissToast]"]);
    const dismissAllToasts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$notifications$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotificationsStore"])({
        "ToastContainer.useNotificationsStore[dismissAllToasts]": (s)=>s.dismissAllToasts
    }["ToastContainer.useNotificationsStore[dismissAllToasts]"]);
    const toastItems = toastIds.map((id)=>notifications.find((item)=>item.id === id)).filter(Boolean);
    if (toastItems.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "notifications",
        role: "status",
        "aria-live": "polite",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "notifications-actions",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: "notifications-hide-all",
                    onClick: dismissAllToasts,
                    children: "Скрыть все"
                }, void 0, false, {
                    fileName: "[project]/src/components/feedback/ToastContainer.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/feedback/ToastContainer.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            toastItems.map((item)=>item && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                    className: `notification notification--${item.type}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "notification-close",
                            onClick: ()=>dismissToast(item.id),
                            "aria-label": "Скрыть уведомление",
                            children: "×"
                        }, void 0, false, {
                            fileName: "[project]/src/components/feedback/ToastContainer.tsx",
                            lineNumber: 27,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "notification-title",
                            children: item.title
                        }, void 0, false, {
                            fileName: "[project]/src/components/feedback/ToastContainer.tsx",
                            lineNumber: 35,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "notification-text",
                            children: item.message
                        }, void 0, false, {
                            fileName: "[project]/src/components/feedback/ToastContainer.tsx",
                            lineNumber: 36,
                            columnNumber: 11
                        }, this)
                    ]
                }, item.id, true, {
                    fileName: "[project]/src/components/feedback/ToastContainer.tsx",
                    lineNumber: 26,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/feedback/ToastContainer.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_s(ToastContainer, "loiCKiJRy+D1Lv4lGQjV1Rxk6A4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$notifications$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotificationsStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$notifications$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotificationsStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$notifications$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotificationsStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$notifications$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotificationsStore"]
    ];
});
_c = ToastContainer;
var _c;
__turbopack_context__.k.register(_c, "ToastContainer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/providers/app-providers.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppProviders",
    ()=>AppProviders
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$providers$2f$query$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/providers/query-provider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$feedback$2f$ConfirmDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/feedback/ConfirmDialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$feedback$2f$Notifications$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/feedback/Notifications.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$feedback$2f$ToastContainer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/feedback/ToastContainer.tsx [app-client] (ecmascript)");
'use client';
;
;
;
;
;
function AppProviders({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$providers$2f$query$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$feedback$2f$Notifications$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NotificationsProvider"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$feedback$2f$ConfirmDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConfirmDialogProvider"], {
                children: [
                    children,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$feedback$2f$ToastContainer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToastContainer"], {}, void 0, false, {
                        fileName: "[project]/src/lib/providers/app-providers.tsx",
                        lineNumber: 15,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/lib/providers/app-providers.tsx",
                lineNumber: 13,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/lib/providers/app-providers.tsx",
            lineNumber: 12,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/lib/providers/app-providers.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
_c = AppProviders;
var _c;
__turbopack_context__.k.register(_c, "AppProviders");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_08bzulj._.js.map