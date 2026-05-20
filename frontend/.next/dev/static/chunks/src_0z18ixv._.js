(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/pages/TeacherStudents/TeacherStudentsPage.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "actions": "TeacherStudentsPage-module__8-ytBW__actions",
  "empty": "TeacherStudentsPage-module__8-ytBW__empty",
  "filters": "TeacherStudentsPage-module__8-ytBW__filters",
  "groupCard": "TeacherStudentsPage-module__8-ytBW__groupCard",
  "groupFilter": "TeacherStudentsPage-module__8-ytBW__groupFilter",
  "groupFilterWrap": "TeacherStudentsPage-module__8-ytBW__groupFilterWrap",
  "groupHead": "TeacherStudentsPage-module__8-ytBW__groupHead",
  "groupList": "TeacherStudentsPage-module__8-ytBW__groupList",
  "groupMeta": "TeacherStudentsPage-module__8-ytBW__groupMeta",
  "header": "TeacherStudentsPage-module__8-ytBW__header",
  "layoutBtn": "TeacherStudentsPage-module__8-ytBW__layoutBtn",
  "layoutBtnActive": "TeacherStudentsPage-module__8-ytBW__layoutBtnActive",
  "layoutSwitch": "TeacherStudentsPage-module__8-ytBW__layoutSwitch",
  "layoutWrap": "TeacherStudentsPage-module__8-ytBW__layoutWrap",
  "linkBtn": "TeacherStudentsPage-module__8-ytBW__linkBtn",
  "linkBtnSecondary": "TeacherStudentsPage-module__8-ytBW__linkBtnSecondary",
  "page": "TeacherStudentsPage-module__8-ytBW__page",
  "search": "TeacherStudentsPage-module__8-ytBW__search",
  "searchWrap": "TeacherStudentsPage-module__8-ytBW__searchWrap",
  "statCard": "TeacherStudentsPage-module__8-ytBW__statCard",
  "statsGrid": "TeacherStudentsPage-module__8-ytBW__statsGrid",
  "studentAvatar": "TeacherStudentsPage-module__8-ytBW__studentAvatar",
  "studentCard": "TeacherStudentsPage-module__8-ytBW__studentCard",
  "studentCardLink": "TeacherStudentsPage-module__8-ytBW__studentCardLink",
  "studentName": "TeacherStudentsPage-module__8-ytBW__studentName",
  "studentParent": "TeacherStudentsPage-module__8-ytBW__studentParent",
  "studentTop": "TeacherStudentsPage-module__8-ytBW__studentTop",
  "studentsGrid": "TeacherStudentsPage-module__8-ytBW__studentsGrid",
  "studentsList": "TeacherStudentsPage-module__8-ytBW__studentsList",
});
}),
"[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TeacherStudentsPage",
    ()=>TeacherStudentsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/crm.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$feedback$2f$Notifications$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/feedback/Notifications.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$TeacherStudents$2f$TeacherStudentsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/pages/TeacherStudents/TeacherStudentsPage.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
const getCurrentUser = ()=>{
    const raw = localStorage.getItem('user');
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch  {
        return null;
    }
};
const getAge = (value)=>{
    if (!value) return null;
    const birthDate = new Date(value);
    if (Number.isNaN(birthDate.getTime())) return null;
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || monthDiff === 0 && today.getDate() < birthDate.getDate()) {
        age -= 1;
    }
    return age >= 0 ? age : null;
};
const TeacherStudentsPage = ()=>{
    _s();
    const { notify } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$feedback$2f$Notifications$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotifications"])();
    const currentUser = getCurrentUser();
    const roleName = currentUser?.role?.name?.toLowerCase() ?? '';
    const isTeacher = roleName.includes('преподаватель') || roleName.includes('teacher');
    const [groups, setGroups] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedGroupId, setSelectedGroupId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [layout, setLayout] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "TeacherStudentsPage.useState": ()=>{
            const saved = localStorage.getItem('my_students_layout');
            return saved === 'list' ? 'list' : 'grid';
        }
    }["TeacherStudentsPage.useState"]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const load = async ()=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clientsApi"].myStudentsGrouped();
        setGroups(response.data);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TeacherStudentsPage.useEffect": ()=>{
            load().catch({
                "TeacherStudentsPage.useEffect": ()=>notify('error', 'Ошибка', 'Не удалось загрузить учеников преподавателя.')
            }["TeacherStudentsPage.useEffect"]).finally({
                "TeacherStudentsPage.useEffect": ()=>setLoading(false)
            }["TeacherStudentsPage.useEffect"]);
        }
    }["TeacherStudentsPage.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TeacherStudentsPage.useEffect": ()=>{
            localStorage.setItem('my_students_layout', layout);
        }
    }["TeacherStudentsPage.useEffect"], [
        layout
    ]);
    const groupOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TeacherStudentsPage.useMemo[groupOptions]": ()=>groups.map({
                "TeacherStudentsPage.useMemo[groupOptions]": (group)=>({
                        id: group.group_id,
                        name: group.group_name
                    })
            }["TeacherStudentsPage.useMemo[groupOptions]"])
    }["TeacherStudentsPage.useMemo[groupOptions]"], [
        groups
    ]);
    const totalStudents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TeacherStudentsPage.useMemo[totalStudents]": ()=>groups.reduce({
                "TeacherStudentsPage.useMemo[totalStudents]": (sum, group)=>sum + group.students.length
            }["TeacherStudentsPage.useMemo[totalStudents]"], 0)
    }["TeacherStudentsPage.useMemo[totalStudents]"], [
        groups
    ]);
    const filteredGroups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TeacherStudentsPage.useMemo[filteredGroups]": ()=>{
            const term = query.trim().toLowerCase();
            const baseGroups = selectedGroupId === 'all' ? groups : groups.filter({
                "TeacherStudentsPage.useMemo[filteredGroups]": (group)=>group.group_id === selectedGroupId
            }["TeacherStudentsPage.useMemo[filteredGroups]"]);
            if (!term) return baseGroups;
            return baseGroups.map({
                "TeacherStudentsPage.useMemo[filteredGroups]": (group)=>({
                        ...group,
                        students: group.students.filter({
                            "TeacherStudentsPage.useMemo[filteredGroups]": (student)=>{
                                const fullName = `${student.second_name} ${student.first_name} ${student.patronymic ?? ''}`.toLowerCase();
                                const parent = `${student.parent_full_name ?? ''} ${student.parent_phone ?? ''} ${student.parent_email ?? ''}`.toLowerCase();
                                return fullName.includes(term) || parent.includes(term);
                            }
                        }["TeacherStudentsPage.useMemo[filteredGroups]"])
                    })
            }["TeacherStudentsPage.useMemo[filteredGroups]"]).filter({
                "TeacherStudentsPage.useMemo[filteredGroups]": (group)=>group.students.length > 0
            }["TeacherStudentsPage.useMemo[filteredGroups]"]);
        }
    }["TeacherStudentsPage.useMemo[filteredGroups]"], [
        groups,
        query,
        selectedGroupId
    ]);
    const filteredStudentsCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TeacherStudentsPage.useMemo[filteredStudentsCount]": ()=>filteredGroups.reduce({
                "TeacherStudentsPage.useMemo[filteredStudentsCount]": (sum, group)=>sum + group.students.length
            }["TeacherStudentsPage.useMemo[filteredStudentsCount]"], 0)
    }["TeacherStudentsPage.useMemo[filteredStudentsCount]"], [
        filteredGroups
    ]);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TeacherStudentsPage.useEffect": ()=>{
            if (!isTeacher) router.replace('/');
        }
    }["TeacherStudentsPage.useEffect"], [
        isTeacher,
        router
    ]);
    if (!isTeacher) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$TeacherStudents$2f$TeacherStudentsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].page,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$TeacherStudents$2f$TeacherStudentsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            children: "Мои ученики"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                            lineNumber: 110,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "Список учеников сгруппирован по вашим учебным группам, с быстрым доступом к карточкам."
                        }, void 0, false, {
                            fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                            lineNumber: 111,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                    lineNumber: 109,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$TeacherStudents$2f$TeacherStudentsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statsGrid,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$TeacherStudents$2f$TeacherStudentsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statCard,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Групп"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                                lineNumber: 117,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: groups.length
                            }, void 0, false, {
                                fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                                lineNumber: 118,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$TeacherStudents$2f$TeacherStudentsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statCard,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Всего учеников"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                                lineNumber: 121,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: totalStudents
                            }, void 0, false, {
                                fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                                lineNumber: 122,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$TeacherStudents$2f$TeacherStudentsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statCard,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "По текущему фильтру"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                                lineNumber: 125,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: filteredStudentsCount
                            }, void 0, false, {
                                fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                                lineNumber: 126,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$TeacherStudents$2f$TeacherStudentsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].filters,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$TeacherStudents$2f$TeacherStudentsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].searchWrap,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "students-search",
                                children: "Поиск"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                                lineNumber: 132,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                id: "students-search",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$TeacherStudents$2f$TeacherStudentsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].search,
                                placeholder: "ФИО, родитель, телефон, email",
                                value: query,
                                onChange: (e)=>setQuery(e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                                lineNumber: 133,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$TeacherStudents$2f$TeacherStudentsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].groupFilterWrap,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "students-group-filter",
                                children: "Группа"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                                lineNumber: 142,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                id: "students-group-filter",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$TeacherStudents$2f$TeacherStudentsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].groupFilter,
                                value: selectedGroupId,
                                onChange: (e)=>setSelectedGroupId(e.target.value === 'all' ? 'all' : Number(e.target.value)),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "all",
                                        children: "Все группы"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                                        lineNumber: 149,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    groupOptions.map((group)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: group.id,
                                            children: group.name
                                        }, group.id, false, {
                                            fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                                            lineNumber: 151,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                                lineNumber: 143,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                        lineNumber: 141,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$TeacherStudents$2f$TeacherStudentsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].layoutWrap,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Расположение"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                                lineNumber: 156,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$TeacherStudents$2f$TeacherStudentsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].layoutSwitch,
                                role: "group",
                                "aria-label": "Выбор вида списка учеников",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: layout === 'grid' ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$TeacherStudents$2f$TeacherStudentsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].layoutBtnActive : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$TeacherStudents$2f$TeacherStudentsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].layoutBtn,
                                        onClick: ()=>setLayout('grid'),
                                        "aria-pressed": layout === 'grid',
                                        children: "Плитка"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                                        lineNumber: 158,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: layout === 'list' ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$TeacherStudents$2f$TeacherStudentsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].layoutBtnActive : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$TeacherStudents$2f$TeacherStudentsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].layoutBtn,
                                        onClick: ()=>setLayout('list'),
                                        "aria-pressed": layout === 'list',
                                        children: "Список"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                                        lineNumber: 166,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                                lineNumber: 157,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                        lineNumber: 155,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$TeacherStudents$2f$TeacherStudentsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].empty,
                children: "Загрузка учеников..."
            }, void 0, false, {
                fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                lineNumber: 179,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)) : filteredGroups.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$TeacherStudents$2f$TeacherStudentsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].empty,
                children: "Ничего не найдено."
            }, void 0, false, {
                fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                lineNumber: 181,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$TeacherStudents$2f$TeacherStudentsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].groupList,
                children: filteredGroups.map((group)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$TeacherStudents$2f$TeacherStudentsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].groupCard,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$TeacherStudents$2f$TeacherStudentsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].groupHead,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                children: group.group_name
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                                                lineNumber: 188,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: group.course_name ?? 'Без курса'
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                                                lineNumber: 189,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                                        lineNumber: 187,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$TeacherStudents$2f$TeacherStudentsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].groupMeta,
                                        children: [
                                            group.students.length,
                                            " учеников"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                                        lineNumber: 191,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                                lineNumber: 186,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: layout === 'grid' ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$TeacherStudents$2f$TeacherStudentsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].studentsGrid : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$TeacherStudents$2f$TeacherStudentsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].studentsList,
                                children: group.students.map((student)=>{
                                    const age = getAge(student.date_of_birth);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/clients/${student.id}`,
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$TeacherStudents$2f$TeacherStudentsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].studentCardLink,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$TeacherStudents$2f$TeacherStudentsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].studentCard,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$TeacherStudents$2f$TeacherStudentsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].studentTop,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$TeacherStudents$2f$TeacherStudentsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].studentAvatar,
                                                            children: `${student.second_name?.[0] ?? ''}${student.first_name?.[0] ?? ''}`
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                                                            lineNumber: 201,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$TeacherStudents$2f$TeacherStudentsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].studentName,
                                                                    children: [
                                                                        student.second_name,
                                                                        " ",
                                                                        student.first_name,
                                                                        " ",
                                                                        student.patronymic ?? ''
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                                                                    lineNumber: 205,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$TeacherStudents$2f$TeacherStudentsPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].studentParent,
                                                                    children: student.parent_full_name ?? 'Родитель не указан'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                                                                    lineNumber: 206,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                                                            lineNumber: 204,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                                                    lineNumber: 200,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Телефон:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                                                            lineNumber: 209,
                                                            columnNumber: 28
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        " ",
                                                        student.parent_phone ?? '-'
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                                                    lineNumber: 209,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Возраст:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                                                            lineNumber: 210,
                                                            columnNumber: 28
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        " ",
                                                        age !== null ? `${age} лет` : 'не указан'
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                                                    lineNumber: 210,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                                            lineNumber: 199,
                                            columnNumber: 23
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, student.id, false, {
                                        fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                                        lineNumber: 198,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0));
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                                lineNumber: 194,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, group.group_id, true, {
                        fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                        lineNumber: 185,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
                lineNumber: 183,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx",
        lineNumber: 107,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(TeacherStudentsPage, "8QiciQUAL67H79spt8i/nsf1MPg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$feedback$2f$Notifications$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotifications"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = TeacherStudentsPage;
var _c;
__turbopack_context__.k.register(_c, "TeacherStudentsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/(dashboard)/my-students/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$TeacherStudents$2f$TeacherStudentsPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/pages/TeacherStudents/TeacherStudentsPage.tsx [app-client] (ecmascript)");
'use client';
;
;
function Page() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$TeacherStudents$2f$TeacherStudentsPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TeacherStudentsPage"], {}, void 0, false, {
        fileName: "[project]/src/app/(dashboard)/my-students/page.tsx",
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

//# sourceMappingURL=src_0z18ixv._.js.map