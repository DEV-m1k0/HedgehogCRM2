(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/pages/shared/PageLayout.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "button": "PageLayout-module__eFCwya__button",
  "buttonSecondary": "PageLayout-module__eFCwya__buttonSecondary",
  "card": "PageLayout-module__eFCwya__card",
  "error": "PageLayout-module__eFCwya__error",
  "form": "PageLayout-module__eFCwya__form",
  "grid": "PageLayout-module__eFCwya__grid",
  "input": "PageLayout-module__eFCwya__input",
  "muted": "PageLayout-module__eFCwya__muted",
  "page": "PageLayout-module__eFCwya__page",
  "row": "PageLayout-module__eFCwya__row",
  "select": "PageLayout-module__eFCwya__select",
  "title": "PageLayout-module__eFCwya__title",
});
}),
"[project]/src/pages/Analytics/AnalyticsPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnalyticsPage",
    ()=>AnalyticsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/crm.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Bar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/BarChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Cell.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Legend.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Line.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/LineChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/Pie.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/PieChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/pages/shared/PageLayout.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
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
const AnalyticsPage = ()=>{
    _s();
    const currentUser = getCurrentUser();
    const isTeacher = Boolean(currentUser?.role?.name?.toLowerCase().includes('преподаватель') || currentUser?.role?.name?.toLowerCase().includes('teacher'));
    const [teacherLessons, setTeacherLessons] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [teacherAttendance, setTeacherAttendance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [teacherGroupsStats, setTeacherGroupsStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [teacherGroupedStudents, setTeacherGroupedStudents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [analyticsLoading, setAnalyticsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [range, setRange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('30d');
    const [deals, setDeals] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [tasks, setTasks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AnalyticsPage.useEffect": ()=>{
            if (isTeacher && currentUser?.id) {
                setAnalyticsLoading(true);
                Promise.all([
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scheduleApi"].lessons(currentUser.id),
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["groupsApi"].list(),
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["coursesApi"].list(),
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clientsApi"].myStudentsGrouped()
                ]).then({
                    "AnalyticsPage.useEffect": async ([lessonsRes, groupsRes, coursesRes, groupedStudentsRes])=>{
                        const lessons = lessonsRes.data;
                        setTeacherLessons(lessons);
                        setTeacherGroupedStudents(groupedStudentsRes.data);
                        const attendanceByLesson = await Promise.all(lessons.map({
                            "AnalyticsPage.useEffect": (lesson)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scheduleApi"].attendance(lesson.id).then({
                                    "AnalyticsPage.useEffect": (res)=>res.data
                                }["AnalyticsPage.useEffect"]).catch({
                                    "AnalyticsPage.useEffect": ()=>[]
                                }["AnalyticsPage.useEffect"])
                        }["AnalyticsPage.useEffect"]));
                        const flattenedAttendance = attendanceByLesson.flat();
                        setTeacherAttendance(flattenedAttendance);
                        const teacherGroups = groupsRes.data.filter({
                            "AnalyticsPage.useEffect.teacherGroups": (group)=>group.teacher_id === currentUser.id
                        }["AnalyticsPage.useEffect.teacherGroups"]);
                        const courseLessonCountById = new Map(coursesRes.data.map({
                            "AnalyticsPage.useEffect": (course)=>[
                                    course.id,
                                    course.lesson_count
                                ]
                        }["AnalyticsPage.useEffect"]));
                        const studentsByGroup = new Map(groupedStudentsRes.data.map({
                            "AnalyticsPage.useEffect": (group)=>[
                                    group.group_id,
                                    group.students.length
                                ]
                        }["AnalyticsPage.useEffect"]));
                        const nextGroupStats = teacherGroups.map({
                            "AnalyticsPage.useEffect.nextGroupStats": (group)=>{
                                const groupLessons = lessons.filter({
                                    "AnalyticsPage.useEffect.nextGroupStats.groupLessons": (lesson)=>lesson.group_id === group.id
                                }["AnalyticsPage.useEffect.nextGroupStats.groupLessons"]);
                                return {
                                    groupId: group.id,
                                    groupName: group.name,
                                    studentCount: studentsByGroup.get(group.id) ?? 0,
                                    lessonsTotal: groupLessons.length,
                                    lessonsConducted: groupLessons.filter({
                                        "AnalyticsPage.useEffect.nextGroupStats": (lesson)=>lesson.is_conducted && !lesson.is_cancelled
                                    }["AnalyticsPage.useEffect.nextGroupStats"]).length,
                                    plannedLessons: Math.max(0, courseLessonCountById.get(group.course_id) ?? groupLessons.length)
                                };
                            }
                        }["AnalyticsPage.useEffect.nextGroupStats"]);
                        setTeacherGroupsStats(nextGroupStats);
                    }
                }["AnalyticsPage.useEffect"]).catch(console.error).finally({
                    "AnalyticsPage.useEffect": ()=>setAnalyticsLoading(false)
                }["AnalyticsPage.useEffect"]);
                return;
            }
            Promise.all([
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dealsApi"].list(),
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$crm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tasksApi"].list()
            ]).then({
                "AnalyticsPage.useEffect": ([dealsRes, tasksRes])=>{
                    setDeals(dealsRes.data);
                    setTasks(tasksRes.data);
                }
            }["AnalyticsPage.useEffect"]).catch(console.error);
        }
    }["AnalyticsPage.useEffect"], [
        currentUser?.id,
        isTeacher
    ]);
    const rangeStartTimestamp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AnalyticsPage.useMemo[rangeStartTimestamp]": ()=>{
            if (range === 'all') {
                return null;
            }
            const days = range === '7d' ? 7 : 30;
            return Date.now() - days * 24 * 60 * 60 * 1000;
        }
    }["AnalyticsPage.useMemo[rangeStartTimestamp]"], [
        range
    ]);
    const filteredTeacherLessons = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AnalyticsPage.useMemo[filteredTeacherLessons]": ()=>{
            if (!rangeStartTimestamp) {
                return teacherLessons;
            }
            return teacherLessons.filter({
                "AnalyticsPage.useMemo[filteredTeacherLessons]": (lesson)=>new Date(lesson.start_at).getTime() >= rangeStartTimestamp
            }["AnalyticsPage.useMemo[filteredTeacherLessons]"]);
        }
    }["AnalyticsPage.useMemo[filteredTeacherLessons]"], [
        rangeStartTimestamp,
        teacherLessons
    ]);
    const filteredTeacherAttendance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AnalyticsPage.useMemo[filteredTeacherAttendance]": ()=>{
            const lessonIds = new Set(filteredTeacherLessons.map({
                "AnalyticsPage.useMemo[filteredTeacherAttendance]": (lesson)=>lesson.id
            }["AnalyticsPage.useMemo[filteredTeacherAttendance]"]));
            return teacherAttendance.filter({
                "AnalyticsPage.useMemo[filteredTeacherAttendance]": (row)=>lessonIds.has(row.lesson_id)
            }["AnalyticsPage.useMemo[filteredTeacherAttendance]"]);
        }
    }["AnalyticsPage.useMemo[filteredTeacherAttendance]"], [
        filteredTeacherLessons,
        teacherAttendance
    ]);
    const filteredDeals = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AnalyticsPage.useMemo[filteredDeals]": ()=>{
            if (!rangeStartTimestamp) {
                return deals;
            }
            return deals.filter({
                "AnalyticsPage.useMemo[filteredDeals]": (deal)=>new Date(deal.created_at).getTime() >= rangeStartTimestamp
            }["AnalyticsPage.useMemo[filteredDeals]"]);
        }
    }["AnalyticsPage.useMemo[filteredDeals]"], [
        deals,
        rangeStartTimestamp
    ]);
    const filteredTasks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AnalyticsPage.useMemo[filteredTasks]": ()=>{
            if (!rangeStartTimestamp) {
                return tasks;
            }
            return tasks.filter({
                "AnalyticsPage.useMemo[filteredTasks]": (task)=>new Date(task.created_at).getTime() >= rangeStartTimestamp
            }["AnalyticsPage.useMemo[filteredTasks]"]);
        }
    }["AnalyticsPage.useMemo[filteredTasks]"], [
        rangeStartTimestamp,
        tasks
    ]);
    const totalRevenueFiltered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AnalyticsPage.useMemo[totalRevenueFiltered]": ()=>filteredDeals.reduce({
                "AnalyticsPage.useMemo[totalRevenueFiltered]": (sum, deal)=>sum + deal.amount
            }["AnalyticsPage.useMemo[totalRevenueFiltered]"], 0)
    }["AnalyticsPage.useMemo[totalRevenueFiltered]"], [
        filteredDeals
    ]);
    const closedTasksFiltered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AnalyticsPage.useMemo[closedTasksFiltered]": ()=>filteredTasks.filter({
                "AnalyticsPage.useMemo[closedTasksFiltered]": (task)=>task.status === 'done'
            }["AnalyticsPage.useMemo[closedTasksFiltered]"]).length
    }["AnalyticsPage.useMemo[closedTasksFiltered]"], [
        filteredTasks
    ]);
    const teacherMetrics = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AnalyticsPage.useMemo[teacherMetrics]": ()=>{
            const now = Date.now();
            const totalLessons = filteredTeacherLessons.length;
            const cancelledLessons = filteredTeacherLessons.filter({
                "AnalyticsPage.useMemo[teacherMetrics]": (lesson)=>lesson.is_cancelled
            }["AnalyticsPage.useMemo[teacherMetrics]"]).length;
            const conductedLessons = filteredTeacherLessons.filter({
                "AnalyticsPage.useMemo[teacherMetrics]": (lesson)=>lesson.is_conducted && !lesson.is_cancelled
            }["AnalyticsPage.useMemo[teacherMetrics]"]).length;
            const upcomingLessons = filteredTeacherLessons.filter({
                "AnalyticsPage.useMemo[teacherMetrics]": (lesson)=>!lesson.is_cancelled && new Date(lesson.start_at).getTime() > now
            }["AnalyticsPage.useMemo[teacherMetrics]"]).length;
            const presentCount = filteredTeacherAttendance.filter({
                "AnalyticsPage.useMemo[teacherMetrics]": (row)=>row.status === 'present'
            }["AnalyticsPage.useMemo[teacherMetrics]"]).length;
            const lateCount = filteredTeacherAttendance.filter({
                "AnalyticsPage.useMemo[teacherMetrics]": (row)=>row.status === 'late'
            }["AnalyticsPage.useMemo[teacherMetrics]"]).length;
            const absentCount = filteredTeacherAttendance.filter({
                "AnalyticsPage.useMemo[teacherMetrics]": (row)=>row.status === 'absent'
            }["AnalyticsPage.useMemo[teacherMetrics]"]).length;
            const totalAttendanceMarks = filteredTeacherAttendance.length;
            const attendanceRate = totalAttendanceMarks > 0 ? Math.round((presentCount + lateCount) / totalAttendanceMarks * 100) : 0;
            const totalHedgehogs = filteredTeacherAttendance.reduce({
                "AnalyticsPage.useMemo[teacherMetrics].totalHedgehogs": (sum, row)=>sum + (row.hedgehogs ?? 0)
            }["AnalyticsPage.useMemo[teacherMetrics].totalHedgehogs"], 0);
            return {
                totalLessons,
                cancelledLessons,
                conductedLessons,
                upcomingLessons,
                presentCount,
                lateCount,
                absentCount,
                attendanceRate,
                totalHedgehogs,
                totalAttendanceMarks
            };
        }
    }["AnalyticsPage.useMemo[teacherMetrics]"], [
        filteredTeacherAttendance,
        filteredTeacherLessons
    ]);
    const teacherWorkload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AnalyticsPage.useMemo[teacherWorkload]": ()=>{
            const durations = filteredTeacherLessons.filter({
                "AnalyticsPage.useMemo[teacherWorkload].durations": (lesson)=>!lesson.is_cancelled
            }["AnalyticsPage.useMemo[teacherWorkload].durations"]).map({
                "AnalyticsPage.useMemo[teacherWorkload].durations": (lesson)=>{
                    const start = new Date(lesson.start_at).getTime();
                    const end = new Date(lesson.end_at).getTime();
                    return Math.max(0, end - start);
                }
            }["AnalyticsPage.useMemo[teacherWorkload].durations"]);
            const totalHours = durations.reduce({
                "AnalyticsPage.useMemo[teacherWorkload].totalHours": (sum, ms)=>sum + ms / (1000 * 60 * 60)
            }["AnalyticsPage.useMemo[teacherWorkload].totalHours"], 0);
            return {
                totalHours: totalHours.toFixed(1),
                averageLessonMinutes: durations.length > 0 ? Math.round(durations.reduce({
                    "AnalyticsPage.useMemo[teacherWorkload]": (sum, ms)=>sum + ms
                }["AnalyticsPage.useMemo[teacherWorkload]"], 0) / durations.length / (1000 * 60)) : 0
            };
        }
    }["AnalyticsPage.useMemo[teacherWorkload]"], [
        filteredTeacherLessons
    ]);
    const teacherMakeupMetrics = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AnalyticsPage.useMemo[teacherMakeupMetrics]": ()=>{
            const absentRows = filteredTeacherAttendance.filter({
                "AnalyticsPage.useMemo[teacherMakeupMetrics].absentRows": (row)=>row.status === 'absent'
            }["AnalyticsPage.useMemo[teacherMakeupMetrics].absentRows"]);
            const scheduled = absentRows.filter({
                "AnalyticsPage.useMemo[teacherMakeupMetrics]": (row)=>Boolean(row.makeup_lesson_at)
            }["AnalyticsPage.useMemo[teacherMakeupMetrics]"]).length;
            const completed = absentRows.filter({
                "AnalyticsPage.useMemo[teacherMakeupMetrics]": (row)=>row.makeup_completed
            }["AnalyticsPage.useMemo[teacherMakeupMetrics]"]).length;
            const pending = Math.max(0, scheduled - completed);
            const unscheduled = Math.max(0, absentRows.length - scheduled);
            return {
                absentRows: absentRows.length,
                scheduled,
                completed,
                pending,
                unscheduled
            };
        }
    }["AnalyticsPage.useMemo[teacherMakeupMetrics]"], [
        filteredTeacherAttendance
    ]);
    const studentNameById = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AnalyticsPage.useMemo[studentNameById]": ()=>{
            const map = new Map();
            for (const group of teacherGroupedStudents){
                for (const student of group.students){
                    map.set(student.id, `${student.second_name} ${student.first_name}`);
                }
            }
            return map;
        }
    }["AnalyticsPage.useMemo[studentNameById]"], [
        teacherGroupedStudents
    ]);
    const lessonById = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AnalyticsPage.useMemo[lessonById]": ()=>new Map(filteredTeacherLessons.map({
                "AnalyticsPage.useMemo[lessonById]": (lesson)=>[
                        lesson.id,
                        lesson
                    ]
            }["AnalyticsPage.useMemo[lessonById]"]))
    }["AnalyticsPage.useMemo[lessonById]"], [
        filteredTeacherLessons
    ]);
    const weeklyDynamicsData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AnalyticsPage.useMemo[weeklyDynamicsData]": ()=>{
            const weekMap = new Map();
            for (const lesson of filteredTeacherLessons){
                const lessonDate = new Date(lesson.start_at);
                const weekStart = new Date(lessonDate);
                const day = weekStart.getDay();
                const diffToMonday = day === 0 ? -6 : 1 - day;
                weekStart.setDate(weekStart.getDate() + diffToMonday);
                const key = weekStart.toISOString().slice(0, 10);
                if (!weekMap.has(key)) {
                    weekMap.set(key, {
                        lessons: 0,
                        marks: 0,
                        goodMarks: 0,
                        absences: 0,
                        hedgehogs: 0
                    });
                }
                const bucket = weekMap.get(key);
                if (!bucket) {
                    continue;
                }
                bucket.lessons += 1;
            }
            for (const row of filteredTeacherAttendance){
                const lesson = lessonById.get(row.lesson_id);
                if (!lesson) {
                    continue;
                }
                const lessonDate = new Date(lesson.start_at);
                const weekStart = new Date(lessonDate);
                const day = weekStart.getDay();
                const diffToMonday = day === 0 ? -6 : 1 - day;
                weekStart.setDate(weekStart.getDate() + diffToMonday);
                const key = weekStart.toISOString().slice(0, 10);
                const bucket = weekMap.get(key);
                if (!bucket) {
                    continue;
                }
                bucket.marks += 1;
                if (row.status === 'present' || row.status === 'late') {
                    bucket.goodMarks += 1;
                }
                if (row.status === 'absent') {
                    bucket.absences += 1;
                }
                bucket.hedgehogs += row.hedgehogs ?? 0;
            }
            return [
                ...weekMap.entries()
            ].sort({
                "AnalyticsPage.useMemo[weeklyDynamicsData]": (a, b)=>a[0].localeCompare(b[0])
            }["AnalyticsPage.useMemo[weeklyDynamicsData]"]).map({
                "AnalyticsPage.useMemo[weeklyDynamicsData]": ([week, stats])=>({
                        week: new Date(`${week}T00:00:00`).toLocaleDateString('ru-RU', {
                            day: '2-digit',
                            month: '2-digit'
                        }),
                        lessons: stats.lessons,
                        attendanceRate: stats.marks > 0 ? Math.round(stats.goodMarks / stats.marks * 100) : 0,
                        absences: stats.absences,
                        hedgehogs: stats.hedgehogs
                    })
            }["AnalyticsPage.useMemo[weeklyDynamicsData]"]);
        }
    }["AnalyticsPage.useMemo[weeklyDynamicsData]"], [
        filteredTeacherAttendance,
        filteredTeacherLessons,
        lessonById
    ]);
    const groupRemainingProgressChartData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AnalyticsPage.useMemo[groupRemainingProgressChartData]": ()=>teacherGroupsStats.map({
                "AnalyticsPage.useMemo[groupRemainingProgressChartData]": (group)=>{
                    const totalPlanned = Math.max(1, group.plannedLessons);
                    const conducted = Math.min(group.lessonsConducted, totalPlanned);
                    const remainingLessons = Math.max(0, totalPlanned - conducted);
                    const remainingPercent = Math.round(remainingLessons / totalPlanned * 100);
                    const completedPercent = Math.round(conducted / totalPlanned * 100);
                    return {
                        name: group.groupName,
                        remainingPercent,
                        completedPercent,
                        remainingLessons,
                        totalPlanned
                    };
                }
            }["AnalyticsPage.useMemo[groupRemainingProgressChartData]"]).sort({
                "AnalyticsPage.useMemo[groupRemainingProgressChartData]": (a, b)=>b.remainingPercent - a.remainingPercent
            }["AnalyticsPage.useMemo[groupRemainingProgressChartData]"])
    }["AnalyticsPage.useMemo[groupRemainingProgressChartData]"], [
        teacherGroupsStats
    ]);
    const studentAbsenceChartData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AnalyticsPage.useMemo[studentAbsenceChartData]": ()=>{
            const stats = new Map();
            for (const row of filteredTeacherAttendance){
                const current = stats.get(row.client_id) ?? {
                    absences: 0,
                    good: 0,
                    marks: 0
                };
                current.marks += 1;
                if (row.status === 'absent') {
                    current.absences += 1;
                } else {
                    current.good += 1;
                }
                stats.set(row.client_id, current);
            }
            return [
                ...stats.entries()
            ].map({
                "AnalyticsPage.useMemo[studentAbsenceChartData]": ([studentId, row])=>({
                        studentId,
                        studentName: studentNameById.get(studentId) ?? `Ученик #${studentId}`,
                        absences: row.absences,
                        attendanceRate: row.marks > 0 ? Math.round(row.good / row.marks * 100) : 0,
                        marks: row.marks
                    })
            }["AnalyticsPage.useMemo[studentAbsenceChartData]"]).filter({
                "AnalyticsPage.useMemo[studentAbsenceChartData]": (row)=>row.absences > 0
            }["AnalyticsPage.useMemo[studentAbsenceChartData]"]).sort({
                "AnalyticsPage.useMemo[studentAbsenceChartData]": (a, b)=>b.absences - a.absences
            }["AnalyticsPage.useMemo[studentAbsenceChartData]"]).slice(0, 8);
        }
    }["AnalyticsPage.useMemo[studentAbsenceChartData]"], [
        filteredTeacherAttendance,
        studentNameById
    ]);
    const criticalStudents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AnalyticsPage.useMemo[criticalStudents]": ()=>studentAbsenceChartData.filter({
                "AnalyticsPage.useMemo[criticalStudents]": (student)=>student.marks >= 4 && student.attendanceRate < 75
            }["AnalyticsPage.useMemo[criticalStudents]"])
    }["AnalyticsPage.useMemo[criticalStudents]"], [
        studentAbsenceChartData
    ]);
    const attendanceChartData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AnalyticsPage.useMemo[attendanceChartData]": ()=>[
                {
                    name: 'Присутствовали',
                    value: teacherMetrics.presentCount,
                    color: '#16a34a'
                },
                {
                    name: 'Опоздали',
                    value: teacherMetrics.lateCount,
                    color: '#f59e0b'
                },
                {
                    name: 'Отсутствовали',
                    value: teacherMetrics.absentCount,
                    color: '#dc2626'
                }
            ]
    }["AnalyticsPage.useMemo[attendanceChartData]"], [
        teacherMetrics.absentCount,
        teacherMetrics.lateCount,
        teacherMetrics.presentCount
    ]);
    const makeupChartData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AnalyticsPage.useMemo[makeupChartData]": ()=>[
                {
                    name: 'Назначены',
                    value: teacherMakeupMetrics.scheduled,
                    color: '#0ea5e9'
                },
                {
                    name: 'Проведены',
                    value: teacherMakeupMetrics.completed,
                    color: '#16a34a'
                },
                {
                    name: 'Ожидают',
                    value: teacherMakeupMetrics.pending,
                    color: '#f59e0b'
                },
                {
                    name: 'Не назначены',
                    value: teacherMakeupMetrics.unscheduled,
                    color: '#dc2626'
                }
            ]
    }["AnalyticsPage.useMemo[makeupChartData]"], [
        teacherMakeupMetrics.completed,
        teacherMakeupMetrics.pending,
        teacherMakeupMetrics.scheduled,
        teacherMakeupMetrics.unscheduled
    ]);
    const weeklyLoadChartData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AnalyticsPage.useMemo[weeklyLoadChartData]": ()=>{
            const labels = [
                'Вс',
                'Пн',
                'Вт',
                'Ср',
                'Чт',
                'Пт',
                'Сб'
            ];
            const hoursByDay = new Array(7).fill(0);
            for (const lesson of filteredTeacherLessons){
                if (lesson.is_cancelled) {
                    continue;
                }
                const start = new Date(lesson.start_at);
                const end = new Date(lesson.end_at);
                const durationHours = Math.max(0, end.getTime() - start.getTime()) / (1000 * 60 * 60);
                hoursByDay[start.getDay()] += durationHours;
            }
            return labels.map({
                "AnalyticsPage.useMemo[weeklyLoadChartData]": (label, index)=>({
                        day: label,
                        hours: Number(hoursByDay[index].toFixed(1))
                    })
            }["AnalyticsPage.useMemo[weeklyLoadChartData]"]);
        }
    }["AnalyticsPage.useMemo[weeklyLoadChartData]"], [
        filteredTeacherLessons
    ]);
    const dealsByStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AnalyticsPage.useMemo[dealsByStatus]": ()=>{
            const active = filteredDeals.filter({
                "AnalyticsPage.useMemo[dealsByStatus]": (deal)=>deal.status === 'active'
            }["AnalyticsPage.useMemo[dealsByStatus]"]).length;
            const inactive = filteredDeals.length - active;
            return [
                {
                    name: 'Активные',
                    value: active,
                    color: '#2563eb'
                },
                {
                    name: 'Неактивные',
                    value: inactive,
                    color: '#94a3b8'
                }
            ];
        }
    }["AnalyticsPage.useMemo[dealsByStatus]"], [
        filteredDeals
    ]);
    const tasksByStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AnalyticsPage.useMemo[tasksByStatus]": ()=>{
            const done = filteredTasks.filter({
                "AnalyticsPage.useMemo[tasksByStatus]": (task)=>task.status === 'done'
            }["AnalyticsPage.useMemo[tasksByStatus]"]).length;
            const inProgress = filteredTasks.filter({
                "AnalyticsPage.useMemo[tasksByStatus]": (task)=>task.status === 'in_progress'
            }["AnalyticsPage.useMemo[tasksByStatus]"]).length;
            const open = filteredTasks.filter({
                "AnalyticsPage.useMemo[tasksByStatus]": (task)=>task.status === 'open'
            }["AnalyticsPage.useMemo[tasksByStatus]"]).length;
            return [
                {
                    name: 'Открыты',
                    value: open,
                    color: '#2563eb'
                },
                {
                    name: 'В работе',
                    value: inProgress,
                    color: '#f59e0b'
                },
                {
                    name: 'Закрыты',
                    value: done,
                    color: '#16a34a'
                }
            ];
        }
    }["AnalyticsPage.useMemo[tasksByStatus]"], [
        filteredTasks
    ]);
    const rangeLabel = range === '7d' ? 'за 7 дней' : range === '30d' ? 'за 30 дней' : 'за весь период';
    const cancellationRate = teacherMetrics.totalLessons > 0 ? Math.round(teacherMetrics.cancelledLessons / teacherMetrics.totalLessons * 100) : 0;
    const groupProgressChartHeight = Math.max(260, groupRemainingProgressChartData.length * 44);
    const truncateGroupName = (name)=>name.length > 22 ? `${name.slice(0, 22)}...` : name;
    const teacherStudentsCount = teacherGroupedStudents.reduce((sum, group)=>sum + group.students.length, 0);
    const renderRangeControl = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "analytics-range",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: range === '7d' ? 'active' : '',
                onClick: ()=>setRange('7d'),
                children: "7 дней"
            }, void 0, false, {
                fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                lineNumber: 418,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: range === '30d' ? 'active' : '',
                onClick: ()=>setRange('30d'),
                children: "30 дней"
            }, void 0, false, {
                fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                lineNumber: 419,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: range === 'all' ? 'active' : '',
                onClick: ()=>setRange('all'),
                children: "Все"
            }, void 0, false, {
                fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                lineNumber: 420,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
        lineNumber: 417,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
    if (isTeacher) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].page} analytics-page`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "analytics-head analytics-head--hero",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "analytics-head-copy",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                                    children: "Аналитика преподавателя"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                    lineNumber: 429,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].muted,
                                    children: [
                                        "Критичные показатели по посещаемости, отработкам, нагрузке и рискам учеников ",
                                        rangeLabel,
                                        "."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                    lineNumber: 430,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "analytics-meta-chips",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "analytics-meta-chip",
                                            children: [
                                                "Групп: ",
                                                teacherGroupsStats.length
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                            lineNumber: 432,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "analytics-meta-chip",
                                            children: [
                                                "Учеников: ",
                                                teacherStudentsCount
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                            lineNumber: 433,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "analytics-meta-chip",
                                            children: [
                                                "Отметок: ",
                                                teacherMetrics.totalAttendanceMarks
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                            lineNumber: 434,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                    lineNumber: 431,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                            lineNumber: 428,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        renderRangeControl
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                    lineNumber: 427,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                analyticsLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].muted,
                    children: "Загрузка аналитики..."
                }, void 0, false, {
                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                    lineNumber: 441,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "analytics-section",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "analytics-section-head",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            children: "Ключевые показатели"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                            lineNumber: 446,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: "Оперативный срез по урокам, посещаемости и рискам."
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                            lineNumber: 447,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                    lineNumber: 445,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].grid} analytics-kpi-grid analytics-kpi-grid--teacher`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card} analytics-kpi-card`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    children: "Всего занятий"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                    lineNumber: 450,
                                                    columnNumber: 72
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: teacherMetrics.totalLessons
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                    lineNumber: 450,
                                                    columnNumber: 94
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                            lineNumber: 450,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card} analytics-kpi-card`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    children: "Проведено"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                    lineNumber: 451,
                                                    columnNumber: 72
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: teacherMetrics.conductedLessons
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                    lineNumber: 451,
                                                    columnNumber: 90
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                            lineNumber: 451,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card} analytics-kpi-card`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    children: "Отменено"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                    lineNumber: 452,
                                                    columnNumber: 72
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: [
                                                        teacherMetrics.cancelledLessons,
                                                        " (",
                                                        cancellationRate,
                                                        "%)"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                    lineNumber: 452,
                                                    columnNumber: 89
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                            lineNumber: 452,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card} analytics-kpi-card`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    children: "Предстоящие"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                    lineNumber: 453,
                                                    columnNumber: 72
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: teacherMetrics.upcomingLessons
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                    lineNumber: 453,
                                                    columnNumber: 92
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                            lineNumber: 453,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card} analytics-kpi-card`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    children: "Процент посещаемости"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                    lineNumber: 454,
                                                    columnNumber: 72
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: [
                                                        teacherMetrics.attendanceRate,
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                    lineNumber: 454,
                                                    columnNumber: 101
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                            lineNumber: 454,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card} analytics-kpi-card`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    children: "Нагрузка (часы)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                    lineNumber: 455,
                                                    columnNumber: 72
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: teacherWorkload.totalHours
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                    lineNumber: 455,
                                                    columnNumber: 96
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                            lineNumber: 455,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card} analytics-kpi-card analytics-kpi-card--warning`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    children: "Пропуски без отработки"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                    lineNumber: 457,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: teacherMakeupMetrics.unscheduled
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                    lineNumber: 458,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                            lineNumber: 456,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card} analytics-kpi-card analytics-kpi-card--accent`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    children: "Ученики в зоне риска"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                    lineNumber: 461,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: criticalStudents.length
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                    lineNumber: 462,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                            lineNumber: 460,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                    lineNumber: 449,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                            lineNumber: 444,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "analytics-section",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "analytics-section-head",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            children: "Динамика и отработки"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                            lineNumber: 469,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: "Тренды недели и контроль закрытия пропусков."
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                            lineNumber: 470,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                    lineNumber: 468,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].grid,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card} chartCard`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    children: "Динамика по неделям"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                    lineNumber: 474,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].muted,
                                                    children: "Линии: посещаемость и пропуски. Столбцы: проведенные занятия."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                    lineNumber: 475,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "chartWrap",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                                        width: "100%",
                                                        height: 260,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineChart"], {
                                                            data: weeklyDynamicsData,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                                                    strokeDasharray: "3 3"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                                    lineNumber: 479,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                                                    dataKey: "week"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                                    lineNumber: 480,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                                                    yAxisId: "left",
                                                                    allowDecimals: false
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                                    lineNumber: 481,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                                                    yAxisId: "right",
                                                                    orientation: "right",
                                                                    domain: [
                                                                        0,
                                                                        100
                                                                    ]
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                                    lineNumber: 482,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {}, void 0, false, {
                                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                                    lineNumber: 483,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {}, void 0, false, {
                                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                                    lineNumber: 484,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                                                    yAxisId: "left",
                                                                    dataKey: "lessons",
                                                                    name: "Занятия",
                                                                    fill: "#01b8e0",
                                                                    radius: [
                                                                        8,
                                                                        8,
                                                                        0,
                                                                        0
                                                                    ]
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                                    lineNumber: 485,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                                                                    yAxisId: "right",
                                                                    type: "monotone",
                                                                    dataKey: "attendanceRate",
                                                                    name: "Посещаемость %",
                                                                    stroke: "#16a34a",
                                                                    strokeWidth: 2,
                                                                    dot: {
                                                                        r: 2
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                                    lineNumber: 486,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                                                                    yAxisId: "left",
                                                                    type: "monotone",
                                                                    dataKey: "absences",
                                                                    name: "Пропуски",
                                                                    stroke: "#dc2626",
                                                                    strokeWidth: 2,
                                                                    dot: {
                                                                        r: 2
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                                    lineNumber: 487,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                            lineNumber: 478,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                        lineNumber: 477,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                    lineNumber: 476,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                            lineNumber: 473,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card} chartCard`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    children: "Прогресс по отработкам"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                    lineNumber: 494,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].muted,
                                                    children: [
                                                        "Пропуски: ",
                                                        teacherMakeupMetrics.absentRows,
                                                        ", назначено: ",
                                                        teacherMakeupMetrics.scheduled,
                                                        "."
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                    lineNumber: 495,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "chartWrap",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                                        width: "100%",
                                                        height: 260,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"], {
                                                            data: makeupChartData,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                                                    strokeDasharray: "3 3"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                                    lineNumber: 499,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                                                    dataKey: "name"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                                    lineNumber: 500,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                                                    allowDecimals: false
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                                    lineNumber: 501,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {}, void 0, false, {
                                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                                    lineNumber: 502,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                                                    dataKey: "value",
                                                                    radius: [
                                                                        8,
                                                                        8,
                                                                        0,
                                                                        0
                                                                    ],
                                                                    children: makeupChartData.map((entry)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cell"], {
                                                                            fill: entry.color
                                                                        }, entry.name, false, {
                                                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                                            lineNumber: 505,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0)))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                                    lineNumber: 503,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                            lineNumber: 498,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                        lineNumber: 497,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                    lineNumber: 496,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                            lineNumber: 493,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                    lineNumber: 472,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                            lineNumber: 467,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "analytics-section",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "analytics-section-head",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            children: "Качество посещаемости"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                            lineNumber: 517,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: "Распределение статусов и остаток программы по каждой группе."
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                            lineNumber: 518,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                    lineNumber: 516,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].grid,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card} chartCard`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    children: "Распределение посещаемости"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                    lineNumber: 522,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "chartWrap",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                                        width: "100%",
                                                        height: 260,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PieChart"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pie"], {
                                                                    data: attendanceChartData,
                                                                    dataKey: "value",
                                                                    nameKey: "name",
                                                                    cx: "50%",
                                                                    cy: "50%",
                                                                    outerRadius: 86,
                                                                    innerRadius: 52,
                                                                    labelLine: false,
                                                                    label: ({ cx, cy, midAngle, innerRadius, outerRadius, value })=>{
                                                                        if (typeof cx !== 'number' || typeof cy !== 'number' || typeof midAngle !== 'number' || typeof innerRadius !== 'number' || typeof outerRadius !== 'number') {
                                                                            return null;
                                                                        }
                                                                        const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
                                                                        const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                                                                        const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                                                            x: x,
                                                                            y: y,
                                                                            fill: "#ffffff",
                                                                            textAnchor: "middle",
                                                                            dominantBaseline: "central",
                                                                            fontSize: 12,
                                                                            fontWeight: 700,
                                                                            children: value
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                                            lineNumber: 543,
                                                                            columnNumber: 29
                                                                        }, ("TURBOPACK compile-time value", void 0));
                                                                    },
                                                                    children: attendanceChartData.map((entry)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cell"], {
                                                                            fill: entry.color
                                                                        }, entry.name, false, {
                                                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                                            lineNumber: 550,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0)))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                                    lineNumber: 526,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {}, void 0, false, {
                                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                                    lineNumber: 553,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {}, void 0, false, {
                                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                                    lineNumber: 554,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                            lineNumber: 525,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                        lineNumber: 524,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                    lineNumber: 523,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                            lineNumber: 521,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card} chartCard`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    children: "Осталось до завершения по группам (%)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                    lineNumber: 561,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "chartWrap",
                                                    style: {
                                                        height: `${groupProgressChartHeight}px`
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                                        width: "100%",
                                                        height: "100%",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"], {
                                                            data: groupRemainingProgressChartData,
                                                            layout: "vertical",
                                                            margin: {
                                                                left: 12,
                                                                right: 12
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                                                    strokeDasharray: "3 3"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                                    lineNumber: 565,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                                                    type: "number",
                                                                    domain: [
                                                                        0,
                                                                        100
                                                                    ]
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                                    lineNumber: 566,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                                                    type: "category",
                                                                    dataKey: "name",
                                                                    width: 160,
                                                                    tickFormatter: truncateGroupName,
                                                                    interval: 0
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                                    lineNumber: 567,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                    formatter: (value, name)=>{
                                                                        if (name === 'remainingPercent') {
                                                                            return [
                                                                                `${Number(value ?? 0)}%`,
                                                                                'Осталось'
                                                                            ];
                                                                        }
                                                                        return [
                                                                            `${Number(value ?? 0)}%`,
                                                                            'Пройдено'
                                                                        ];
                                                                    },
                                                                    labelFormatter: (label, payload)=>{
                                                                        const row = payload?.[0]?.payload;
                                                                        if (!row) {
                                                                            return String(label);
                                                                        }
                                                                        return `${label}: осталось ${row.remainingLessons ?? 0} из ${row.totalPlanned ?? 0} занятий`;
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                                    lineNumber: 568,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                                                    dataKey: "remainingPercent",
                                                                    name: "remainingPercent",
                                                                    fill: "#01b8e0",
                                                                    radius: [
                                                                        0,
                                                                        8,
                                                                        8,
                                                                        0
                                                                    ]
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                                    lineNumber: 583,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                            lineNumber: 564,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                        lineNumber: 563,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                    lineNumber: 562,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                            lineNumber: 560,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                    lineNumber: 520,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                            lineNumber: 515,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "analytics-section",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "analytics-section-head",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            children: "Нагрузка и пропуски"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                            lineNumber: 593,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: "Где больше часов и у кого чаще пропуски."
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                            lineNumber: 594,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                    lineNumber: 592,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].grid,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card} chartCard`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    children: "Нагрузка по дням недели (часы)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                    lineNumber: 598,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "chartWrap",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                                        width: "100%",
                                                        height: 260,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"], {
                                                            data: weeklyLoadChartData,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                                                    strokeDasharray: "3 3"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                                    lineNumber: 602,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                                                    dataKey: "day"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                                    lineNumber: 603,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {}, void 0, false, {
                                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                                    lineNumber: 604,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {}, void 0, false, {
                                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                                    lineNumber: 605,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                                                    dataKey: "hours",
                                                                    fill: "#2563eb",
                                                                    radius: [
                                                                        8,
                                                                        8,
                                                                        0,
                                                                        0
                                                                    ]
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                                    lineNumber: 606,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                            lineNumber: 601,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                        lineNumber: 600,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                    lineNumber: 599,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                            lineNumber: 597,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card} chartCard`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    children: "Ученики с наибольшими пропусками"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                    lineNumber: 613,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "chartWrap",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                                        width: "100%",
                                                        height: 260,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"], {
                                                            data: studentAbsenceChartData,
                                                            layout: "vertical",
                                                            margin: {
                                                                left: 12,
                                                                right: 12
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                                                    strokeDasharray: "3 3"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                                    lineNumber: 617,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                                                    type: "number",
                                                                    allowDecimals: false
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                                    lineNumber: 618,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                                                    type: "category",
                                                                    dataKey: "studentName",
                                                                    width: 110
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                                    lineNumber: 619,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {}, void 0, false, {
                                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                                    lineNumber: 620,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                                                    dataKey: "absences",
                                                                    fill: "#dc2626",
                                                                    radius: [
                                                                        0,
                                                                        8,
                                                                        8,
                                                                        0
                                                                    ]
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                                    lineNumber: 621,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                            lineNumber: 616,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                        lineNumber: 615,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                    lineNumber: 614,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                            lineNumber: 612,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                    lineNumber: 596,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                            lineNumber: 591,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "analytics-section",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "analytics-section-head",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            children: "Контроль рисков"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                            lineNumber: 631,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: "Ученики с низкой посещаемостью и сводные статусы по урокам."
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                            lineNumber: 632,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                    lineNumber: 630,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].grid,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    children: "Критичные ученики"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                    lineNumber: 636,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].muted,
                                                    children: "Попадают ученики с 4+ отметками и посещаемостью ниже 75%."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                    lineNumber: 637,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                criticalStudents.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].muted,
                                                    children: "Критичных учеников не выявлено."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                    lineNumber: 639,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "analytics-risk-list",
                                                    children: criticalStudents.map((student)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "analytics-risk-row",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: student.studentName
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                                    lineNumber: 644,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    children: [
                                                                        student.attendanceRate,
                                                                        "% / ",
                                                                        student.absences,
                                                                        " проп."
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                                    lineNumber: 645,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, student.studentId, true, {
                                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                            lineNumber: 643,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                    lineNumber: 641,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                            lineNumber: 635,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    children: "Статусы занятий"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                    lineNumber: 653,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].row,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Проведено"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                            lineNumber: 654,
                                                            columnNumber: 45
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: teacherMetrics.conductedLessons
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                            lineNumber: 654,
                                                            columnNumber: 67
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                    lineNumber: 654,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].row,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Отменено"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                            lineNumber: 655,
                                                            columnNumber: 45
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: teacherMetrics.cancelledLessons
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                            lineNumber: 655,
                                                            columnNumber: 66
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                    lineNumber: 655,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].row,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Предстоящие"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                            lineNumber: 656,
                                                            columnNumber: 45
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: teacherMetrics.upcomingLessons
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                            lineNumber: 656,
                                                            columnNumber: 69
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                    lineNumber: 656,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].row,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Присутствовали"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                            lineNumber: 657,
                                                            columnNumber: 45
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: teacherMetrics.presentCount
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                            lineNumber: 657,
                                                            columnNumber: 72
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                    lineNumber: 657,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].row,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Опоздали"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                            lineNumber: 658,
                                                            columnNumber: 45
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: teacherMetrics.lateCount
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                            lineNumber: 658,
                                                            columnNumber: 66
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                    lineNumber: 658,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].row,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Отсутствовали"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                            lineNumber: 659,
                                                            columnNumber: 45
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: teacherMetrics.absentCount
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                            lineNumber: 659,
                                                            columnNumber: 71
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                    lineNumber: 659,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                            lineNumber: 652,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                    lineNumber: 634,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                            lineNumber: 629,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true)
            ]
        }, void 0, true, {
            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
            lineNumber: 426,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].page} analytics-page`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "analytics-head analytics-head--hero",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "analytics-head-copy",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                                children: "Аналитика"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                lineNumber: 673,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].muted,
                                children: [
                                    "Сводные показатели отдела ",
                                    rangeLabel,
                                    "."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                lineNumber: 674,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                        lineNumber: 672,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    renderRangeControl
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                lineNumber: 671,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "analytics-section",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "analytics-section-head",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: "Основные показатели"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                lineNumber: 681,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Сделки и задачи в выбранном периоде."
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                lineNumber: 682,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                        lineNumber: 680,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].grid} analytics-kpi-grid`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card} analytics-kpi-card`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: "Сумма сделок"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                        lineNumber: 685,
                                        columnNumber: 66
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: totalRevenueFiltered
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                        lineNumber: 685,
                                        columnNumber: 87
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                lineNumber: 685,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card} analytics-kpi-card`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: "Всего сделок"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                        lineNumber: 686,
                                        columnNumber: 66
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: filteredDeals.length
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                        lineNumber: 686,
                                        columnNumber: 87
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                lineNumber: 686,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card} analytics-kpi-card`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: "Всего задач"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                        lineNumber: 687,
                                        columnNumber: 66
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: filteredTasks.length
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                        lineNumber: 687,
                                        columnNumber: 86
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                lineNumber: 687,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card} analytics-kpi-card`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: "Закрыто задач"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                        lineNumber: 688,
                                        columnNumber: 66
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: closedTasksFiltered
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                        lineNumber: 688,
                                        columnNumber: 88
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                lineNumber: 688,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                        lineNumber: 684,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                lineNumber: 679,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "analytics-section",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "analytics-section-head",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: "Визуализация статусов"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                lineNumber: 694,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Распределение по текущему состоянию сделок и задач."
                            }, void 0, false, {
                                fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                lineNumber: 695,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                        lineNumber: 693,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].grid,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card} chartCard`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: "Сделки по статусу"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                        lineNumber: 699,
                                        columnNumber: 11
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "chartWrap",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                            width: "100%",
                                            height: 260,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PieChart"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pie"], {
                                                        data: dealsByStatus,
                                                        dataKey: "value",
                                                        nameKey: "name",
                                                        outerRadius: 90,
                                                        label: true,
                                                        children: dealsByStatus.map((entry)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cell"], {
                                                                fill: entry.color
                                                            }, entry.name, false, {
                                                                fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                                lineNumber: 705,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                        lineNumber: 703,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {}, void 0, false, {
                                                        fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                        lineNumber: 708,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {}, void 0, false, {
                                                        fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                        lineNumber: 709,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                lineNumber: 702,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                            lineNumber: 701,
                                            columnNumber: 13
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                        lineNumber: 700,
                                        columnNumber: 11
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                lineNumber: 698,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$shared$2f$PageLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card} chartCard`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: "Задачи по статусу"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                        lineNumber: 716,
                                        columnNumber: 11
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "chartWrap",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                            width: "100%",
                                            height: 260,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"], {
                                                data: tasksByStatus,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                                        strokeDasharray: "3 3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                        lineNumber: 720,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                                        dataKey: "name"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                        lineNumber: 721,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                                        allowDecimals: false
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                        lineNumber: 722,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {}, void 0, false, {
                                                        fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                        lineNumber: 723,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                                        dataKey: "value",
                                                        radius: [
                                                            8,
                                                            8,
                                                            0,
                                                            0
                                                        ],
                                                        children: tasksByStatus.map((entry)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cell"], {
                                                                fill: entry.color
                                                            }, entry.name, false, {
                                                                fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                                lineNumber: 726,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                        lineNumber: 724,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                                lineNumber: 719,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                            lineNumber: 718,
                                            columnNumber: 13
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                        lineNumber: 717,
                                        columnNumber: 11
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                                lineNumber: 715,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                        lineNumber: 697,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
                lineNumber: 692,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/Analytics/AnalyticsPage.tsx",
        lineNumber: 670,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AnalyticsPage, "9xSpiIX8hCPx/2aL08Jjm5Bx0kQ=");
_c = AnalyticsPage;
var _c;
__turbopack_context__.k.register(_c, "AnalyticsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/(dashboard)/analytics/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Analytics$2f$AnalyticsPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/pages/Analytics/AnalyticsPage.tsx [app-client] (ecmascript)");
'use client';
;
;
function Page() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$Analytics$2f$AnalyticsPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnalyticsPage"], {}, void 0, false, {
        fileName: "[project]/src/app/(dashboard)/analytics/page.tsx",
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

//# sourceMappingURL=src_0vv9z-g._.js.map