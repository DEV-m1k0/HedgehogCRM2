(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/pages/Schedule/Components/ConfirmationModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const ConfirmationModal = ({ isOpen, onClose, onConfirm, title = 'Подтверждение действия', message, confirmText = 'Подтвердить', cancelText = 'Отмена', confirmVariant = 'primary', showCloseButton = true, disableConfirm = false, disableCancel = false, size = 'md', children })=>{
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ConfirmationModal.useEffect": ()=>{
            const handleEscape = {
                "ConfirmationModal.useEffect.handleEscape": (e)=>{
                    if (e.key === 'Escape' && isOpen) {
                        onClose();
                    }
                }
            }["ConfirmationModal.useEffect.handleEscape"];
            if (isOpen) {
                document.addEventListener('keydown', handleEscape);
                document.body.style.overflow = 'hidden';
            }
            return ({
                "ConfirmationModal.useEffect": ()=>{
                    document.removeEventListener('keydown', handleEscape);
                    document.body.style.overflow = 'unset';
                }
            })["ConfirmationModal.useEffect"];
        }
    }["ConfirmationModal.useEffect"], [
        isOpen,
        onClose
    ]);
    const handleOverlayClick = (e)=>{
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    const handleConfirm = ()=>{
        onConfirm();
        onClose();
    };
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "modal-overlay",
        onClick: handleOverlayClick,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `modal-container modal-${size}`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "modal-header",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "modal-title",
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/src/pages/Schedule/Components/ConfirmationModal.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        showCloseButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "modal-close-btn",
                            onClick: onClose,
                            "aria-label": "Закрыть",
                            children: "×"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/Schedule/Components/ConfirmationModal.tsx",
                            lineNumber: 75,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/Schedule/Components/ConfirmationModal.tsx",
                    lineNumber: 72,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "modal-content",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "modal-message",
                            children: message
                        }, void 0, false, {
                            fileName: "[project]/src/pages/Schedule/Components/ConfirmationModal.tsx",
                            lineNumber: 82,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        children && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "modal-children",
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/src/pages/Schedule/Components/ConfirmationModal.tsx",
                            lineNumber: 83,
                            columnNumber: 24
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/Schedule/Components/ConfirmationModal.tsx",
                    lineNumber: 81,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "modal-footer",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "modal-btn modal-btn-cancel",
                            onClick: onClose,
                            disabled: disableCancel,
                            children: cancelText
                        }, void 0, false, {
                            fileName: "[project]/src/pages/Schedule/Components/ConfirmationModal.tsx",
                            lineNumber: 87,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: `modal-btn modal-btn-confirm modal-btn-${confirmVariant}`,
                            onClick: handleConfirm,
                            disabled: disableConfirm,
                            autoFocus: true,
                            children: confirmText
                        }, void 0, false, {
                            fileName: "[project]/src/pages/Schedule/Components/ConfirmationModal.tsx",
                            lineNumber: 94,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/Schedule/Components/ConfirmationModal.tsx",
                    lineNumber: 86,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/pages/Schedule/Components/ConfirmationModal.tsx",
            lineNumber: 71,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/pages/Schedule/Components/ConfirmationModal.tsx",
        lineNumber: 70,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)), document.body);
};
_s(ConfirmationModal, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = ConfirmationModal;
const __TURBOPACK__default__export__ = ConfirmationModal;
var _c;
__turbopack_context__.k.register(_c, "ConfirmationModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/pages/Schedule/LessonFormPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LessonFormPage",
    ()=>LessonFormPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/crm.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Schedule$2f$Components$2f$ConfirmationModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/pages/Schedule/Components/ConfirmationModal.tsx [app-client] (ecmascript)");
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
;
;
const toDateTimeLocal = (iso)=>{
    const date = new Date(iso);
    const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return offsetDate.toISOString().slice(0, 16);
};
const dateToLocalInput = (date)=>{
    const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return offsetDate.toISOString().slice(0, 16);
};
const localInputToApiDateTime = (value)=>`${value}:00`;
const getDurationByType = (type)=>type === 'group' ? 90 : 60;
const withDuration = (startAt, minutes)=>{
    const start = new Date(startAt);
    if (Number.isNaN(start.getTime())) {
        return startAt;
    }
    const end = new Date(start.getTime() + minutes * 60_000);
    return dateToLocalInput(end);
};
const getDefaultRange = (date)=>{
    const baseDate = date && /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : new Date().toISOString().slice(0, 10);
    return {
        start_at: `${baseDate}T10:00`,
        end_at: `${baseDate}T11:00`
    };
};
const getCurrentUser = ()=>{
    const raw = localStorage.getItem('user');
    if (!raw) {
        return null;
    }
    try {
        return JSON.parse(raw);
    } catch  {
        return null;
    }
};
const statusText = {
    present: 'Присутствовал',
    late: 'Опоздал',
    absent: 'Отсутствовал'
};
const LessonFormPage = ()=>{
    _s();
    const { notify } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$feedback$2f$Notifications$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotifications"])();
    const { confirm } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$feedback$2f$ConfirmDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConfirmDialog"])();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const lessonId = params.lessonId;
    const isEditMode = Boolean(lessonId);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const [groups, setGroups] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [courses, setCourses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [users, setUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [allStudents, setAllStudents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedIndividualStudentId, setSelectedIndividualStudentId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [makeupCandidates, setMakeupCandidates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [makeupSelection, setMakeupSelection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [makeupQuery, setMakeupQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [makeupSessionItems, setMakeupSessionItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [makeupSessionDrafts, setMakeupSessionDrafts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [students, setStudents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [attendance, setAttendance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLessonEditEnabled, setIsLessonEditEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "LessonFormPage.useState": ()=>!isEditMode
    }["LessonFormPage.useState"]);
    const [editTab, setEditTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('attendance');
    const [applyToFuture, setApplyToFuture] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [canApplyToFuture, setCanApplyToFuture] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [deleteScope, setDeleteScope] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('single');
    const attendanceReadyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const lastAttendanceSnapshotRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])('');
    const attendanceDebounceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const currentUser = getCurrentUser();
    const roleRaw = typeof currentUser?.role === 'string' ? currentUser.role : currentUser?.role?.name ?? '';
    const roleName = roleRaw.toLowerCase();
    const isTeacher = roleName === 'преподаватель';
    const isManager = roleName.includes('менеджер') || roleName.includes('manager');
    const isAdmin = roleName.includes('администратор') || roleName.includes('admin');
    const isManagerOrAdmin = isManager || isAdmin;
    const defaultRange = getDefaultRange(searchParams.get('date'));
    const mode = searchParams.get('mode');
    const canCreateMakeup = isManagerOrAdmin;
    const initialCreateTab = mode === 'makeup' && canCreateMakeup ? 'makeup' : 'group';
    const [createTab, setCreateTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialCreateTab);
    const isMakeupMode = !isEditMode && createTab === 'makeup';
    const isMakeupAttendanceMode = !isEditMode && mode === 'makeup-attendance';
    const initialTeacherFilter = isTeacher ? String(currentUser?.id ?? '') : searchParams.get('teacherId') ?? '';
    const [selectedTeacherFilter, setSelectedTeacherFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialTeacherFilter);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        group_id: 0,
        topic: '',
        lesson_type: initialCreateTab,
        start_at: defaultRange.start_at,
        end_at: defaultRange.end_at,
        materials_url: '',
        comment: '',
        is_cancelled: false,
        is_recurring_weekly: false,
        recurrence_until: defaultRange.start_at.slice(0, 10)
    });
    const isIndividualDirectCreate = !isEditMode && form.lesson_type === 'individual' && (isManagerOrAdmin || isTeacher);
    const teacherOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LessonFormPage.useMemo[teacherOptions]": ()=>users.filter({
                "LessonFormPage.useMemo[teacherOptions]": (user)=>user.role.name.toLowerCase() === 'преподаватель'
            }["LessonFormPage.useMemo[teacherOptions]"])
    }["LessonFormPage.useMemo[teacherOptions]"], [
        users
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LessonFormPage.useEffect": ()=>{
            if (isEditMode) {
                return;
            }
            setForm({
                "LessonFormPage.useEffect": (prev)=>({
                        ...prev,
                        lesson_type: createTab,
                        end_at: withDuration(prev.start_at, getDurationByType(createTab))
                    })
            }["LessonFormPage.useEffect"]);
        }
    }["LessonFormPage.useEffect"], [
        createTab,
        isEditMode
    ]);
    const availableGroups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LessonFormPage.useMemo[availableGroups]": ()=>{
            const isIndividualGroup = {
                "LessonFormPage.useMemo[availableGroups].isIndividualGroup": (group)=>group.audience?.toLowerCase() === 'individual' || group.name.toLowerCase().startsWith('индивидуально:')
            }["LessonFormPage.useMemo[availableGroups].isIndividualGroup"];
            let filtered = groups;
            if (!selectedTeacherFilter) {
                filtered = groups;
            } else {
                const teacherId = Number(selectedTeacherFilter);
                if (!Number.isInteger(teacherId) || teacherId <= 0) {
                    filtered = groups;
                } else {
                    filtered = groups.filter({
                        "LessonFormPage.useMemo[availableGroups]": (group)=>group.teacher_id === teacherId
                    }["LessonFormPage.useMemo[availableGroups]"]);
                }
            }
            if (form.lesson_type === 'group') {
                return filtered.filter({
                    "LessonFormPage.useMemo[availableGroups]": (group)=>!isIndividualGroup(group)
                }["LessonFormPage.useMemo[availableGroups]"]);
            }
            if (form.lesson_type === 'individual') {
                return filtered.filter({
                    "LessonFormPage.useMemo[availableGroups]": (group)=>isIndividualGroup(group)
                }["LessonFormPage.useMemo[availableGroups]"]);
            }
            return filtered;
        }
    }["LessonFormPage.useMemo[availableGroups]"], [
        groups,
        selectedTeacherFilter,
        form.lesson_type
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LessonFormPage.useEffect": ()=>{
            const load = {
                "LessonFormPage.useEffect.load": async ()=>{
                    setLoading(true);
                    try {
                        const [groupsRes, coursesRes, usersRes, clientsRes, makeupsRes] = await Promise.all([
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["groupsApi"].list(),
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["coursesApi"].list(),
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["metaApi"].users(),
                            isTeacher ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clientsApi"].myStudents() : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clientsApi"].list(),
                            isMakeupMode ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scheduleApi"].listMakeups(false) : Promise.resolve({
                                data: []
                            })
                        ]);
                        const groupItems = groupsRes.data;
                        setGroups(groupItems);
                        setCourses(coursesRes.data);
                        setUsers(usersRes.data);
                        setAllStudents(clientsRes.data);
                        if (isEditMode && lessonId) {
                            const lessonRes = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scheduleApi"].lesson(Number(lessonId));
                            const lesson = lessonRes.data;
                            const lessonGroup = groupItems.find({
                                "LessonFormPage.useEffect.load.lessonGroup": (group)=>group.id === lesson.group_id
                            }["LessonFormPage.useEffect.load.lessonGroup"]);
                            if (lessonGroup?.teacher_id) {
                                setSelectedTeacherFilter(String(lessonGroup.teacher_id));
                            }
                            setForm({
                                group_id: lesson.group_id,
                                topic: lesson.topic,
                                lesson_type: lesson.lesson_type ?? 'group',
                                start_at: toDateTimeLocal(lesson.start_at),
                                end_at: toDateTimeLocal(lesson.end_at),
                                materials_url: lesson.materials_url ?? '',
                                comment: lesson.comment ?? '',
                                is_cancelled: lesson.is_cancelled,
                                is_recurring_weekly: lesson.is_recurring_weekly,
                                recurrence_until: toDateTimeLocal(lesson.start_at).slice(0, 10)
                            });
                            setCanApplyToFuture(Boolean(lesson.recurrence_group_id));
                            setDeleteScope('single');
                        }
                        if (isMakeupMode) {
                            const candidates = makeupsRes.data;
                            setMakeupCandidates(candidates);
                            setMakeupSelection({
                                "LessonFormPage.useEffect.load": (prev)=>{
                                    const next = {};
                                    for (const item of candidates){
                                        next[item.attendance_id] = prev[item.attendance_id] ?? false;
                                    }
                                    return next;
                                }
                            }["LessonFormPage.useEffect.load"]);
                        }
                        if (isMakeupAttendanceMode) {
                            const makeupGroupIdRaw = searchParams.get('makeupGroupId');
                            const makeupAt = searchParams.get('makeupAt');
                            const makeupGroupId = makeupGroupIdRaw ? Number(makeupGroupIdRaw) : undefined;
                            const teacherId = currentUser?.id;
                            const sessionRes = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scheduleApi"].makeupSession({
                                makeup_group_id: Number.isInteger(makeupGroupId) && makeupGroupId && makeupGroupId > 0 ? makeupGroupId : undefined,
                                makeup_lesson_at: makeupAt || undefined,
                                teacher_id: teacherId
                            });
                            const items = sessionRes.data;
                            setMakeupSessionItems(items);
                            const nextDrafts = {};
                            for (const item of items){
                                nextDrafts[item.attendance_id] = {
                                    makeup_completed: item.makeup_completed,
                                    makeup_comment: item.makeup_comment ?? ''
                                };
                            }
                            setMakeupSessionDrafts(nextDrafts);
                        }
                    } catch (requestError) {
                        console.error(requestError);
                        setError('Не удалось загрузить данные формы');
                    } finally{
                        setLoading(false);
                    }
                }
            }["LessonFormPage.useEffect.load"];
            load().catch(console.error);
        }
    }["LessonFormPage.useEffect"], [
        isEditMode,
        lessonId,
        isMakeupMode,
        isMakeupAttendanceMode,
        searchParams,
        currentUser?.id
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LessonFormPage.useEffect": ()=>{
            if (!canApplyToFuture && deleteScope !== 'single') {
                setDeleteScope('single');
            }
        }
    }["LessonFormPage.useEffect"], [
        canApplyToFuture,
        deleteScope
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LessonFormPage.useEffect": ()=>{
            if (availableGroups.length === 0) {
                return;
            }
            const hasSelected = availableGroups.some({
                "LessonFormPage.useEffect.hasSelected": (group)=>group.id === form.group_id
            }["LessonFormPage.useEffect.hasSelected"]);
            if (!hasSelected) {
                setForm({
                    "LessonFormPage.useEffect": (prev)=>({
                            ...prev,
                            group_id: availableGroups[0].id
                        })
                }["LessonFormPage.useEffect"]);
            }
        }
    }["LessonFormPage.useEffect"], [
        availableGroups,
        form.group_id
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LessonFormPage.useEffect": ()=>{
            if (!isEditMode || !lessonId || !form.group_id) {
                return;
            }
            const loadAttendanceData = {
                "LessonFormPage.useEffect.loadAttendanceData": async ()=>{
                    try {
                        const [studentsRes, attendanceRes] = await Promise.all([
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["groupsApi"].students(form.group_id),
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scheduleApi"].attendance(Number(lessonId))
                        ]);
                        const studentsData = studentsRes.data;
                        const attendanceMap = new Map(attendanceRes.data.map({
                            "LessonFormPage.useEffect.loadAttendanceData": (item)=>[
                                    item.client_id,
                                    item
                                ]
                        }["LessonFormPage.useEffect.loadAttendanceData"]));
                        const nextAttendance = studentsData.reduce({
                            "LessonFormPage.useEffect.loadAttendanceData.nextAttendance": (acc, student)=>{
                                const existing = attendanceMap.get(student.id);
                                acc[student.id] = {
                                    client_id: student.id,
                                    status: existing?.status ?? 'present',
                                    comment: existing?.comment ?? '',
                                    hedgehogs: existing?.hedgehogs ?? 0
                                };
                                return acc;
                            }
                        }["LessonFormPage.useEffect.loadAttendanceData.nextAttendance"], {});
                        setStudents(studentsData);
                        setAttendance(nextAttendance);
                        lastAttendanceSnapshotRef.current = JSON.stringify(nextAttendance);
                        attendanceReadyRef.current = true;
                    } catch (requestError) {
                        console.error(requestError);
                        setError('Не удалось загрузить посещаемость группы');
                    }
                }
            }["LessonFormPage.useEffect.loadAttendanceData"];
            loadAttendanceData().catch(console.error);
        }
    }["LessonFormPage.useEffect"], [
        isEditMode,
        lessonId,
        form.group_id
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LessonFormPage.useEffect": ()=>{
            return ({
                "LessonFormPage.useEffect": ()=>{
                    if (attendanceDebounceRef.current) {
                        clearTimeout(attendanceDebounceRef.current);
                    }
                }
            })["LessonFormPage.useEffect"];
        }
    }["LessonFormPage.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LessonFormPage.useEffect": ()=>{
            if (!isEditMode || !lessonId || !attendanceReadyRef.current || students.length === 0) {
                return;
            }
            const currentSnapshot = JSON.stringify(attendance);
            if (currentSnapshot === lastAttendanceSnapshotRef.current) {
                return;
            }
            if (attendanceDebounceRef.current) {
                clearTimeout(attendanceDebounceRef.current);
            }
            attendanceDebounceRef.current = setTimeout({
                "LessonFormPage.useEffect": async ()=>{
                    try {
                        await Promise.all(Object.values(attendance).map({
                            "LessonFormPage.useEffect": (item)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scheduleApi"].upsertAttendance(Number(lessonId), {
                                    client_id: item.client_id,
                                    status: item.status,
                                    comment: item.comment || null,
                                    hedgehogs: item.hedgehogs ?? 0
                                })
                        }["LessonFormPage.useEffect"]));
                        lastAttendanceSnapshotRef.current = JSON.stringify(attendance);
                    } catch (requestError) {
                        console.error(requestError);
                    }
                }
            }["LessonFormPage.useEffect"], 650);
        }
    }["LessonFormPage.useEffect"], [
        attendance,
        isEditMode,
        lessonId,
        students.length
    ]);
    const handleChange = (field, value)=>{
        if (field === 'start_at' && !isEditMode) {
            const nextStart = String(value);
            setForm((prev)=>({
                    ...prev,
                    start_at: nextStart,
                    end_at: withDuration(nextStart, getDurationByType(prev.lesson_type))
                }));
            return;
        }
        setForm((prev)=>({
                ...prev,
                [field]: value
            }));
    };
    const setDurationMinutes = (minutes)=>{
        if (!form.start_at) {
            return;
        }
        const start = new Date(form.start_at);
        if (Number.isNaN(start.getTime())) {
            return;
        }
        const end = new Date(start.getTime() + minutes * 60_000);
        setForm((prev)=>({
                ...prev,
                end_at: dateToLocalInput(end)
            }));
    };
    const courseMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LessonFormPage.useMemo[courseMap]": ()=>new Map(courses.map({
                "LessonFormPage.useMemo[courseMap]": (course)=>[
                        course.id,
                        course
                    ]
            }["LessonFormPage.useMemo[courseMap]"]))
    }["LessonFormPage.useMemo[courseMap]"], [
        courses
    ]);
    const teacherMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LessonFormPage.useMemo[teacherMap]": ()=>new Map(teacherOptions.map({
                "LessonFormPage.useMemo[teacherMap]": (teacher)=>[
                        teacher.id,
                        teacher
                    ]
            }["LessonFormPage.useMemo[teacherMap]"]))
    }["LessonFormPage.useMemo[teacherMap]"], [
        teacherOptions
    ]);
    const selectedGroup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LessonFormPage.useMemo[selectedGroup]": ()=>availableGroups.find({
                "LessonFormPage.useMemo[selectedGroup]": (group)=>group.id === form.group_id
            }["LessonFormPage.useMemo[selectedGroup]"]) ?? null
    }["LessonFormPage.useMemo[selectedGroup]"], [
        availableGroups,
        form.group_id
    ]);
    const selectedCourseName = selectedGroup ? courseMap.get(selectedGroup.course_id)?.name ?? 'Без курса' : 'Группа не выбрана';
    const selectedTeacherName = selectedGroup?.teacher_id ? (()=>{
        const teacher = teacherMap.get(selectedGroup.teacher_id);
        return teacher ? `${teacher.second_name} ${teacher.first_name}` : 'Не назначен';
    })() : (()=>{
        const teacherId = Number(selectedTeacherFilter);
        if (!Number.isInteger(teacherId) || teacherId <= 0) {
            return 'Не назначен';
        }
        const teacher = teacherMap.get(teacherId);
        return teacher ? `${teacher.second_name} ${teacher.first_name}` : 'Не назначен';
    })();
    const durationMinutes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LessonFormPage.useMemo[durationMinutes]": ()=>{
            const start = new Date(form.start_at).getTime();
            const end = new Date(form.end_at).getTime();
            if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) {
                return 0;
            }
            return Math.round((end - start) / 60000);
        }
    }["LessonFormPage.useMemo[durationMinutes]"], [
        form.start_at,
        form.end_at
    ]);
    const filteredMakeupCandidates = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LessonFormPage.useMemo[filteredMakeupCandidates]": ()=>{
            const term = makeupQuery.trim().toLowerCase();
            const teacherId = Number(selectedTeacherFilter);
            return makeupCandidates.filter({
                "LessonFormPage.useMemo[filteredMakeupCandidates]": (item)=>{
                    if (Number.isInteger(teacherId) && teacherId > 0) {
                        if (item.makeup_teacher_id && item.makeup_teacher_id !== teacherId) {
                            return false;
                        }
                    }
                    if (!term) {
                        return true;
                    }
                    const haystack = `${item.client_full_name} ${item.group_name} ${item.lesson_topic}`.toLowerCase();
                    return haystack.includes(term);
                }
            }["LessonFormPage.useMemo[filteredMakeupCandidates]"]);
        }
    }["LessonFormPage.useMemo[filteredMakeupCandidates]"], [
        makeupCandidates,
        makeupQuery,
        selectedTeacherFilter
    ]);
    const validate = ()=>{
        if (isMakeupAttendanceMode) {
            if (!isTeacher) {
                return 'Выставлять посещаемость отработки может только преподаватель';
            }
            if (makeupSessionItems.length === 0) {
                return 'Нет учеников в выбранной отработке';
            }
            return null;
        }
        if (isMakeupMode) {
            if (!isManagerOrAdmin) {
                return 'Назначать отработки может только менеджер или администратор';
            }
            const teacherId = Number(selectedTeacherFilter);
            if (!Number.isInteger(teacherId) || teacherId <= 0) {
                return 'Выберите преподавателя для отработки';
            }
            if (!form.start_at) {
                return 'Укажите дату и время отработки';
            }
            const selectedCount = Object.values(makeupSelection).filter(Boolean).length;
            if (selectedCount === 0) {
                return 'Выберите хотя бы одного ученика для отработки';
            }
            return null;
        }
        const missing = [];
        if (!isIndividualDirectCreate && !availableGroups.some((group)=>group.id === form.group_id)) {
            missing.push('группа');
        }
        if (!isTeacher && isManager) {
            const teacherId = Number(selectedTeacherFilter);
            if (!Number.isInteger(teacherId) || teacherId <= 0) {
                missing.push('преподаватель');
            }
        }
        if (!isIndividualDirectCreate && !form.topic.trim()) {
            missing.push('тема');
        }
        if (isIndividualDirectCreate && !selectedIndividualStudentId) {
            missing.push('ученик');
        }
        if (!form.start_at) {
            missing.push('начало');
        }
        if (!form.end_at) {
            missing.push('окончание');
        }
        if (missing.length > 0) {
            return `Заполните обязательные поля: ${missing.join(', ')}`;
        }
        if (new Date(form.end_at).getTime() <= new Date(form.start_at).getTime()) {
            return 'Время окончания должно быть позже начала';
        }
        if (form.is_recurring_weekly && !form.recurrence_until) {
            return 'Укажите дату завершения повторения';
        }
        return null;
    };
    const handleSubmit = async (event)=>{
        event.preventDefault();
        const submitMessage = isMakeupAttendanceMode ? 'Сохранить посещаемость отработки?' : isMakeupMode ? 'Назначить выбранные отработки?' : isEditMode ? 'Сохранить изменения занятия?' : 'Создать новое занятие?';
        if (!await confirm({
            title: isMakeupAttendanceMode ? 'Подтверждение сохранения' : isEditMode ? 'Подтверждение изменения' : 'Подтверждение создания',
            message: submitMessage,
            confirmText: isMakeupAttendanceMode ? 'Сохранить' : isEditMode ? 'Сохранить' : 'Создать'
        })) {
            return;
        }
        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }
        setError(null);
        setSubmitting(true);
        try {
            if (isMakeupAttendanceMode) {
                await Promise.all(makeupSessionItems.map((item)=>{
                    const draft = makeupSessionDrafts[item.attendance_id];
                    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scheduleApi"].completeMakeup(item.attendance_id, {
                        makeup_completed: draft?.makeup_completed ?? item.makeup_completed,
                        makeup_comment: draft?.makeup_comment?.trim() || null
                    });
                }));
                notify('success', 'Посещаемость сохранена', 'Данные по отработке обновлены.');
                router.push('/calendar');
                return;
            }
            if (isMakeupMode) {
                const teacherId = Number(selectedTeacherFilter);
                const selectedIds = Object.entries(makeupSelection).filter(([, checked])=>checked).map(([attendanceId])=>Number(attendanceId));
                await Promise.all(selectedIds.map((attendanceId)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scheduleApi"].assignMakeup(attendanceId, {
                        makeup_lesson_at: localInputToApiDateTime(form.start_at),
                        makeup_teacher_id: teacherId,
                        makeup_comment: form.comment || null,
                        makeup_completed: false
                    })));
                notify('success', 'Отработки назначены', 'Выбранные ученики добавлены в сессию отработки.');
                router.push('/calendar');
                return;
            }
            if (isEditMode && lessonId) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scheduleApi"].updateLesson(Number(lessonId), {
                    group_id: form.group_id,
                    topic: form.topic.trim(),
                    lesson_type: form.lesson_type,
                    start_at: localInputToApiDateTime(form.start_at),
                    end_at: localInputToApiDateTime(form.end_at),
                    materials_url: form.materials_url || null,
                    comment: form.comment || null,
                    is_cancelled: form.is_cancelled,
                    is_recurring_weekly: form.is_recurring_weekly,
                    apply_to_future: canApplyToFuture && applyToFuture
                });
                notify('success', 'Изменения сохранены', 'Данные занятия обновлены.', {
                    href: `/calendar/${lessonId}/edit`
                });
            } else {
                if (form.lesson_type === 'individual' && (isManagerOrAdmin || isTeacher)) {
                    const teacherId = Number(selectedTeacherFilter);
                    const student = allStudents.find((item)=>item.id === selectedIndividualStudentId) ?? null;
                    if (!Number.isInteger(teacherId) || teacherId <= 0 || !student) {
                        throw new Error('Не выбраны преподаватель или ученик');
                    }
                    const individualCourse = courses.find((course)=>course.name.toLowerCase().includes('индивиду')) ?? courses[0];
                    if (!individualCourse) {
                        throw new Error('Нет доступного курса для создания индивидуального занятия');
                    }
                    const startLabel = new Date(form.start_at).toLocaleString('ru-RU');
                    const groupRes = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["groupsApi"].create({
                        name: `Индивидуально: ${student.second_name} ${student.first_name} • ${startLabel}`,
                        course_id: individualCourse.id,
                        teacher_id: teacherId,
                        schedule_text: 'Индивидуальное занятие',
                        audience: 'individual'
                    });
                    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["groupsApi"].addStudent(groupRes.data.id, {
                        client_id: student.id
                    });
                    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scheduleApi"].createLesson({
                        group_id: groupRes.data.id,
                        topic: `Индивидуальное занятие: ${student.second_name} ${student.first_name}`,
                        lesson_type: 'individual',
                        start_at: localInputToApiDateTime(form.start_at),
                        end_at: localInputToApiDateTime(withDuration(form.start_at, 60)),
                        materials_url: form.materials_url || undefined,
                        comment: form.comment || undefined,
                        is_cancelled: form.is_cancelled,
                        is_recurring_weekly: false
                    });
                    notify('success', 'Индивидуальное занятие создано', 'Новое индивидуальное занятие добавлено в календарь.', {
                        href: `/calendar/${response.data.id}/edit`
                    });
                    router.push('/calendar');
                    return;
                }
                const duration = getDurationByType(form.lesson_type);
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scheduleApi"].createLesson({
                    group_id: form.group_id,
                    topic: form.topic.trim(),
                    lesson_type: form.lesson_type,
                    start_at: localInputToApiDateTime(form.start_at),
                    end_at: localInputToApiDateTime(withDuration(form.start_at, duration)),
                    materials_url: form.materials_url || undefined,
                    comment: form.comment || undefined,
                    is_cancelled: form.is_cancelled,
                    is_recurring_weekly: form.is_recurring_weekly,
                    recurrence_until: form.is_recurring_weekly ? form.recurrence_until : undefined
                });
                notify('success', 'Занятие создано', 'Новое занятие добавлено в расписание.', {
                    href: `/calendar/${response.data.id}/edit`
                });
            }
            router.push('/calendar');
        } catch (requestError) {
            console.error(requestError);
            setError('Не удалось сохранить занятие');
            notify('error', 'Ошибка', 'Не удалось сохранить занятие.');
        } finally{
            setSubmitting(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LessonFormPage.useEffect": ()=>{
            const handleHotkey = {
                "LessonFormPage.useEffect.handleHotkey": (event)=>{
                    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
                        event.preventDefault();
                        if (!submitting) {
                            const formElement = document.getElementById('lesson-form');
                            formElement?.requestSubmit();
                        }
                    }
                }
            }["LessonFormPage.useEffect.handleHotkey"];
            window.addEventListener('keydown', handleHotkey);
            return ({
                "LessonFormPage.useEffect": ()=>window.removeEventListener('keydown', handleHotkey)
            })["LessonFormPage.useEffect"];
        }
    }["LessonFormPage.useEffect"], [
        submitting
    ]);
    const handleDelete = async (scope)=>{
        if (!lessonId) {
            return;
        }
        setSubmitting(true);
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scheduleApi"].deleteLesson(Number(lessonId), scope);
            notify('info', 'Занятие архивировано', 'Занятие было перенесено в архив.', {
                href: '/archive'
            });
            router.push('/calendar');
        } catch (requestError) {
            console.error(requestError);
            setError('Не удалось удалить занятие');
            notify('error', 'Ошибка', 'Не удалось архивировать занятие.');
            setSubmitting(false);
        }
    };
    const setAllStatuses = (status)=>{
        setAttendance((prev)=>{
            const next = {
                ...prev
            };
            for (const student of students){
                next[student.id] = {
                    client_id: student.id,
                    status,
                    comment: prev[student.id]?.comment ?? '',
                    hedgehogs: prev[student.id]?.hedgehogs ?? 0
                };
            }
            return next;
        });
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "lesson-form-page",
            children: "Загрузка..."
        }, void 0, false, {
            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
            lineNumber: 704,
            columnNumber: 12
        }, ("TURBOPACK compile-time value", void 0));
    }
    if (isMakeupMode && !isManagerOrAdmin) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "lesson-form-page",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lesson-form-error",
                children: "Назначать отработки может только менеджер или администратор."
            }, void 0, false, {
                fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                lineNumber: 708,
                columnNumber: 50
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
            lineNumber: 708,
            columnNumber: 12
        }, ("TURBOPACK compile-time value", void 0));
    }
    if (isMakeupAttendanceMode && !isTeacher) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "lesson-form-page",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lesson-form-error",
                children: "Этот режим доступен только преподавателю."
            }, void 0, false, {
                fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                lineNumber: 712,
                columnNumber: 50
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
            lineNumber: 712,
            columnNumber: 12
        }, ("TURBOPACK compile-time value", void 0));
    }
    const handleBack = ()=>{
        if (window.history.length > 1) {
            router.back();
            return;
        }
        router.push('/calendar');
    };
    if (isMakeupAttendanceMode) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "lesson-form-page",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "lesson-page-toolbar",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "lesson-back-btn",
                        onClick: handleBack,
                        children: "Назад"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                        lineNumber: 727,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                    lineNumber: 726,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "lesson-form-heading",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        children: "Посещаемость отработки"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                        lineNumber: 733,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                    lineNumber: 732,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "lesson-form-subtitle",
                    children: "Отметьте посещение учеников, записанных на эту отработку."
                }, void 0, false, {
                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                    lineNumber: 735,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "lesson-form-error",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                    lineNumber: 736,
                    columnNumber: 19
                }, ("TURBOPACK compile-time value", void 0)),
                makeupSessionItems.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "lesson-form-error",
                    children: "Для выбранной отработки пока нет записанных учеников."
                }, void 0, false, {
                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                    lineNumber: 739,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    id: "lesson-form",
                    className: "lesson-form",
                    onSubmit: handleSubmit,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "lesson-form-section",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    children: "Ученики"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                    lineNumber: 743,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "attendance-list",
                                    children: makeupSessionItems.map((item)=>{
                                        const draft = makeupSessionDrafts[item.attendance_id] ?? {
                                            makeup_completed: item.makeup_completed,
                                            makeup_comment: item.makeup_comment ?? ''
                                        };
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                            className: `attendance-item attendance-item--${draft.makeup_completed ? 'present' : 'absent'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "attendance-student",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                href: `/clients/${item.client_id}`,
                                                                className: "attendance-student-link",
                                                                children: item.client_full_name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                                lineNumber: 757,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                            lineNumber: 756,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            children: item.group_name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                            lineNumber: 761,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `attendance-badge ${draft.makeup_completed ? 'attendance-badge--present' : 'attendance-badge--absent'}`,
                                                            children: draft.makeup_completed ? 'Отработал' : 'Не отработал'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                            lineNumber: 762,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                    lineNumber: 755,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "attendance-controls",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "attendance-field",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "Статус отработки"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                                    lineNumber: 769,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                    className: "attendance-select",
                                                                    value: draft.makeup_completed ? 'done' : 'pending',
                                                                    onChange: (e)=>{
                                                                        const nextCompleted = e.target.value === 'done';
                                                                        setMakeupSessionDrafts((prev)=>({
                                                                                ...prev,
                                                                                [item.attendance_id]: {
                                                                                    ...draft,
                                                                                    makeup_completed: nextCompleted
                                                                                }
                                                                            }));
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: "pending",
                                                                            children: "Не отработал"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                                            lineNumber: 781,
                                                                            columnNumber: 29
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: "done",
                                                                            children: "Отработал"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                                            lineNumber: 782,
                                                                            columnNumber: 29
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                                    lineNumber: 770,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                            lineNumber: 768,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "attendance-field",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "Комментарий"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                                    lineNumber: 787,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    className: "attendance-comment-input",
                                                                    type: "text",
                                                                    value: draft.makeup_comment,
                                                                    onChange: (e)=>{
                                                                        const value = e.target.value;
                                                                        setMakeupSessionDrafts((prev)=>({
                                                                                ...prev,
                                                                                [item.attendance_id]: {
                                                                                    ...draft,
                                                                                    makeup_comment: value
                                                                                }
                                                                            }));
                                                                    },
                                                                    placeholder: "Комментарий по отработке"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                                    lineNumber: 788,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                            lineNumber: 786,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                    lineNumber: 767,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, item.attendance_id, true, {
                                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                            lineNumber: 751,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0));
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                    lineNumber: 744,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                            lineNumber: 742,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lesson-form-actions lesson-form-actions--sticky",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "secondary",
                                    onClick: handleBack,
                                    disabled: submitting,
                                    children: "Отмена"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                    lineNumber: 810,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    disabled: submitting,
                                    children: "Сохранить посещаемость"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                    lineNumber: 813,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                            lineNumber: 809,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                    lineNumber: 741,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
            lineNumber: 725,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "lesson-form-page",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lesson-page-toolbar",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: "lesson-back-btn",
                    onClick: handleBack,
                    children: "Назад"
                }, void 0, false, {
                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                    lineNumber: 826,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                lineNumber: 825,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            isEditMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "lesson-edit-tabs-panel",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "lesson-edit-tabs",
                    role: "tablist",
                    "aria-label": "Разделы редактирования занятия",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            role: "tab",
                            "aria-selected": editTab === 'attendance',
                            className: editTab === 'attendance' ? 'lesson-edit-tab lesson-edit-tab--active' : 'lesson-edit-tab',
                            onClick: ()=>setEditTab('attendance'),
                            children: "Посещаемость"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                            lineNumber: 834,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            role: "tab",
                            "aria-selected": editTab === 'details',
                            className: editTab === 'details' ? 'lesson-edit-tab lesson-edit-tab--active' : 'lesson-edit-tab',
                            onClick: ()=>setEditTab('details'),
                            children: "Параметры занятия"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                            lineNumber: 843,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                    lineNumber: 833,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                lineNumber: 832,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)) : null,
            isEditMode && editTab === 'attendance' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "attendance-section",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "attendance-header-row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: "Посещаемость"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                lineNumber: 859,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "attendance-actions",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "secondary",
                                    onClick: ()=>setAllStatuses('present'),
                                    children: "Все присутствуют"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                    lineNumber: 861,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                lineNumber: 860,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                        lineNumber: 858,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    isTeacher && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "lesson-form-subtitle",
                        children: "Отработки назначаются в отдельном разделе менеджера/администратора."
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                        lineNumber: 864,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0)),
                    students.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "lesson-form-subtitle",
                        children: "В этой группе пока нет учеников."
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                        lineNumber: 867,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "attendance-list",
                        children: students.map((student)=>{
                            const item = attendance[student.id] ?? {
                                client_id: student.id,
                                status: 'present',
                                comment: '',
                                hedgehogs: 0
                            };
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                className: `attendance-item attendance-item--${item.status}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "attendance-student",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: `/clients/${student.id}`,
                                                    className: "attendance-student-link",
                                                    children: [
                                                        student.second_name,
                                                        " ",
                                                        student.first_name,
                                                        " ",
                                                        student.patronymic ?? ''
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                    lineNumber: 881,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                lineNumber: 880,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: student.parent_full_name ?? 'Родитель не указан'
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                lineNumber: 885,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `attendance-badge attendance-badge--${item.status}`,
                                                children: statusText[item.status]
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                lineNumber: 886,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                        lineNumber: 879,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "attendance-controls",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "attendance-field",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Статус"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                        lineNumber: 891,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        className: "attendance-select",
                                                        value: item.status,
                                                        onChange: (e)=>setAttendance((prev)=>({
                                                                    ...prev,
                                                                    [student.id]: {
                                                                        ...item,
                                                                        status: e.target.value
                                                                    }
                                                                })),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "present",
                                                                children: "Присутствовал"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                                lineNumber: 903,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "late",
                                                                children: "Опоздал"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                                lineNumber: 904,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "absent",
                                                                children: "Отсутствовал"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                                lineNumber: 905,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                        lineNumber: 892,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                lineNumber: 890,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "attendance-field",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Комментарий"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                        lineNumber: 910,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: "attendance-comment-input",
                                                        type: "text",
                                                        value: item.comment,
                                                        onChange: (e)=>setAttendance((prev)=>({
                                                                    ...prev,
                                                                    [student.id]: {
                                                                        ...item,
                                                                        comment: e.target.value
                                                                    }
                                                                })),
                                                        placeholder: "Комментарий"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                        lineNumber: 911,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                lineNumber: 909,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "attendance-field attendance-hedgehogs-field",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Хечхоги"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                        lineNumber: 927,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: "attendance-comment-input",
                                                        type: "number",
                                                        value: item.hedgehogs,
                                                        onChange: (e)=>setAttendance((prev)=>({
                                                                    ...prev,
                                                                    [student.id]: {
                                                                        ...item,
                                                                        hedgehogs: Number(e.target.value || 0)
                                                                    }
                                                                }))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                        lineNumber: 928,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                lineNumber: 926,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                        lineNumber: 889,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, student.id, true, {
                                fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                lineNumber: 878,
                                columnNumber: 19
                            }, ("TURBOPACK compile-time value", void 0));
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                        lineNumber: 869,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                lineNumber: 857,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            (!isEditMode || editTab === 'details') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lesson-form-heading",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                children: isEditMode ? 'Редактирование занятия' : 'Добавление занятия'
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                lineNumber: 953,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            isEditMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: isLessonEditEnabled ? 'lesson-edit-toggle lesson-edit-toggle--active' : 'lesson-edit-toggle',
                                onClick: ()=>setIsLessonEditEnabled((prev)=>!prev),
                                "aria-pressed": isLessonEditEnabled,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        width: "15",
                                        height: "15",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        stroke: "currentColor",
                                        strokeWidth: "2",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        "aria-hidden": "true",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M12 20h9"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                lineNumber: 962,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                lineNumber: 963,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                        lineNumber: 961,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    isLessonEditEnabled ? 'Режим редактирования' : 'Редактировать поля'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                lineNumber: 955,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                        lineNumber: 952,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "lesson-form-subtitle",
                        children: isMakeupMode ? 'Выберите преподавателя и учеников из пропусков, чтобы назначить сессию отработки.' : isEditMode ? 'Переключайтесь между вкладками посещаемости и параметров занятия.' : 'После сохранения вы вернетесь на страницу календаря со всеми расписаниями.'
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                        lineNumber: 969,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true),
            (!isEditMode || editTab === 'details') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lesson-meta",
                children: [
                    !isMakeupMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "lesson-meta-chip",
                        children: [
                            "Группа: ",
                            selectedGroup?.name ?? '—'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                        lineNumber: 981,
                        columnNumber: 28
                    }, ("TURBOPACK compile-time value", void 0)) : null,
                    !isMakeupMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "lesson-meta-chip",
                        children: [
                            "Курс: ",
                            selectedCourseName
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                        lineNumber: 982,
                        columnNumber: 28
                    }, ("TURBOPACK compile-time value", void 0)) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "lesson-meta-chip",
                        children: [
                            "Преподаватель: ",
                            selectedTeacherName
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                        lineNumber: 983,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "lesson-meta-chip",
                        children: [
                            "Тип: ",
                            isMakeupMode ? 'Отработка' : form.lesson_type === 'individual' ? 'Индивидуальное занятие' : 'Групповое занятие'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                        lineNumber: 984,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                lineNumber: 980,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lesson-form-error",
                children: error
            }, void 0, false, {
                fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                lineNumber: 988,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            (!isEditMode || editTab === 'details') && !isMakeupMode && !isIndividualDirectCreate && availableGroups.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lesson-form-error",
                children: "Нет доступных групп для выбранного преподавателя."
            }, void 0, false, {
                fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                lineNumber: 991,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            !isEditMode && (isManagerOrAdmin || isTeacher) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "lesson-create-tabs-panel",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "lesson-create-tabs-hint",
                        children: "Выберите тип занятия"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                        lineNumber: 996,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lesson-create-tabs",
                        role: "tablist",
                        "aria-label": "Переключение формы создания занятия",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                role: "tab",
                                "aria-selected": createTab === 'group',
                                className: createTab === 'group' ? 'lesson-create-tab lesson-create-tab--active' : 'lesson-create-tab',
                                onClick: ()=>setCreateTab('group'),
                                children: "Групповое"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                lineNumber: 998,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                role: "tab",
                                "aria-selected": createTab === 'individual',
                                className: createTab === 'individual' ? 'lesson-create-tab lesson-create-tab--active' : 'lesson-create-tab',
                                onClick: ()=>setCreateTab('individual'),
                                children: "Индивидуальное"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                lineNumber: 1007,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            isManagerOrAdmin ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                role: "tab",
                                "aria-selected": createTab === 'makeup',
                                className: createTab === 'makeup' ? 'lesson-create-tab lesson-create-tab--active' : 'lesson-create-tab',
                                onClick: ()=>setCreateTab('makeup'),
                                children: "Отработка"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                lineNumber: 1017,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                        lineNumber: 997,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                lineNumber: 995,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)) : null,
            (!isEditMode || editTab === 'details') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                id: "lesson-form",
                className: "lesson-form",
                onSubmit: handleSubmit,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                        className: "lesson-form-fieldset",
                        disabled: isEditMode && !isLessonEditEnabled,
                        children: isMakeupMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    className: "lesson-form-section",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            children: "Параметры отработки"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                            lineNumber: 1037,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "lesson-form-row",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    children: [
                                                        "Преподаватель",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            value: selectedTeacherFilter,
                                                            onChange: (e)=>setSelectedTeacherFilter(e.target.value),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "",
                                                                    children: "Выберите преподавателя"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                                    lineNumber: 1042,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                teacherOptions.map((teacher)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: teacher.id,
                                                                        children: [
                                                                            teacher.second_name,
                                                                            " ",
                                                                            teacher.first_name
                                                                        ]
                                                                    }, teacher.id, true, {
                                                                        fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                                        lineNumber: 1044,
                                                                        columnNumber: 23
                                                                    }, ("TURBOPACK compile-time value", void 0)))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                            lineNumber: 1041,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                    lineNumber: 1039,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    children: [
                                                        "Дата и время отработки",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "datetime-local",
                                                            value: form.start_at,
                                                            onChange: (e)=>handleChange('start_at', e.target.value)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                            lineNumber: 1052,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                    lineNumber: 1050,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                            lineNumber: 1038,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            children: [
                                                "Комментарий для отработки",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    value: form.comment,
                                                    onChange: (e)=>handleChange('comment', e.target.value),
                                                    placeholder: "Например: совместная отработка по пропускам"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                    lineNumber: 1057,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                            lineNumber: 1055,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                    lineNumber: 1036,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    className: "lesson-form-section",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            children: "Ученики на отработку"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                            lineNumber: 1067,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: makeupQuery,
                                            onChange: (e)=>setMakeupQuery(e.target.value),
                                            placeholder: "Поиск: ученик, группа, тема пропуска"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                            lineNumber: 1068,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        filteredMakeupCandidates.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "lesson-form-subtitle",
                                            children: "Нет доступных пропусков для назначения."
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                            lineNumber: 1075,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "attendance-list",
                                            children: filteredMakeupCandidates.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "delete-scope-item",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            checked: Boolean(makeupSelection[item.attendance_id]),
                                                            onChange: (e)=>setMakeupSelection((prev)=>({
                                                                        ...prev,
                                                                        [item.attendance_id]: e.target.checked
                                                                    }))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                            lineNumber: 1080,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                item.client_full_name,
                                                                " • ",
                                                                item.group_name,
                                                                " • ",
                                                                item.lesson_topic,
                                                                " • ",
                                                                new Date(item.lesson_start_at).toLocaleString()
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                            lineNumber: 1085,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, item.attendance_id, true, {
                                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                    lineNumber: 1079,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                            lineNumber: 1077,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                    lineNumber: 1066,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    className: "lesson-form-section",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            children: "Основная информация"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                            lineNumber: 1097,
                                            columnNumber: 11
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "lesson-form-row",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    children: [
                                                        "Преподаватель",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            value: selectedTeacherFilter,
                                                            onChange: (e)=>setSelectedTeacherFilter(e.target.value),
                                                            disabled: isTeacher,
                                                            children: [
                                                                !isTeacher ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "",
                                                                    children: "Выберите преподавателя"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                                    lineNumber: 1106,
                                                                    columnNumber: 31
                                                                }, ("TURBOPACK compile-time value", void 0)) : null,
                                                                teacherOptions.map((teacher)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: teacher.id,
                                                                        children: [
                                                                            teacher.second_name,
                                                                            " ",
                                                                            teacher.first_name
                                                                        ]
                                                                    }, teacher.id, true, {
                                                                        fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                                        lineNumber: 1108,
                                                                        columnNumber: 19
                                                                    }, ("TURBOPACK compile-time value", void 0)))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                            lineNumber: 1101,
                                                            columnNumber: 15
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                    lineNumber: 1099,
                                                    columnNumber: 13
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                isEditMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    children: [
                                                        "Тип события",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            value: form.lesson_type,
                                                            onChange: (e)=>handleChange('lesson_type', e.target.value),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "group",
                                                                    children: "Групповое занятие"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                                    lineNumber: 1119,
                                                                    columnNumber: 19
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "individual",
                                                                    children: "Индивидуальное занятие"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                                    lineNumber: 1120,
                                                                    columnNumber: 19
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                            lineNumber: 1118,
                                                            columnNumber: 17
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                    lineNumber: 1116,
                                                    columnNumber: 15
                                                }, ("TURBOPACK compile-time value", void 0)) : null,
                                                !isIndividualDirectCreate ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    children: [
                                                        "Группа",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            value: form.group_id,
                                                            onChange: (e)=>handleChange('group_id', Number(e.target.value)),
                                                            disabled: availableGroups.length === 0,
                                                            children: availableGroups.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: 0,
                                                                children: "Нет доступных групп"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                                lineNumber: 1134,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)) : availableGroups.map((group)=>{
                                                                const courseName = courseMap.get(group.course_id)?.name ?? 'Без курса';
                                                                const teacher = group.teacher_id ? teacherMap.get(group.teacher_id) : null;
                                                                const teacherLabel = teacher ? `${teacher.second_name} ${teacher.first_name}` : 'Не назначен';
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: group.id,
                                                                    children: [
                                                                        group.name,
                                                                        " - ",
                                                                        courseName,
                                                                        " - ",
                                                                        teacherLabel
                                                                    ]
                                                                }, group.id, true, {
                                                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                                    lineNumber: 1141,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0));
                                                            })
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                            lineNumber: 1128,
                                                            columnNumber: 17
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                    lineNumber: 1126,
                                                    columnNumber: 15
                                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    children: [
                                                        "Ученик",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            value: selectedIndividualStudentId,
                                                            onChange: (e)=>setSelectedIndividualStudentId(Number(e.target.value)),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: 0,
                                                                    children: "Выберите ученика"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                                    lineNumber: 1153,
                                                                    columnNumber: 19
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                allStudents.map((student)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: student.id,
                                                                        children: [
                                                                            student.second_name,
                                                                            " ",
                                                                            student.first_name,
                                                                            " ",
                                                                            student.patronymic ?? ''
                                                                        ]
                                                                    }, student.id, true, {
                                                                        fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                                        lineNumber: 1155,
                                                                        columnNumber: 21
                                                                    }, ("TURBOPACK compile-time value", void 0)))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                            lineNumber: 1152,
                                                            columnNumber: 17
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                    lineNumber: 1150,
                                                    columnNumber: 15
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                            lineNumber: 1098,
                                            columnNumber: 11
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        !isIndividualDirectCreate ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            children: [
                                                "Тема занятия",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    value: form.topic,
                                                    onChange: (e)=>handleChange('topic', e.target.value),
                                                    placeholder: "Например: Подготовка к ЕГЭ, модуль 3"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                    lineNumber: 1167,
                                                    columnNumber: 15
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                            lineNumber: 1165,
                                            columnNumber: 13
                                        }, ("TURBOPACK compile-time value", void 0)) : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                    lineNumber: 1096,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    className: "lesson-form-section",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            children: "Время занятия"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                            lineNumber: 1178,
                                            columnNumber: 11
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "lesson-form-row",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    children: [
                                                        "Начало",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "datetime-local",
                                                            value: form.start_at,
                                                            onChange: (e)=>handleChange('start_at', e.target.value)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                            lineNumber: 1182,
                                                            columnNumber: 15
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                    lineNumber: 1180,
                                                    columnNumber: 13
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                !isEditMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    children: [
                                                        "Фиксированная длительность",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            value: form.lesson_type === 'group' ? '1 час 30 минут' : '1 час',
                                                            readOnly: true
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                            lineNumber: 1187,
                                                            columnNumber: 17
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                    lineNumber: 1185,
                                                    columnNumber: 15
                                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    children: [
                                                        "Окончание",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "datetime-local",
                                                            value: form.end_at,
                                                            onChange: (e)=>handleChange('end_at', e.target.value)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                            lineNumber: 1192,
                                                            columnNumber: 17
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                    lineNumber: 1190,
                                                    columnNumber: 15
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                            lineNumber: 1179,
                                            columnNumber: 11
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        isEditMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "duration-row",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                "Длительность: ",
                                                                durationMinutes > 0 ? `${durationMinutes} мин` : 'не задана'
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                            lineNumber: 1200,
                                                            columnNumber: 17
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "duration-actions",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    className: `duration-chip ${durationMinutes === 45 ? 'duration-chip--active' : ''}`,
                                                                    onClick: ()=>setDurationMinutes(45),
                                                                    children: "45 мин"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                                    lineNumber: 1202,
                                                                    columnNumber: 19
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    className: `duration-chip ${durationMinutes === 60 ? 'duration-chip--active' : ''}`,
                                                                    onClick: ()=>setDurationMinutes(60),
                                                                    children: "60 мин"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                                    lineNumber: 1209,
                                                                    columnNumber: 19
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    className: `duration-chip ${durationMinutes === 90 ? 'duration-chip--active' : ''}`,
                                                                    onClick: ()=>setDurationMinutes(90),
                                                                    children: "90 мин"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                                    lineNumber: 1216,
                                                                    columnNumber: 19
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                            lineNumber: 1201,
                                                            columnNumber: 17
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                    lineNumber: 1199,
                                                    columnNumber: 15
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "lesson-form-hint",
                                                    children: "Подсказка: быстрые кнопки справа автоматически пересчитают время окончания."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                    lineNumber: 1225,
                                                    columnNumber: 15
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true) : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                    lineNumber: 1177,
                                    columnNumber: 9
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    className: "lesson-form-section",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            children: "Материалы и комментарии"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                            lineNumber: 1231,
                                            columnNumber: 11
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            children: [
                                                "Ссылка на материалы",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    value: form.materials_url,
                                                    onChange: (e)=>handleChange('materials_url', e.target.value),
                                                    placeholder: "https://..."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                    lineNumber: 1234,
                                                    columnNumber: 13
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                            lineNumber: 1232,
                                            columnNumber: 11
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            children: [
                                                "Комментарий",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                    value: form.comment,
                                                    onChange: (e)=>handleChange('comment', e.target.value),
                                                    placeholder: "Например: аудитория, заметки по подготовке, домашнее задание"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                    lineNumber: 1244,
                                                    columnNumber: 13
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                            lineNumber: 1242,
                                            columnNumber: 11
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                    lineNumber: 1230,
                                    columnNumber: 9
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    className: "lesson-form-section",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            children: "Параметры"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                            lineNumber: 1253,
                                            columnNumber: 11
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        isEditMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "lesson-form-checkbox",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            checked: form.is_cancelled,
                                                            onChange: (e)=>handleChange('is_cancelled', e.target.checked)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                            lineNumber: 1257,
                                                            columnNumber: 17
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        "Занятие отменено"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                    lineNumber: 1256,
                                                    columnNumber: 15
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                form.is_cancelled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "lesson-form-subtitle",
                                                    children: "Ученики этого занятия автоматически попадут в список на назначение отработки."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                    lineNumber: 1266,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true) : null,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "lesson-form-checkbox",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: form.is_recurring_weekly,
                                                    onChange: (e)=>handleChange('is_recurring_weekly', e.target.checked),
                                                    disabled: isEditMode
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                    lineNumber: 1274,
                                                    columnNumber: 13
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                "Повторять еженедельно в это же время"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                            lineNumber: 1273,
                                            columnNumber: 11
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        form.is_recurring_weekly && !isEditMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            children: [
                                                "Повторять до",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "date",
                                                    value: form.recurrence_until,
                                                    onChange: (e)=>handleChange('recurrence_until', e.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                    lineNumber: 1286,
                                                    columnNumber: 15
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                            lineNumber: 1284,
                                            columnNumber: 13
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        isEditMode && canApplyToFuture && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "lesson-form-checkbox lesson-form-checkbox-panel",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: applyToFuture,
                                                    onChange: (e)=>setApplyToFuture(e.target.checked)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                                    lineNumber: 1292,
                                                    columnNumber: 15
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                "Применить изменения к этому и всем последующим занятиям серии"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                            lineNumber: 1291,
                                            columnNumber: 13
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                    lineNumber: 1252,
                                    columnNumber: 9
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                        lineNumber: 1033,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lesson-form-actions lesson-form-actions--sticky",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "secondary",
                                onClick: ()=>router.push('/calendar'),
                                disabled: submitting,
                                children: "Отмена"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                lineNumber: 1306,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            isEditMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "danger",
                                onClick: ()=>{
                                    setDeleteScope('single');
                                    setDeleteDialogOpen(true);
                                },
                                disabled: submitting,
                                children: "Удалить"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                lineNumber: 1310,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: submitting || isEditMode && !isLessonEditEnabled || !isMakeupMode && !isIndividualDirectCreate && availableGroups.length === 0,
                                children: isMakeupMode ? 'Назначить отработки' : isEditMode ? 'Сохранить изменения' : 'Сохранить занятие'
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                lineNumber: 1322,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                        lineNumber: 1305,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                lineNumber: 1032,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Schedule$2f$Components$2f$ConfirmationModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: deleteDialogOpen,
                onClose: ()=>setDeleteDialogOpen(false),
                onConfirm: ()=>handleDelete(deleteScope),
                title: "Удаление занятия",
                confirmText: "Удалить",
                cancelText: "Отмена",
                confirmVariant: "danger",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "delete-scope-list",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: `delete-scope-item ${deleteScope === 'single' ? 'active' : ''}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "radio",
                                    name: "deleteScope",
                                    checked: deleteScope === 'single',
                                    onChange: ()=>setDeleteScope('single')
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                    lineNumber: 1343,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                "Только это занятие"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                            lineNumber: 1342,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: `delete-scope-item ${deleteScope === 'future' ? 'active' : ''} ${!canApplyToFuture ? 'disabled' : ''}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "radio",
                                    name: "deleteScope",
                                    checked: deleteScope === 'future',
                                    disabled: !canApplyToFuture,
                                    onChange: ()=>setDeleteScope('future')
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                    lineNumber: 1353,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                "Это и все последующие"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                            lineNumber: 1352,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: `delete-scope-item ${deleteScope === 'all' ? 'active' : ''} ${!canApplyToFuture ? 'disabled' : ''}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "radio",
                                    name: "deleteScope",
                                    checked: deleteScope === 'all',
                                    disabled: !canApplyToFuture,
                                    onChange: ()=>setDeleteScope('all')
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                                    lineNumber: 1364,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                "Всю серию целиком"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                            lineNumber: 1363,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                    lineNumber: 1341,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
                lineNumber: 1332,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/Schedule/LessonFormPage.tsx",
        lineNumber: 824,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(LessonFormPage, "kbNDa4MW7ma9LVXlbsuaRbjpMSs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$feedback$2f$Notifications$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotifications"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$feedback$2f$ConfirmDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConfirmDialog"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = LessonFormPage;
var _c;
__turbopack_context__.k.register(_c, "LessonFormPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/(dashboard)/calendar/new/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Schedule$2f$LessonFormPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/pages/Schedule/LessonFormPage.tsx [app-client] (ecmascript)");
'use client';
;
;
function Page() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Schedule$2f$LessonFormPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LessonFormPage"], {}, void 0, false, {
        fileName: "[project]/src/app/(dashboard)/calendar/new/page.tsx",
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

//# sourceMappingURL=src_016y_.u._.js.map